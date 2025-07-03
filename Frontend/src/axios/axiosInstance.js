import axios from "axios";

// Create an Axios instance
const axiosInstance = axios.create({
  baseURL: `${import.meta.env.VITE_BASE_URL}/api/v1`, // Change this to your API base URL
  headers: {
    "Content-Type": "application/json",
    withCredentials: true,
  },
});

// Request Interceptor: Attach access token to every request
axiosInstance.interceptors.request.use(
  (config) => {
    return config;
  },
  (error) => Promise.reject(error)
);

export default axiosInstance;
