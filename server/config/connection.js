const mongoose = require("mongoose");

mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/seat_geek_data", {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

module.exports = mongoose.connection;
