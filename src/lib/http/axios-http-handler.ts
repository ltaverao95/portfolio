import axios from "axios";
import { STATUS_CODES } from "http";

const axiosHttp = axios.create({
  baseURL: `${process.env.NEXT_PUBLIC_API_BACKEND_URL}/api`,
});

axiosHttp.interceptors.request.use(
  (config: any) => {
    const token = localStorage.getItem("auth_token");
    return {
      ...config,
      headers: {
        ...(token !== null && { Authorization: `Bearer ${token}` }),
        ...config.headers,
      },
    };
  },
  (error) => {
    return Promise.reject(error);
  }
);

axiosHttp.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.status === 401 || error.response?.status === 401) {
      localStorage.removeItem("auth_token");
      window.location.href = "/login";
    }

    return Promise.reject(error);
  }
);

export default axiosHttp;
