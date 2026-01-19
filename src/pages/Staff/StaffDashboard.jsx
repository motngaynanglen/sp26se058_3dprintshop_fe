import React from 'react';
import { Link } from 'react-router-dom';

const StaffDashboard = () => {
  // Mock statistics
  const stats = {
    pendingOrders: 12,
    inProgress: 8,
    readyForPreview: 5,
    completedToday: 3
  };

  return (
    <div className="max-w-7xl mx-auto px-8 py-8">
      <h1 className="text-3xl font-bold mb-8 text-gray-800">Staff Dashboard</h1>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-gray-600 mb-2">Pending Orders</h3>
          <p className="text-3xl font-bold text-indigo-600">{stats.pendingOrders}</p>
        </div>
        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-gray-600 mb-2">In Progress</h3>
          <p className="text-3xl font-bold text-yellow-600">{stats.inProgress}</p>
        </div>
        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-gray-600 mb-2">Ready for Preview</h3>
          <p className="text-3xl font-bold text-blue-600">{stats.readyForPreview}</p>
        </div>
        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-gray-600 mb-2">Completed Today</h3>
          <p className="text-3xl font-bold text-green-600">{stats.completedToday}</p>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-800">Quick Actions</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Link
            to="/staff/custom-orders"
            className="p-6 bg-indigo-50 rounded-lg border-2 border-indigo-200 hover:border-indigo-600 transition-colors text-center"
          >
            <div className="text-4xl mb-3">📋</div>
            <h3 className="font-semibold text-gray-800">View All Orders</h3>
            <p className="text-sm text-gray-600 mt-2">Manage custom orders</p>
          </Link>
          <Link
            to="/staff/custom-orders?status=pending"
            className="p-6 bg-yellow-50 rounded-lg border-2 border-yellow-200 hover:border-yellow-600 transition-colors text-center"
          >
            <div className="text-4xl mb-3">⏳</div>
            <h3 className="font-semibold text-gray-800">Pending Orders</h3>
            <p className="text-sm text-gray-600 mt-2">Review new requests</p>
          </Link>
          <Link
            to="/staff/custom-orders?status=ready_for_preview"
            className="p-6 bg-blue-50 rounded-lg border-2 border-blue-200 hover:border-blue-600 transition-colors text-center"
          >
            <div className="text-4xl mb-3">👁️</div>
            <h3 className="font-semibold text-gray-800">Ready for Preview</h3>
            <p className="text-sm text-gray-600 mt-2">Files awaiting review</p>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default StaffDashboard;

