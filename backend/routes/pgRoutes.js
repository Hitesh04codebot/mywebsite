const express = require('express');
const router = express.Router();
const PG = require('../models/PG');

// GET /api/pgs
router.get('/', async (req, res) => {
  try {
    const pgs = await PG.find();
    res.json(pgs);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
