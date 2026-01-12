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
    // Test accounts for different roles
    const testAccounts = {
      'customer@test.com': { password: 'customer123', role: 'customer', name: 'John Customer', id: '1' },
      'employee@test.com': { password: 'employee123', role: 'employee', name: 'Jane Employee', id: '2' },
      'admin@test.com': { password: 'admin123', role: 'admin', name: 'Admin User', id: '3' },
      // Phone number alternatives
      '0123456789': { password: 'customer123', role: 'customer', name: 'John Customer', id: '1' },
      '0987654321': { password: 'employee123', role: 'employee', name: 'Jane Employee', id: '2' },
      '0111222333': { password: 'admin123', role: 'admin', name: 'Admin User', id: '3' }
    };

    const account = testAccounts[emailOrPhone.toLowerCase()];
    
    if (!account) {
      return { success: false, message: 'Invalid email or phone number' };
    }

    if (account.password !== password) {
      return { success: false, message: 'Invalid password' };
    }

    const user = {
      id: account.id,
      email: emailOrPhone.includes('@') ? emailOrPhone : undefined,
      phone: !emailOrPhone.includes('@') ? emailOrPhone : undefined,
      role: account.role,
      name: account.name
    };

    setUser(user);
    localStorage.setItem('user', JSON.stringify(user));
    return { success: true, user };
  };

  const loginWithOTP = async (phoneNumber) => {
    // Test accounts for OTP login (using phone numbers)
    const testAccounts = {
      '0123456789': { role: 'customer', name: 'John Customer', id: '1' },
      '0987654321': { role: 'employee', name: 'Jane Employee', id: '2' },
      '0111222333': { role: 'admin', name: 'Admin User', id: '3' }
    };

    const account = testAccounts[phoneNumber];
    
    if (!account) {
      return { success: false, message: 'Invalid phone number' };
    }

    // For OTP, we'll just accept any OTP code for testing
    const user = {
      id: account.id,
      phone: phoneNumber,
      role: account.role,
      name: account.name
    };

    setUser(user);
    localStorage.setItem('user', JSON.stringify(user));
    return { success: true, user };
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

