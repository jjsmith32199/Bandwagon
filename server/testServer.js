const { ApolloServer, gql } = require('apollo-server-express');
const express = require('express');
const db = require('./config/connection'); // import your connection
const cors = require("cors");
const bodyParser = require("body-parser");
const routes = require("./routes");
const { JWT_SECRET } = require("./config");
const jwt = require("jsonwebtoken");
const { User } = require("./models");
const { signToken } = require("./utils/auth");
require("dotenv").config();
const path = require("path");


// Import your typeDefs and resolvers
const { typeDefs, resolvers } = require('./schemas');



const app = express();
const PORT = 3001;


app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());
app.use(bodyParser.json())


if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "..", "client", "build")));

  app.get("*", (req, res) => {
    res.sendFile(
      path.resolve(__dirname, "..", "client", "build", "index.html")
    );
  });
}


const server = new ApolloServer({
  typeDefs,
  resolvers,
  playground: true,
  introspection: true,
  context: async ({ req }) => {
    const token = req.headers.authorization || "";

    try {
      let user = null;
      if (token && token.startsWith("Bearer")) {
        const actualToken = token.slice(7);
        console.log("Token to be verified: ", token);
        const data = jwt.verify(actualToken, JWT_SECRET);
        user = await User.findByID(data._id);
      }
      return { user, signToken };
    } catch (error) {
      console.log("Invalid token!");
      return {};
    }
  },
});

server.applyMiddleware({ app });

app.use(routes);

db.once('open', () => { // ensure the DB connection before starting the server
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}!`);
    console.log(`Use GraphQL at http://localhost:${PORT}${server.graphqlPath}`);
  });
});
