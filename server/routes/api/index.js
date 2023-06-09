const router = require('express').Router();
const artistRoutes = require('./artist-route.js');
const venueRoutes = require('./venue-route.js');
const genreRoutes = require('./genre-route.js');
const UserRoutes = require('./user-routes.js');

router.use('/api/artists', artistRoutes);
router.use('/api/venues', venueRoutes);
router.use('/api/genres', genreRoutes);
router.use('/api/venues', venueRoutes);
router.use('/api/users', UserRoutes)


module.exports = router;