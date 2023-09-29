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
    console.log(error);
    if (error === 403) {
      localStorage.removeItem("access_token");
    } else throw error;
  }
);

export default authAxios;
