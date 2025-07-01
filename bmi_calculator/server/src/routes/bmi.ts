import express from "express";
import {
  calculateBMIController,
  getBMIHistoryController,
} from "../controllers/bmiController";

const router = express.Router();

router.post("/calculate", calculateBMIController);
router.get("/history", getBMIHistoryController);

export default router;
