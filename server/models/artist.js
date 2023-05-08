const mongoose = require('mongoose');

const artistSchema = new mongoose.Schema({
  artist_name: {
    type: String,
    required: true,
  },
});

const artistGenreSchema = new mongoose.Schema({
  artist: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Artist',
    required: true,
  },
  genre: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Genre',
    required: true,
  },
});

const artistVenueSchema = new mongoose.Schema({
  artist_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Artist'
  },
  venue_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Venue'
  }
});

const Artist = mongoose.model('Artist', artistSchema);
const ArtistGenre = mongoose.model('ArtistGenre', artistGenreSchema);
const ArtistVenue = mongoose.model('ArtistVenue', artistVenueSchema);

module.exports = {
  Artist,
  ArtistGenre,
  ArtistVenue,
};

