const { connect, connection } = require('mongoose');

const connectionStr = process.env.MONGODB_URI || 'mongodb://localhost:27017/seat_geek';

connect(connectionStr, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

module.exports = connection;
