const { ApolloServer, gql } = require('apollo-server-express');
const express = require('express');
const db = require('./config/connection'); // import your connection

// Import your typeDefs and resolvers
const { typeDefs, resolvers } = require('./schemas');

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

const app = express();
server.applyMiddleware({ app });

const PORT = 3001;

db.once('open', () => { // ensure the DB connection before starting the server
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}!`);
    console.log(`Use GraphQL at http://localhost:${PORT}${server.graphqlPath}`);
  });
});
