import React, { createContext, useState, useContext, useEffect } from 'react';

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

  const login = async (emailOrPhone, password) => {
    // TODO: Replace with actual API call
    // For now, using mock data
    const mockUser = {
      id: '1',
      email: emailOrPhone,
      role: 'customer', // 'customer', 'employee', 'admin'
      name: 'John Doe'
    };
    setUser(mockUser);
    localStorage.setItem('user', JSON.stringify(mockUser));
    return { success: true, user: mockUser };
  };

  const loginWithOTP = async (phoneNumber) => {
    // TODO: Replace with actual API call
    const mockUser = {
      id: '1',
      phone: phoneNumber,
      role: 'customer',
      name: 'John Doe'
    };
    setUser(mockUser);
    localStorage.setItem('user', JSON.stringify(mockUser));
    return { success: true, user: mockUser };
  };

  const register = async (userData) => {
    // TODO: Replace with actual API call
    const mockUser = {
      id: '1',
      ...userData,
      role: 'customer'
    };
    setUser(mockUser);
    localStorage.setItem('user', JSON.stringify(mockUser));
    return { success: true, user: mockUser };
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
  };

  const forgotPassword = async (emailOrPhone) => {
    // TODO: Replace with actual API call
    return { success: true, message: 'Password reset link sent' };
  };

  const value = {
    user,
    login,
    loginWithOTP,
    register,
    logout,
    forgotPassword,
    loading,
    isAuthenticated: !!user,
    isCustomer: user?.role === 'customer',
    isEmployee: user?.role === 'employee',
    isAdmin: user?.role === 'admin'
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

