const express = require('express');
const router = express.Router();
const Booking = require('../models/Booking');
const jwt = require('jsonwebtoken');

// Middleware to verify JWT token
const auth = (req, res, next) => {
  const token = req.header('Authorization')?.replace('Bearer ', '');
  if (!token) return res.status(401).json({ message: 'No token provided' });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.userId = decoded.id;
    next();
  } catch (err) {
    res.status(401).json({ message: 'Invalid token' });
  }
};

// POST /api/bookings - Create a new booking
router.post('/', auth, async (req, res) => {
  try {
    const { pgId, checkInDate, duration, totalPrice } = req.body;

    const booking = new Booking({
      user: req.userId,
      pg: pgId,
      checkInDate,
      duration,
      totalPrice
    });

    await booking.save();
    res.status(201).json({ message: 'Booking confirmed successfully', booking });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});

// GET /api/bookings/user/:id - Get bookings for a user
router.get('/user/:id', auth, async (req, res) => {
  try {
    if (req.userId != req.params.id) {
      return res.status(403).json({ message: 'Not authorized to view these bookings' });
    }

    const bookings = await Booking.find({ user: req.params.id }).populate('pg');
    res.json(bookings);
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});

module.exports = router;
