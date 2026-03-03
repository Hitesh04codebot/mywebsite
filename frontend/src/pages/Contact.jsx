import { motion } from 'framer-motion';
import buildingImage from '../images/building.jpg';

const Contact = () => {
  const sectionVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8 } },
  };

  const formVariants = {
    hidden: { opacity: 0, x: 100 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.8, delay: 0.2 } },
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
        <div className="flex flex-col md:flex-row gap-8 items-stretch">
          {/* Left Side - Image */}
          <div className="w-full md:w-1/2">
            <div className="relative rounded-lg shadow-lg overflow-hidden h-full">
              <img
                src={buildingImage}
                alt="Modern PG Accommodation"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-blue-500 bg-opacity-10"></div>
            </div>
          </div>

          {/* Right Side - Contact Form */}
          <motion.div
            className="w-full md:w-1/2"
            variants={formVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <div className="bg-white rounded-xl shadow-lg p-8 md:p-12">
              <h2 className="text-3xl font-bold text-blue-600 mb-4">Contact Us</h2>
              <p className="text-gray-600 mb-8">Get in touch with us for any inquiries about MUJStays.</p>
              <form className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Name</label>
                  <input
                    type="text"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-300"
                    placeholder="Your Name"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                  <input
                    type="email"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-300"
                    placeholder="your.email@example.com"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Message</label>
                  <textarea
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-300"
                    rows="5"
                    placeholder="Your message here..."
                  ></textarea>
                </div>
                <button
                  type="submit"
                  className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white py-3 px-4 rounded-lg font-semibold transition duration-300 transform hover:scale-105"
                >
                  Send Message
                </button>
              </form>
            </div>
          </motion.div>
        </div>
      </motion.section>
    </div>
  );
};

export default Contact;
