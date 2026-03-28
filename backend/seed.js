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
    name: 'Blue Heaven PG',
    location: 'Near MUJ Gate 2',
    price: 8000,
    rating: 4.6,
    image: 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=400&h=250&fit=crop',
    gender: 'Boys',
    occupancy: 'Double',
    amenities: ['WiFi', 'AC'],
  },
  {
    name: 'Green Valley PG',
    location: 'Near Campus',
    price: 7000,
    rating: 4.4,
    image: 'https://images.unsplash.com/photo-1555854877-bab0e564b8d5?w=400&h=250&fit=crop',
    gender: 'Girls',
    occupancy: 'Single',
    amenities: ['WiFi', 'Food Included'],
  },
  {
    name: 'Sunrise Hostel',
    location: 'Downtown Area',
    price: 6000,
    rating: 4.2,
    image: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=400&h=250&fit=crop',
    gender: 'Co-Living',
    occupancy: 'Triple',
    amenities: ['Parking', 'Laundry'],
  },
  {
    name: 'Comfort Zone PG',
    location: 'Near Shopping Mall',
    price: 9000,
    rating: 4.8,
    image: 'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=400&h=250&fit=crop',
    gender: 'Boys',
    occupancy: 'Single',
    amenities: ['WiFi', 'AC', 'Food Included'],
  },
  {
    name: 'Elite Living PG',
    location: 'Prime Location',
    price: 10000,
    rating: 5.0,
    image: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=400&h=250&fit=crop',
    gender: 'Girls',
    occupancy: 'Double',
    amenities: ['WiFi', 'AC', 'Parking'],
  },
  {
    name: 'Budget Stay PG',
    location: 'Suburban Area',
    price: 5500,
    rating: 4.0,
    image: 'https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=400&h=250&fit=crop',
    gender: 'Co-Living',
    occupancy: 'Triple',
    amenities: ['WiFi', 'Laundry'],
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
