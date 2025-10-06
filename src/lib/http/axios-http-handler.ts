import axios from "axios";

const axiosHttp = axios.create({
  baseURL: `${process.env.NEXT_PUBLIC_API_BACKEND_URL}/api`,
});

axiosHttp.interceptors.request.use(
  (config: any) => {
    const token =  localStorage.getItem("auth_token");
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

export default axiosHttp;