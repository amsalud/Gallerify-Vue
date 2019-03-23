const { ApolloServer, AuthenticationError } = require('apollo-server');
const mongoose = require('mongoose');
const fs = require('fs');
const path = require('path');
const jwt = require('jsonwebtoken');

// Import typeDefs and Resolvers
const filePath = path.join(__dirname, 'typeDefs.gql');
const typeDefs = fs.readFileSync(filePath, 'utf-8');
const resolvers = require('./resolvers');

// Import Environment Variables and Mongoose Models
require('dotenv').config({ path: 'variables.env' });
const User = require('./models/User');
const Post = require('./models/Post');

// Connect to MongoDB MLab Database
mongoose
  .connect(process.env.MONGO_URI, { useNewUrlParser: true })
  .then(() => console.log('Successfully Connected to MongoDB'))
  .catch(err => console.error(err));

// Verify JWT Token
const getUser = async token => {
  if (token) {
    try {
      return await jwt.verify(token, process.env.SECRET);
    } catch (err) {
      throw new AuthenticationError(
        'Your session has expired. Please Login In'
      );
    }
  }
};

// Create Apollo GraphQl Server using TypeDefs, resolvers, and context object
const server = new ApolloServer({
  typeDefs,
  resolvers,
  formatError: ({ name, message }) => ({
    name,
    message: message.replace('Context creation failed:', '')
  }),
  context: async ({ req }) => {
    const token = req.headers['authorization'];
    return {
      User,
      Post,
      currentUser: await getUser(token)
    };
  }
});

server.listen({ port: process.env.PORT || 4000 }).then(({ url }) => {
  console.log(`Server listening on ${url}`);
});
