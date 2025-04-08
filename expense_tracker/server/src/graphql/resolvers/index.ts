// src/graphql/resolvers/index.ts
import { userResolvers } from "./user";
import { categoryResolvers } from "./category";
import { expenseResolvers } from "./expense";

export const resolvers = {
  Query: {
    ...userResolvers.Query,
    ...categoryResolvers.Query,
    ...expenseResolvers.Query,
  },
  Mutation: {
    ...userResolvers.Mutation,
    ...categoryResolvers.Mutation,
    ...expenseResolvers.Mutation,
  },
  User: userResolvers.User,
  Category: categoryResolvers.Category,
  Expense: expenseResolvers.Expense,
};
