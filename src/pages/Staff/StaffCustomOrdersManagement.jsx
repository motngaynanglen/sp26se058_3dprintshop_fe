import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const mockOrders = [
  {
    id: "ORD001",
    customerName: "Nguyễn Văn A",
    product: "Custom Figure",
    status: "Pending",
    createdAt: "2026-01-10",
    priority: "Normal",
  },
  {
    id: "ORD002",
    customerName: "Trần Thị B",
    product: "3D Printed Keycap",
    status: "Printing",
    createdAt: "2026-01-11",
    priority: "High",
  },
  {
    id: "ORD003",
    customerName: "Lê Văn C",
    product: "Custom Trophy",
    status: "Completed",
    createdAt: "2026-01-12",
    priority: "Normal",
  },
];

const StaffCustomOrdersManagement = () => {
  const navigate = useNavigate();
  const [statusFilter, setStatusFilter] = useState("All");
  const [search, setSearch] = useState("");

  const filteredOrders = mockOrders.filter((order) => {
    const matchStatus =
      statusFilter === "All" || order.status === statusFilter;
    const matchSearch =
      order.id.toLowerCase().includes(search.toLowerCase()) ||
      order.customerName.toLowerCase().includes(search.toLowerCase());
    return matchStatus && matchSearch;
  });

  return (
    <div className="p-6 space-y-4">
      <h1 className="text-2xl font-semibold">Custom Orders Management</h1>

      {/* Filters */}
      <div className="flex flex-wrap gap-4">
        <input
          type="text"
          placeholder="Search by order ID or customer..."
          className="border px-3 py-2 rounded w-64"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <select
          className="border px-3 py-2 rounded"
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
        >
          <option value="All">All Status</option>
          <option value="Pending">Pending</option>
          <option value="Printing">Printing</option>
          <option value="Completed">Completed</option>
          <option value="Shipped">Shipped</option>
          <option value="Cancelled">Cancelled</option>
        </select>
      </div>

      {/* Table */}
      <div className="overflow-x-auto border rounded">
        <table className="w-full text-sm">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-3 text-left">Order ID</th>
              <th className="p-3 text-left">Customer</th>
              <th className="p-3 text-left">Product</th>
              <th className="p-3 text-left">Status</th>
              <th className="p-3 text-left">Priority</th>
              <th className="p-3 text-left">Created At</th>
              <th className="p-3 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredOrders.map((order) => (
              <tr key={order.id} className="border-t hover:bg-gray-50">
                <td className="p-3">{order.id}</td>
                <td className="p-3">{order.customerName}</td>
                <td className="p-3">{order.product}</td>
                <td className="p-3">
                  <span className="px-2 py-1 rounded bg-blue-100 text-blue-700 text-xs">
                    {order.status}
                  </span>
                </td>
                <td className="p-3">{order.priority}</td>
                <td className="p-3">{order.createdAt}</td>
                <td className="p-3 space-x-2">
                  <button
                    onClick={() =>
                      navigate(`/staff/custom-orders-management/${order.id}`)
                    }
                    className="px-3 py-1 text-sm bg-blue-600 text-white rounded hover:bg-blue-700"
                  >
                    View
                  </button>
                  <button className="px-3 py-1 text-sm bg-green-600 text-white rounded hover:bg-green-700">
                    Update Status
                  </button>
                </td>
              </tr>
            ))}
            {filteredOrders.length === 0 && (
              <tr>
                <td colSpan={7} className="p-6 text-center text-gray-500">
                  No orders found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default StaffCustomOrdersManagement;
