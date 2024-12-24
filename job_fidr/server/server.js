import express from "express";
import dotenv from "dotenv";
import cors from "cors";
// import fs from "fs";

dotenv.config();

const app = express();

const port = process.env.PORT || 5000;

import { auth } from "express-openid-connect";
import cookieParser from "cookie-parser";
import { connectDB } from "./db/connect.js";
import userRouter from "./routes/user.router.js";

const config = {
  authRequired: false,
  auth0Logout: true,
  secret: process.env.SECRET,
  baseURL: process.env.BASE_URL,
  clientID: process.env.CLIENT_ID,
  issuerBaseURL: process.env.ISSUER_BASE_URL,
};

app.use(
  cors({
    credentials: true,
    origin: process.env.CLIENT_URL,
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use(auth(config));

// routes
// const routesFiles = fs.readlinkSync("./routes")

// routesFiles.forEach((file))
app.use("/api/user",userRouter)

const server = async () => {
  try {
    await connectDB()
    app.listen(port, () => {
      console.log(`Server running on port ${port}`);
    });
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
}

server();