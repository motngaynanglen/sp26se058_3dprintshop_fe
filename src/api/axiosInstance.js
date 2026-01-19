import axios from "axios";

// TODO: chỉnh lại baseURL cho đúng với backend của bạn
// Ví dụ: http://localhost:8080 hoặc https://your-domain.com
export const axiosInstance = axios.create({
  //baseURL: "https://localhost:5001", // <=== nhớ chỉnh lại cho đúng môi trường của bạn
  baseURL: "/api", // Nhớ dùng file .env! 
  headers: {
    "Content-Type": "application/json",
  },
});

// Gắn token từ localStorage cho mọi request
axiosInstance.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Xử lý lỗi chung (có thể mở rộng theo nhu cầu)
axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    // Có thể log hoặc xử lý lỗi 401, 403 ở đây
    return Promise.reject(error);
  }
);

export default axiosInstance;
