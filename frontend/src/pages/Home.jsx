import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Hero from '../components/Hero';
import PGCard from '../components/PGCard';
import { motion, useMotionValue } from 'framer-motion';

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

const reviews = [
  {
    photo: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face",
    name: "Rahul Sharma",
    university: "MUJ Student",
    rating: 5,
    text: "Amazing PG with great amenities and friendly staff. Highly recommended for students!",
    pgName: "Blue Heaven PG"
  },
  {
    photo: "https://images.unsplash.com/photo-1494790108755-2616b612b47c?w=100&h=100&fit=crop&crop=face",
    name: "Priya Patel",
    university: "MUJ Student",
    rating: 5,
    text: "The location is perfect, close to campus. Clean rooms and excellent WiFi.",
    pgName: "Green Valley PG"
  },
  {
    photo: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face",
    name: "Amit Kumar",
    university: "MUJ Student",
    rating: 4,
    text: "Good value for money. The food included option is a big plus.",
    pgName: "Comfort Zone PG"
  },
  {
    photo: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face",
    name: "Sneha Gupta",
    university: "MUJ Student",
    rating: 5,
    text: "Elite Living exceeded my expectations. Luxury at affordable prices!",
    pgName: "Elite Living PG"
  },
  {
    photo: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop&crop=face",
    name: "Vikram Singh",
    university: "MUJ Student",
    rating: 4,
    text: "Budget Stay is perfect for students on a tight budget. Basic but comfortable.",
    pgName: "Budget Stay PG"
  }
];

const Home = () => {
  const sortedPGs = [...pgs].sort((a, b) => b.rating - a.rating);
  const top3PGs = sortedPGs.slice(0, 3);

  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const duplicatedReviews = [...reviews, ...reviews];
  const slideWidth = 320 + 24; // w-80 + space-x-6

  useEffect(() => {
    if (isPaused) return;
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
                key={pg.id}
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
                    {pg.amenities.map(amenity => (
                      <span key={amenity} className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-xs">
                        {amenity}
                      </span>
                    ))}
                  </div>
                  <p className="text-sm text-gray-500 mb-2">Gender: {pg.gender}</p>
                  <p className="text-sm text-gray-500 mb-4">Occupancy: {pg.occupancy}</p>
                  <Link to={`/pg/${pg.id}`}>
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
          <motion.div
            animate={{ x: -currentIndex * slideWidth }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
            onHoverStart={() => setIsPaused(true)}
            onHoverEnd={() => setIsPaused(false)}
            className="overflow-hidden cursor-pointer"
          >
            <div className="flex space-x-6">
              {duplicatedReviews.map((review, index) => (
                <div key={index} className="w-80 flex-shrink-0 p-6 bg-white rounded-lg shadow-md hover:shadow-xl hover:-translate-y-1 transition duration-300">
                  <img className="w-16 h-16 rounded-full mx-auto mb-4" src={review.photo} alt={review.name} />
                  <h3 className="text-lg font-semibold text-center mb-1">{review.name}</h3>
                  <p className="text-gray-600 text-center mb-2">{review.university}</p>
                  <div className="flex justify-center mb-4">
                    <span className="text-yellow-500">{'★'.repeat(review.rating)}</span>
                  </div>
                  <p className="text-gray-700 mb-4">{review.text}</p>
                  <p className="text-sm text-gray-500 text-center">Stayed at {review.pgName}</p>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </motion.section>
    </div>
  );
};

export default Home;
