const mongoose = require('mongoose');

const pgSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  location: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  rating: {
    type: Number,
    required: true,
    min: 1,
    max: 5,
  },
  image: {
    type: String,
    required: true,
  },
  gender: {
    type: String,
    enum: ['Boys', 'Girls', 'Co-Living'],
    required: true,
  },
  occupancy: {
    type: String,
    enum: ['Single', 'Double', 'Triple'],
    required: true,
  },
  amenities: {
    type: [String],
    default: [],
  },
});

module.exports = mongoose.model('PG', pgSchema);
