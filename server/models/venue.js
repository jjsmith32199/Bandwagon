const mongoose = require('mongoose');

const venueSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  city: {
    type: String,
    required: true
  },
  state: {
    type: String,
    required: true
  },
  capacity: {
    type: Number,
    required: true
  }
});

const Venue = mongoose.model('Venue', venueSchema);

module.exports = Venue;