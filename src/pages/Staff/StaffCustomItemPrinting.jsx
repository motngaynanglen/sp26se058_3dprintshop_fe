import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

const mockItem = {
  id: 2,
  name: "Tượng nhân vật custom",
  status: "Approved",
  progress: 0,
  logs: [],
};

const StaffCustomItemPrinting = () => {
  const { orderId, itemId } = useParams();
  const navigate = useNavigate();
  const [item, setItem] = useState(mockItem);
  const [note, setNote] = useState("");

  const updateProgress = (value) => {
    setItem((prev) => ({
      ...prev,
      progress: value,
      logs: [
        ...prev.logs,
        {
          time: new Date().toLocaleString(),
          progress: value,
          note,
        },
      ],
    }));
    setNote("");
  };

  const markCompleted = () => {
    updateProgress(100);
    setItem((prev) => ({ ...prev, status: "Completed" }));
    alert("Đã hoàn thành in!");
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <button
        onClick={() => navigate(-1)}
        className="mb-4 text-sm text-indigo-600 hover:underline"
      >
        ← Quay lại order
      </button>

      <h1 className="text-2xl font-bold mb-4">
        In item #{itemId} – {item.name}
      </h1>
      <p className="mb-4">Trạng thái: {item.status}</p>

      <div className="border rounded-lg p-5 bg-white shadow space-y-4">
        <div>
          <label className="block font-medium mb-1">Tiến độ in (%)</label>
          <input
            type="range"
            min="0"
            max="100"
            value={item.progress}
            onChange={(e) => updateProgress(Number(e.target.value))}
            className="w-full"
          />
          <p className="mt-1 text-sm">{item.progress}%</p>
        </div>

        <div>
          <label className="block font-medium mb-1">Ghi chú cho khách</label>
          <textarea
            className="w-full border rounded p-2"
            rows="3"
            value={note}
            onChange={(e) => setNote(e.target.value)}
            placeholder="VD: Đã in xong phần thân, đang in chi tiết nhỏ..."
          />
        </div>

        <div className="flex gap-3">
          <button
            onClick={() => updateProgress(item.progress)}
            className="px-4 py-2 bg-indigo-600 text-white rounded"
          >
            Cập nhật tiến độ
          </button>
          <button
            onClick={markCompleted}
            className="px-4 py-2 bg-green-600 text-white rounded"
          >
            Đánh dấu hoàn thành
          </button>
        </div>
      </div>

      {item.logs.length > 0 && (
        <div className="mt-6 border rounded-lg p-4 bg-gray-50">
          <p className="font-medium mb-2">Lịch sử cập nhật:</p>
          <ul className="space-y-1 text-sm">
            {item.logs.map((log, idx) => (
              <li key={idx}>
                {log.time} – {log.progress}% – {log.note}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default StaffCustomItemPrinting;
