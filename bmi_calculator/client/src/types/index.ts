export interface BMIData {
  height: number;
  weight: number;
  unit: "metric" | "imperial";
}

export interface BMIResultTypes {
  bmi: number;
  category: string;
  isHealthy: boolean;
  recommendation: string;
  id?: string;
}

export interface BMIRecord extends BMIResultTypes {
  _id: string;
  userId: string;
  height: number;
  weight: number;
  unit: "metric" | "imperial";
  createdAt: string;
}
