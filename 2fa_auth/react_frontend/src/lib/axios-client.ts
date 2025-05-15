import axios from "axios";

const baseURL = import.meta.env.VITE_API_BASE_URL;

const options = {
  baseURL,
  withCredentials: true,
  timeout: 10000,
};

const API = axios.create(options);

export const APIRefresh = axios.create(options);
APIRefresh.interceptors.response.use((response) => response);

API.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    const { data, status } = error.response;
    if (data === "Unauthorized" && status === 401) {
      try {
        await APIRefresh.get("/auth/refresh");
        return APIRefresh(error.config);
      } catch (error) {
        console.log(error);
        window.location.href = "/";
      }
    }
    return Promise.reject({
      ...data,
    });
  }
);

export default API;
