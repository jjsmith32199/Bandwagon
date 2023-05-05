const mongoose = require('mongoose');


const artistSchema = new mongoose.Schema({
  artist_name: {
    type: String,
    required: true,
  },
});

const Artist = mongoose.model('Artist', artistSchema);

module.exports = Artist;