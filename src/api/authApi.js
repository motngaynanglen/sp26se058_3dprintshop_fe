import axiosInstance from './axiosInstance';
import { AUTH_ENDPOINTS } from './endpoints';

// Đăng ký tài khoản khách hàng
export const registerApi = async ({ username, password, fullName, email, contactPhone }) => {
  const payload = {
    username,
    password,
    fullName,
    email,
    contactPhone,
  };

  const response = await axiosInstance.post(AUTH_ENDPOINTS.REGISTER, payload);
  return response.data;
};

// Đăng nhập
export const loginApi = async ({ username, password }) => {
  const payload = {
    username,
    password,
  };

  const response = await axiosInstance.post(AUTH_ENDPOINTS.LOGIN, payload);
  return response.data;
};


