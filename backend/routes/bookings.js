const express = require('express');
const router = express.Router();
const Booking = require('../models/Booking');
const authMiddleware = require('../middleware/authMiddleware');

// POST /api/bookings - Create a new booking
router.post('/', authMiddleware, async (req, res) => {
  try {
    const { pgId, checkInDate, duration, totalPrice } = req.body;

    const booking = new Booking({
      user: req.user._id,
      pg: pgId,
      checkInDate,
      duration,
      totalPrice,
    });

    await booking.save();
    res.status(201).json({ message: 'Booking confirmed successfully', booking });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});

// GET /api/bookings - Get all bookings for the authenticated user
router.get('/', authMiddleware, async (req, res) => {
  try {
    const bookings = await Booking.find({ user: req.user._id }).populate('pg');
    res.json(bookings);
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});

// DELETE /api/bookings/:id - Delete a booking (only owner can delete)
router.delete('/:id', authMiddleware, async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id);
    if (!booking) {
      return res.status(404).json({ message: 'Booking not found' });
    }
    if (booking.user.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'Not authorized to delete this booking' });
    }
    await booking.deleteOne();
    res.json({ message: 'Booking cancelled successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});

module.exports = router;
