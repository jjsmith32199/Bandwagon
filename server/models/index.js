const Artist = require('./artist');
const Genre = require('./Genre');
const Venue = require('./venue');


const ArtistVenue = require('./artistVenue');
const ArtistGenre = require('./artistGenre');



Artist.belongsToMany(Genre, { through: ArtistGenre });
Genre.belongsToMany(Artist, { through: ArtistGenre });
Venue.belongsToMany(Artist, { through: ArtistVenue });