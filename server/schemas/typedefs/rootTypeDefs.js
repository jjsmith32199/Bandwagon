// rootTypeDefs.js
const { gql } = require('apollo-server-express');

const typeDefs = gql`
  type Query {
    _empty: String
    artists: [Artist!]!
    venues: [Venue!]!
    me: User
  }

  type Mutation {
    signup(firstName: String!, lastName: String!, email: String!, password: String!): AuthPayload!
    login(email: String!, password: String!): AuthPayload!
  }
`;

module.exports = typeDefs;