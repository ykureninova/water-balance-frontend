import axios from "axios";
import { getToken, logout } from "../utils/storage.js";

const baseURL = import.meta.env.VITE_API_URL || "http://localhost:3000/";

const instance = axios.create({
  baseURL,
  headers: { "Content-Type": "application/json" },
});

instance.interceptors.request.use(
  (config) => {
    const token = getToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

instance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      logout();
      if (window.location.pathname !== "/login") {
        window.location.href = "/login";
      }
    }
    return Promise.reject(error);
  }
);

export const api = async (url, options = {}) => {
  const config = { url, method: "get", ...options };
  const response = await instance(config);
  return response.data;
};

export { instance as apiClient };
