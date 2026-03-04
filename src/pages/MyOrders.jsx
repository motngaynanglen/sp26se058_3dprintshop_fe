import React, { useState } from 'react';
import { Link } from 'react-router-dom';

// SVG Icons
const PackageIcon = ({ className = "w-4 h-4" }) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
    <path strokeLinecap="round" strokeLinejoin="round" d="m21 7.5-9-5.25L3 7.5m18 0-9 5.25m9-5.25v9l-9 5.25M3 7.5l9 5.25M3 7.5v9l9 5.25m0-9v9" />
  </svg>
);

const SparklesIcon = ({ className = "w-4 h-4" }) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904 9 18.75l-.813-2.846a4.5 4.5 0 0 0-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 0 0 3.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 0 0 3.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 0 0-3.09 3.09ZM18.259 8.715 18 9.75l-.259-1.035a3.375 3.375 0 0 0-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 0 0 2.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 0 0 2.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 0 0-2.456 2.456Z" />
  </svg>
);

const ClipboardListIcon = ({ className = "w-12 h-12" }) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h3.75M9 15h3.75M9 18h3.75m3 .75H18a2.25 2.25 0 0 0 2.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 0 0-1.123-.08m-5.801 0c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 0 0 .75-.75 2.25 2.25 0 0 0-.1-.664m-5.8 0A2.251 2.251 0 0 1 13.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m0 0H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V9.375c0-.621-.504-1.125-1.125-1.125H8.25ZM6.75 12h.008v.008H6.75V12Zm0 3h.008v.008H6.75V15Zm0 3h.008v.008H6.75V18Z" />
  </svg>
);

const ArrowRightIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
    <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
  </svg>
);

// ─── ORDER STATUS CONFIG (theo backend: Created→Confirmed→Processing→Shipping→Completed|Failed)
const ORDER_STATUS_CONFIG = {
  created: {
    label: 'Chờ thanh toán',
    className: 'bg-gray-100 text-gray-600 ring-1 ring-gray-200',
  },
  confirmed: {
    label: 'Đã xác nhận',
    className: 'bg-blue-50 text-blue-700 ring-1 ring-blue-200',
  },
  processing: {
    label: 'Đang xử lý',
    className: 'bg-amber-50 text-amber-700 ring-1 ring-amber-200',
  },
  shipping: {
    label: 'Đang vận chuyển',
    className: 'bg-indigo-50 text-indigo-700 ring-1 ring-indigo-200',
  },
  completed: {
    label: 'Hoàn thành',
    className: 'bg-emerald-50 text-emerald-700 ring-1 ring-emerald-200',
  },
  failed: {
    label: 'Thất bại',
    className: 'bg-red-50 text-red-700 ring-1 ring-red-200',
  },
};

// ─── TYPE CONFIG
const TYPE_CONFIG = {
  product: {
    label: 'Sản phẩm',
    badgeClass: 'bg-indigo-50 text-indigo-700 ring-1 ring-indigo-200',
    icon: <PackageIcon className="w-3 h-3" />,
  },
  custom: {
    label: 'Custom Design',
    badgeClass: 'bg-violet-50 text-violet-700 ring-1 ring-violet-200',
    icon: <SparklesIcon className="w-3 h-3" />,
  },
};

const StatusBadge = ({ status }) => {
  const config = ORDER_STATUS_CONFIG[status] || { label: status, className: 'bg-gray-100 text-gray-600' };
  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${config.className}`}>
      {config.label}
    </span>
  );
};

const TypeBadge = ({ type }) => {
  const config = TYPE_CONFIG[type] || TYPE_CONFIG.product;
  return (
    <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium ${config.badgeClass}`}>
      {config.icon}
      {config.label}
    </span>
  );
};

// ─── FILTERS dựa theo OrderStatus chính thức của backend
const FILTERS = [
  { value: 'all', label: 'Tất cả', filterFn: () => true },
  { value: 'product', label: 'Sản phẩm', filterFn: (o) => o.type === 'product' },
  { value: 'custom', label: 'Custom', filterFn: (o) => o.type === 'custom' },
  { value: 'active', label: 'Đang xử lý', filterFn: (o) => ['confirmed', 'processing', 'shipping'].includes(o.status) },
  { value: 'completed', label: 'Hoàn thành', filterFn: (o) => o.status === 'completed' },
  { value: 'failed', label: 'Thất bại', filterFn: (o) => o.status === 'failed' },
];

