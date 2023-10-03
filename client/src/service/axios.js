import axios from "axios";

const authAxios = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

authAxios.interceptors.request.use(
  (config) => {
    config.headers["Authorization"] = `Bearer ${localStorage.getItem(
      "access_token"
    )}`;
    return config;
  },
  (error) => {
    error.message;
  }
);

authAxios.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response.status === 403) {
      localStorage.removeItem("access_token");
      localStorage.removeItem("user")
    } else throw error;
  }
);

export default authAxios;
