import { Router } from "express";
import { sample_users } from "../constant/data.js";
import { BAD_REQUEST } from "../constant/httpStatus.js";
import { generateTokenResponse } from "../utils/generateToken.js";

const router = Router();

router.post("/login", (req, res) => {
  const { email, password } = req.body;
  const user = sample_users.find(
    (user) => user.email === email && user.password === password
  );
  if (user) {
    res.send(generateTokenResponse(user));
    return;
  }
  res.status(BAD_REQUEST).send("Username or password is wrong");
});

export default router