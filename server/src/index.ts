import "reflect-metadata";
import express from "express";
import cors from "cors";
import { MikroORM } from "@mikro-orm/core";
import MikroConfig from "./mikro-orm.config";
import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import { buildSchema } from "type-graphql";

import { PostResolver } from "./resolvers/post";

const main = async () => {
  const orm = await MikroORM.init(MikroConfig);
  await orm.getMigrator().up();

  const app = express();

  app.use(
    cors({
      origin: process.env.CORS_ORIGIN,
      credentials: true,
    })
  );

  const apolloServer = new ApolloServer({
    schema: await buildSchema({ resolvers: [PostResolver], validate: false }),
  });

  const { url } = await startStandaloneServer(apolloServer, {
    context: async () => ({ em: orm.em }),
    listen: { port: 4000 },
  });

  console.log(`Server ready at ${url}`);
};

main().catch((err) => {
  console.error(err);
});
