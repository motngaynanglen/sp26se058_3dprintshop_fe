import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';

const Header = () => {
  const { user, logout, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <header className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-4 shadow-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-8 flex justify-between items-center">
        <Link to="/" className="text-white no-underline">
          <h1 className="m-0 text-2xl font-bold">3D Print Shop</h1>
        </Link>
        
        <nav className="flex gap-8 items-center">
          <Link to="/" className="text-white no-underline font-medium hover:opacity-80 transition-opacity">Home</Link>
          <Link to="/products" className="text-white no-underline font-medium hover:opacity-80 transition-opacity">Products</Link>
          {isAuthenticated && (
            <>
              <Link to="/custom-order" className="text-white no-underline font-medium hover:opacity-80 transition-opacity">Custom Order</Link>
              <Link to="/my-orders" className="text-white no-underline font-medium hover:opacity-80 transition-opacity">My Orders</Link>
            </>
          )}
          {user?.role === 'employee' && (
            <Link to="/staff/dashboard" className="text-white no-underline font-medium hover:opacity-80 transition-opacity">Staff Dashboard</Link>
          )}
          {user?.role === 'admin' && (
            <Link to="/admin/dashboard" className="text-white no-underline font-medium hover:opacity-80 transition-opacity">Admin Dashboard</Link>
          )}
        </nav>

        <div className="flex items-center gap-4">
          {isAuthenticated ? (
            <div className="flex items-center gap-4">
              <span>Welcome, {user?.name || user?.email}</span>
              <Link to="/cart" className="text-2xl text-white no-underline">🛒</Link>
              <button 
                onClick={handleLogout} 
                className="bg-white/20 border border-white text-white py-2 px-4 rounded cursor-pointer font-medium hover:bg-white/30 transition-colors"
              >
                Logout
              </button>
            </div>
          ) : (
            <div className="flex gap-4">
              <Link to="/login" className="bg-transparent text-white border border-white py-2 px-6 rounded no-underline font-medium hover:bg-white/10 transition-colors">
                Login
              </Link>
              <Link to="/register" className="bg-white text-indigo-600 py-2 px-6 rounded no-underline font-medium hover:bg-gray-100 transition-colors">
                Register
              </Link>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;

