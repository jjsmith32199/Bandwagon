const { DataTypes } = require('sequelize');
const sequelize = require('../database');

const Genre = require('./genre');

const Artist = sequelize.define('Artist', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    allowNull: false,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  image_url: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  url: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  facebook_url: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  twitter_url: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  popularity: {
    type: DataTypes.FLOAT,
    allowNull: true,
  },
  score: {
    type: DataTypes.FLOAT,
    allowNull: true,
  },
});

Artist.belongsToMany(Genre, { through: 'ArtistGenres' });
Genre.belongsToMany(Artist, { through: 'ArtistGenres' });

module.exports = Artist;
