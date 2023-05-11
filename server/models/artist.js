require('dotenv').config();
require('dotenv').config();
const mongoose = require('mongoose');
const axios = require('axios');
const clientID = process.env.SEATGEEK_CLIENT_ID;

const artistSchema = new mongoose.Schema({
  artist_name: {
    type: String,
    required: true,
  },
  genre: {
    type: String,
    required: true,
  },
  venue: {
    type: String,
    required: true,
  },
  venue_address: {
    type: String,
    required: true,
  },
  performance_time: {
    type: Date,
    required: true,
  },
  artist_picture: {
    type: String,
    required: true,
  },
});

const Artist = mongoose.model('Artist', artistSchema);

async function populateDatabase() {
  try {
    const url = `https://api.seatgeek.com/2/events?client_id=${clientID}`;
    const response = await axios.get(url);
    const events = response.data.events;
    
    // Iterate over each event and create an Artist document for each performer
    for (const event of events) {
      const performers = event.performers.filter(p => p.type === 'band' || p.type === 'solo');
      for (const performer of performers) {
        const artistData = {
          artist_name: performer.name,
          genre: performer.genres[0].name,
          venue: event.venue.name,
          venue_address: `${event.venue.address}, ${event.venue.extended_address}`,
          performance_time: new Date(event.datetime_local),
          artist_picture: performer.image,
        };
        const artist = new Artist(artistData);
        await artist.save();
      }
    }
    console.log('Database successfully populated!');
  } catch (error) {
    console.error(error);
  }
}

populateDatabase();
