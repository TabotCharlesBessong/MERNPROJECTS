import { connect } from "mongoose";
import { seedFoods, seedUsers } from "../utils/seeding.js";

export const dbconnect = async () => {
  try {
    connect(process.env.MONGO_URI);
    await seedUsers()
    await seedFoods()
    console.log("Database connected successfuly")
  } catch (error) {
    console.log(error)
  }
};
