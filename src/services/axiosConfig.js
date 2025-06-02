import axios from "axios";
import { errorAlert } from "../utils/alert";

const API_URL = "https://production.drivelo.ae/api/v1";

const api = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    console.log(error);
    if (error.response) {
      errorAlert(error.response.data.errors || error.response.data.message);
    }
    return Promise.reject(error);
  }
);

export default api;
