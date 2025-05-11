import { gql } from "apollo-server-express";

export const expenseTypeDefs = gql`
  type Expense {
    id: ID!
    title: String!
    amount: Float!
    date: String!
    category: Category
    user: User
  }

  input CreateExpenseInput {
    title: String!
    amount: Float!
    date: String!
    categoryId: ID!
  }

  type Query {
    myExpenses: [Expense!]!
  }

  type Mutation {
    createExpense(input: CreateExpenseInput!): Expense!
    deleteExpense(id: ID!): Boolean!
  }
`;
