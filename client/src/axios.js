import axios from "axios";

const authAxios = axios.create({
  baseURL: import.meta.env.APP_API_URL,
});

authAxios.interceptors.request.use(
  (config) => {
    config.headers["Authorization"] = `Bearer ${localStorage.getItem(
      "access_token"
    )}`;
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

authAxios.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response.status === 403) {
      localStorage.removeItem("access_token");
    } else throw error;
  }
);

export default authAxios;
