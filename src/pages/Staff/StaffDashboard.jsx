import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

/* ---------------- MOCK DATA ---------------- */

const mockStats = {
  customers: { value: 3782, change: 11.01, isUp: true },
  orders: { value: 5359, change: 9.05, isUp: false },
  newToday: 8,
  pending: 14,
  overdue: 3,
  revenueWeek: 12500000,
  revenueMonth: 48200000,
};

const mockMonthlyTarget = {
  percentage: 75.55,
  target: 20000,
  revenue: 16000,
};

const mockMonthlySales = [
  { month: "Jan", value: 180 },
  { month: "Feb", value: 220 },
  { month: "Mar", value: 280 },
  { month: "Apr", value: 750 },
  { month: "May", value: 320 },
  { month: "Jun", value: 150 },
  { month: "Jul", value: 180 },
  { month: "Aug", value: 200 },
  { month: "Sep", value: 220 },
  { month: "Oct", value: 190 },
  { month: "Nov", value: 210 },
  { month: "Dec", value: 250 },
];

const mockTasks = [
  { id: "TASK001", title: "Đơn #ORD123 chờ duyệt thiết kế", type: "design", targetId: "ORD123" },
  { id: "TASK002", title: "Phản hồi mới từ khách — Đơn #ORD118", type: "feedback", targetId: "ORD118" },
  { id: "TASK003", title: "Đơn #ORD115 chờ in", type: "print", targetId: "ORD115" },
];

/* ---------------- ICONS ---------------- */

const UsersIcon = () => (
  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
  </svg>
);

const ShoppingBagIcon = () => (
  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
  </svg>
);

const ChartIcon = () => (
  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
  </svg>
);

const ClockIcon = () => (
  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>
);

const AlertIcon = () => (
  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
  </svg>
);

/* ---------------- COMPONENT ---------------- */

const StaffDashboard = () => {
  const navigate = useNavigate();
  const [tasks, setTasks] = useState(mockTasks);
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    const timer = setInterval(() => {
      const newNotify = {
        id: Date.now(),
        message: "📢 Đơn mới vừa được tạo: #ORD" + Math.floor(100 + Math.random() * 900),
      };
      setNotifications((prev) => [newNotify, ...prev.slice(0, 2)]);
    }, 15000);
    return () => clearInterval(timer);
  }, []);

  const handleTaskClick = (task) => {
    if (task.type === "design" || task.type === "feedback") {
      navigate(`/staff/custom-orders/${task.targetId}`);
    } else if (task.type === "print") {
      navigate(`/staff/custom-orders-management/${task.targetId}`);
    }
  };

  const markTaskDone = (id) => {
    setTasks((prev) => prev.filter((t) => t.id !== id));
  };

  return (
<<<<<<< HEAD
    <div className="min-h-screen bg-gray-50/50 p-6 lg:p-8">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold text-gray-800">Staff Dashboard</h1>
          <p className="text-sm text-gray-500">Xin chào, chúc bạn một ngày làm việc hiệu quả! 👋</p>
        </div>
=======
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold mb-6 text-gray-800">Bảng điều khiển nhân viên</h1>
>>>>>>> a07e3d5110528856f49319fcee5e5d4e94dc1e77

        {/* Quick Navigation */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <a href="/staff/custom-orders" className="p-4 bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow group">
            <div className="w-10 h-10 bg-blue-100 text-blue-600 rounded-xl flex items-center justify-center mb-3 group-hover:bg-blue-600 group-hover:text-white transition-colors">
              <ShoppingBagIcon />
            </div>
            <h3 className="font-semibold text-gray-800">Đơn Custom</h3>
            <p className="text-sm text-gray-500">Quản lý đơn hàng</p>
          </a>
          <a href="/staff/custom-orders-management" className="p-4 bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow group">
            <div className="w-10 h-10 bg-purple-100 text-purple-600 rounded-xl flex items-center justify-center mb-3 group-hover:bg-purple-600 group-hover:text-white transition-colors">
              <ClockIcon />
            </div>
            <h3 className="font-semibold text-gray-800">Quản lý đơn</h3>
            <p className="text-sm text-gray-500">In và xử lý</p>
          </a>
          <a href="/staff/templates" className="p-4 bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow group">
            <div className="w-10 h-10 bg-green-100 text-green-600 rounded-xl flex items-center justify-center mb-3 group-hover:bg-green-600 group-hover:text-white transition-colors">
              <ChartIcon />
            </div>
            <h3 className="font-semibold text-gray-800">Mẫu thiết kế</h3>
            <p className="text-sm text-gray-500">Quản lý templates</p>
          </a>
          <a href="/staff/design-reviews" className="p-4 bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow group">
            <div className="w-10 h-10 bg-orange-100 text-orange-600 rounded-xl flex items-center justify-center mb-3 group-hover:bg-orange-600 group-hover:text-white transition-colors">
              <AlertIcon />
            </div>
            <h3 className="font-semibold text-gray-800">Review Design</h3>
            <p className="text-sm text-gray-500">Duyệt thiết kế</p>
          </a>
        </div>

        {/* Main Grid */}
        <div className="grid grid-cols-12 gap-6">
          {/* Left Section - 8 columns */}
          <div className="col-span-12 lg:col-span-8 space-y-6">
            {/* Top Stats Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <StatCard
                icon={<UsersIcon />}
                iconBg="bg-blue-50"
                iconColor="text-blue-600"
                title="Customers"
                value={mockStats.customers.value.toLocaleString()}
                change={mockStats.customers.change}
                isUp={mockStats.customers.isUp}
              />
              <StatCard
                icon={<ShoppingBagIcon />}
                iconBg="bg-purple-50"
                iconColor="text-purple-600"
                title="Orders"
                value={mockStats.orders.value.toLocaleString()}
                change={mockStats.orders.change}
                isUp={mockStats.orders.isUp}
              />
            </div>

            {/* Monthly Sales Chart */}
            <MonthlySalesChart data={mockMonthlySales} />

            {/* Task List */}
            <TaskList
              tasks={tasks}
              onTaskClick={handleTaskClick}
              onMarkDone={markTaskDone}
            />
          </div>

          {/* Right Section - 4 columns */}
          <div className="col-span-12 lg:col-span-4 space-y-6">
            {/* Monthly Target */}
            <MonthlyTargetCard data={mockMonthlyTarget} />

            {/* Quick Stats */}
            <div className="grid grid-cols-1 gap-4">
              <MiniStatCard
                icon={<ClockIcon />}
                iconBg="bg-yellow-50"
                iconColor="text-yellow-600"
                title="Đơn chờ xử lý"
                value={mockStats.pending}
                badge="Pending"
                badgeColor="bg-yellow-100 text-yellow-700"
              />
              <MiniStatCard
                icon={<AlertIcon />}
                iconBg="bg-red-50"
                iconColor="text-red-600"
                title="Đơn quá hạn"
                value={mockStats.overdue}
                badge="Urgent"
                badgeColor="bg-red-100 text-red-700"
              />
              <MiniStatCard
                icon={<ChartIcon />}
                iconBg="bg-green-50"
                iconColor="text-green-600"
                title="Doanh thu tháng"
                value={formatCurrency(mockStats.revenueMonth)}
                badge="Revenue"
                badgeColor="bg-green-100 text-green-700"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Notifications */}
      <div className="fixed bottom-6 right-6 space-y-3 z-50">
        {notifications.map((n) => (
          <div
            key={n.id}
            className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-5 py-3 rounded-xl shadow-lg animate-pulse"
          >
            {n.message}
          </div>
        ))}
      </div>
    </div>
  );
};

