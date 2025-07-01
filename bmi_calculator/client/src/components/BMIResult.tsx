import React from "react";
import type { BMIResultTypes } from "../types";

interface BMIResultProps {
  result: BMIResultTypes;
}

const BMIResult: React.FC<BMIResultProps> = ({ result }) => {
  const getStatusColor = (isHealthy: boolean) => {
    return isHealthy ? "#4CAF50" : "#FF9800";
  };

  return (
    <div className="bmi-result">
      <div className="result-header">
        <h2>Your BMI Result</h2>
      </div>

      <div className="result-content">
        <div className="bmi-score">
          <span className="bmi-number">{result.bmi}</span>
          <span className="bmi-label">BMI</span>
        </div>

        <div
          className="bmi-category"
          style={{ color: getStatusColor(result.isHealthy) }}
        >
          <h3>{result.category}</h3>
          <p
            className={`health-status ${
              result.isHealthy ? "healthy" : "unhealthy"
            }`}
          >
            {result.isHealthy ? "✓ Healthy Range" : "⚠ Outside Healthy Range"}
          </p>
        </div>

        <div className="recommendation">
          <h4>Recommendation:</h4>
          <p>{result.recommendation}</p>
        </div>
      </div>
    </div>
  );
};

export default BMIResult;
