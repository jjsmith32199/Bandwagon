const mongoose = require('mongoose');
const User = require('./models/User');  // adjust this path if your file structure is different
const fs = require('fs');

// replace with your MongoDB connection string
const mongoURI = 'mongodb://localhost:27017/seat_geek'; 

const importData = async () => {
  try {
    await mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true });

    // Read the JSON file
    const data = JSON.parse(fs.readFileSync('./seeds/userData.json', 'utf-8'));

    // Insert the data into MongoDB
    for (let item of data) {
      const user = new User(item);
      await user.save();
    }

    console.log('Data import successful');
    process.exit();
  } catch (error) {
    console.error('Error with data import', error);
    process.exit(1);
  }
};

importData();
