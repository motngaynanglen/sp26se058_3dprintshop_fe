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

  useEffect(() => {
    // Check for stored user session
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setLoading(false);
  }, []);

  // Đăng nhập bằng API backend
  const login = async (username, password) => {
    try {
      const res = await loginApi({ username, password });

      if (res?.statusCode !== 200 || res?.code !== 'SUCCESS') {
        return { success: false, message: res?.message || 'Đăng nhập thất bại' };
      }

      const data = res.data;

      const userFromApi = {
        id: data.accountId,
        username: data.userName,
        fullName: data.fullName,
        image: data.image,
        role: data.role, // ví dụ: "Customer", "Admin", "Staff"
      };

      // Lưu token để interceptor tự gắn Authorization
      if (data.token) {
        localStorage.setItem('token', data.token);
      }

      setUser(userFromApi);
      localStorage.setItem('user', JSON.stringify(userFromApi));

      return { success: true, user: userFromApi };
    } catch (error) {
      const message =
        error.response?.data?.message || 'Đăng nhập thất bại. Vui lòng thử lại.';
      return { success: false, message };
    }
  };

  // Đăng ký bằng API backend
  const register = async ({ username, password, fullName, email, phoneNumber }) => {
    try {
      const res = await registerApi({ username, password, fullName, email, phoneNumber });

      if (res?.statusCode !== 200 || res?.code !== 'SUCCESS' || !res?.data) {
        return { success: false, message: res?.message || 'Đăng ký thất bại' };
      }

      // Backend chỉ trả về data: true, nên sau khi đăng ký có thể:
      // - tự động đăng nhập (gọi lại login)
      // - hoặc redirect user tới trang login
      // Ở đây: chỉ báo success, không set user.
      return { success: true };
    } catch (error) {
      const message =
        error.response?.data?.message || 'Đăng ký thất bại. Vui lòng thử lại.';
      return { success: false, message };
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
    localStorage.removeItem('token');
  };

  // Placeholder, sẽ gắn API thật khi backend có
  const forgotPassword = async () => {
    return { success: true, message: 'Password reset link sent' };
  };

  const normalizedRole = user?.role?.toLowerCase();

  const value = {
    user,
    login,
    register,
    logout,
    forgotPassword,
    loading,
    isAuthenticated: !!user,
    isCustomer: normalizedRole === 'customer',
    isEmployee: normalizedRole === 'employee' || normalizedRole === 'staff',
    isAdmin: normalizedRole === 'admin',
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

