import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import heroImage from '../images/guy-library.jpg';

const Hero = () => {
  const heroVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8 } },
  };

  const imageVariants = {
    hidden: { opacity: 0, x: 100 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.8, delay: 0.2 } },
  };

  return (
    <section
      className="min-h-screen flex items-center"
      style={{
        backgroundImage: `url(${heroImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="flex items-center">
          {/* Left Side */}
          <motion.div
            initial="hidden"
            animate="visible"
            variants={heroVariants}
          >
            <h1 className="text-4xl text-primary md:text-6xl font-bold mb-4">
              Find Your Perfect PG <br /> with MUJStays
            </h1>
            <p className="text-lg text-primary md:text-xl mb-8">
              Exclusive student PGs near Manipal University Jaipur
            </p>
            <Link to="/morepgs">
              <motion.button
                className="bg-white text-primary px-8 py-3 rounded-full font-semibold hover:bg-gray-100 hover:scale-105 transition duration-300"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Explore Now
              </motion.button>
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