/* ---------------- STAT CARD ---------------- */

const StatCard = ({ icon, iconBg, iconColor, title, value, change, isUp }) => {
  return (
    <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm hover:shadow-md transition-shadow">
      <div className="flex items-center gap-4">
        <div className={`w-12 h-12 rounded-xl ${iconBg} ${iconColor} flex items-center justify-center`}>
          {icon}
        </div>
        <div className="flex-1">
          <p className="text-sm text-gray-500 font-medium">{title}</p>
          <div className="flex items-center gap-3 mt-1">
            <p className="text-2xl font-bold text-gray-800">{value}</p>
            <span className={`text-sm font-medium flex items-center gap-1 ${isUp ? 'text-green-600' : 'text-red-500'}`}>
              {isUp ? (
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M5.293 9.707a1 1 0 010-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 01-1.414 1.414L11 7.414V15a1 1 0 11-2 0V7.414L6.707 9.707a1 1 0 01-1.414 0z" clipRule="evenodd" />
                </svg>
              ) : (
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M14.707 10.293a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 111.414-1.414L9 12.586V5a1 1 0 012 0v7.586l2.293-2.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
              )}
              {change}%
            </span>
          </div>
        </div>
      </div>
      </div>
    </div>
  );
};

/* ---------------- MONTHLY TARGET CARD ---------------- */

const MonthlyTargetCard = ({ data }) => {
  const circumference = 2 * Math.PI * 80;
  const progress = (data.percentage / 100) * circumference;

  return (
    <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-semibold text-gray-800">Monthly Target</h3>
        <span className="text-xs text-gray-400">Target you've set for each month</span>
      </div>

      {/* Semi-circle Progress */}
      <div className="flex flex-col items-center py-4">
        <div className="relative w-48 h-24 overflow-hidden">
          <svg className="w-48 h-48 -rotate-90 transform" viewBox="0 0 200 200">
            {/* Background arc */}
            <circle
              cx="100"
              cy="100"
              r="80"
              fill="none"
              stroke="#E5E7EB"
              strokeWidth="12"
              strokeDasharray={circumference}
              strokeDashoffset={circumference / 2}
              strokeLinecap="round"
            />
            {/* Progress arc */}
            <circle
              cx="100"
              cy="100"
              r="80"
              fill="none"
              stroke="url(#gradient)"
              strokeWidth="12"
              strokeDasharray={circumference}
              strokeDashoffset={circumference - (progress / 2)}
              strokeLinecap="round"
              className="transition-all duration-1000"
            />
            <defs>
              <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#3B82F6" />
                <stop offset="100%" stopColor="#8B5CF6" />
              </linearGradient>
            </defs>
          </svg>
          <div className="absolute inset-0 flex items-end justify-center pb-2">
            <div className="text-center">
              <p className="text-3xl font-bold text-gray-800">{data.percentage}%</p>
              <p className="text-xs text-green-500 font-medium">+10%</p>
            </div>
          </div>
        </div>

        <p className="text-sm text-gray-500 mt-4 text-center">
          You earn <span className="font-semibold text-gray-700">${data.revenue.toLocaleString()}</span> today, it's higher than yesterday!
          <br />Keep up your good work!
        </p>

        {/* Target & Revenue */}
        <div className="flex gap-8 mt-6">
          <div className="text-center">
            <p className="text-xs text-gray-400 mb-1">Target</p>
            <p className="text-lg font-bold text-gray-800">${(data.target / 1000)}K <span className="text-red-400">↓</span></p>
          </div>
          <div className="text-center">
            <p className="text-xs text-gray-400 mb-1">Revenue</p>
            <p className="text-lg font-bold text-gray-800">${(data.revenue / 1000)}K <span className="text-green-400">↑</span></p>
          </div>
        </div>
      </div>
    </div>
  );
};

