// artistTypeDefs.js
const { gql } = require('apollo-server-express');

const typeDefs = gql`
  type Artist {
    id: ID!
    name: String!
    genre: String!
    venue: Venue!
  }

  type Venue {
    id: ID!
    name: String!
    address: String!
    city: String!
    state: String!
    artists: [Artist!]!
  }
`;

module.exports = typeDefs;