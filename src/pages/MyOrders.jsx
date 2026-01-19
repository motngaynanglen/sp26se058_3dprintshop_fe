import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const MyOrders = () => {
  const [filter, setFilter] = useState('all');

  // Mock orders data
  const orders = [
    { id: 'ORD-001', date: '2024-01-15', status: 'completed', total: 69.97, type: 'product' },
    { id: 'ORD-002', date: '2024-01-10', status: 'shipping', total: 29.99, type: 'product' },
    { id: 'CUST-001', date: '2024-01-08', status: 'in_progress', total: 150.00, type: 'custom' },
    { id: 'ORD-003', date: '2024-01-05', status: 'completed', total: 45.50, type: 'product' }
  ];

  const filteredOrders = filter === 'all' 
    ? orders 
    : orders.filter(order => order.type === filter);

  const getStatusColor = (status) => {
    switch (status) {
      case 'completed': return 'bg-green-100 text-green-800';
      case 'shipping': return 'bg-blue-100 text-blue-800';
      case 'in_progress': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-8 py-8">
      <h1 className="text-3xl font-bold mb-8 text-gray-800">My Orders</h1>
      
      <div className="mb-6 flex gap-4">
        <button
          onClick={() => setFilter('all')}
          className={`px-4 py-2 rounded-lg font-medium transition-colors ${
            filter === 'all' ? 'bg-indigo-600 text-white' : 'bg-gray-200 text-gray-800 hover:bg-gray-300'
          }`}
        >
          All Orders
        </button>
        <button
          onClick={() => setFilter('product')}
          className={`px-4 py-2 rounded-lg font-medium transition-colors ${
            filter === 'product' ? 'bg-indigo-600 text-white' : 'bg-gray-200 text-gray-800 hover:bg-gray-300'
          }`}
        >
          Product Orders
        </button>
        <button
          onClick={() => setFilter('custom')}
          className={`px-4 py-2 rounded-lg font-medium transition-colors ${
            filter === 'custom' ? 'bg-indigo-600 text-white' : 'bg-gray-200 text-gray-800 hover:bg-gray-300'
          }`}
        >
          Custom Orders
        </button>
      </div>

      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        {filteredOrders.length === 0 ? (
          <div className="p-12 text-center">
            <p className="text-gray-600 text-lg">No orders found</p>
          </div>
        ) : (
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-800">Order ID</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-800">Date</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-800">Type</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-800">Status</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-800">Total</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-800">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {filteredOrders.map(order => (
                <tr key={order.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 text-sm font-medium text-gray-800">{order.id}</td>
                  <td className="px-6 py-4 text-sm text-gray-600">{order.date}</td>
                  <td className="px-6 py-4 text-sm text-gray-600 capitalize">{order.type}</td>
                  <td className="px-6 py-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(order.status)}`}>
                      {order.status.replace('_', ' ')}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm font-semibold text-gray-800">${order.total.toFixed(2)}</td>
                  <td className="px-6 py-4">
                    <Link
                      to={order.type === 'custom' ? `/custom-orders/${order.id}` : `/orders/${order.id}`}
                      className="text-indigo-600 hover:text-indigo-800 font-medium"
                    >
                      View Details
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default MyOrders;

