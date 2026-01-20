import React, { useState } from "react";
import { useParams } from "react-router-dom";

const mockOrderDetail = {
  id: "ORD001",
  customerName: "Nguyễn Văn A",
  email: "a.nguyen@email.com",
  phone: "0901234567",
  product: "Custom Figure",
  quantity: 2,
  material: "PLA",
  color: "Red",
  status: "Pending",
  createdAt: "2026-01-10",
  deliveryAddress: "123 Nguyễn Trãi, Q1, TP.HCM",
  designFile: "figure_v1.stl",
  notes: "Please make it look like the reference image.",
};

const StaffCustomOrderManagementDetail = () => {
  const { id } = useParams();
  const [status, setStatus] = useState(mockOrderDetail.status);

  const handleUpdateStatus = () => {
    alert(`Order ${id} status updated to: ${status}`);
  };

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-semibold">
        Custom Order Detail — {id}
      </h1>

      {/* Order Info */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 border rounded p-4">
        <div>
          <h2 className="font-semibold mb-2">Customer Information</h2>
          <p><strong>Name:</strong> {mockOrderDetail.customerName}</p>
          <p><strong>Email:</strong> {mockOrderDetail.email}</p>
          <p><strong>Phone:</strong> {mockOrderDetail.phone}</p>
        </div>

        <div>
          <h2 className="font-semibold mb-2">Order Information</h2>
          <p><strong>Product:</strong> {mockOrderDetail.product}</p>
          <p><strong>Quantity:</strong> {mockOrderDetail.quantity}</p>
          <p><strong>Material:</strong> {mockOrderDetail.material}</p>
          <p><strong>Color:</strong> {mockOrderDetail.color}</p>
          <p><strong>Status:</strong> {status}</p>
          <p><strong>Created At:</strong> {mockOrderDetail.createdAt}</p>
        </div>
      </div>

      {/* Design */}
      <div className="border rounded p-4 space-y-2">
        <h2 className="font-semibold">Design File</h2>
        <p>File: {mockOrderDetail.designFile}</p>
        <div className="flex gap-2">
          <button className="px-3 py-1 bg-gray-200 rounded hover:bg-gray-300">
            Preview 3D
          </button>
          <button className="px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700">
            Download
          </button>
        </div>
      </div>

      {/* Status Update */}
      <div className="border rounded p-4 space-y-3">
        <h2 className="font-semibold">Update Order Status</h2>
        <select
          className="border px-3 py-2 rounded"
          value={status}
          onChange={(e) => setStatus(e.target.value)}
        >
          <option value="Pending">Pending</option>
          <option value="Printing">Printing</option>
          <option value="Completed">Completed</option>
          <option value="Shipped">Shipped</option>
          <option value="Cancelled">Cancelled</option>
        </select>

        <button
          onClick={handleUpdateStatus}
          className="block px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
        >
          Save Status
        </button>
      </div>
    </div>
  );
};

export default StaffCustomOrderManagementDetail;
