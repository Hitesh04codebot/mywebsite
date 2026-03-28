const express = require('express');
const router = express.Router();
const PG = require('../models/PG');

// GET /api/pgs - Get all PGs
router.get('/', async (req, res) => {
  try {
    const pgs = await PG.find();
    res.json(pgs);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// GET /api/pgs/:id - Get a single PG by ID
router.get('/:id', async (req, res) => {
  try {
    const pg = await PG.findById(req.params.id);
    if (!pg) {
      return res.status(404).json({ message: 'PG not found' });
    }
    res.json(pg);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
