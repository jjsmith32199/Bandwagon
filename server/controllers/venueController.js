const { Venue } = require('../models');

const venueController = {
  // Get all venues
  async getAllVenues(req, res) {
    try {
      const venues = await Venue.findAll();
      res.status(200).json(venues);
    } catch (err) {
      res.status(500).json(err);
    }
  },

  // Get a specific venue by ID
  async getVenueById(req, res) {
    try {
      const venue = await Venue.findByPk(req.params.id);
      if (!venue) {
        res.status(404).json({ message: 'No venue found with this ID' });
        return;
      }
      res.status(200).json(venue);
    } catch (err) {
      res.status(500).json(err);
    }
  },

  // Create a new venue
  async createVenue(req, res) {
    try {
      const newVenue = await Venue.create(req.body);
      res.status(201).json(newVenue);
    } catch (err) {
      res.status(500).json(err);
    }
  },

  // Update an existing venue by ID
  async updateVenueById(req, res) {
    try {
      const [rowsUpdated] = await Venue.update(req.body, {
        where: {
          id: req.params.id
        }
      });
      if (rowsUpdated === 0) {
        res.status(404).json({ message: 'No venue found with this ID' });
        return;
      }
      res.status(200).json({ message: 'Venue updated successfully' });
    } catch (err) {
      res.status(500).json(err);
    }
  },

  // Delete a venue by ID
  async deleteVenueById(req, res) {
    try {
      const rowsDeleted = await Venue.destroy({
        where: {
          id: req.params.id
        }
      });
      if (rowsDeleted === 0) {
        res.status(404).json({ message: 'No venue found with this ID' });
        return;
      }
      res.status(200).json({ message: 'Venue deleted successfully' });
    } catch (err) {
      res.status(500).json(err);
    }
  }
};

module.exports = venueController;
