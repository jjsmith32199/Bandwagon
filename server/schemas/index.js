const { gql } = require('apollo-server-express');
const artistTypeDefs = require('./typedefs/artist/artistTypeDefs');
const userTypeDefs = require('./typedefs/user/userTypeDefs');
const rootTypeDefs = require('./typedefs/rootTypeDefs');
const artistResolvers = require('./resolvers/artist/artistResolvers');
const userResolvers = require('./resolvers/user/userResolvers');

const typeDefs = gql`
  ${rootTypeDefs}
  ${artistTypeDefs}
  ${userTypeDefs}
`;

const resolvers = {
  Query: {
    ...artistResolvers.Query,
    ...userResolvers.Query,
  },
  Mutation: {
    ...userResolvers.Mutation,
  },
};

module.exports = { typeDefs, resolvers };
