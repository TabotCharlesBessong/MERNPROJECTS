
import jwt from "jsonwebtoken"

export const generateTokenResponse = user => {
  const token = jwt.sign({
    id:user.id,
    email:user.email,
    isAdmin:user.isAdmin
  },
  "someRandomText",
  {
    expiresIn:"30d"
  }
  )

  return {
    id:user.id,
    email:user.email,
    name:user.name,
    address:user.address,
    isAdmin:user.isAdmin,
    token
  }
}