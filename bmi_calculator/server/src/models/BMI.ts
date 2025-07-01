import mongoose, { Schema, Document } from "mongoose";
import { BMIRecord } from "../types";

// interface IBMIRecord extends BMIRecord, Document {}

const BMISchema: Schema = new Schema({
  userId: { type: String, required: true },
  height: { type: Number, required: true },
  weight: { type: Number, required: true },
  unit: { type: String, enum: ["metric", "imperial"], required: true },
  bmi: { type: Number, required: true },
  category: { type: String, required: true },
  isHealthy: { type: Boolean, required: true },
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.model<BMIRecord>("BMIRecord", BMISchema);
