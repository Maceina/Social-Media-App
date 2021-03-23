const { ApolloServer, PubSub } = require("apollo-server");
const mongoose = require("mongoose");

const typeDefs = require('./graphql/typeDefs.js');
const resolvers = require('./graphql/resolvers');
const { MONGODB } = require("./config.js");

const PORT = process.env.port || 5000;

const pubsub = new PubSub();

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: ({req}) => ({req, pubsub})
});

mongoose
  .connect(MONGODB, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  })
  .then(() => {
    console.log("MongoDB connected");
    return server.listen({ port: PORT });
  })
  .then((res) => {
    console.log(`Server is running at ${res.url}`);
  })
  .catch(err => {
    console.log(err);
  });
