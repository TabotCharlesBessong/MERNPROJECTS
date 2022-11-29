
// const express = require('express')
// const bodyParser = require('body-parser')
// const mongoose = require('mongoose')
// const cors = require('cors')
// const helmet = require('helmet')
// const path = require('path')
// const morgan = require('morgan')
// const dotenv = require('dotenv')
// const multer = require("multer")
// const {fileURLToPath} = require('url')

import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import multer from "multer";
import helmet from "helmet";
import morgan from "morgan";
import path from "path";
import { fileURLToPath } from "url"; 
import authRoutes from './routes/auth.js'
// inbuilt 
import { register } from "./controllers/auth.js";
import userRoutes from "./routes/users.js";
import postRoutes from './routes/post.js'
import { verifyToken } from "./middleware/auth.js";
import { createPost } from "./controllers/post.js";

// configuration 
console.log('Hello world')

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config();
const app = express();
app.use(express.json());
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
app.use(morgan("common"));
app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use(cors());
app.use("/assets", express.static(path.join(__dirname, "public/assets")));

/* FILE STORAGE */
const storage = multer.diskStorage({
	destination: function (req, file, cb) {
		cb(null, "public/assets");
	},
	filename: function (req, file, cb) {
		cb(null, file.originalname);
	},
});
const upload = multer({ storage });

// authentication 
app.post("/auth/register",upload.single("picture"),register)
app.post("/posts", verifyToken, upload.single("picture"),createPost);

// ROUTES
app.use('/auth',authRoutes)
app.use('/users',userRoutes)
app.use('/posts',postRoutes)

// setting up mongoose 
const PORT = process.env.PORT || 5000;
mongoose
	.connect(process.env.MONGO_URL, {
		useNewUrlParser: true,
		useUnifiedTopology: true,
	})
	.then(() => {
		app.listen(PORT, () => console.log(`Server Port: ${PORT}`));

		/* ADD DATA ONE TIME */
		// User.insertMany(users);
		// Post.insertMany(posts);
	})
	.catch((error) => console.log(`${error} did not connect`));