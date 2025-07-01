import { Request, Response, NextFunction } from "express";
import { ClerkExpressRequireAuth } from "@clerk/clerk-sdk-node";

export interface AuthenticatedRequest extends Request {
  auth?: {
    userId: string;
  };
}

export const requireAuth = ClerkExpressRequireAuth({
  onError: (error) => {
    console.error("Authentication error:", error);
    return new Response("Unauthorized", { status: 401 });
  },
});
