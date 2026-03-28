import { motion } from 'framer-motion';

const PGCard = ({ pg }) => {
  return (
    <motion.div
      className="bg-white rounded-lg shadow-md overflow-hidden"
      whileHover={{ scale: 1.05, boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)' }}
      transition={{ duration: 0.3 }}
    >
      <img src={pg.image} alt={pg.name} className="w-full h-48 object-cover" />
      <div className="p-4">
        <h3 className="text-lg font-semibold text-text-dark">{pg.name}</h3>
        <p className="text-gray-600">{pg.location}</p>
        <div className="flex justify-between items-center mt-2">
          <span className="text-primary font-bold">₹{pg.price}/month</span>
          <span className="text-yellow-500">⭐ {pg.rating}</span>
        </div>
      </div>
    </motion.div>
  );
};

export default PGCard;
