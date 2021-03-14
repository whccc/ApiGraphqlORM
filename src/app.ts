import express from "express";
import { ApolloServer } from "apollo-server-express";
import { PingResolver } from "./resolvers/ping";
import { ProductResolver } from "./resolvers/ProductResolver";
import { buildSchema } from "type-graphql";

export const startServer = async () => {
  const app = express();

  const server = new ApolloServer({
    schema: await buildSchema({
      resolvers: [PingResolver, ProductResolver],
      validate: false,
    }),
    context: ({ req, res }) => ({ req, res }),
  });

  server.applyMiddleware({ app, path: "/graphql" });
  return app;
};
