const router = require('express').Router();
const artistRoutes = require('./artist-route.js');
const genreRoutes = require('./genre-route.js');
const venueRoutes = require('./venue-route.js');

router.use('/api/artists', artistRoutes);
router.use('/api/genres', genreRoutes);
router.use('/api/venues', venueRoutes);

// Other app configuration and middleware

module.exports = router;