import bcrypt from "bcryptjs";
import { User } from "../models/User";
import { generateToken } from "../utils/generateToken";
import * as yup from "yup";

const registerSchema = yup.object({
  email: yup.string().email().required(),
  password: yup.string().min(6).required(),
});

const loginSchema = yup.object({
  email: yup.string().email().required(),
  password: yup.string().required(),
});

export const authResolvers = {
  Mutation: {
    register: async (_: any, { input }: any) => {
      await registerSchema.validate(input);
      const existing = await User.findOne({ where: { email: input.email } });
      if (existing) throw new Error("Email already in use");

      const hashed = await bcrypt.hash(input.password, 10);
      const user = await User.create({ email: input.email, password: hashed });

      const token = generateToken(user.id);
      return { token, user };
    },

    login: async (_: any, { input }: any) => {
      await loginSchema.validate(input);
      const user = await User.findOne({ where: { email: input.email } });

      if (!user) throw new Error("Invalid credentials");

      const isMatch = await bcrypt.compare(input.password, user.password);
      if (!isMatch) throw new Error("Invalid credentials");

      const token = generateToken(user.id);
      return { token, user };
    },
  },
};
