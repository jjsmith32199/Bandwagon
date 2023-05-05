// models/ArtistGenre.js
const mongoose = require('mongoose');

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

const ArtistGenre = mongoose.model('ArtistGenre', artistGenreSchema);

module.exports = ArtistGenre;