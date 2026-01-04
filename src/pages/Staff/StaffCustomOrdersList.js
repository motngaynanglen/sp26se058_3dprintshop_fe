import React, { useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';

const StaffCustomOrdersList = () => {
  const [searchParams] = useSearchParams();
  const initialFilter = searchParams.get('status') || 'all';
  const [filter, setFilter] = useState(initialFilter);
  const [typeFilter, setTypeFilter] = useState('all');

  // Mock orders
  const orders = [
    { id: 'CUST-001', type: 'upload', date: '2024-01-15', status: 'pending', customer: 'John Doe' },
    { id: 'CUST-002', type: 'request_design', date: '2024-01-14', status: 'designing', customer: 'Jane Smith' },
    { id: 'CUST-003', type: 'ai_generate', date: '2024-01-13', status: 'ready_for_preview', customer: 'Bob Johnson' },
    { id: 'CUST-004', type: 'upload', date: '2024-01-12', status: 'pending', customer: 'Alice Brown' }
  ];

  const filteredOrders = orders.filter(order => {
    if (filter !== 'all' && order.status !== filter) return false;
    if (typeFilter !== 'all' && order.type !== typeFilter) return false;
    return true;
  });

  return (
    <div className="max-w-7xl mx-auto px-8 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-800">Custom Orders</h1>
        <Link
          to="/staff/dashboard"
          className="text-indigo-600 hover:text-indigo-800 font-medium"
        >
          ← Back to Dashboard
        </Link>
      </div>

      <div className="mb-6 flex gap-4 flex-wrap">
        <div className="flex gap-2">
          <span className="py-2 px-4 font-medium text-gray-700">Status:</span>
          {['all', 'pending', 'designing', 'ready_for_preview', 'printing'].map(status => (
            <button
              key={status}
              onClick={() => setFilter(status)}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                filter === status ? 'bg-indigo-600 text-white' : 'bg-gray-200 text-gray-800 hover:bg-gray-300'
              }`}
            >
              {status.replace('_', ' ')}
            </button>
          ))}
        </div>
        <div className="flex gap-2">
          <span className="py-2 px-4 font-medium text-gray-700">Type:</span>
          {['all', 'upload', 'request_design', 'ai_generate'].map(type => (
            <button
              key={type}
              onClick={() => setTypeFilter(type)}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                typeFilter === type ? 'bg-indigo-600 text-white' : 'bg-gray-200 text-gray-800 hover:bg-gray-300'
              }`}
            >
              {type.replace('_', ' ')}
            </button>
          ))}
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-4 text-left text-sm font-semibold text-gray-800">Order ID</th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-gray-800">Type</th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-gray-800">Customer</th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-gray-800">Date</th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-gray-800">Status</th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-gray-800">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {filteredOrders.map(order => (
              <tr key={order.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 text-sm font-medium text-gray-800">{order.id}</td>
                <td className="px-6 py-4 text-sm text-gray-600 capitalize">{order.type.replace('_', ' ')}</td>
                <td className="px-6 py-4 text-sm text-gray-600">{order.customer}</td>
                <td className="px-6 py-4 text-sm text-gray-600">{order.date}</td>
                <td className="px-6 py-4">
                  <span className="px-3 py-1 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
                    {order.status.replace('_', ' ')}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <Link
                    to={`/staff/custom-orders/${order.id}`}
                    className="text-indigo-600 hover:text-indigo-800 font-medium"
                  >
                    View Details
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default StaffCustomOrdersList;

