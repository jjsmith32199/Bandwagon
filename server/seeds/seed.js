const { User } = require('../models');
const db = require('../config/connection');
const userData = require('./userData.json');


db.once('open', async () => {
  await User.deleteMany({});
  await User.create(userData);

  console.log('all done!');
  process.exit(0);
});