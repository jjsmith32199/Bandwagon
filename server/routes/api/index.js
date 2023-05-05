const router = require('express').Router();
const artistRoute = require('./artist-route');
const genreRoute = require('./genre-route');
const venueRoute = require('./venue-route');


router.use('/artist', artistRoute);
router.use('/genre', genreRoute);
router.use('/venue', venueRoute);
