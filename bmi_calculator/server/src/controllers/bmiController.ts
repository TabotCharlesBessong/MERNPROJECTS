import { Response } from "express";
import { AuthenticatedRequest } from "../middleware/auth";
import { bmiCalculationSchema } from "../validation/bmiValidation";
import { calculateBMI } from "../utils/bmiCalculator";
import BMIRecord from "../models/BMI";
import { BMIData } from "../types";

export const calculateBMIController = async (
  req: AuthenticatedRequest,
  res: Response
) => {
  try {
    // Validate request body
    const validatedData = await bmiCalculationSchema.validate(req.body);
    const { height, weight, unit } = validatedData as BMIData;

    // Calculate BMI
    const result = calculateBMI({ height, weight, unit });

    // Save to database
    const bmiRecord = new BMIRecord({
      userId: req.auth?.userId,
      height,
      weight,
      unit,
      bmi: result.bmi,
      category: result.category,
      isHealthy: result.isHealthy,
    });

    await bmiRecord.save();

    res.json({
      success: true,
      data: {
        ...result,
        id: bmiRecord._id,
      },
    });
  } catch (error: any) {
    if (error.name === "ValidationError") {
      return res.status(400).json({
        success: false,
        message: "Validation error",
        errors: error.errors,
      });
    }

    console.error("BMI calculation error:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

export const getBMIHistoryController = async (
  req: AuthenticatedRequest,
  res: Response
) => {
  try {
    const records = await BMIRecord.find({ userId: req.auth?.userId })
      .sort({ createdAt: -1 })
      .limit(10);

    res.json({
      success: true,
      data: records,
    });
  } catch (error) {
    console.error("Get BMI history error:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};
