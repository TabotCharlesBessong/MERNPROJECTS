import express from "express";
import { ApolloServer } from "apollo-server-express";
import { connectDB } from "./config/db";
import { authenticate, AuthRequest } from "./middleware/auth";
import { authTypeDefs } from "./schemas/auth";
import { authResolvers } from "./resolvers/auth";
import { sequelize } from "./config/db";

const app = express();
app.use(authenticate);

const server = new ApolloServer({
  typeDefs: [authTypeDefs],
  resolvers: [authResolvers],
  context: ({ req }: { req: AuthRequest }) => ({
    userId: req.user?.id,
  }),
});

async function startServer() {
  await connectDB();
  await sequelize.sync(); // Use { force: true } only for resetting db

  await server.start();
  // @ts-ignore
  server.applyMiddleware({ app });

  app.listen({ port: process.env.PORT || 5000 }, () =>
    console.log(`🚀 Server ready at http://localhost:5000${server.graphqlPath}`)
  );
}

startServer();
