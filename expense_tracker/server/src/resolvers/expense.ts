import { Expense } from "../models/Expense";
import { Category } from "../models/Category";
import * as yup from "yup";

const expenseSchema = yup.object({
  title: yup.string().required(),
  amount: yup.number().required(),
  date: yup.date().required(),
  categoryId: yup.string().required(),
});

export const expenseResolvers = {
  Query: {
    myExpenses: async (_: any, __: any, context: any) => {
      if (!context.userId) throw new Error("Unauthorized");

      return await Expense.findAll({
        where: { userId: context.userId },
        include: [Category],
        order: [["date", "DESC"]],
      });
    },
  },
  Mutation: {
    createExpense: async (_: any, { input }: any, context: any) => {
      if (!context.userId) throw new Error("Unauthorized");

      await expenseSchema.validate(input);
      const expense = await Expense.create({
        ...input,
        userId: context.userId,
      });
      return expense;
    },

    deleteExpense: async (_: any, { id }: any, context: any) => {
      if (!context.userId) throw new Error("Unauthorized");

      const expense = await Expense.findByPk(id);
      if (!expense || expense.userId !== context.userId) {
        throw new Error("Expense not found or access denied");
      }

      await expense.destroy();
      return true;
    },
  },
};
