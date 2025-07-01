import express from "express";
import { requireAuth } from "../middleware/auth";
import {
  calculateBMIController,
  getBMIHistoryController,
} from "../controllers/bmiController";

const router = express.Router();

router.post("/calculate", requireAuth, calculateBMIController);
router.get("/history", requireAuth, getBMIHistoryController);

export default router;
