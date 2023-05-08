const express = require('express');
const seatgeekRoutes = require('./routes/seatgeekRoutes');

const app = express();

// Mount the seatgeekRoutes router to the /api/seatgeek URL prefix
app.use('/api/seatgeek', seatgeekRoutes);

// ... other middleware and routes

app.listen(27017, () => {
  console.log('Server listening on port 3000');
});

module.exports = router;