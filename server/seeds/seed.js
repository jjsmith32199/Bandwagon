const User = require('../models/User');
const mongoose = require('mongoose');
const userData = require('./userData.json');

const seedDatabase = async () => {
  try {
 
    await User.deleteMany();
    await User.insertMany(userData);

    console.log('Database seeded successfully!');
  } catch (error) {
    console.error('Error seeding database:', error);
  } finally {
    // Close the database connection (if needed)
        mongoose.connection.close();
  }
};

seedDatabase();
