import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const MyCustomOrders = () => {
  const [filter, setFilter] = useState('all');

  // Mock custom orders
  const orders = [
    { id: 'CUST-001', type: 'upload', date: '2024-01-15', status: 'ready_for_preview', total: 150.00 },
    { id: 'CUST-002', type: 'request_design', date: '2024-01-12', status: 'designing', total: null },
    { id: 'CUST-003', type: 'ai_generate', date: '2024-01-10', status: 'pending_approval', total: 200.00 },
    { id: 'CUST-004', type: 'upload', date: '2024-01-08', status: 'printing', total: 120.00 },
    { id: 'CUST-005', type: 'request_design', date: '2024-01-05', status: 'completed', total: 180.00 }
  ];

  const filteredOrders = filter === 'all' 
    ? orders 
    : orders.filter(order => order.status === filter);

  const getStatusColor = (status) => {
    switch (status) {
      case 'completed': return 'bg-green-100 text-green-800';
      case 'ready_for_preview': return 'bg-blue-100 text-blue-800';
      case 'pending_approval': return 'bg-yellow-100 text-yellow-800';
      case 'designing': return 'bg-purple-100 text-purple-800';
      case 'printing': return 'bg-indigo-100 text-indigo-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getTypeLabel = (type) => {
    switch (type) {
      case 'upload': return 'File Upload';
      case 'request_design': return 'Design Request';
      case 'ai_generate': return 'AI Generated';
      default: return type;
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-8 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-800">My Custom Orders</h1>
        <Link
          to="/custom-order"
          className="py-2 px-6 bg-indigo-600 text-white rounded-lg font-semibold hover:bg-indigo-700 transition-colors"
        >
          + New Custom Order
        </Link>
      </div>

      <div className="mb-6 flex gap-4 flex-wrap">
        <button
          onClick={() => setFilter('all')}
          className={`px-4 py-2 rounded-lg font-medium transition-colors ${
            filter === 'all' ? 'bg-indigo-600 text-white' : 'bg-gray-200 text-gray-800 hover:bg-gray-300'
          }`}
        >
          All
        </button>
        <button
          onClick={() => setFilter('ready_for_preview')}
          className={`px-4 py-2 rounded-lg font-medium transition-colors ${
            filter === 'ready_for_preview' ? 'bg-indigo-600 text-white' : 'bg-gray-200 text-gray-800 hover:bg-gray-300'
          }`}
        >
          Ready for Preview
        </button>
        <button
          onClick={() => setFilter('pending_approval')}
          className={`px-4 py-2 rounded-lg font-medium transition-colors ${
            filter === 'pending_approval' ? 'bg-indigo-600 text-white' : 'bg-gray-200 text-gray-800 hover:bg-gray-300'
          }`}
        >
          Pending Approval
        </button>
        <button
          onClick={() => setFilter('printing')}
          className={`px-4 py-2 rounded-lg font-medium transition-colors ${
            filter === 'printing' ? 'bg-indigo-600 text-white' : 'bg-gray-200 text-gray-800 hover:bg-gray-300'
          }`}
        >
          Printing
        </button>
        <button
          onClick={() => setFilter('completed')}
          className={`px-4 py-2 rounded-lg font-medium transition-colors ${
            filter === 'completed' ? 'bg-indigo-600 text-white' : 'bg-gray-200 text-gray-800 hover:bg-gray-300'
          }`}
        >
          Completed
        </button>
      </div>

      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        {filteredOrders.length === 0 ? (
          <div className="p-12 text-center">
            <p className="text-gray-600 text-lg">No custom orders found</p>
          </div>
        ) : (
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-800">Order ID</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-800">Type</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-800">Date</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-800">Status</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-800">Total</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-800">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {filteredOrders.map(order => (
                <tr key={order.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 text-sm font-medium text-gray-800">{order.id}</td>
                  <td className="px-6 py-4 text-sm text-gray-600">{getTypeLabel(order.type)}</td>
                  <td className="px-6 py-4 text-sm text-gray-600">{order.date}</td>
                  <td className="px-6 py-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(order.status)}`}>
                      {order.status.replace('_', ' ')}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm font-semibold text-gray-800">
                    {order.total ? `$${order.total.toFixed(2)}` : 'Pending'}
                  </td>
                  <td className="px-6 py-4">
                    <Link
                      to={`/custom-orders/${order.id}`}
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

export default MyCustomOrders;

