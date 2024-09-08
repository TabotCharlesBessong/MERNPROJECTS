import { IUser } from "../types";

export const mockUser: IUser = {
  id: "1",
  username: "johndoe",
  password: "password123",
  firstname: "John",
  lastname: "Doe",
  email: "john.doe@example.com",
  role: "user",
  isEmailVerified: false,
  accountStatus: "active",
  createdAt: new Date("2023-01-01"),
  updatedAt: new Date("2023-06-01"),
};
