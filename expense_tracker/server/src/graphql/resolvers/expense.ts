// src/graphql/resolvers/expense.ts
import { ForbiddenError, UserInputError } from 'apollo-server-express';
import * as yup from 'yup';
import ExpenseModel, { ExpenseFilters } from '../../models/Expense';
import CategoryModel from '../../models/Category';
import { AuthRequest } from '../../middlewares/auth';

// Validation schemas
const expenseSchema = yup.object().shape({
  amount: yup.number().required('Amount is required').positive('Amount must be positive'),
  description: yup.string().nullable(),
  date: yup.date().required('Date is required'),
  category_id: yup.number().nullable().integer('Category ID must be an integer')
});

const expenseUpdateSchema = yup.object().shape({
  amount: yup.number().positive('Amount must be positive'),
  description: yup.string().nullable(),
  date: yup.date(),
  category_id: yup.number().nullable().integer('Category ID must be an integer')
});

export const expenseResolvers = {
  Query: {
    expenses: async (
      _: any,
      { filters }: { filters?: any },
      context: { req: AuthRequest }
    ) => {
      if (!context.req.user) {
        throw new ForbiddenError("Not authenticated");
      }

      const parsedFilters: ExpenseFilters = {};

      if (filters) {
        if (filters.startDate)
          parsedFilters.startDate = new Date(filters.startDate);
        if (filters.endDate) parsedFilters.endDate = new Date(filters.endDate);
        if (filters.categoryId)
          parsedFilters.categoryId = parseInt(filters.categoryId);
        if (filters.minAmount !== undefined)
          parsedFilters.minAmount = parseFloat(filters.minAmount);
        if (filters.maxAmount !== undefined)
          parsedFilters.maxAmount = parseFloat(filters.maxAmount);
      }

      return ExpenseModel.findByUser(context.req.user.id, parsedFilters);
    },

    expense: async (
      _: any,
      { id }: { id: string },
      context: { req: AuthRequest }
    ) => {
      if (!context.req.user) {
        throw new ForbiddenError("Not authenticated");
      }

      const expense = await ExpenseModel.findById(parseInt(id));

      if (!expense) {
        throw new UserInputError("Expense not found");
      }

      if (expense.user_id !== context.req.user.id) {
        throw new ForbiddenError("Not authorized");
      }

      return expense;
    },

    expenseSummary: async (
      _: any,
      { filters }: { filters?: any },
      context: { req: AuthRequest }
    ) => {
      if (!context.req.user) {
        throw new ForbiddenError("Not authenticated");
      }

      const parsedFilters: ExpenseFilters = {};

      if (filters) {
        if (filters.startDate)
          parsedFilters.startDate = new Date(filters.startDate);
        if (filters.endDate) parsedFilters.endDate = new Date(filters.endDate);
        if (filters.categoryId)
          parsedFilters.categoryId = parseInt(filters.categoryId);
        if (filters.minAmount !== undefined)
          parsedFilters.minAmount = parseFloat(filters.minAmount);
        if (filters.maxAmount !== undefined)
          parsedFilters.maxAmount = parseFloat(filters.maxAmount);
      }

      const total = await ExpenseModel.getTotal(
        context.req.user.id,
        parsedFilters
      );
      const byCategory = await ExpenseModel.getByCategory(context.req.user.id);

      // Get category names
      const categories = await CategoryModel.findByUser(context.req.user.id);
      const categoryMap = new Map(categories.map((cat) => [cat.id, cat.name]));

      const byCategoryWithNames = await Promise.all(
        byCategory.map(async (item) => ({
          category_id: item.category_id,
          category_name: item.category_id
            ? categoryMap.get(item.category_id)
            : "Uncategorized",
          total: parseFloat(item.total.toString()),
        }))
      );

      return {
        total,
        by_category: byCategoryWithNames,
      };
    },
  },

  Mutation: {
    createExpense: async (
      _: any,
      { input }: { input: any },
      context: { req: AuthRequest }
    ) => {
      if (!context.req.user) {
        throw new ForbiddenError("Not authenticated");
      }

      try {
        const parsedInput = {
          // src/graphql/resolvers/expense.ts (continued)
          ...input,
          date: new Date(input.date),
          category_id: input.category_id ? parseInt(input.category_id) : null,
        };

        // Validate input
        await expenseSchema.validate(parsedInput);

        // If category_id provided, check if it exists and belongs to user
        if (parsedInput.category_id) {
          const category = await CategoryModel.findById(
            parsedInput.category_id
          );

          if (!category) {
            throw new UserInputError("Category not found");
          }

          if (category.user_id !== context.req.user.id) {
            throw new ForbiddenError("Not authorized to use this category");
          }
        }

        return ExpenseModel.create({
          ...parsedInput,
          user_id: context.req.user.id,
        });
      } catch (error) {
        if (error instanceof yup.ValidationError) {
          throw new UserInputError(error.message);
        }
        throw error;
      }
    },

    updateExpense: async (
      _: any,
      { id, input }: { id: string; input: any },
      context: { req: AuthRequest }
    ) => {
      if (!context.req.user) {
        throw new ForbiddenError("Not authenticated");
      }

      try {
        // Check if expense exists and belongs to user
        const expense = await ExpenseModel.findById(parseInt(id));

        if (!expense) {
          throw new UserInputError("Expense not found");
        }

        if (expense.user_id !== context.req.user.id) {
          throw new ForbiddenError("Not authorized");
        }

        const parsedInput: any = {};

        if (input.amount !== undefined) parsedInput.amount = input.amount;
        if (input.description !== undefined)
          parsedInput.description = input.description;
        if (input.date !== undefined) parsedInput.date = new Date(input.date);
        if (input.category_id !== undefined) {
          parsedInput.category_id = input.category_id
            ? parseInt(input.category_id)
            : null;

          // If category_id provided, check if it exists and belongs to user
          if (parsedInput.category_id) {
            const category = await CategoryModel.findById(
              parsedInput.category_id
            );

            if (!category) {
              throw new UserInputError("Category not found");
            }

            if (category.user_id !== context.req.user.id) {
              throw new ForbiddenError("Not authorized to use this category");
            }
          }
        }

        // Validate input
        await expenseUpdateSchema.validate(parsedInput);

        return ExpenseModel.update(parseInt(id), parsedInput);
      } catch (error) {
        if (error instanceof yup.ValidationError) {
          throw new UserInputError(error.message);
        }
        throw error;
      }
    },

    deleteExpense: async (
      _: any,
      { id }: { id: string },
      context: { req: AuthRequest }
    ) => {
      if (!context.req.user) {
        throw new ForbiddenError("Not authenticated");
      }

      // Check if expense exists and belongs to user
      const expense = await ExpenseModel.findById(parseInt(id));

      if (!expense) {
        throw new UserInputError("Expense not found");
      }

      if (expense.user_id !== context.req.user.id) {
        throw new ForbiddenError("Not authorized");
      }

      return ExpenseModel.delete(parseInt(id));
    },
  },

  Expense: {
    category: async (parent: { category_id: number | null }) => {
      if (!parent.category_id) return null;
      return CategoryModel.findById(parent.category_id);
    },
  },
};