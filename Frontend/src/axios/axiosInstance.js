import axios from "axios";

// Create an Axios instance
const axiosInstance = axios.create({
  baseURL: `${import.meta.env.VITE_BASE_URL}/api/v1`, // Change this to your API base URL
  headers: {
    "Content-Type": "application/json",
    withCredentials: true,
  },
});

// Function to get tokens from localStorage
const getAccessToken = () => localStorage.getItem("accessToken");
const getRefreshToken = () => localStorage.getItem("refreshToken");

// Request Interceptor: Attach access token to every request
axiosInstance.interceptors.request.use(
  (config) => {
    const token = getAccessToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Function to refresh access token
// const refreshAccessToken = async () => {
//   try {
//     const refreshToken = getRefreshToken();
//     const response = await axios.post(
//       "https://your-api-url.com/api/v1/auth/refresh",
//       { refreshToken }
//     );
//     const { accessToken } = response.data;

//     // Store new access token
//     localStorage.setItem("accessToken", accessToken);

//     return accessToken;
//   } catch (error) {
//     console.error("Failed to refresh access token:", error);
//     localStorage.removeItem("accessToken");
//     localStorage.removeItem("refreshToken");
//     window.location.href = "/login"; // Redirect to login page if refresh fails
//     return null;
//   }
// };

// Response Interceptor: Automatically refresh token on 401 error
// axiosInstance.interceptors.response.use(
//   (response) => response,
//   async (error) => {
//     const originalRequest = error.config;

//     // If 401 error & request is not already retried
//     if (
//       error.response &&
//       error.response.status === 401 &&
//       !originalRequest._retry
//     ) {
//       originalRequest._retry = true; // Mark request as retried

//       const newAccessToken = await refreshAccessToken();
//       if (newAccessToken) {
//         axiosInstance.defaults.headers.Authorization = `Bearer ${newAccessToken}`;
//         originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
//         return axiosInstance(originalRequest); // Retry the request with new token
//       }
//     }

//     return Promise.reject(error);
//   }
// );

export default axiosInstance;
