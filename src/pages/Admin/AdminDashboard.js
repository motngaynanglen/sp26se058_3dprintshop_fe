import React from 'react';
import { Link } from 'react-router-dom';

const AdminDashboard = () => {
  // Mock statistics
  const stats = {
    totalOrders: 245,
    revenue: 12500.50,
    pendingCustomOrders: 12,
    responseRating: 4.8
  };

  return (
    <div className="max-w-7xl mx-auto px-8 py-8">
      <h1 className="text-3xl font-bold mb-8 text-gray-800">Admin Dashboard</h1>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-gray-600 mb-2">Total Orders</h3>
          <p className="text-3xl font-bold text-indigo-600">{stats.totalOrders}</p>
        </div>
        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-gray-600 mb-2">Revenue</h3>
          <p className="text-3xl font-bold text-green-600">${stats.revenue.toLocaleString()}</p>
        </div>
        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-gray-600 mb-2">Pending Custom Orders</h3>
          <p className="text-3xl font-bold text-yellow-600">{stats.pendingCustomOrders}</p>
        </div>
        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-gray-600 mb-2">Response Rating</h3>
          <p className="text-3xl font-bold text-blue-600">{stats.responseRating} ⭐</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Link
          to="/admin/products"
          className="bg-white rounded-lg shadow-md p-6 hover:shadow-xl transition-shadow"
        >
          <div className="text-4xl mb-4">📦</div>
          <h3 className="text-xl font-bold mb-2 text-gray-800">Manage Products</h3>
          <p className="text-gray-600">Add, edit, and manage products</p>
        </Link>
        <Link
          to="/admin/materials"
          className="bg-white rounded-lg shadow-md p-6 hover:shadow-xl transition-shadow"
        >
          <div className="text-4xl mb-4">🧱</div>
          <h3 className="text-xl font-bold mb-2 text-gray-800">Manage Materials</h3>
          <p className="text-gray-600">Configure printing materials</p>
        </Link>
        <Link
          to="/admin/staff"
          className="bg-white rounded-lg shadow-md p-6 hover:shadow-xl transition-shadow"
        >
          <div className="text-4xl mb-4">👥</div>
          <h3 className="text-xl font-bold mb-2 text-gray-800">Manage Staff</h3>
          <p className="text-gray-600">Manage employee accounts</p>
        </Link>
        <Link
          to="/admin/users"
          className="bg-white rounded-lg shadow-md p-6 hover:shadow-xl transition-shadow"
        >
          <div className="text-4xl mb-4">👤</div>
          <h3 className="text-xl font-bold mb-2 text-gray-800">Manage Users</h3>
          <p className="text-gray-600">View all users</p>
        </Link>
        <Link
          to="/admin/feedback"
          className="bg-white rounded-lg shadow-md p-6 hover:shadow-xl transition-shadow"
        >
          <div className="text-4xl mb-4">💬</div>
          <h3 className="text-xl font-bold mb-2 text-gray-800">Feedback</h3>
          <p className="text-gray-600">View and filter customer feedback</p>
        </Link>
        <Link
          to="/admin/settings"
          className="bg-white rounded-lg shadow-md p-6 hover:shadow-xl transition-shadow"
        >
          <div className="text-4xl mb-4">⚙️</div>
          <h3 className="text-xl font-bold mb-2 text-gray-800">System Settings</h3>
          <p className="text-gray-600">Configure system settings</p>
        </Link>
      </div>
    </div>
  );
};

export default AdminDashboard;

