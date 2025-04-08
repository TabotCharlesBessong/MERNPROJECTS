import { Category } from "../models/Category";
import * as yup from "yup";

const categorySchema = yup.object({
  name: yup.string().required(),
});

export const categoryResolvers = {
  Query: {
    categories: async () => {
      return await Category.findAll();
    },
  },
  Mutation: {
    createCategory: async (_: any, { input }: any) => {
      await categorySchema.validate(input);
      return await Category.create({ name: input.name });
    },
  },
};
