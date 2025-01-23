
import asyncHandler from "express-async-handler"
import User from "../model/user.model.js"

export const getUserProfile = asyncHandler(async(request,res) => {
  try {
    const {id} = request.params
    const user = await User.findOne({auth0Id: id})
    if (!user) {
      return res.status(404).json({message: 'User not found'})
    }
    return res.status(200).json({user})
  } catch (error) {
    console.log("Error getting user profile", error)
    return res.status(500).json({message: 'Server Error'})
  }
})