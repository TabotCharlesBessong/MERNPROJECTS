import express from "express";

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

export default userRouter