const router = require('express').Router();
const fetch = require('node-fetch');
const apiKey = process.env.SEATGEEK_API_KEY;
const { Artist, Genre, Venue } = require('../../models');




router.get('/', async (req, res) => {
    try {
      const query = req.query.query;
      const url = `https://api.seatgeek.com/2/events?client_id=${apiKey}&q=${query}`;
      const response = await fetch(url);
      const eventsData = await response.json();
  
      const artistsData = eventsData.events.map(event => {
        const artist = event.performers.find(p => p.type === 'band' || p.type === 'solo');
        const genre = artist.genres[0].name;
        const venue = event.venue.name;
        return { 
          name: artist.name,
          genre: genre,
          venue: venue
        };
      });
  
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
  
  
