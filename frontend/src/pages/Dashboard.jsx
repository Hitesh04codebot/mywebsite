import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaUser } from "react-icons/fa";
import axios from 'axios';
import { useAuth } from '../context/AuthContext';

const Dashboard = () => {
  const { user, setUser } = useAuth();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('bookings');
  const [bookings, setBookings] = useState([]);
  const [bookingsLoading, setBookingsLoading] = useState(true);
  const [bookingsError, setBookingsError] = useState(null);

  useEffect(() => {
    if (!user) return;
    setBookingsLoading(true);
    axios
      .get('http://localhost:5000/api/bookings')
      .then((res) => {
        setBookings(res.data);
      })
      .catch((err) => {
        setBookingsError(err.response?.data?.message || 'Failed to load bookings');
      })
      .finally(() => {
        setBookingsLoading(false);
      });
  }, [user]);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        const base64 = reader.result;
        setUser({ ...user, profileImage: base64 });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleDeleteImage = () => {
    setUser({ ...user, profileImage: null });
  };

  const handleDeleteBooking = async (bookingId) => {
    try {
      await axios.delete(`http://localhost:5000/api/bookings/${bookingId}`);
      setBookings((prev) => prev.filter((b) => b._id !== bookingId));
    } catch (err) {
      alert(err.response?.data?.message || 'Failed to cancel booking');
    }
  };

  if (!user) return null;

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 font-sans">
      <div className="flex max-w-7xl mx-auto py-12 px-6 gap-10">

        {/* Sidebar */}
        <div className="w-[280px] bg-white rounded-2xl shadow-xl p-8 border border-gray-100 transition-all duration-300 hover:shadow-2xl">

          {/* Profile Section */}
          <div className="text-center mb-10">
            <div className="relative inline-block mb-4 group">
              {user?.profileImage ? (
                <img
                  src={user.profileImage}
                  alt="Profile"
                  className="w-24 h-24 rounded-full object-cover border-4 border-blue-500 shadow-md mx-auto"
                />
              ) : (
                <div className="w-24 h-24 mx-auto rounded-full bg-gray-200 flex items-center justify-center border-4 border-gray-300 shadow-md">
                  <FaUser className="text-gray-500 text-4xl" />
                </div>
              )}
            </div>

            <h2 className="text-lg font-semibold text-gray-800 tracking-wide">
              {user?.name || "User"}
            </h2>
            <p className="text-sm text-gray-500 mt-1">Manage your account</p>
          </div>

          {/* Navigation */}
          <nav className="space-y-3">
            <button
              onClick={() => setActiveTab('bookings')}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl font-medium transition-all duration-200
            ${activeTab === 'bookings'
                  ? 'bg-blue-600 text-white shadow-md scale-[1.02]'
                  : 'text-gray-600 hover:bg-blue-50 hover:text-blue-600'
                }`}
            >
              📄 My Bookings
            </button>

            <button
              onClick={() => setActiveTab('profile')}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl font-medium transition-all duration-200
            ${activeTab === 'profile'
                  ? 'bg-blue-600 text-white shadow-md scale-[1.02]'
                  : 'text-gray-600 hover:bg-blue-50 hover:text-blue-600'
                }`}
            >
              👤 Edit Profile
            </button>
          </nav>
        </div>

        {/* Content */}
        <div className="flex-1 bg-white rounded-2xl shadow-lg p-10 border border-gray-100 transition-all duration-300">

          {activeTab === 'bookings' && (
            <div className="animate-fadeIn">
              <h1 className="text-3xl font-bold text-gray-800 mb-8">My Bookings</h1>

              {bookingsLoading ? (
                <p className="text-gray-500 text-center py-16">Loading bookings...</p>
              ) : bookingsError ? (
                <p className="text-red-500 text-center py-16">{bookingsError}</p>
              ) : bookings.length === 0 ? (
                <div className="text-center py-16">
                  <img
                    src="https://cdn-icons-png.flaticon.com/512/4076/4076504.png"
                    alt="No bookings"
                    className="w-24 mx-auto mb-4 opacity-60"
                  />
                  <p className="text-gray-500 text-lg">You have no bookings yet.</p>
                </div>
              ) : (
                <div className="grid gap-6">
                  {bookings.map((booking) => (
                    <div
                      key={booking._id}
                      onClick={() => navigate(`/pg/${booking.pg?._id}`)}
                      className="bg-white shadow-md rounded-lg p-6 cursor-pointer hover:shadow-lg transition"
                    >
                      <h3 className="text-xl font-semibold text-gray-800">
                        {booking.pg?.name || 'PG'}
                      </h3>

                      <p className="text-gray-600">
                        Booked On: {new Date(booking.createdAt).toLocaleString()}
                      </p>

                      <p className="text-gray-600">
                        Check-in: {new Date(booking.checkInDate).toLocaleDateString()}
                      </p>

                      <p className="text-gray-600">
                        Duration: {booking.duration} months
                      </p>

                      <p className="text-gray-600">
                        Total: ₹{booking.totalPrice}
                      </p>

                      <p className="font-semibold text-green-600 capitalize">
                        {booking.status}
                      </p>

                      <button
                        onClick={(e) => { e.stopPropagation(); handleDeleteBooking(booking._id); }}
                        className="mt-4 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition"
                      >
                        Cancel Booking
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {activeTab === 'profile' && (
            <div className="animate-fadeIn">
              <h1 className="text-3xl font-bold text-gray-800 mb-8">Edit Profile</h1>

              <div className="bg-gray-50 rounded-xl p-8 shadow-inner border border-gray-100 max-w-xl">

                <div className="mb-6 text-center">
                  {user?.profileImage ? (
                    <img
                      src={user.profileImage}
                      alt="Profile"
                      className="w-28 h-28 rounded-full object-cover border-4 border-blue-500 shadow-md mx-auto"
                    />
                  ) : (
                    <img
                      src="https://via.placeholder.com/112?text=User"
                      alt="Default User"
                      className="w-28 h-28 rounded-full object-cover border-4 border-gray-300 shadow-md mx-auto"
                    />
                  )}
                </div>

                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Upload New Profile Image
                </label>

                <input
                  type="file"
                  accept="image/*"
                  onChange={handleFileChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 mb-4 transition"
                />

                {user?.profileImage && (
                  <button
                    onClick={handleDeleteImage}
                    className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition"
                  >
                    Delete Current Image
                  </button>
                )}
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
};

export default Dashboard;