/* ---------------- MONTHLY SALES CHART ---------------- */

const MonthlySalesChart = ({ data }) => {
  const maxValue = Math.max(...data.map(d => d.value));

  return (
    <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
      <div className="flex items-center justify-between mb-6">
        <h3 className="font-semibold text-gray-800">Monthly Sales</h3>
        <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
          <svg className="w-5 h-5 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
            <path d="M10 6a2 2 0 110-4 2 2 0 010 4zM10 12a2 2 0 110-4 2 2 0 010 4zM10 18a2 2 0 110-4 2 2 0 010 4z" />
          </svg>
        </button>
      </div>

      {/* Y-axis labels */}
      <div className="flex">
        <div className="flex flex-col justify-between text-xs text-gray-400 pr-4 py-1" style={{ height: '200px' }}>
          <span>800</span>
          <span>600</span>
          <span>400</span>
          <span>200</span>
          <span>0</span>
        </div>

        {/* Bars */}
        <div className="flex-1 flex items-end justify-between gap-2" style={{ height: '200px' }}>
          {data.map((item, index) => (
            <div key={item.month} className="flex flex-col items-center flex-1">
              <div
                className={`w-full max-w-[30px] rounded-t-md transition-all duration-500 ${index === 3 ? 'bg-gradient-to-t from-blue-600 to-blue-400' : 'bg-blue-200 hover:bg-blue-300'
                  }`}
                style={{ height: `${(item.value / maxValue) * 180}px` }}
              />
              <span className="text-xs text-gray-400 mt-2">{item.month}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

/* ---------------- MINI STAT CARD ---------------- */

const MiniStatCard = ({ icon, iconBg, iconColor, title, value, badge, badgeColor }) => {
  return (
    <div className="bg-white rounded-2xl border border-gray-100 p-5 shadow-sm hover:shadow-md transition-shadow">
      <div className="flex items-center gap-4">
        <div className={`w-10 h-10 rounded-xl ${iconBg} ${iconColor} flex items-center justify-center`}>
          {icon}
        </div>
        <div className="flex-1">
          <div className="flex items-center justify-between">
            <p className="text-sm text-gray-500">{title}</p>
            <span className={`text-xs px-2 py-1 rounded-full font-medium ${badgeColor}`}>{badge}</span>
          </div>
          <p className="text-xl font-bold text-gray-800 mt-1">{value}</p>
        </div>
      </div>
    </div>
  );
};

/* ---------------- TASK LIST ---------------- */

const TaskList = ({ tasks, onTaskClick, onMarkDone }) => {
  return (
    <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-semibold text-gray-800">Task của bạn</h3>
        <span className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded-full">{tasks.length} tasks</span>
      </div>

      {tasks.length === 0 ? (
        <div className="text-center py-8">
          <p className="text-gray-400">Không còn task 🎉</p>
        </div>
      ) : (
        <div className="space-y-3">
          {tasks.map((task) => (
            <div
              key={task.id}
              className="flex items-center justify-between p-4 rounded-xl bg-gray-50 hover:bg-gray-100 transition-colors"
            >
              <div className="cursor-pointer flex-1" onClick={() => onTaskClick(task)}>
                <p className="font-medium text-gray-800">{task.title}</p>
                <p className="text-sm text-gray-500 capitalize mt-1">{task.type}</p>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => onTaskClick(task)}
                  className="px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 transition-colors"
                >
                  View
                </button>
                <button
                  onClick={() => onMarkDone(task.id)}
                  className="px-4 py-2 bg-gray-200 text-gray-700 text-sm font-medium rounded-lg hover:bg-gray-300 transition-colors"
                >
                  Done
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

/* ---------------- HELPERS ---------------- */

const formatCurrency = (value) => {
  if (value >= 1000000) {
    return (value / 1000000).toFixed(1) + "M ₫";
  }
  return value.toLocaleString("vi-VN") + " ₫";
};

export default StaffDashboard;
