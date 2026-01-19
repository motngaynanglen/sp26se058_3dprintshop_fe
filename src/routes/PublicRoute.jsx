import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

// Route dùng cho các trang public (login, register, ...) 
// Nếu đã đăng nhập thì điều hướng sang trang phù hợp với role.
const PublicRoute = ({ children }) => {
  const { isAuthenticated, isAdmin, isEmployee } = useAuth();

  if (!isAuthenticated) {
    return children;
  }

  if (isAdmin) {
    return <Navigate to="/admin/dashboard" replace />;
  }

  if (isEmployee) {
    return <Navigate to="/staff/dashboard" replace />;
  }

  return <Navigate to="/" replace />;
};

export default PublicRoute;


