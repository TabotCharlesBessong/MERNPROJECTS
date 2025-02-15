import client from '@repo/db/client';
import { Request, Response, Router } from "express";
import { SigninSchema, SignupSchema } from "../types";
import { compare, hash } from '../scrypt';
import { JWT_PASSWORD } from '../config';
import jwt from "jsonwebtoken";
import { userRouter } from './user';
import { spaceRouter } from './space';

export const router = Router()

router.post("/signup", async (req:Request, res:Response) => {
  console.log("Inside signup, received body:", req.body);

  // Parse request data
  const parsedData = SignupSchema.safeParse(req.body);

  if (!parsedData.success) {
    console.log("Validation Error:", parsedData.error.format()); // Log formatted error
    res.status(400).json({
      message: "Validation failed",
      errors: parsedData.error.format(),
    });
    return
  }

  const hashedPassword = await hash(parsedData.data.password);

  try {
    const user = await client.user.create({
      data: {
        username: parsedData.data.username,
        password: hashedPassword,
        role: parsedData.data.type === "admin" ? "Admin" : "User",
      },
    });
    res.status(200).json({ userId: user.id });
  } catch (e) {
    console.log("Error thrown:", e);
    res.status(400).json({ message: "User already exists" });
  }
});


router.post("/signin", async (req, res) => {
  const parsedData = SigninSchema.safeParse(req.body);
  if (!parsedData.success) {
    res.status(403).json({ message: "Validation failed" });
    return;
  }

  try {
    const user = await client.user.findUnique({
      where: {
        username: parsedData.data.username,
      },
    });

    if (!user) {
      res.status(403).json({ message: "User not found" });
      return;
    }
    const isValid = await compare(parsedData.data.password, user.password);

    if (!isValid) {
      res.status(403).json({ message: "Invalid password" });
      return;
    }

    const token = jwt.sign(
      {
        userId: user.id,
        role: user.role,
      },
      JWT_PASSWORD
    );

    res.json({
      token,
    });
  } catch (e) {
    res.status(400).json({ message: "Internal server error" });
  }
});

router.use("/user", userRouter);
router.use("/space", spaceRouter);