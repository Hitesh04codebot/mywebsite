import { useParams, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import axios from 'axios';
import PGCard from '../components/PGCardMore';
import { useAuth } from '../context/AuthContext';

const PgDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { token } = useAuth();

  const [pg, setPg] = useState(null);
  const [allPGs, setAllPGs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);
  const [selectedImage, setSelectedImage] = useState('');
  const [checkInDate, setCheckInDate] = useState('');
  const [duration, setDuration] = useState(1);
  const [bookingLoading, setBookingLoading] = useState(false);
  const [bookingError, setBookingError] = useState(null);

  useEffect(() => {
    setLoading(true);
    Promise.all([
      axios.get(`http://localhost:5000/api/pgs/${id}`),
      axios.get('http://localhost:5000/api/pgs'),
    ])
      .then(([pgRes, allRes]) => {
        setPg(pgRes.data);
        setSelectedImage(pgRes.data.image);
        setAllPGs(allRes.data);
      })
      .catch((err) => {
        if (err.response?.status === 404) setNotFound(true);
      })
      .finally(() => setLoading(false));
  }, [id]);

  const totalPrice = pg ? pg.price * duration : 0;

  const handleBooking = async () => {
    if (!token) {
      alert('Please login first to book.');
      navigate('/login');
      return;
    }
    if (!checkInDate) {
      alert('Please select a check-in date.');
      return;
    }
    setBookingLoading(true);
    setBookingError(null);
    try {
      await axios.post(
        'http://localhost:5000/api/bookings',
        { pgId: pg._id, checkInDate, duration, totalPrice },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      navigate('/dashboard');
    } catch (err) {
      setBookingError(err.response?.data?.message || 'Booking failed. Please try again.');
    } finally {
      setBookingLoading(false);
    }
  };

  const similarPGs = allPGs
    .filter(
      (p) =>
        p._id !== pg?._id &&
        (p.gender === pg?.gender ||
          p.occupancy === pg?.occupancy ||
          (p.amenities || []).some((a) => (pg?.amenities || []).includes(a)))
    )
    .slice(0, 3);

  const sectionVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8 } },
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <p className="text-gray-500 text-lg">Loading...</p>
      </div>
    );
  }

  if (notFound || !pg) {
    return (
      <div className="min-h-screen bg-slate-50 py-16">
        <p className="text-center text-gray-600">PG not found.</p>
      </div>
    );
  }

  const images = [pg.image];

  return (
    <div className="min-h-screen bg-slate-50 py-16">
      <motion.section
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={sectionVariants}
      >
        <div className="flex flex-col lg:flex-row gap-8">
          <div className="w-full lg:w-2/3">
            {/* Image Gallery */}
            <div className="mb-8">
              <img
                src={selectedImage}
                alt={pg.name}
                className="w-full h-96 object-cover rounded-lg shadow-lg"
              />
              <div className="flex space-x-2 mt-4 overflow-x-auto">
                {images.map((img, idx) => (
                  <img
                    key={idx}
                    src={img}
                    alt={`Thumbnail ${idx}`}
                    className={`w-20 h-20 object-cover rounded cursor-pointer ${
                      selectedImage === img ? 'ring-2 ring-blue-500' : ''
                    }`}
                    onClick={() => setSelectedImage(img)}
                  />
                ))}
              </div>
            </div>

            {/* PG Information */}
            <div className="mb-8">
              <h1 className="text-4xl font-bold text-gray-800 mb-4">{pg.name}</h1>
              <p className="text-gray-600 mb-4">{pg.location}</p>
              <p className="text-blue-600 font-bold text-2xl mb-4">₹{pg.price}/month</p>
              <div className="flex gap-4 mb-4">
                <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded">Gender: {pg.gender}</span>
                <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded">Occupancy: {pg.occupancy}</span>
              </div>
              <div className="flex flex-wrap gap-2 mb-6">
                {(pg.amenities || []).map((amenity) => (
                  <span key={amenity} className="bg-blue-100 text-blue-800 px-3 py-1 rounded text-sm">
                    {amenity}
                  </span>
                ))}
              </div>
              <p className="text-gray-700 mb-4">
                This PG offers a comfortable living environment with modern amenities and convenient
                location near MUJ campus. Perfect for students looking for a home away from home.
              </p>
              <h3 className="text-xl font-semibold mb-2">House Rules:</h3>
              <ul className="list-disc list-inside text-gray-700">
                <li>No smoking inside the premises</li>
                <li>Pets are not allowed</li>
                <li>Respect fellow roommates and maintain cleanliness</li>
                <li>Check-in after 2 PM and check-out before 11 AM</li>
              </ul>
            </div>

            {/* Similar PGs */}
            {similarPGs.length > 0 && (
              <div className="mt-12">
                <h2 className="text-3xl font-bold text-center mb-8">Similar PGs For You</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {similarPGs.map((similarPg) => (
                    <PGCard key={similarPg._id} pg={similarPg} />
                  ))}
                </div>
              </div>
            )}
          </div>

          <div className="w-full lg:w-1/3">
            {/* Booking Card */}
            <div className="sticky top-4">
              <div className="bg-white rounded-xl shadow-lg p-6">
                <p className="text-blue-600 font-bold text-xl mb-4">₹{pg.price}/month</p>
                <div className="mb-4">
                  <label className="block text-sm font-medium mb-2">Check-in Date</label>
                  <input
                    type="date"
                    value={checkInDate}
                    onChange={(e) => setCheckInDate(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-sm font-medium mb-2">Duration (months)</label>
                  <input
                    type="number"
                    min="1"
                    value={duration}
                    onChange={(e) => setDuration(Number(e.target.value))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
                <p className="text-lg font-bold mb-4">Total: ₹{totalPrice}</p>
                {bookingError && (
                  <p className="text-red-500 text-sm mb-3">{bookingError}</p>
                )}
                <button
                  onClick={handleBooking}
                  disabled={bookingLoading}
                  className="w-full py-3 px-4 rounded-lg font-semibold transition bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-50"
                >
                  {bookingLoading ? 'Booking...' : 'Book Now'}
                </button>
              </div>
            </div>
          </div>
        </div>
      </motion.section>
    </div>
  );
};

export default PgDetails;
