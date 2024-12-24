import mongoose from "mongoose";

export const connectDB = async () => {
  try {
    console.log("Attempting to connect")
    await mongoose.connect(process.env.MONGO_URI).then(() => {
      console.log("MongoDB connected successfully")
    })
  } catch (error) {
    console.log(error.message);
  }
}