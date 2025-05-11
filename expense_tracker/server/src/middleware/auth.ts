import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { Request, Response, NextFunction } from "express";

dotenv.config();

export interface AuthRequest extends Request {
  user?: { id: string };
}

export const authenticate = (
  req: AuthRequest,
  _: Response,
  next: NextFunction
) => {
  const authHeader = req.headers.authorization;

  if (authHeader && authHeader.startsWith("Bearer ")) {
    const token = authHeader.split(" ")[1];
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as {
        id: string;
      };
      req.user = { id: decoded.id };
    } catch (err) {
      console.error("JWT verification failed", err);
    }
  }

  next();
};
