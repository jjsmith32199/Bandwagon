const express = require('express');
const artistRouter = require('./artist-route');
const genreRouter = require('./genre-route');
const venueRouter = require('./venue-route');

const router = express.Router();

router.use('/artists', artistRouter);
router.use('/genres', genreRouter);
router.use('/venues', venueRouter);

module.exports = router;
