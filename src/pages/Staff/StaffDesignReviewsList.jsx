import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { staffCustomOrders as mockData } from '../../mock/staffCustomOrders';

const StaffCustomOrdersList = () => {
  const [orders, setOrders] = useState([]);
  const [statusFilter, setStatusFilter] = useState('all');
  const navigate = useNavigate();

  useEffect(() => {
    setTimeout(() => {
      setOrders(mockData);
    }, 300);
  }, []);

  const filteredOrders =
    statusFilter === 'all'
      ? orders
      : orders.filter(o => o.status === statusFilter);

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-semibold">Custom Orders Management</h1>

      <div className="flex gap-4">
        <select
          value={statusFilter}
          onChange={e => setStatusFilter(e.target.value)}
          className="border rounded px-3 py-2"
        >
          <option value="all">All</option>
          <option value="pending">Pending</option>
          <option value="confirmed">Confirmed</option>
          <option value="printing">Printing</option>
          <option value="completed">Completed</option>
          <option value="cancelled">Cancelled</option>
        </select>
      </div>

      <div className="overflow-x-auto border rounded">
        <table className="w-full text-sm">
          <thead className="bg-gray-100 text-left">
            <tr>
              <th className="p-3">Order ID</th>
              <th className="p-3">Customer</th>
              <th className="p-3">Product</th>
              <th className="p-3">Qty</th>
              <th className="p-3">Total</th>
              <th className="p-3">Status</th>
              <th className="p-3">Action</th>
            </tr>
          </thead>
          <tbody>
            {filteredOrders.map(order => (
              <tr key={order.id} className="border-t hover:bg-gray-50">
                <td className="p-3">{order.id}</td>
                <td className="p-3">{order.customerName}</td>
                <td className="p-3">{order.productName}</td>
                <td className="p-3">{order.quantity}</td>
                <td className="p-3">{order.totalPrice.toLocaleString()} đ</td>
                <td className="p-3 capitalize">{order.status}</td>
                <td className="p-3">
                  <button
                    onClick={() => navigate(`/staff/custom-orders/${order.id}`)}
                    className="text-blue-600 hover:underline"
                  >
                    View
                  </button>
                </td>
              </tr>
            ))}

            {filteredOrders.length === 0 && (
              <tr>
                <td colSpan="7" className="p-6 text-center text-gray-500">
                  No custom orders found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default StaffCustomOrdersList;
