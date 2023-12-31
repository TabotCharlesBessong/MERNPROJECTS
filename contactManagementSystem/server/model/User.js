const mongoose = require("mongoose")

const UserSchema = new mongoose.Schema({
  name:{
    type:String,
    require:[true,"Name is required."]
  },
  email:{
    type:String,
    require:[true,"Email address is required"]
  },
  password:{
    type:String,
    require:[true,"Password is required"]
  }
})

const User = new mongoose.model("User",UserSchema)

module.exports = User