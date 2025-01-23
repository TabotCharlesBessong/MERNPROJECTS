import express from "express";
import { getUserProfile } from "../controllers/user.controller.js";

const userRouter = express.Router();

userRouter.get("/check-auth",(req,res) => {
  if(req.oidc.isAuthenticated()){
    return res.status(200).json({
      isAuthenticated:true,
      user:req.oidc.user
    })
  }else{
    return res.status(401).json({
      isAuthenticated:false,
      user:null
    })
  }
})

userRouter.get("/:id",getUserProfile)

export default userRouter