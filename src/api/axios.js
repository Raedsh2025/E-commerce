import axios from "axios";
// Create an instance of axios with the base URL and default headers
const api = axios.create({
  baseURL: "https://test-backend.abdulrahman-hares.com/api",
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

export default api;