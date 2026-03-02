import { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import PGCard from '../components/PGCard';
import ReviewSlider from '../components/ReviewSlider';
import Footer from '../components/Footer';
import { motion } from 'framer-motion';

const Home = () => {
  const [pgs, setPgs] = useState([]);
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    // Fetch PGs
    fetch('http://localhost:5000/api/pgs')
      .then(res => res.json())
      .then(data => setPgs(data))
      .catch(err => console.log(err));

    // Fetch Reviews
    fetch('http://localhost:5000/api/reviews')
      .then(res => res.json())
      .then(data => setReviews(data))
      .catch(err => console.log(err));
  }, []);

  const sectionVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8 } },
  };

  return (
    <div>
      <Navbar />
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
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {pgs.map(pg => (
              <PGCard key={pg._id} pg={pg} />
            ))}
          </div>
        </div>
      </motion.section>

      {/* Reviews Section */}
      <motion.section
        className="py-16 bg-white"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={sectionVariants}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center text-text-dark mb-12">Student Reviews</h2>
          <ReviewSlider reviews={reviews} />
        </div>
      </motion.section>

      <Footer />
    </div>
  );
};

export default Home;
