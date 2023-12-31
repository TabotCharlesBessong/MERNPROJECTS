
import mongoose from "mongoose";
import express from "express"
import dotenv from "dotenv"

dotenv.config()
const app = express()
const port = process.env.PORT || 5000

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("Database connected successfully..."))
  .catch((err) => console.log(err));

app.listen(port,() => {
  console.log(`The server is running on port ${port}....`)
})