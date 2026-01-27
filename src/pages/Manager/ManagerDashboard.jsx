import React, { useState } from 'react';
import {
  LineChart, Line, BarChart, Bar, PieChart, Pie, Cell,
  XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer
} from 'recharts';

const ManagerDashboard = () => {
  const [timeFilter, setTimeFilter] = useState('month');

  // Dữ liệu thống kê chính
  const stats = {
    totalOrders: 245,
    revenue: 312500000, // VND
    pendingCustomOrders: 12,
    averageRating: 4.8,
    totalProducts: 45,
    totalMaterials: 8,
    totalStaff: 15,
    totalCustomers: 320
  };

  // Dữ liệu biểu đồ doanh thu theo thời gian
  const revenueData = [
    { name: 'T1', revenue: 25000000 },
    { name: 'T2', revenue: 28000000 },
    { name: 'T3', revenue: 32000000 },
    { name: 'T4', revenue: 27000000 },
    { name: 'T5', revenue: 35000000 },
    { name: 'T6', revenue: 38000000 },
    { name: 'T7', revenue: 42000000 },
    { name: 'T8', revenue: 39000000 },
    { name: 'T9', revenue: 45000000 },
    { name: 'T10', revenue: 41000000 },
    { name: 'T11', revenue: 48000000 },
    { name: 'T12', revenue: 52000000 }
  ];

  // Dữ liệu biểu đồ phân loại đơn hàng
  const orderTypeData = [
    { name: 'Sản phẩm có sẵn', value: 180, color: '#3b82f6' },
    { name: 'Đơn custom', value: 65, color: '#f59e0b' }
  ];

  // Dữ liệu vật liệu được sử dụng nhiều nhất
  const materialData = [
    { name: 'PLA', usage: 450 },
    { name: 'ABS', usage: 320 },
    { name: 'PETG', usage: 280 },
    { name: 'TPU', usage: 150 },
    { name: 'Nylon', usage: 120 },
    { name: 'Resin', usage: 200 },
    { name: 'Wood PLA', usage: 90 },
    { name: 'Carbon Fiber', usage: 75 }
  ];

  // Đơn hàng mới nhất
  const recentOrders = [
    { id: '#ORD-1234', customer: 'Nguyễn Văn A', product: 'Mô hình 3D Custom', status: 'Đang xử lý', amount: '2,500,000 ₫' },
    { id: '#ORD-1233', customer: 'Trần Thị B', product: 'Bộ đồ chơi', status: 'Hoàn thành', amount: '1,200,000 ₫' },
    { id: '#ORD-1232', customer: 'Lê Văn C', product: 'Phụ kiện điện thoại', status: 'Đang in', amount: '800,000 ₫' },
    { id: '#ORD-1231', customer: 'Phạm Thị D', product: 'Trang trí nội thất', status: 'Chờ duyệt', amount: '3,500,000 ₫' },
    { id: '#ORD-1230', customer: 'Hoàng Văn E', product: 'Mô hình kiến trúc', status: 'Hoàn thành', amount: '5,200,000 ₫' }
  ];

  // Feedback mới nhất
  const recentFeedback = [
    { customer: 'Nguyễn Văn A', rating: 5, comment: 'Sản phẩm rất đẹp, chất lượng tuyệt vời!', time: '2 giờ trước' },
    { customer: 'Trần Thị B', rating: 4, comment: 'Giao hàng nhanh, đóng gói cẩn thận', time: '5 giờ trước' },
    { customer: 'Lê Văn C', rating: 5, comment: 'Đúng như mô tả, rất hài lòng', time: '1 ngày trước' },
    { customer: 'Phạm Thị D', rating: 4, comment: 'Tốt, sẽ quay lại ủng hộ', time: '1 ngày trước' },
    { customer: 'Hoàng Văn E', rating: 5, comment: 'Chuyên nghiệp, tư vấn nhiệt tình', time: '2 ngày trước' }
  ];

  const formatCurrency = (value) => {
    return (value / 1000000).toFixed(1) + 'M';
  };

  const getStatusColor = (status) => {
    const colors = {
      'Hoàn thành': 'bg-green-100 text-green-800',
      'Đang xử lý': 'bg-blue-100 text-blue-800',
      'Đang in': 'bg-yellow-100 text-yellow-800',
      'Chờ duyệt': 'bg-orange-100 text-orange-800'
    };
    return colors[status] || 'bg-gray-100 text-gray-800';
  };

  return (
    <div className="space-y-6">
      {/* Header với bộ lọc thời gian */}
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-gray-800">Dashboard Quản Lý</h1>
        <div className="flex gap-2">
          <select
            value={timeFilter}
            onChange={(e) => setTimeFilter(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            <option value="today">Hôm nay</option>
            <option value="week">Tuần này</option>
            <option value="month">Tháng này</option>
            <option value="custom">Tùy chỉnh</option>
          </select>
        </div>
      </div>

      {/* Thẻ thống kê chính - 4 cards lớn */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
          <h3 className="text-gray-600 mb-2 text-sm font-medium">Tổng số đơn hàng</h3>
          <p className="text-4xl font-bold text-indigo-600">{stats.totalOrders}</p>
          <p className="text-sm text-green-600 mt-2">↑ 12% so với tháng trước</p>
        </div>
        <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
          <h3 className="text-gray-600 mb-2 text-sm font-medium">Doanh thu tháng này</h3>
          <p className="text-4xl font-bold text-green-600">{(stats.revenue / 1000000).toFixed(1)}M ₫</p>
          <p className="text-sm text-green-600 mt-2">↑ 18% so với tháng trước</p>
        </div>
        <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
          <h3 className="text-gray-600 mb-2 text-sm font-medium">Đơn custom đang chờ</h3>
          <p className="text-4xl font-bold text-yellow-600">{stats.pendingCustomOrders}</p>
          <p className="text-sm text-gray-600 mt-2">Cần xử lý trong 24h</p>
        </div>
        <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
          <h3 className="text-gray-600 mb-2 text-sm font-medium">Đánh giá trung bình</h3>
          <p className="text-4xl font-bold text-blue-600">{stats.averageRating} ⭐</p>
          <p className="text-sm text-gray-600 mt-2">Từ 156 đánh giá</p>
        </div>
      </div>

      {/* Thẻ thống kê phụ - 4 cards nhỏ */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-white rounded-lg shadow p-4">
          <h3 className="text-gray-600 mb-1 text-xs">Tổng sản phẩm</h3>
          <p className="text-2xl font-bold text-purple-600">{stats.totalProducts}</p>
        </div>
        <div className="bg-white rounded-lg shadow p-4">
          <h3 className="text-gray-600 mb-1 text-xs">Tổng vật liệu</h3>
          <p className="text-2xl font-bold text-orange-600">{stats.totalMaterials}</p>
        </div>
        <div className="bg-white rounded-lg shadow p-4">
          <h3 className="text-gray-600 mb-1 text-xs">Tổng nhân viên</h3>
          <p className="text-2xl font-bold text-teal-600">{stats.totalStaff}</p>
        </div>
        <div className="bg-white rounded-lg shadow p-4">
          <h3 className="text-gray-600 mb-1 text-xs">Tổng khách hàng</h3>
          <p className="text-2xl font-bold text-pink-600">{stats.totalCustomers}</p>
        </div>
      </div>

      {/* Biểu đồ doanh thu và phân loại đơn hàng */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Biểu đồ doanh thu - 2/3 width */}
        <div className="lg:col-span-2 bg-white rounded-lg shadow-md p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold text-gray-800">Doanh thu theo tháng</h2>
            <button className="text-indigo-600 hover:text-indigo-800 text-sm font-medium">
              Xem chi tiết →
            </button>
          </div>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={revenueData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis tickFormatter={formatCurrency} />
              <Tooltip formatter={(value) => `${(value / 1000000).toFixed(1)}M ₫`} />
              <Legend />
              <Line type="monotone" dataKey="revenue" stroke="#3b82f6" strokeWidth={2} name="Doanh thu" />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Biểu đồ phân loại đơn hàng - 1/3 width */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold text-gray-800">Phân loại đơn hàng</h2>
          </div>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={orderTypeData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
              >
                {orderTypeData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
          <div className="mt-4 space-y-2">
            {orderTypeData.map((item, index) => (
              <div key={index} className="flex justify-between items-center text-sm">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }}></div>
                  <span>{item.name}</span>
                </div>
                <span className="font-semibold">{item.value}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Biểu đồ vật liệu được sử dụng nhiều nhất */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold text-gray-800">Vật liệu được sử dụng nhiều nhất</h2>
          <button className="text-indigo-600 hover:text-indigo-800 text-sm font-medium">
            Xem chi tiết →
          </button>
        </div>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={materialData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="usage" fill="#8b5cf6" name="Số lượng sử dụng (kg)" />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Bảng hoạt động gần đây */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Đơn hàng mới */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold text-gray-800">Đơn hàng mới</h2>
            <button className="text-indigo-600 hover:text-indigo-800 text-sm font-medium">
              Xem tất cả →
            </button>
          </div>
          <div className="space-y-3">
            {recentOrders.map((order, index) => (
              <div key={index} className="border-b pb-3 last:border-b-0">
                <div className="flex justify-between items-start mb-1">
                  <div>
                    <p className="font-semibold text-gray-800">{order.id}</p>
                    <p className="text-sm text-gray-600">{order.customer}</p>
                  </div>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(order.status)}`}>
                    {order.status}
                  </span>
                </div>
                <p className="text-sm text-gray-700">{order.product}</p>
                <p className="text-sm font-semibold text-green-600 mt-1">{order.amount}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Feedback mới nhất */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold text-gray-800">Feedback mới nhất</h2>
            <button className="text-indigo-600 hover:text-indigo-800 text-sm font-medium">
              Xem tất cả →
            </button>
          </div>
          <div className="space-y-3">
            {recentFeedback.map((feedback, index) => (
              <div key={index} className="border-b pb-3 last:border-b-0">
                <div className="flex justify-between items-start mb-1">
                  <p className="font-semibold text-gray-800">{feedback.customer}</p>
                  <div className="flex items-center gap-1">
                    <span className="text-yellow-500">{'⭐'.repeat(feedback.rating)}</span>
                  </div>
                </div>
                <p className="text-sm text-gray-700 italic">"{feedback.comment}"</p>
                <p className="text-xs text-gray-500 mt-1">{feedback.time}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ManagerDashboard;

