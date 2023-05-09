const express = require('express');
const router = express.Router();

const Genre = require('../models/genre');
const Artist = require('../models/artist');

// GET all genres
router.get('/', async (req, res) => {
  try {
    const genres = await Genre.findAll({
      include: [Artist],
    });
    res.json(genres);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// GET a specific genre by ID
router.get('/:id', async (req, res) => {
  try {
    const genre = await Genre.findByPk(req.params.id, {
      include: [Artist],
    });
    if (genre) {
      res.json(genre);
    } else {
      res.status(404).json({ message: 'Genre not found' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// CREATE a new genre
router.post('/', async (req, res) => {
  try {
    const genre = await Genre.create(req.body);
    res.json(genre);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// UPDATE an existing genre
router.put('/:id', async (req, res) => {
  try {
    const genre = await Genre.findByPk(req.params.id);
    if (genre) {
      await genre.update(req.body);
      res.json(genre);
    } else {
      res.status(404).json({ message: 'Genre not found' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// DELETE an existing genre
router.delete('/:id', async (req, res) => {
  try {
    const genre = await Genre.findByPk(req.params.id);
    if (genre) {
      await genre.destroy();
      res.json({ message: 'Genre deleted' });
    } else {
      res.status(404).json({ message: 'Genre not found' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
