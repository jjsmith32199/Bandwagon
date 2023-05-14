const { AuthenticationError } = require("apollo-server-express");
const { User } = require("../../../models");
const { signToken } = require("../../../utils/auth");

const resolvers = {
  Query: {
    me: async (parent, args, context) => {
      if (context.user) {
        const user = await User.findById(context.user.id);
        return user;
      }
      throw new AuthenticationError("You are not logged in");
    },
  },
  Mutation: {
    signup: async (parent, { firstName, lastName, email, password }) => {
      try {
        const existingUser = await User.findOne({ email });
        if (existingUser) {
          throw new Error("User already exists");
        }
        const user = await User.create({
          firstName,
          lastName,
          username: `${firstName} ${lastName}`,
          email,
          password,
        });
        const token = signToken(user);
        return { token, user };
      } catch (error) {
        console.error("Signup error: ", error);
        throw new Error(`Signup failed: ${error.message}`);
      }
    },
    login: async (parent, { email, password }) => {
      try {
        console.log("Received login request:", email, password);
        const user = await User.findOne({ email });
        console.log("Login user: ", user);
        if (!user) {
          throw new AuthenticationError("Invalid credentials");
        }
        const correctPw = await user.isCorrectPassword(password);
        if (!correctPw) {
          throw new AuthenticationError("Invalid credentials");
        }
        const token = signToken(user);
        console.log("Token: ", token); // Add this console log
        return { token, user };
      } catch (error) {
        console.error("Login error: ", error);
        throw error;
      }
    },
  },
};

module.exports = resolvers;
