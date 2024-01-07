import express, { Router } from "express"
import { loginUser, registerUser } from "../controller/auth.controller.js"

const router = Router()

router.post("/login",loginUser)
router.post("/signup",registerUser)

export default router