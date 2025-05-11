// src/utils/sendRefreshToken.ts
import { Response } from "express";

export const sendRefreshToken = (res: Response, token: string) => {
  res.cookie("jid", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/refresh_token",
    maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
  });
};
