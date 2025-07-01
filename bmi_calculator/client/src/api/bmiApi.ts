import axios from "axios";
import type { BMIData, BMIRecord, BMIResultTypes } from "../types";

const API_BASE_URL =
  import.meta.env.REACT_APP_API_URL || "http://localhost:5000/api";

const api = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true,
});

// Add auth token to requests
api.interceptors.request.use(async (config) => {
  // @ts-ignore
  const token = await window.Clerk?.session?.getToken();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const calculateBMI = async (data: BMIData): Promise<BMIResultTypes> => {
  const response = await api.post("/bmi/calculate", data);
  return response.data.data;
};

export const getBMIHistory = async (): Promise<BMIRecord[]> => {
  const response = await api.get("/bmi/history");
  return response.data.data;
};
