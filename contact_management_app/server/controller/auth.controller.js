import asyncHandler from "express-async-handler";
import User from "../model/userModel.js";
import generateToken from "../utils/generateToken.js"

export const loginUser = asyncHandler(async (req, res) => {
  const {email,password} = req.body
  const user = await User.findOne({email})
  if(user && (await user.matchPassword(password))){
    res.json({user,token:generateToken(user._id)})
  }else{
    res.status(401)
    throw new Error("Invalid email or password")
  }
});

export const registerUser = asyncHandler(async (req, res) => {
  const { firstName, lastName, email, password } = req.body;
  const userExists = await User.findOne({ email });
  if (userExists) {
    userExists.firstName = firstName || userExists.firstName;
    userExists.lastName = lastName || userExists.lastName;
    userExists.firstName = firstName || userExists.firstName;
    userExists.firstName = firstName || userExists.firstName;

    const user = await userExists.save();

    if (user) {
      res.status(201).json({
        user,
      });
    }
  } else {
    const user = await User.create({
      firstName,
      lastName,
      email,
      password,
    });
    if (user) {
      res.status(201).json({ user })
    } else {
      res.status(400);
      throw new Error("Invalid user data");
    }
  }
});
