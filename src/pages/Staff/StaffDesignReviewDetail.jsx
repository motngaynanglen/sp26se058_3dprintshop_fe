import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { staffCustomOrders as mockData } from "../../mock/staffCustomOrders";

const StaffCustomOrderDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [order, setOrder] = useState(null);
  const [status, setStatus] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const found = mockData.find((o) => o.id === id);
    setTimeout(() => {
      setOrder(found);
      setStatus(found?.status || "");
      setLoading(false);
    }, 300);
  }, [id]);

  const handleStatusChange = (newStatus) => {
    setStatus(newStatus);
    alert(`Custom order status updated to ${newStatus.toUpperCase()}`);
    navigate(-1);
  };

  if (loading) return <div className="p-6">Loading...</div>;
  if (!order) return <div className="p-6">Custom order not found</div>;

  return (
    <div className="p-6 space-y-6">
      <button
        onClick={() => navigate(-1)}
        className="text-sm text-gray-600 hover:underline"
      >
        ← Back
      </button>

      <h1 className="text-2xl font-semibold">Custom Order #{order.id}</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <p>
            <strong>Customer:</strong> {order.customerName}
          </p>
          <p>
            <strong>Product:</strong> {order.productName}
          </p>
          <p>
            <strong>Material:</strong> {order.material}
          </p>
          <p>
            <strong>Quantity:</strong> {order.quantity}
          </p>
          <p>
            <strong>Total:</strong> {order.totalPrice.toLocaleString()} đ
          </p>
          <p>
            <strong>Status:</strong>{" "}
            <span className="capitalize">{status}</span>
          </p>
        </div>

        <div className="border rounded p-4 bg-gray-50">
          <p className="font-medium mb-2">Production Notes</p>
          <p className="text-gray-500 text-sm">No notes yet.</p>
        </div>
      </div>

      <div className="flex flex-wrap gap-4">
        <button
          onClick={() => handleStatusChange("confirmed")}
          className="px-4 py-2 rounded bg-blue-600 text-white hover:bg-blue-700"
        >
          Confirm
        </button>
        <button
          onClick={() => handleStatusChange("printing")}
          className="px-4 py-2 rounded bg-yellow-500 text-white hover:bg-yellow-600"
        >
          Start Printing
        </button>
        <button
          onClick={() => handleStatusChange("completed")}
          className="px-4 py-2 rounded bg-green-600 text-white hover:bg-green-700"
        >
          Complete
        </button>
        <button
          onClick={() => handleStatusChange("cancelled")}
          className="px-4 py-2 rounded bg-red-600 text-white hover:bg-red-700"
        >
          Cancel
        </button>
      </div>
    </div>
  );
};

export default StaffCustomOrderDetail;
