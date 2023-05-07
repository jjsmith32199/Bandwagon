const mongoose = require('mongoose');

const artistSchema = new mongoose.Schema({
  name: String,
 
  genres: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Genre' }],
  venues: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Venue' }]
});

const Artist = mongoose.model('Artist', artistSchema);

module.exports = Artist;