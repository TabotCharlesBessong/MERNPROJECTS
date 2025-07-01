export interface BMIData {
  height: number;
  weight: number;
  unit: "metric" | "imperial";
}

export interface BMIResult {
  bmi: number;
  category: string;
  isHealthy: boolean;
  recommendation: string;
}

export interface BMIRecord {
  _id?: string;
  userId: string;
  height: number;
  weight: number;
  unit: "metric" | "imperial";
  bmi: number;
  category: string;
  isHealthy: boolean;
  createdAt: Date;
}
