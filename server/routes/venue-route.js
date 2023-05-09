const express = require('express');
const router = express.Router();

const Venue = require('../models/venue');

// GET all venues
router.get('/', async (req, res) => {
  try {
    const venues = await Venue.findAll();
    res.json(venues);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// GET a specific venue by ID
router.get('/:id', async (req, res) => {
  try {
    const venue = await Venue.findByPk(req.params.id);
    if (venue) {
      res.json(venue);
    } else {
      res.status(404).json({ message: 'Venue not found' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// CREATE a new venue
router.post('/', async (req, res) => {
  try {
    const venue = await Venue.create(req.body);
    res.json(venue);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// UPDATE an existing venue
router.put('/:id', async (req, res) => {
  try {
    const venue = await Venue.findByPk(req.params.id);
    if (venue) {
      await venue.update(req.body);
      res.json(venue);
    } else {
      res.status(404).json({ message: 'Venue not found' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// DELETE an existing venue
router.delete('/:id', async (req, res) => {
  try {
    const venue = await Venue.findByPk(req.params.id);
    if (venue) {
      await venue.destroy();
      res.json({ message: 'Venue deleted' });
    } else {
      res.status(404).json({ message: 'Venue not found' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
