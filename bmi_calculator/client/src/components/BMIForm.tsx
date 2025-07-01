import React, { useState } from "react";
import { bmiCalculationSchema } from "../validation/bmiValidation";
import { calculateBMI } from "../api/bmiApi";
import type { BMIData, BMIResultTypes } from "../types";

interface BMIFormProps {
  onResult: (result: BMIResultTypes) => void;
}

const BMIForm: React.FC<BMIFormProps> = ({ onResult }) => {
  const [formData, setFormData] = useState<BMIData>({
    height: 0,
    weight: 0,
    unit: "metric",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === "unit" ? value : parseFloat(value) || 0,
    }));

    // Clear error when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErrors({});

    try {
      // Validate form data
      await bmiCalculationSchema.validate(formData, { abortEarly: false });

      // Calculate BMI
      const result = await calculateBMI(formData);
      onResult(result);
    } catch (error: any) {
      if (error.name === "ValidationError") {
        const validationErrors: Record<string, string> = {};
        error.inner.forEach((err: any) => {
          if (err.path) {
            validationErrors[err.path] = err.message;
          }
        });
        setErrors(validationErrors);
      } else {
        console.error("BMI calculation error:", error);
        setErrors({ general: "Failed to calculate BMI. Please try again." });
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bmi-form">
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="unit">Unit System:</label>
          <select
            id="unit"
            name="unit"
            value={formData.unit}
            onChange={handleInputChange}
            className={errors.unit ? "error" : ""}
          >
            <option value="metric">Metric (kg, cm)</option>
            <option value="imperial">Imperial (lbs, inches)</option>
          </select>
          {errors.unit && <span className="error-message">{errors.unit}</span>}
        </div>

        <div className="form-group">
          <label htmlFor="height">
            Height ({formData.unit === "metric" ? "cm" : "inches"}):
          </label>
          <input
            type="number"
            id="height"
            name="height"
            value={formData.height || ""}
            onChange={handleInputChange}
            placeholder={formData.unit === "metric" ? "e.g., 175" : "e.g., 69"}
            className={errors.height ? "error" : ""}
          />
          {errors.height && (
            <span className="error-message">{errors.height}</span>
          )}
        </div>

        <div className="form-group">
          <label htmlFor="weight">
            Weight ({formData.unit === "metric" ? "kg" : "lbs"}):
          </label>
          <input
            type="number"
            id="weight"
            name="weight"
            value={formData.weight || ""}
            onChange={handleInputChange}
            placeholder={formData.unit === "metric" ? "e.g., 70" : "e.g., 154"}
            className={errors.weight ? "error" : ""}
          />
          {errors.weight && (
            <span className="error-message">{errors.weight}</span>
          )}
        </div>

        {errors.general && (
          <div className="error-message general-error">{errors.general}</div>
        )}

        <button type="submit" disabled={loading}>
          {loading ? "Calculating..." : "Calculate BMI"}
        </button>
      </form>
    </div>
  );
};

export default BMIForm;
