
import mongoose from 'mongoose'

const UserSchema = new mongoose.Schema({
	name: {
		type: string,
		required: true,
	},
	email: {
		type: string,
		required: true,
	},
	avatar: {
		type: string,
		required: true,
	},
  allProperties:[
    {
      type:mongoose.Schema.Types.ObjectId,
      ref:'Property'
    }
  ]
});

const userModel = mongoose.model('User',UserSchema)

export default userModel