import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

const mockOrder = {
  id: 101,
  customerName: "Nguyễn Văn A",
  status: "Processing",
  createdAt: "2025-01-15",
  items: [
    {
      id: 1,
      name: "Móc khóa nhựa PLA",
      type: "normal",
      status: "Pending",
      quantity: 2,
    },
    {
      id: 2,
      name: "Tượng nhân vật custom",
      type: "custom-design",
      status: "Waiting for design",
      quantity: 1,
      designVersions: [],
    },
    {
      id: 3,
      name: "Case điện thoại in 3D từ file khách",
      type: "custom-file",
      status: "Waiting for review",
      quantity: 1,
      customerFile: "phone_case.stl",
    },
  ],
};

const StaffCustomOrderDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [order, setOrder] = useState(mockOrder);
  const [uploadingItemId, setUploadingItemId] = useState(null);
  const [previewFile, setPreviewFile] = useState(null);
  const [note, setNote] = useState("");

  const updateItemStatus = (itemId, newStatus) => {
    setOrder((prev) => ({
      ...prev,
      items: prev.items.map((item) =>
        item.id === itemId ? { ...item, status: newStatus } : item
      ),
    }));
  };

  const handleUploadPreview = (itemId) => {
    if (!previewFile) return alert("Chọn file trước đã!");

    setOrder((prev) => ({
      ...prev,
      items: prev.items.map((item) =>
        item.id === itemId
          ? {
              ...item,
              status: "Preview sent",
              designVersions: [
                ...(item.designVersions || []),
                {
                  version: (item.designVersions?.length || 0) + 1,
                  fileName: previewFile.name,
                  note,
                  uploadedAt: new Date().toLocaleString(),
                },
              ],
            }
          : item
      ),
    }));

    setUploadingItemId(null);
    setPreviewFile(null);
    setNote("");
    alert("Đã gửi preview cho khách!");
  };

  return (
    <div className="max-w-6xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-4">
        Order #{order.id} – {order.customerName}
      </h1>
      <p className="text-gray-600 mb-6">Trạng thái: {order.status}</p>

      <div className="space-y-6">
        {order.items.map((item) => (
          <div
            key={item.id}
            className="border rounded-lg p-5 shadow-sm bg-white"
          >
            <div className="flex justify-between items-start mb-3">
              <div>
                <h2 className="font-semibold text-lg">{item.name}</h2>
                <p className="text-sm text-gray-500">
                  Loại: {item.type} | SL: {item.quantity}
                </p>
                <p className="text-sm mt-1">
                  Trạng thái:{" "}
                  <span className="font-medium">{item.status}</span>
                </p>
              </div>

              {["Approved", "Preview accepted"].includes(item.status) && (
                <button
                  onClick={() =>
                    navigate(
                      `/staff/custom-orders/${order.id}/items/${item.id}/printing`
                    )
                  }
                  className="px-4 py-2 bg-orange-600 text-white rounded hover:bg-orange-700"
                >
                  Vào quy trình in
                </button>
              )}
            </div>

            {/* NORMAL ITEM */}
            {item.type === "normal" && (
              <div className="flex gap-3 mt-3">
                <button
                  onClick={() => updateItemStatus(item.id, "Printing")}
                  className="px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700"
                >
                  Bắt đầu in
                </button>
                <button
                  onClick={() => updateItemStatus(item.id, "Completed")}
                  className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
                >
                  Hoàn thành
                </button>
              </div>
            )}

            {/* CUSTOM FILE ITEM */}
            {item.type === "custom-file" && (
              <div className="mt-4 space-y-3">
                <p className="text-sm">
                  File khách upload:{" "}
                  <span className="font-medium">{item.customerFile}</span>
                </p>
                <div className="flex gap-3">
                  <button
                    onClick={() => updateItemStatus(item.id, "Approved")}
                    className="px-4 py-2 bg-green-600 text-white rounded"
                  >
                    Duyệt file
                  </button>
                  <button
                    onClick={() => updateItemStatus(item.id, "Rejected")}
                    className="px-4 py-2 bg-red-600 text-white rounded"
                  >
                    Từ chối
                  </button>
                </div>
              </div>
            )}

            {/* CUSTOM DESIGN ITEM */}
            {item.type === "custom-design" && (
              <div className="mt-4 space-y-4">
                {item.designVersions?.length > 0 && (
                  <div className="bg-gray-50 border rounded p-3">
                    <p className="font-medium mb-2">Lịch sử preview:</p>
                    <ul className="space-y-1 text-sm">
                      {item.designVersions.map((v, idx) => (
                        <li key={idx}>
                          v{v.version} – {v.fileName} ({v.uploadedAt})
                          {v.note && ` – ${v.note}`}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {uploadingItemId === item.id ? (
                  <div className="border rounded-lg p-4 bg-gray-50 space-y-3">
                    <input
                      type="file"
                      accept=".stl,.obj"
                      onChange={(e) => setPreviewFile(e.target.files[0])}
                    />
                    <textarea
                      placeholder="Ghi chú cho khách..."
                      className="w-full border rounded p-2"
                      value={note}
                      onChange={(e) => setNote(e.target.value)}
                    />
                    <div className="flex gap-3">
                      <button
                        onClick={() => handleUploadPreview(item.id)}
                        className="px-4 py-2 bg-indigo-600 text-white rounded"
                      >
                        Gửi preview
                      </button>
                      <button
                        onClick={() => setUploadingItemId(null)}
                        className="px-4 py-2 bg-gray-300 rounded"
                      >
                        Hủy
                      </button>
                    </div>
                  </div>
                ) : (
                  <button
                    onClick={() => setUploadingItemId(item.id)}
                    className="px-4 py-2 bg-indigo-600 text-white rounded mt-2"
                  >
                    Upload preview thiết kế
                  </button>
                )}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default StaffCustomOrderDetail;
