const router = require('express').Router();
const artistRoutes = require('./artist-route.js');
const venueRoutes = require('./venue-route.js');
const genreRoutes = require('./genre-route.js');

router.use('/api/artists', artistRoutes);
router.use('/api/venues', venueRoutes);
router.use('/api/genres', genreRoutes);



module.exports = router;