const express = require('express');
const router = express.Router();
const { Genre } = require('../../models');

// The `/api/genres` endpoint
router.get('/', async (req, res) => {
    try{
        const genreData = await Genre.findAll();
        res.status(200).json(genreData);
    } catch (err) {
        res.status(500).json(err);
    }
});

router.get('/:id', async (req, res) => {
    try {
        const genreData = await Genre.findByPk(req.params.id);
        if (!genreData) {
            res.status(404).json({ message: 'No genre found with this id!' });
            return;
        }
        res.status(200).json(genreData);
    } catch (err) {
        res.status(500).json(err);
    }
});

router.post('/', async (req, res) => {
  try {
    const newGenre = await Genre.create(req.body);
    res.status(201).json(newGenre);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.put('/:id', async (req, res) => {
  try {
    const updatedGenre = await Genre.update(req.body, {
      where: {
        id: req.params.id
      }
    });
    if (!updatedGenre[0]) {
      res.status(404).json({ message: 'No genre found with this id!' });
      return;
    }
    res.status(200).json(updatedGenre);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const deletedGenre = await Genre.destroy({
      where: {
        id: req.params.id
      }
    });
    if (!deletedGenre) {
      res.status(404).json({ message: 'No genre found with this id!' });
      return;
    }
    res.status(200).json(deletedGenre);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
