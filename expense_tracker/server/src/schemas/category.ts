import { gql } from "apollo-server-express";

export const categoryTypeDefs = gql`
  type Category {
    id: ID!
    name: String!
  }

  input CreateCategoryInput {
    name: String!
  }

  type Query {
    categories: [Category!]!
  }

  type Mutation {
    createCategory(input: CreateCategoryInput!): Category!
  }
`;
