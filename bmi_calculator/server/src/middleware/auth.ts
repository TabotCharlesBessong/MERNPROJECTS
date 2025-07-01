import { Request, Response, NextFunction } from "express";

export interface AuthenticatedRequest extends Request {
  auth?: {
    userId: string;
  };
}

