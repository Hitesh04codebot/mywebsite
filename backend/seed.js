const mongoose = require('mongoose');
const PG = require('./models/PG');
const Review = require('./models/Review');

require('dotenv').config();

mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/mujstays', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const seedPGs = [
  {
    title: 'Cozy PG Near Campus',
    location: 'Jaipur',
    price: 8000,
    rating: 4.5,
    image: 'https://via.placeholder.com/300x200?text=PG+1',
  },
  {
    title: 'Modern Student Hostel',
    location: 'Jaipur',
    price: 7000,
    rating: 4.2,
    image: 'https://via.placeholder.com/300x200?text=PG+2',
  },
  {
    title: 'Affordable PG for Students',
    location: 'Jaipur',
    price: 6500,
    rating: 4.0,
    image: 'https://via.placeholder.com/300x200?text=PG+3',
  },
  {
    title: 'Luxury PG with Amenities',
    location: 'Jaipur',
    price: 10000,
    rating: 4.8,
    image: 'https://via.placeholder.com/300x200?text=PG+4',
  },
];

const seedReviews = [
  {
    name: 'John Doe',
    image: 'https://via.placeholder.com/50x50?text=JD',
    rating: 5,
    comment: 'Great experience, highly recommended!',
  },
  {
    name: 'Jane Smith',
    image: 'https://via.placeholder.com/50x50?text=JS',
    rating: 4,
    comment: 'Good facilities and friendly staff.',
  },
  {
    name: 'Alice Johnson',
    image: 'https://via.placeholder.com/50x50?text=AJ',
    rating: 5,
    comment: 'Perfect location and clean rooms.',
  },
  {
    name: 'Bob Brown',
    image: 'https://via.placeholder.com/50x50?text=BB',
    rating: 4,
    comment: 'Value for money, will stay again.',
  },
];

const seedDatabase = async () => {
  try {
    await PG.deleteMany();
    await Review.deleteMany();
    
    await PG.insertMany(seedPGs);
    await Review.insertMany(seedReviews);
    
    console.log('Database seeded successfully');
  } catch (err) {
    console.error(err);
  } finally {
    mongoose.connection.close();
  }
};

seedDatabase();
