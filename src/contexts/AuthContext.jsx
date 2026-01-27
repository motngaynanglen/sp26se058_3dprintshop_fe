// import React, { createContext, useState, useContext, useEffect } from 'react';
// import { loginApi, registerApi } from '../api/authApi';

// const AuthContext = createContext();

// export const useAuth = () => {
//   const context = useContext(AuthContext);
//   if (!context) {
//     throw new Error('useAuth must be used within an AuthProvider');
//   }
//   return context;
// };

// export const AuthProvider = ({ children }) => {
//   const [user, setUser] = useState(null);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     // Check for stored user session
//     const storedUser = localStorage.getItem('user');
//     if (storedUser) {
//       setUser(JSON.parse(storedUser));
//     }
//     setLoading(false);
//   }, []);

//   // Đăng nhập bằng API backend
//   const login = async (username, password) => {
//     try {
//       const res = await loginApi({ username, password });

//       if (res?.statusCode !== 200 || res?.code !== 'SUCCESS') {
//         return { success: false, message: res?.message || 'Đăng nhập thất bại' };
//       }

//       const data = res.data;

//       const userFromApi = {
//         id: data.accountId,
//         username: data.userName,
//         fullName: data.fullName,
//         image: data.image,
//         role: data.role, // ví dụ: "Customer", "Admin", "Staff"
//       };

//       // Lưu token để interceptor tự gắn Authorization
//       if (data.token) {
//         localStorage.setItem('token', data.token);
//       }

//       setUser(userFromApi);
//       localStorage.setItem('user', JSON.stringify(userFromApi));

//       return { success: true, user: userFromApi };
//     } catch (error) {
//       const message =
//         error.response?.data?.message || 'Đăng nhập thất bại. Vui lòng thử lại.';
//       return { success: false, message };
//     }
//   };

//   // Đăng ký bằng API backend
//   const register = async ({ username, password, fullName, email, phoneNumber }) => {
//     try {
//       const res = await registerApi({ username, password, fullName, email, phoneNumber });

//       if (res?.statusCode !== 200 || res?.code !== 'SUCCESS' || !res?.data) {
//         return { success: false, message: res?.message || 'Đăng ký thất bại' };
//       }

//       // Backend chỉ trả về data: true, nên sau khi đăng ký có thể:
//       // - tự động đăng nhập (gọi lại login)
//       // - hoặc redirect user tới trang login
//       // Ở đây: chỉ báo success, không set user.
//       return { success: true };
//     } catch (error) {
//       const message =
//         error.response?.data?.message || 'Đăng ký thất bại. Vui lòng thử lại.';
//       return { success: false, message };
//     }
//   };

//   const logout = () => {
//     setUser(null);
//     localStorage.removeItem('user');
//     localStorage.removeItem('token');
//   };

//   // Placeholder, sẽ gắn API thật khi backend có
//   const forgotPassword = async () => {
//     return { success: true, message: 'Password reset link sent' };
//   };

//   const normalizedRole = user?.role?.toLowerCase();

//   const value = {
//     user,
//     login,
//     register,
//     logout,
//     forgotPassword,
//     loading,
//     isAuthenticated: !!user,
//     isCustomer: normalizedRole === 'customer',
//     isEmployee: normalizedRole === 'employee' || normalizedRole === 'staff',
//     isAdmin: normalizedRole === 'admin',
//   };

//   return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
// };
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

const DEV_MOCK_AUTH = false; // 🔥 bật/tắt tại đây

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (DEV_MOCK_AUTH) {
      const mockUser = {
        id: 'staff-001',
        username: 'staff_demo',
        fullName: 'Staff Demo',
        role: 'employee', // rất quan trọng cho PrivateRoute
      };
      setUser(mockUser);
      setLoading(false);
      return;
    }

    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setLoading(false);
  }, []);

  const login = async (username, password) => {
    // Mock login logic for testing roles based on TEST_ACCOUNTS.md
    const MOCK_ACCOUNTS = [
      {
        email: 'customer@test.com',
        phone: '0123456789',
        password: 'customer123',
        user: {
          id: 'customer-001',
          username: 'customer',
          fullName: 'Test Customer',
          role: 'Customer',
        }
      },
      {
        email: 'employee@test.com',
        phone: '0987654321',
        password: 'employee123',
        user: {
          id: 'staff-001',
          username: 'employee',
          fullName: 'Test Employee',
          role: 'Employee',
        }
      },
      {
        email: 'admin@test.com',
        phone: '0111222333',
        password: 'admin123',
        user: {
          id: 'admin-001',
          username: 'admin',
          fullName: 'Test Admin',
          role: 'Admin',
        }
      },
      {
        email: 'manager@test.com',
        phone: '0999888777',
        password: 'manager123',
        user: {
          id: 'manager-001',
          username: 'manager',
          fullName: 'Test Manager',
          role: 'Manager',
        }
      }
    ];

    const foundAccount = MOCK_ACCOUNTS.find(
      acc => (acc.email === username.toLowerCase() || acc.phone === username) && acc.password === password
    );

    if (foundAccount) {
      setUser(foundAccount.user);
      localStorage.setItem('user', JSON.stringify(foundAccount.user));
      return { success: true, user: foundAccount.user };
    }

    // Nếu không phải các tài khoản test trên, gọi API thật (bỏ qua đoạn check DEV_MOCK_AUTH cũ)

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
        role: data.role,
      };

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

  const register = async ({ username, password, fullName, email, phoneNumber }) => {
    if (DEV_MOCK_AUTH) {
      return { success: true };
    }

    try {
      const res = await registerApi({ username, password, fullName, email, phoneNumber });

      if (res?.statusCode !== 200 || res?.code !== 'SUCCESS' || !res?.data) {
        return { success: false, message: res?.message || 'Đăng ký thất bại' };
      }

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
    isManager: normalizedRole === 'manager',
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

