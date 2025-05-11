// src/graphql/resolvers/category.ts
import { ForbiddenError, UserInputError } from "apollo-server-express";
import * as yup from "yup";
import CategoryModel from "../../models/Category";
import ExpenseModel from "../../models/Expense";
import { AuthRequest } from "../../middlewares/auth";

// Validation schemas
const categorySchema = yup.object().shape({
  name: yup
    .string()
    .required("Category name is required")
    .min(2, "Category name must be at least 2 characters"),
});

export const categoryResolvers = {
  Query: {
    categories: async (_: any, __: any, context: { req: AuthRequest }) => {
      if (!context.req.user) {
        throw new ForbiddenError("Not authenticated");
      }

      return CategoryModel.findByUser(context.req.user.id);
    },

    category: async (
      _: any,
      { id }: { id: string },
      context: { req: AuthRequest }
    ) => {
      if (!context.req.user) {
        throw new ForbiddenError("Not authenticated");
      }

      const category = await CategoryModel.findById(parseInt(id));

      if (!category) {
        throw new UserInputError("Category not found");
      }

      if (category.user_id !== context.req.user.id) {
        throw new ForbiddenError("Not authorized");
      }

      return category;
    },
  },

  Mutation: {
    createCategory: async (
      _: any,
      { input }: { input: { name: string } },
      context: { req: AuthRequest }
    ) => {
      if (!context.req.user) {
        throw new ForbiddenError("Not authenticated");
      }

      try {
        // Validate input
        await categorySchema.validate(input);

        return CategoryModel.create({
          name: input.name,
          user_id: context.req.user.id,
        });
      } catch (error) {
        if (error instanceof yup.ValidationError) {
          throw new UserInputError(error.message);
        }
        throw error;
      }
    },

    updateCategory: async (
      _: any,
      { id, input }: { id: string; input: { name: string } },
      context: { req: AuthRequest }
    ) => {
      if (!context.req.user) {
        throw new ForbiddenError("Not authenticated");
      }

      try {
        // Validate input
        await categorySchema.validate(input);

        // Check if category exists and belongs to user
        const category = await CategoryModel.findById(parseInt(id));

        if (!category) {
          throw new UserInputError("Category not found");
        }

        if (category.user_id !== context.req.user.id) {
          throw new ForbiddenError("Not authorized");
        }

        return CategoryModel.update(parseInt(id), input.name);
      } catch (error) {
        if (error instanceof yup.ValidationError) {
          throw new UserInputError(error.message);
        }
        throw error;
      }
    },

    deleteCategory: async (
      _: any,
      { id }: { id: string },
      context: { req: AuthRequest }
    ) => {
      if (!context.req.user) {
        throw new ForbiddenError("Not authenticated");
      }

      // Check if category exists and belongs to user
      const category = await CategoryModel.findById(parseInt(id));

      if (!category) {
        throw new UserInputError("Category not found");
      }

      if (category.user_id !== context.req.user.id) {
        throw new ForbiddenError("Not authorized");
      }

      return CategoryModel.delete(parseInt(id));
    },
  },

  Category: {
    expenses: async (parent: { id: number }) => {
      const filters = { categoryId: parent.id };
      // @ts-ignore
      return ExpenseModel.findByUser(parent.user_id, filters);
    },
  },
};
