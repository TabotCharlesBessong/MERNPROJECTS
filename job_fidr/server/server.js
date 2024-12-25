import express from "express";
import dotenv from "dotenv";
import cors from "cors";
// import fs from "fs";
import asyncHandler from "express-async-handler";

dotenv.config();

const app = express();

const port = process.env.PORT || 5000;

import { auth } from "express-openid-connect";
import cookieParser from "cookie-parser";
import { connectDB } from "./db/connect.js";
import userRouter from "./routes/user.router.js";
import User from "./model/user.model.js";
import jobRouter from "./routes/job.router.js";

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
app.use("/api/jobs", jobRouter)

// function to check if user exists in the db
const enusureUserInDB = asyncHandler(async (user) => {
  try {
    const existingUser = await User.findOne({ auth0Id: user.sub });

    if (!existingUser) {
      // create a new user document
      const newUser = new User({
        auth0Id: user.sub,
        email: user.email,
        name: user.name,
        role: "jobseeker",
        profilePicture: user.picture,
      });

      await newUser.save();

      console.log("User added to db", user);
    } else {
      console.log("User already exists in db", existingUser);
    }
  } catch (error) {
    console.log("Error checking or adding user to db", error.message);
  }
});

app.get("/", async (req, res) => {
  if (req.oidc.isAuthenticated()) {
    // check if Auth0 user exists in the db
    await enusureUserInDB(req.oidc.user);

    // redirect to the frontend
    return res.redirect(process.env.CLIENT_URL);
  } else {
    return res.send("Logged out");
  }
});

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