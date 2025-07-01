import { BMIData, BMIResult } from "../types";

export const calculateBMI = (data: BMIData): BMIResult => {
  let { height, weight, unit } = data;

  // Convert to metric if needed
  if (unit === "imperial") {
    height = height * 2.54; // inches to cm
    weight = weight * 0.453592; // pounds to kg
  }

  // Convert height to meters
  height = height / 100;

  // Calculate BMI
  const bmi = weight / (height * height);

  // Determine category
  let category: string;
  let isHealthy: boolean;
  let recommendation: string;

  if (bmi < 18.5) {
    category = "Underweight";
    isHealthy = false;
    recommendation =
      "Consider consulting a healthcare provider about healthy weight gain strategies.";
  } else if (bmi >= 18.5 && bmi < 25) {
    category = "Normal weight";
    isHealthy = true;
    recommendation = "Great! Maintain your current healthy lifestyle.";
  } else if (bmi >= 25 && bmi < 30) {
    category = "Overweight";
    isHealthy = false;
    recommendation =
      "Consider a balanced diet and regular exercise. Consult a healthcare provider for guidance.";
  } else {
    category = "Obese";
    isHealthy = false;
    recommendation =
      "Please consult a healthcare provider for a comprehensive health assessment and guidance.";
  }

  return {
    bmi: parseFloat(bmi.toFixed(1)),
    category,
    isHealthy,
    recommendation,
  };
};
