import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

// Route dùng cho các trang yêu cầu đăng nhập, có thể kèm role

const PrivateRoute = ({ children, requiredRole }) => {
  const { isAuthenticated, user, loading } = useAuth();

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        Loading...
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  if (requiredRole) {
    const normalizedRole = user?.role?.toLowerCase();
    if (normalizedRole !== requiredRole.toLowerCase()) {
      return <Navigate to="/" replace />;
    }
  }

  return children;
};

export default PrivateRoute;
