const axios = require('axios');
const { Artist, Genre, Venue } = require('../models');

const apiKey = process.env.SEATGEEK_API_KEY;

exports.createArtist = async (req, res) => {
  try {
    // Create artist using data extracted from SeatGeek API
    const { artist_name } = req.body;
    const url = `https://api.seatgeek.com/2/events?client_id=${apiKey}&q=${artist_name}`;
    const response = await axios.get(url);
    const eventsData = response.data;

    const eventData = eventsData.events[0];
    const artistData = eventData.performers.find(p => p.type === 'band' || p.type === 'solo');
    const genreData = artistData.genres[0];
    const venueData = eventData.venue;

    // Save artist data to the database
    const artist = await Artist.create({ artist_name: artistData.name });
    const genre = await Genre.findOrCreate({ where: { name: genreData.name }});
    await artist.addArtist_genre(genre[0]);

    const venue = await Venue.findOrCreate({
      where: {
        venue_name: venueData.name,
        city: venueData.city,
        state: venueData.state,
        country: venueData.country,
        address: venueData.address
      }
    });
    await artist.addArtist_venue(venue[0]);

    res.status(201).json(artist);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
};