const MyOrders = () => {
  const [filter, setFilter] = useState('all');

  // Mock data sử dụng đúng OrderStatus từ backend
  const orders = [
    { id: 'ORD-001', date: '15/01/2024', status: 'completed', total: 797000, type: 'product' },
    { id: 'ORD-002', date: '12/01/2024', status: 'shipping', total: 299000, type: 'product' },
    { id: 'ORD-003', date: '10/01/2024', status: 'processing', total: 498000, type: 'product' },
    { id: 'ORD-004', date: '09/01/2024', status: 'confirmed', total: 650000, type: 'product' },
    { id: 'CUST-001', date: '08/01/2024', status: 'processing', total: 1500000, type: 'custom' },
    { id: 'ORD-005', date: '05/01/2024', status: 'created', total: 350000, type: 'product' },
    { id: 'CUST-002', date: '02/01/2024', status: 'completed', total: 1800000, type: 'custom' },
    { id: 'ORD-006', date: '01/01/2024', status: 'failed', total: 250000, type: 'product' },
  ];

  const activeFilter = FILTERS.find(f => f.value === filter);
  const filteredOrders = orders.filter(activeFilter.filterFn);

  const countForFilter = (f) => orders.filter(f.filterFn).length;

  const formatPrice = (price) =>
    new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(price);

  return (
    <div className="max-w-7xl mx-auto px-6 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Đơn hàng của tôi</h1>
        <p className="text-gray-500 mt-1">Theo dõi và quản lý tất cả đơn hàng</p>
      </div>

      {/* Filter Tabs */}
      <div className="mb-6 flex gap-2 flex-wrap">
        {FILTERS.map(f => (
          <button
            key={f.value}
            onClick={() => setFilter(f.value)}
            className={`inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-sm font-medium transition-all duration-150 cursor-pointer ${
              filter === f.value
                ? 'bg-indigo-600 text-white shadow-sm shadow-indigo-200'
                : 'bg-white text-gray-600 border border-gray-200 hover:border-indigo-300 hover:text-indigo-600'
            }`}
          >
            {f.label}
            <span className={`inline-flex items-center justify-center min-w-[1.25rem] h-5 px-1 rounded-full text-xs font-semibold ${
              filter === f.value ? 'bg-indigo-500 text-white' : 'bg-gray-100 text-gray-500'
            }`}>
              {countForFilter(f)}
            </span>
          </button>
        ))}
      </div>

      {/* Table */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
        {filteredOrders.length === 0 ? (
          <div className="py-20 text-center flex flex-col items-center gap-3">
            <div className="text-gray-300">
              <ClipboardListIcon />
            </div>
            <p className="text-gray-500 font-medium">Không có đơn hàng nào</p>
            <Link
              to="/products"
              className="mt-2 inline-flex items-center gap-2 text-sm text-indigo-600 hover:text-indigo-700 font-medium cursor-pointer"
            >
              Khám phá sản phẩm
              <ArrowRightIcon />
            </Link>
          </div>
        ) : (
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-100">
              <tr>
                <th className="px-6 py-3.5 text-left text-xs font-semibold text-gray-500 uppercase tracking-wide">Mã đơn hàng</th>
                <th className="px-6 py-3.5 text-left text-xs font-semibold text-gray-500 uppercase tracking-wide">Ngày đặt</th>
                <th className="px-6 py-3.5 text-left text-xs font-semibold text-gray-500 uppercase tracking-wide">Loại</th>
                <th className="px-6 py-3.5 text-left text-xs font-semibold text-gray-500 uppercase tracking-wide">Trạng thái</th>
                <th className="px-6 py-3.5 text-left text-xs font-semibold text-gray-500 uppercase tracking-wide">Tổng tiền</th>
                <th className="px-6 py-3.5 text-left text-xs font-semibold text-gray-500 uppercase tracking-wide">Thao tác</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {filteredOrders.map(order => (
                <tr key={order.id} className="hover:bg-gray-50/70 transition-colors duration-100">
                  <td className="px-6 py-4 text-sm font-mono font-semibold text-gray-800">{order.id}</td>
                  <td className="px-6 py-4 text-sm text-gray-600">{order.date}</td>
                  <td className="px-6 py-4"><TypeBadge type={order.type} /></td>
                  <td className="px-6 py-4"><StatusBadge status={order.status} /></td>
                  <td className="px-6 py-4 text-sm font-bold text-gray-900">{formatPrice(order.total)}</td>
                  <td className="px-6 py-4">
                    <Link
                      to={order.type === 'custom' ? `/custom-orders/${order.id}` : `/orders/${order.id}`}
                      className="inline-flex items-center gap-1 text-sm text-indigo-600 hover:text-indigo-800 font-medium transition-colors duration-150 cursor-pointer"
                    >
                      Xem chi tiết
                      <ArrowRightIcon />
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default MyOrders;
