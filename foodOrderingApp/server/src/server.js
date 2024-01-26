import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import foodRouter from "./router/food.router.js";
import userRouter from "./router/user.router.js";
import orderRouter from "./router/order.router.js";
import { dbconnect } from "./config/database.config.js";

dotenv.config();

const app = express();
const port = process.env.PORT;

app.use(express.json())
app.use(cors({ credentials: true, origin: ["http://localhost:5173"] }));

app.use("/api/foods", foodRouter);
app.use("/api/users", userRouter);
app.use("/api/orders", orderRouter);

app.listen(port, () => {
  dbconnect()
  console.log(`Port is running on port number ${port}...`);
});
