const express = require('express');
const router = express.Router();

const Artist = require('../models/artist');
const Genre = require('../models/genre');

// GET all artists
router.get('/', async (req, res) => {
  try {
    const artists = await Artist.findAll({
      include: [Genre],
    });
    res.json(artists);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// GET a specific artist by ID
router.get('/:id', async (req, res) => {
  try {
    const artist = await Artist.findByPk(req.params.id, {
      include: [Genre],
    });
    if (artist) {
      res.json(artist);
    } else {
      res.status(404).json({ message: 'Artist not found' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// CREATE a new artist
router.post('/', async (req, res) => {
  try {
    const artist = await Artist.create(req.body);
    res.json(artist);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// UPDATE an existing artist
router.put('/:id', async (req, res) => {
  try {
    const artist = await Artist.findByPk(req.params.id);
    if (artist) {
      await artist.update(req.body);
      res.json(artist);
    } else {
      res.status(404).json({ message: 'Artist not found' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// DELETE an existing artist
router.delete('/:id', async (req, res) => {
  try {
    const artist = await Artist.findByPk(req.params.id);
    if (artist) {
      await artist.destroy();
      res.json({ message: 'Artist deleted' });
    } else {
      res.status(404).json({ message: 'Artist not found' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
