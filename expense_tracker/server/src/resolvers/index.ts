import { authResolvers } from "./auth";
import { expenseResolvers } from "./expense";

export const resolvers = {
  Query: {
    ...expenseResolvers.Query, // Only expense has Query for now
  },
  Mutation: {
    ...authResolvers.Mutation,
    ...expenseResolvers.Mutation, // If you create mutations like "addExpense"
  },
};
