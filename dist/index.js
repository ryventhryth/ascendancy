"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const express_1 = __importDefault(require("express"));
const apollo_server_express_1 = require("apollo-server-express");
const app = express_1.default();
const typeDefs = apollo_server_express_1.gql `
  type Book {
    title: String
    author: String
  }

  type Query {
    books: [Book]
  }
`;
const resolvers = {
    Query: {
        books: () => books
    }
};
const books = [
    {
        title: "The Awakening",
        author: "Kate Chopin"
    },
    {
        title: "City of Glass",
        author: "Paul Auster"
    }
];
const server = new apollo_server_express_1.ApolloServer({
    typeDefs,
    resolvers
});
server.applyMiddleware({ app });
app.listen({ port: 4000 }, () => console.log(`🚀 Server ready at http://localhost:4000${server.graphqlPath}`));
//# sourceMappingURL=index.js.map