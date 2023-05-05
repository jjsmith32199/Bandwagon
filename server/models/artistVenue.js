const mongoose = require('mongoose');

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

const ArtistVenue = mongoose.model('ArtistVenue', artistVenueSchema);

module.exports = ArtistVenue;
