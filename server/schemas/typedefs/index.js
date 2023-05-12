const { gql } = require('apollo-server-express');
const userTypeDefs = require('./user/userTypeDefs');
const artistTypeDefs = require('./artist/artistTypeDefs');

const Query = gql`
type Query {  
  me: User
  artists: [Artist!]!
  venues: [Venue!]!
}
`;

module.exports = [Query, userTypeDefs, artistTypeDefs];