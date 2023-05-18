require("dotenv").config();
const express = require("express");
const path = require("path");
const db = require("./config/connection");
const routes = require("./routes");
const cors = require("cors");
const { ApolloServer } = require("apollo-server-express");
const { typeDefs, resolvers } = require("./schemas");
const { JWT_SECRET } = require("./config");
const jwt = require("jsonwebtoken");
const { User } = require("./models");
const { signToken } = require("./utils/auth");
const bodyParser = require("body-parser");

const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());
app.use(bodyParser.json());
app.use((req, res, next) => {
  console.log("Request URL: ", req.originalUrl);
  console.log("Request headers: ", req.headers);
  next();
});

// if we're in production, serve client/build as static assets
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
    console.log("Token: ", token);

    try {
      let user = null;
      if (token && token.startsWith("Bearer")) {
        const actualToken = token.slice(7);
        console.log("Token to be verified: ", actualToken);
        const data = jwt.verify(actualToken, JWT_SECRET);
        console.log("Data: ", data);
        user = await User.findById(data._id);
        console.log("User: ", user);
      }
      return { user, signToken };
    } catch (error) {
      console.log("constext error: ", error);
      return {};
    }
  },
});

app.use(
  cors({
    origin: "http://localhost:3000",
  })
);

server.applyMiddleware({ app });

app.use(routes);

db.once("open", () => {
  app.listen(PORT, () => {
    console.log(`🌍 Now listening on localhost:${PORT}`);
    console.log(`Use GraphQL at http://localhost:${PORT}${server.graphqlPath}`);
  });
});
