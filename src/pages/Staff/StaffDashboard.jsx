import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

/* ---------------- MOCK DATA ---------------- */

const mockStats = {
  newToday: 8,
  pending: 14,
  overdue: 3,
  revenueWeek: 12500000,
  revenueMonth: 48200000,
};

const mockTasks = [
  {
    id: 'TASK001',
    title: 'Đơn #ORD123 chờ duyệt thiết kế',
    type: 'design',
    targetId: 'ORD123',
  },
  {
    id: 'TASK002',
    title: 'Phản hồi mới từ khách — Đơn #ORD118',
    type: 'feedback',
    targetId: 'ORD118',
  },
  {
    id: 'TASK003',
    title: 'Đơn #ORD115 chờ in',
    type: 'print',
    targetId: 'ORD115',
  },
];

const mockOrderTypeStats = [
  { type: 'Thiết kế custom', value: 24 },
  { type: 'In theo file', value: 16 },
];

const mockCompletionRate = {
  completed: 38,
  total: 50,
};

/* ---------------- COMPONENT ---------------- */

const StaffDashboard = () => {
  const navigate = useNavigate();
  const [tasks, setTasks] = useState(mockTasks);
  const [notifications, setNotifications] = useState([]);

  /* -------- Mock realtime notify -------- */
  useEffect(() => {
    const timer = setInterval(() => {
      const newNotify = {
        id: Date.now(),
        message: '📢 Đơn mới vừa được tạo: #ORD' + Math.floor(100 + Math.random() * 900),
      };
      setNotifications((prev) => [newNotify, ...prev.slice(0, 2)]);
    }, 15000);

    return () => clearInterval(timer);
  }, []);

  const handleTaskClick = (task) => {
    if (task.type === 'design' || task.type === 'feedback') {
      navigate(`/staff/custom-orders/${task.targetId}`);
    } else if (task.type === 'print') {
      navigate(`/staff/custom-orders-management/${task.targetId}`);
    }
  };

  const markTaskDone = (id) => {
    setTasks((prev) => prev.filter((t) => t.id !== id));
  };

  return (
    <div className="max-w-7xl mx-auto px-8 py-8 space-y-8">
      <h1 className="text-3xl font-bold text-gray-800">Staff Dashboard</h1>

      {/* ===================== STATS ===================== */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
        <StatCard title="Đơn mới hôm nay" value={mockStats.newToday} color="blue" />
        <StatCard title="Đơn chờ xử lý" value={mockStats.pending} color="yellow" />
        <StatCard title="Đơn quá hạn" value={mockStats.overdue} color="red" />
        <StatCard title="Doanh thu tuần" value={formatCurrency(mockStats.revenueWeek)} color="green" />
        <StatCard title="Doanh thu tháng" value={formatCurrency(mockStats.revenueMonth)} color="purple" />
      </div>

      {/* ===================== MAIN GRID ===================== */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* -------- TASK LIST -------- */}
        <div className="lg:col-span-2 bg-white rounded-xl shadow p-6">
          <h2 className="text-xl font-semibold mb-4 text-gray-800">Task của bạn</h2>

          {tasks.length === 0 ? (
            <p className="text-gray-500 italic">Không còn task 🎉</p>
          ) : (
            <div className="space-y-3">
              {tasks.map((task) => (
                <div
                  key={task.id}
                  className="flex justify-between items-center border rounded-lg p-4 hover:bg-gray-50 transition"
                >
                  <div
                    className="cursor-pointer"
                    onClick={() => handleTaskClick(task)}
                  >
                    <p className="font-medium text-gray-800">{task.title}</p>
                    <p className="text-sm text-gray-500 capitalize">{task.type}</p>
                  </div>

                  <div className="flex gap-3">
                    <button
                      onClick={() => handleTaskClick(task)}
                      className="px-3 py-1 bg-indigo-600 text-white rounded text-sm hover:bg-indigo-700"
                    >
                      View
                    </button>
                    <button
                      onClick={() => markTaskDone(task.id)}
                      className="px-3 py-1 bg-gray-200 text-gray-700 rounded text-sm hover:bg-gray-300"
                    >
                      Done
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* -------- CHARTS -------- */}
        <div className="space-y-6">
          <OrderTypeChart data={mockOrderTypeStats} />
          <CompletionChart data={mockCompletionRate} />
        </div>
      </div>

      {/* ===================== NOTIFICATIONS ===================== */}
      <div className="fixed bottom-6 right-6 space-y-3 z-50">
        {notifications.map((n) => (
          <div
            key={n.id}
            className="bg-indigo-600 text-white px-5 py-3 rounded-lg shadow-lg animate-slide-in"
          >
            {n.message}
          </div>
        ))}
      </div>
    </div>
  );
};

/* ---------------- SMALL COMPONENTS ---------------- */

const StatCard = ({ title, value, color }) => {
  const colorMap = {
    blue: 'bg-blue-100 text-blue-700',
    yellow: 'bg-yellow-100 text-yellow-700',
    red: 'bg-red-100 text-red-700',
    green: 'bg-green-100 text-green-700',
    purple: 'bg-purple-100 text-purple-700',
  };

  return (
    <div className="bg-white rounded-xl shadow p-5 flex flex-col gap-2">
      <p className="text-sm text-gray-500">{title}</p>
      <p className={`text-2xl font-bold ${colorMap[color]}`}>{value}</p>
    </div>
  );
};

const OrderTypeChart = ({ data }) => {
  const total = data.reduce((sum, d) => sum + d.value, 0);

  return (
    <div className="bg-white rounded-xl shadow p-6">
      <h3 className="font-semibold text-gray-800 mb-4">Đơn theo loại</h3>
      <div className="space-y-3">
        {data.map((d) => (
          <div key={d.type}>
            <div className="flex justify-between text-sm mb-1">
              <span>{d.type}</span>
              <span>{d.value}</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div
                className="bg-indigo-600 h-2 rounded-full"
                style={{ width: `${(d.value / total) * 100}%` }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

const CompletionChart = ({ data }) => {
  const percent = Math.round((data.completed / data.total) * 100);

  return (
    <div className="bg-white rounded-xl shadow p-6">
      <h3 className="font-semibold text-gray-800 mb-4">Tỷ lệ hoàn thành</h3>
      <div className="flex items-center gap-6">
        <div className="relative w-20 h-20">
          <div className="absolute inset-0 rounded-full border-8 border-gray-200" />
          <div
            className="absolute inset-0 rounded-full border-8 border-indigo-600"
            style={{
              clipPath: `inset(${100 - percent}% 0 0 0)`,
            }}
          />
          <div className="absolute inset-0 flex items-center justify-center font-bold text-gray-800">
            {percent}%
          </div>
        </div>
        <div className="text-sm text-gray-600">
          {data.completed}/{data.total} đơn hoàn thành
        </div>
      </div>
    </div>
  );
};

const formatCurrency = (value) => {
  return value.toLocaleString('vi-VN') + ' ₫';
};

export default StaffDashboard;
