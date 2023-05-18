// userTypeDefs.js
const { gql } = require("apollo-server-express");

const typeDefs = gql`
  type User {
    id: ID!
    firstName: String!
    lastName: String!
    email: String!
    savedItineraries: [Itinerary!]!
  }

  type Itinerary {
    intineraryId: String!
    locations: [String!]!
  }

  type AuthPayload {
    token: String!
    user: User!
  }

  type Mutaiton {
    login(email: String!, password: String!): AuthPayload!
    createUser(
      firstName: String!
      lastName: String!
      email: String!
      password: String!
    ): AuthPayload!
  }
`;

module.exports = typeDefs;
