import express from "express";
import { ApolloServer, gql } from "apollo-server-express";
import { connectDB, sequelize } from "./config/db";
import { authenticate, AuthRequest } from "./middleware/auth";
import cookieParser from "cookie-parser";
import refreshTokenRouter from "./routes/refreshToken";

import { authTypeDefs } from "./schemas/auth";
import { expenseTypeDefs } from "./schemas/expense";
import { categoryTypeDefs } from "./schemas/category";

import { authResolvers } from "./resolvers/auth";
import { expenseResolvers } from "./resolvers/expense";
import { categoryResolvers } from "./resolvers/category";


const app = express();
// Middleware
app.use(authenticate);
app.use(cookieParser());
app.use("/refresh_token", refreshTokenRouter);

// Merge typeDefs
const typeDefs = [
  gql`
    type Query
    type Mutation
  `,
  authTypeDefs,
  expenseTypeDefs,
  categoryTypeDefs,
];

// Merge resolvers
const resolvers = [authResolvers, expenseResolvers, categoryResolvers];

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: ({ req }: { req: AuthRequest }) => ({
    userId: req.user?.id,
  }),
});

async function start() {
  await connectDB();
  await sequelize.sync();
  await server.start();
  // @ts-ignore
  server.applyMiddleware({ app });

  app.listen({ port: process.env.PORT || 5000 }, () =>
    console.log(`🚀 Server ready at http://localhost:5000${server.graphqlPath}`)
  );
}

start();
