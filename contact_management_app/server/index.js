
import mongoose from "mongoose";
import express from "express"
import dotenv from "dotenv"
import contactRoutes from "./router/contact.router.js"

dotenv.config()
const app = express()
const port = process.env.PORT || 5000

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("Database connected successfully..."))
  .catch((err) => console.log(err));

app.use(express.json({limit:'50mb'}))
app.use("/contact",contactRoutes)

app.listen(port,() => {
  console.log(`The server is running on port ${port}....`)
})