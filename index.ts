import "reflect-metadata";
import express from "express";
import { ApolloServer } from "apollo-server-express";
import { buildSchema } from "type-graphql";
import { UserResolver } from "./resolvers/User";
import { createConnection } from "typeorm";

const app = express();

const startApp = async () => {
  const server = new ApolloServer({
    schema: await buildSchema({
      resolvers: [UserResolver]
    })
  });

  await createConnection();

  server.applyMiddleware({ app });

  app.listen({ port: 4000 }, () =>
    console.log(`🚀 Server ready at http://localhost:4000${server.graphqlPath}`)
  );
};

startApp();
