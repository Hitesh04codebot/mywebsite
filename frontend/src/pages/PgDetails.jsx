import { useParams, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { motion } from 'framer-motion';
import PGCard from '../components/PGCardMore';

const pgs = [
  {
    id: 1,
    name: "Blue Heaven PG",
    price: 8000,
    location: "Near MUJ Gate 2",
    image: "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=400&h=250&fit=crop",
    gender: "Boys",
    occupancy: "Double",
    amenities: ["WiFi", "AC"],
    rating: 4.6
  },
  {
    id: 2,
    name: "Green Valley PG",
    price: 7000,
    location: "Near Campus",
    image: "https://images.unsplash.com/photo-1555854877-bab0e564b8d5?w=400&h=250&fit=crop",
    gender: "Girls",
    occupancy: "Single",
    amenities: ["WiFi", "Food Included"],
    rating: 4.4
  },
  {
    id: 3,
    name: "Sunrise Hostel",
    price: 6000,
    location: "Downtown Area",
    image: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=400&h=250&fit=crop",
    gender: "Co-Living",
    occupancy: "Triple",
    amenities: ["Parking", "Laundry"],
    rating: 4.2
  },
  {
    id: 4,
    name: "Comfort Zone PG",
    price: 9000,
    location: "Near Shopping Mall",
    image: "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=400&h=250&fit=crop",
    gender: "Boys",
    occupancy: "Single",
    amenities: ["WiFi", "AC", "Food Included"],
    rating: 4.8
  },
  {
    id: 5,
    name: "Elite Living PG",
    price: 10000,
    location: "Prime Location",
    image: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=400&h=250&fit=crop",
    gender: "Girls",
    occupancy: "Double",
    amenities: ["WiFi", "AC", "Parking"],
    rating: 5.0
  },
  {
    id: 6,
    name: "Budget Stay PG",
    price: 5500,
    location: "Suburban Area",
    image: "https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=400&h=250&fit=crop",
    gender: "Co-Living",
    occupancy: "Triple",
    amenities: ["WiFi", "Laundry"],
    rating: 4.0
  }
];

const PgDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const pg = pgs.find(p => p.id == id);

  if (!pg) {
    return <div className="min-h-screen bg-slate-50 py-16"><p>PG not found</p></div>;
  }

  const [selectedImage, setSelectedImage] = useState(pg.image);
  const images = [pg.image, pg.image, pg.image]; // Placeholder for multiple images
  const [checkInDate, setCheckInDate] = useState('');
  const [duration, setDuration] = useState(1);
  const totalPrice = pg.price * duration;

  const handleBook = () => {
    const token = localStorage.getItem("token");

    if (!token) {
      alert("Please login or sign up first to book this PG.");
      navigate("/login");
      return;
    }

    alert("Booking Confirmed Successfully!");
  };

  const similarPGs = pgs.filter(p =>
    p.id != pg.id &&
    (p.gender === pg.gender || p.occupancy === pg.occupancy || p.amenities.some(a => pg.amenities.includes(a)))
  ).slice(0, 3);

  const sectionVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8 } },
  };

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
                    className={`w-20 h-20 object-cover rounded cursor-pointer ${selectedImage === img ? 'ring-2 ring-blue-500' : ''}`}
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
                {pg.amenities.map(amenity => (
                  <span key={amenity} className="bg-blue-100 text-blue-800 px-3 py-1 rounded text-sm">{amenity}</span>
                ))}
              </div>
              <p className="text-gray-700 mb-4">
                This PG offers a comfortable living environment with modern amenities and convenient location near MUJ campus. Perfect for students looking for a home away from home.
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
            <div className="mt-12">
              <h2 className="text-3xl font-bold text-center mb-8">Similar PGs For You</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {similarPGs.map(similarPg => (
                  <PGCard key={similarPg.id} pg={similarPg} />
                ))}
              </div>
            </div>
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
                <button
                  onClick={handleBook}
                  className="w-full py-3 px-4 rounded-lg font-semibold transition bg-blue-600 text-white hover:bg-blue-700"
                >
                  Book Now
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
