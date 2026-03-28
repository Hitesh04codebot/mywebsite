import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Hero from '../components/Hero';
import { motion } from 'framer-motion';

const Home = () => {
  const [pgs, setPgs] = useState([]);
  const [reviews, setReviews] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    axios.get('http://localhost:5000/api/pgs').then((res) => setPgs(res.data));
    axios.get('http://localhost:5000/api/reviews').then((res) => setReviews(res.data));
  }, []);

  const top3PGs = [...pgs].sort((a, b) => b.rating - a.rating).slice(0, 3);
  const duplicatedReviews = [...reviews, ...reviews];
  const slideWidth = 320 + 24;

  useEffect(() => {
    if (isPaused || duplicatedReviews.length === 0) return;
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % duplicatedReviews.length);
    }, 3500);
    return () => clearInterval(interval);
  }, [isPaused, duplicatedReviews.length]);

  const sectionVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8 } },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  };

  return (
    <div>
      <Hero />

      {/* Exclusive For You Section */}
      <motion.section
        id="pgs"
        className="py-16 bg-light-blue"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={sectionVariants}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center text-text-dark mb-12">Exclusive For You</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {top3PGs.map((pg, index) => (
              <motion.div
                key={pg._id}
                className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl hover:-translate-y-2 transition duration-300"
                variants={cardVariants}
                whileHover={{ scale: 1.02 }}
              >
                <img src={pg.image} alt={pg.name} className="w-full h-72 object-cover" />
                <div className="p-6">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="text-xl font-semibold text-gray-800">{pg.name}</h3>
                    <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-xs font-semibold">Top Rated #{index + 1}</span>
                  </div>
                  <p className="text-gray-600 mb-2">{pg.location}</p>
                  <p className="text-blue-600 font-bold text-lg mb-2">₹{pg.price}/month</p>
                  <div className="flex items-center mb-2">
                    <span className="text-yellow-500 mr-1">{'★'.repeat(Math.floor(pg.rating))}</span>
                    <span className="text-gray-600">{pg.rating}</span>
                  </div>
                  <div className="flex flex-wrap gap-1 mb-4">
                    {(pg.amenities || []).map((amenity) => (
                      <span key={amenity} className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-xs">
                        {amenity}
                      </span>
                    ))}
                  </div>
                  <p className="text-sm text-gray-500 mb-2">Gender: {pg.gender}</p>
                  <p className="text-sm text-gray-500 mb-4">Occupancy: {pg.occupancy}</p>
                  <Link to={`/pg/${pg._id}`}>
                    <button className="w-full bg-blue-600 text-white rounded-lg py-2 hover:bg-blue-700 transition">
                      View Details
                    </button>
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* Student Reviews Section */}
      <motion.section
        className="py-16 bg-white"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={sectionVariants}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center text-text-dark mb-4">Student Reviews</h2>
          <p className="text-center text-gray-600 mb-12">See what MUJ students say about their stays</p>
          {duplicatedReviews.length > 0 && (
            <motion.div
              animate={{ x: -currentIndex * slideWidth }}
              transition={{ duration: 0.5, ease: 'easeInOut' }}
              onHoverStart={() => setIsPaused(true)}
              onHoverEnd={() => setIsPaused(false)}
              className="overflow-hidden cursor-pointer"
            >
              <div className="flex space-x-6">
                {duplicatedReviews.map((review, index) => (
                  <div
                    key={index}
                    className="w-80 flex-shrink-0 p-6 bg-white rounded-lg shadow-md hover:shadow-xl hover:-translate-y-1 transition duration-300"
                  >
                    <img
                      className="w-16 h-16 rounded-full mx-auto mb-4 object-cover"
                      src={review.image}
                      alt={review.name}
                    />
                    <h3 className="text-lg font-semibold text-center mb-1">{review.name}</h3>
                    <div className="flex justify-center mb-4">
                      <span className="text-yellow-500">{'★'.repeat(review.rating)}</span>
                    </div>
                    <p className="text-gray-700 mb-4">{review.comment}</p>
                  </div>
                ))}
              </div>
            </motion.div>
          )}
        </div>
      </motion.section>
    </div>
  );
};

export default Home;
