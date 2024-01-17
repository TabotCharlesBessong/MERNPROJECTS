import bcrypt from "bcryptjs";
import { sample_foods, sample_users } from "../constant/data.js";
import { FoodModel } from "../models/food.model.js";
import { UserModel } from "../models/user.model.js";

export const seedUsers = async () => {
  const usersCount = await UserModel.countDocuments();
  if (usersCount > 0) {
    console.log("Users seeding already done!");
    return;
  }

  for (let user of sample_users) {
    user.password = await bcrypt.hash(user.password, 10);
    await UserModel.create(user);
  }
  console.log("Users seeding is done!");
};

export const seedFoods = async () => {
  const foods = await FoodModel.countDocuments();
  if (foods > 0) {
    console.log("Foods seed is already done!");
    return;
  }

  for (const food of sample_foods) {
    food.imageUrl = `${food.imageUrl}`;
    await FoodModel.create(food);
  }

  console.log("Foods seed Is Done!");
};
