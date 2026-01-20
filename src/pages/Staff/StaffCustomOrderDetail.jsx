import React, { useState } from "react";
import { useParams } from "react-router-dom";

/**
 * MOCK DATA
 */
const mockOrder = {
  id: "123",
  customerName: "Nguyễn Văn A",
  productType: "Custom 3D Figure",
  material: "Resin",
  size: "15cm",
  status: "Waiting for design",
  createdAt: "2026-01-10",
  description: "Mô hình nhân vật theo ảnh đính kèm",
  referenceImages: [
    "https://via.placeholder.com/150",
    "https://via.placeholder.com/150",
  ],
};

const mockMessages = [
  { id: 1, sender: "customer", content: "Mình muốn nhân vật cười nhẹ hơn." },
  { id: 2, sender: "staff", content: "Ok mình sẽ chỉnh lại cho bạn nhé!" },
];

const StaffCustomOrderDetail = () => {
  const { id } = useParams();

  const [order, setOrder] = useState(mockOrder);
  const [messages, setMessages] = useState(mockMessages);
  const [newMessage, setNewMessage] = useState("");
  const [previewFile, setPreviewFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);

  const handleSendMessage = () => {
    if (!newMessage.trim()) return;
    setMessages([
      ...messages,
      { id: Date.now(), sender: "staff", content: newMessage },
    ]);
    setNewMessage("");
  };

  const handleUploadPreview = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setPreviewFile(file);
    setPreviewUrl(URL.createObjectURL(file));
  };

  const handleApprove = () => {
    setOrder({ ...order, status: "Design approved" });
    alert("✅ Đã duyệt thiết kế!");
  };

  const handleReject = () => {
    setOrder({ ...order, status: "Need revision" });
    alert("❌ Yêu cầu chỉnh sửa thiết kế!");
  };

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-6">
      <h1 className="text-2xl font-bold">Custom Order #{id}</h1>

      {/* ORDER INFO */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-white rounded-xl shadow p-4">
        <div>
          <p>
            <b>Khách hàng:</b> {order.customerName}
          </p>
          <p>
            <b>Sản phẩm:</b> {order.productType}
          </p>
          <p>
            <b>Chất liệu:</b> {order.material}
          </p>
          <p>
            <b>Kích thước:</b> {order.size}
          </p>
        </div>
        <div>
          <p>
            <b>Trạng thái:</b>
            <span className="ml-2 px-3 py-1 rounded bg-yellow-100 text-yellow-800 text-sm">
              {order.status}
            </span>
          </p>
          <p>
            <b>Ngày tạo:</b> {order.createdAt}
          </p>
        </div>
      </div>

      {/* DESCRIPTION + REFERENCES */}
      <div className="bg-white rounded-xl shadow p-4">
        <h2 className="font-semibold mb-2">Yêu cầu khách hàng</h2>
        <p className="mb-3">{order.description}</p>

        <div className="flex gap-3">
          {order.referenceImages.map((img, index) => (
            <img
              key={index}
              src={img}
              alt="reference"
              className="w-24 h-24 object-cover rounded border"
            />
          ))}
        </div>
      </div>

      {/* UPLOAD DESIGN PREVIEW */}
      <div className="bg-white rounded-xl shadow p-4 space-y-3">
        <h2 className="font-semibold">Upload file preview thiết kế</h2>
        <input type="file" onChange={handleUploadPreview} />

        {previewUrl && (
          <div className="mt-3">
            <p className="text-sm text-gray-600 mb-1">Preview:</p>
            <img
              src={previewUrl}
              alt="preview"
              className="w-48 rounded border"
            />
          </div>
        )}
      </div>

      {/* ACTION BUTTONS */}
      <div className="flex gap-3">
        <button
          onClick={handleApprove}
          className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
        >
          Duyệt thiết kế
        </button>
        <button
          onClick={handleReject}
          className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
        >
          Yêu cầu chỉnh sửa
        </button>
      </div>

      {/* CHAT / FEEDBACK */}
      <div className="bg-white rounded-xl shadow p-4 flex flex-col h-[350px]">
        <h2 className="font-semibold mb-2">Trao đổi với khách hàng</h2>

        <div className="flex-1 overflow-y-auto space-y-2 mb-3">
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`max-w-xs px-3 py-2 rounded-lg text-sm ${
                msg.sender === "staff"
                  ? "ml-auto bg-blue-600 text-white"
                  : "mr-auto bg-gray-200 text-gray-800"
              }`}
            >
              {msg.content}
            </div>
          ))}
        </div>

        <div className="flex gap-2">
          <input
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            placeholder="Nhập phản hồi..."
            className="flex-1 border rounded px-3 py-2"
          />
          <button
            onClick={handleSendMessage}
            className="bg-blue-600 text-white px-4 rounded"
          >
            Gửi
          </button>
        </div>
      </div>
    </div>
  );
};

export default StaffCustomOrderDetail;
