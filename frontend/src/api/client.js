import axios from "axios";

const environment = "development";

const baseURL =
  environment == "development"
    ? "http://localhost:5000/api"
    : "https://samarpan-notebook.onrender.com/api";

const api = axios.create({
  baseURL,
});

api.interceptors.request.use(
  (config) => {
    const user = JSON.parse(localStorage.getItem("userInfo"));
    if (user && user.token) {
      config.headers.Authorization = `Bearer ${user.token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default api;
