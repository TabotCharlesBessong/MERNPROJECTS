import { Router } from "express";
import { sample_users } from "../constant/data.js";
import { BAD_REQUEST } from "../constant/httpStatus.js";
import { generateTokenResponse } from "../utils/generateToken.js";
import handler from "express-async-handler"
import {UserModel} from '../models/user.model.js'
import bcrypt from "bcryptjs"

const router = Router();

router.post(
  "/register",
  handler(async (req, res) => {
    const { name, email, password, address } = req.body;

    const user = await UserModel.findOne({ email });

    if (user) {
      res.status(BAD_REQUEST).send("User already exists, please login!");
      return;
    }

    const hashedPassword = await bcrypt.hash(
      password,
      10
    );

    const newUser = {
      name,
      email: email.toLowerCase(),
      password: hashedPassword,
      address,
    };

    const result = await UserModel.create(newUser);
    res.send(generateTokenResponse(result));
  })
);

router.get("/users",handler(async (req,res) => {
  const users = await UserModel.find({})
  res.send(users)
}))

router.post("/login",handler (async(req, res) => {
  const { email, password } = req.body;
  const user = await UserModel.findOne({ email });
  
  if(user && (await bcrypt.compare(password,user.password))){
    res.send(generateTokenResponse(user))
    return
  }
  res.status(BAD_REQUEST).send("Username or password is wrong");
}));

export default router
