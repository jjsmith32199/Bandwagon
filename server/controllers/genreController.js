const { Genre } = require('../models');

const genreController = {
  // Get all genres
  async getAllGenres(req, res) {
    try {
      const genres = await Genre.findAll();
      res.status(200).json(genres);
    } catch (err) {
      res.status(500).json(err);
    }
  },

  // Get a specific genre by ID
  async getGenreById(req, res) {
    try {
      const genre = await Genre.findByPk(req.params.id);
      if (!genre) {
        res.status(404).json({ message: 'No genre found with this ID' });
        return;
      }
      res.status(200).json(genre);
    } catch (err) {
      res.status(500).json(err);
    }
  },

  // Create a new genre
  async createGenre(req, res) {
    try {
      const newGenre = await Genre.create(req.body);
      res.status(201).json(newGenre);
    } catch (err) {
      res.status(500).json(err);
    }
  },

  // Update an existing genre by ID
  async updateGenreById(req, res) {
    try {
      const [rowsUpdated] = await Genre.update(req.body, {
        where: {
          id: req.params.id
        }
      });
      if (rowsUpdated === 0) {
        res.status(404).json({ message: 'No genre found with this ID' });
        return;
      }
      res.status(200).json({ message: 'Genre updated successfully' });
    } catch (err) {
      res.status(500).json(err);
    }
  },

  // Delete a genre by ID
  async deleteGenreById(req, res) {
    try {
      const rowsDeleted = await Genre.destroy({
        where: {
          id: req.params.id
        }
      });
      if (rowsDeleted === 0) {
        res.status(404).json({ message: 'No genre found with this ID' });
        return;
      }
      res.status(200).json({ message: 'Genre deleted successfully' });
    } catch (err) {
      res.status(500).json(err);
    }
  }
};

module.exports = genreController;
