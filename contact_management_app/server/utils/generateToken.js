import jwt from "jsonwebtoken";

const generateToken = (id) => {
  return jwt.sign({ id }, "CharlesTabot", {
    expiresIn: "30d",
  });
};

export default generateToken;
