import axios from "axios";
import { errorAlert } from "../utils/alert";

const API_URL = "http://16.16.31.243:3000/api/v1/";

const api = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.request.use(
  (config) => {
    const token =
      localStorage.getItem("token") ||
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImY0NTIzMzhmLWFjYmEtNGRiNy04MGI0LTdmZTg5NGI3ZGMzYiIsInBob25lX251bWJlciI6Iis5MjMwNzY1ODI4NTYiLCJ1c2VyX3R5cGUiOiJhZG1pbiIsImlhdCI6MTczMzUyMzEzN30.BrfJSR0q8dQi9qnZlmDLKA_-Iy3lNGcw9tnfSKMa-v8";
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
