import React, { createContext, useState, useContext, useEffect } from 'react';
import { loginApi, registerApi } from '../api/authApi';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Khôi phục phiên đăng nhập khi load lại trang
  useEffect(() => {
    const initializeAuth = () => {
      try {
        const storedUser = localStorage.getItem('user');
        const storedToken = localStorage.getItem('token');

        // Chỉ khôi phục user nếu có cả token (đảm bảo tính toàn vẹn)
        if (storedUser && storedToken) {
          setUser(JSON.parse(storedUser));
        } else {
          // Dọn dẹp rác nếu dữ liệu không đồng bộ
          localStorage.removeItem('user');
          localStorage.removeItem('token');
        }
      } catch (error) {
        console.error("Lỗi khi parse dữ liệu user từ localStorage:", error);
      } finally {
        setLoading(false);
      }
    };

    initializeAuth();
  }, []);

  // Đăng nhập bằng API backend thật
  const login = async (username, password) => {
    try {
      const res = await loginApi({ username, password });

      // Kiểm tra cấu trúc response chuẩn từ BE
      if (res?.statusCode !== 200 || res?.code !== 'SUCCESS') {
        return { success: false, message: res?.message || 'Tài khoản hoặc mật khẩu không chính xác' };
      }

      const data = res.data;

      // Chuẩn hóa dữ liệu user trước khi lưu vào State
      const userFromApi = {
        id: data.accountId,
        username: data.userName,
        fullName: data.fullName,
        image: data.image,
        role: data.role,
      };

      // Lưu Token để Axios Interceptor sử dụng cho các request sau
      if (data.token) {
        localStorage.setItem('token', data.token);
      }

      // Lưu thông tin User
      setUser(userFromApi);
      localStorage.setItem('user', JSON.stringify(userFromApi));

      return { success: true, user: userFromApi };
    } catch (error) {
      const message = error.response?.data?.message || 'Lỗi kết nối máy chủ. Vui lòng thử lại sau.';
      return { success: false, message };
    }
  };

  // Đăng ký bằng API backend
  const register = async ({ username, password, fullName, email, contactPhone }) => {
    try {
      const res = await registerApi({ username, password, fullName, email, contactPhone });

      if (res?.statusCode !== 200 || res?.code !== 'SUCCESS' || !res?.data) {
        return { success: false, message: res?.message || 'Đăng ký thất bại, dữ liệu không hợp lệ.' };
      }

      return { success: true };
    } catch (error) {
      const message = error.response?.data?.message || 'Lỗi kết nối máy chủ. Vui lòng thử lại sau.';
      return { success: false, message };
    }
  };

  // Đăng xuất và dọn dẹp sạch sẽ LocalStorage
  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
    localStorage.removeItem('token');
  };

  // API Quên mật khẩu (Chờ BE cung cấp)
  const forgotPassword = async () => {
    return { success: true, message: 'Tính năng đang được phát triển' };
  };

  // Chuẩn hóa chuỗi Role để so sánh (tránh lỗi viết hoa/thường từ DB)
  const normalizedRole = user?.role?.toLowerCase() || '';

  const value = {
    user,
    login,
    register,
    logout,
    forgotPassword,
    loading,
    isAuthenticated: !!user,
    // Phân quyền chuẩn bị cho PrivateRoute
    isCustomer: normalizedRole === 'customer',
    isEmployee: normalizedRole === 'employee' || normalizedRole === 'staff',
    isAdmin: normalizedRole === 'admin',
    isManager: normalizedRole === 'manager',
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};