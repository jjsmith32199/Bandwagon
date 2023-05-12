const express = require('express');
require('dotenv').config()
const router = express.Router();
const axios = require('axios');
const clientID = process.env.SEATGEEK_CLIENT_ID;
const { Artist, Genre, Venue } = require('../../models');

router.get('/', async (req, res) => {
  try {
    const query = req.query.query;
    const url = `https://api.seatgeek.com/2/events?client_id=${clientID}&q=${query}`;
    const response = await axios.get(url);
    const eventsData = response.data;

    const artistsData = eventsData.events.map(event => {
      const artist = event.performers.find(p => p.type === 'band' || p.type === 'solo');
      if (!artist || !artist.genres || artist.genres.length === 0) return null;

      const genre = artist.genres[0].name;
      const venue = event.venue.name;

      return { 
        name: artist.name,
        genre: genre,
        venue: venue
      };
    }).filter(artist => artist !== null);

    res.status(200).json(artistsData);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/:id', async (req, res) => {
  try {
    const artistData = await Artist.findByPk(req.params.id, {
      include: [{ model: Genre, as: 'artist_genre' }, { model: Venue, as: 'artist_venue' }]
    });

    if (!artistData) {
      res.status(404).json({ message: 'No artist found with this id!' });
      return;
    }

    res.status(200).json(artistData);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.post('/', async (req, res) => {
  try {
    const newArtist = await Artist.create(req.body);
    res.status(201).json(newArtist);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
