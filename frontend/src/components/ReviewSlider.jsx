import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const ReviewSlider = ({ reviews }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % reviews.length);
    }, 3000); // Change review every 3 seconds

    return () => clearInterval(interval);
  }, [reviews.length]);

  return (
    <div className="flex justify-center items-center overflow-hidden">
      <div className="relative w-full max-w-4xl">
        <motion.div
          className="flex"
          animate={{ x: `-${currentIndex * 100}%` }}
          transition={{ duration: 0.5, ease: 'easeInOut' }}
        >
          {reviews.map((review, index) => (
            <div key={index} className="w-full flex-shrink-0 px-4">
              <div className="bg-white rounded-lg shadow-md p-6 text-center">
                <img
                  src={review.image}
                  alt={review.name}
                  className="w-16 h-16 rounded-full mx-auto mb-4"
                />
                <h3 className="text-lg font-semibold text-text-dark">{review.name}</h3>
                <div className="text-yellow-500 mb-2">
                  {'⭐'.repeat(Math.floor(review.rating))}
                </div>
                <p className="text-gray-600">{review.comment}</p>
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </div>
  );
};

export default ReviewSlider;
