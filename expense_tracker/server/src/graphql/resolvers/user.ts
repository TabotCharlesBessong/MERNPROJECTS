// src/graphql/resolvers/user.ts
import { AuthenticationError, UserInputError } from "apollo-server-express";
import * as yup from "yup";
import UserModel, { UserInput } from "../../models/User";
import CategoryModel from "../../models/Category";
import ExpenseModel from "../../models/Expense";
import { generateToken } from "../../utils/auth";
import { AuthRequest } from "../../middlewares/auth";

// Validation schemas
const registerSchema = yup.object().shape({
  name: yup
    .string()
    .required("Name is required")
    .min(2, "Name must be at least 2 characters"),
  email: yup
    .string()
    .email("Invalid email format")
    .required("Email is required"),
  password: yup
    .string()
    .required("Password is required")
    .min(6, "Password must be at least 6 characters"),
});

const loginSchema = yup.object().shape({
  email: yup
    .string()
    .email("Invalid email format")
    .required("Email is required"),
  password: yup.string().required("Password is required"),
});

export const userResolvers = {
  Query: {
    me: async (_: any, __: any, context: { req: AuthRequest }) => {
      if (!context.req.user) {
        return null;
      }

      return UserModel.findById(context.req.user.id);
    },
  },

  Mutation: {
    register: async (_: any, { input }: { input: UserInput }) => {
      try {
        // Validate input
        await registerSchema.validate(input);

        // Check if user already exists
        const existingUser = await UserModel.findByEmail(input.email);
        if (existingUser) {
          throw new UserInputError("Email already in use");
        }

        // Create user
        const user = await UserModel.create(input);

        // Generate token
        const token = generateToken(user);

        return {
          token,
          user,
        };
      } catch (error) {
        if (error instanceof yup.ValidationError) {
          throw new UserInputError(error.message);
        }
        throw error;
      }
    },

    login: async (
      _: any,
      { input }: { input: { email: string; password: string } }
    ) => {
      try {
        // Validate input
        await loginSchema.validate(input);

        // Find user
        const user = await UserModel.findByEmail(input.email);
        if (!user) {
          throw new AuthenticationError("Invalid email or password");
        }

        // Validate password
        const validPassword = await UserModel.validatePassword(
          user,
          input.password
        );
        if (!validPassword) {
          throw new AuthenticationError("Invalid email or password");
        }

        // Generate token
        const token = generateToken(user);

        return {
          token,
          user,
        };
      } catch (error) {
        if (error instanceof yup.ValidationError) {
          throw new UserInputError(error.message);
        }
        throw error;
      }
    },
  },

  User: {
    categories: async (parent: { id: number }) => {
      return CategoryModel.findByUser(parent.id);
    },

    expenses: async (parent: { id: number }) => {
      return ExpenseModel.findByUser(parent.id);
    },
  },
};
