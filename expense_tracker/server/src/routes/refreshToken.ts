// src/routes/refreshToken.ts
import express from "express";
import jwt from "jsonwebtoken";
import { User } from "../models/User";
import {
  generateAccessToken,
  generateRefreshToken,
} from "../utils/generateToken";
import { sendRefreshToken } from "../utils/sendRefreshToken";

const router = express.Router();

// @ts-ignore
router.post("/", async (req, res) => {
  const token = req.cookies.jid;
  if (!token) return res.send({ ok: false, accessToken: "" });

  try {
    const payload = jwt.verify(token, process.env.REFRESH_TOKEN_SECRET!) as any;
    const user = await User.findByPk(payload.id);

    if (!user || user.tokenVersion !== payload.tokenVersion) {
      return res.send({ ok: false, accessToken: "" });
    }

    // Rotation: issue new refresh token
    sendRefreshToken(res, generateRefreshToken(user.id, user.tokenVersion));

    // Send new access token
    return res.send({
      ok: true,
      accessToken: generateAccessToken(user.id),
    });
  } catch (err) {
    console.error(err);
    return res.send({ ok: false, accessToken: "" });
  }
});

export default router;
