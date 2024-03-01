import { Request, Response } from "express";
import User from "../models/user";


export const createUser =async (req:Request,res:Response) => {
  // 1. check if user exit
  // 2. create user if not exist
  // 3. return user object to the client
  try {
    const {auth0Id} = req.body
    const existingUser = await User.findOne({auth0Id})
    if(existingUser){
      return res.status(200).send()
    }
    const newUser = new User(req.body)
    await newUser.save()
    res.status(201).json(newUser.toObject())
  } catch (error) {
    console.log(error)
    res.status(500).json({message:"Error creating a user"})
  }
}