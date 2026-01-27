import React, { useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';

const StaffCustomOrdersList = () => {
  const [searchParams] = useSearchParams();
  const initialFilter = searchParams.get('status') || 'all';
  const [filter, setFilter] = useState(initialFilter);
  const [sourceTypeFilter, setSourceTypeFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  // Mock data based on DB schema: Order, OrderItem, Customer, Account, Design_Work
  const orders = [
    {
      id: 'ORD-001',
      customerId: 'CUST-001',
      customerName: 'Nguyễn Văn An',
      customerEmail: 'an@email.com',
      customerPhone: '0901234567',
      staffId: null,
      totalPrice: 450000,
      orderStatus: 'PENDING',
      priority: 1,
      createdAt: '2024-01-15 14:30',
      itemCount: 3,
      // From OrderItem
      items: [
        { sourceType: 'PREMADE', fulfillmentStatus: 'PENDING' },
        { sourceType: 'DESIGN_WORK', fulfillmentStatus: 'DESIGNING' },
        { sourceType: 'CUSTOMER_FILE', fulfillmentStatus: 'WAITING_REVIEW' },
      ]
    },
    {
      id: 'ORD-002',
      customerId: 'CUST-002',
      customerName: 'Trần Thị Bình',
      customerEmail: 'binh@email.com',
      customerPhone: '0902345678',
      staffId: 'STAFF-001',
      totalPrice: 350000,
      orderStatus: 'PROCESSING',
      priority: 2,
      createdAt: '2024-01-14 10:15',
      itemCount: 1,
      items: [
        { sourceType: 'DESIGN_WORK', fulfillmentStatus: 'DESIGNING' },
      ]
    },
    {
      id: 'ORD-003',
      customerId: 'CUST-003',
      customerName: 'Lê Hoàng Cường',
      customerEmail: 'cuong@email.com',
      customerPhone: '0903456789',
      staffId: 'STAFF-001',
      totalPrice: 280000,
      orderStatus: 'PROCESSING',
      priority: 1,
      createdAt: '2024-01-13 16:45',
      itemCount: 2,
      items: [
        { sourceType: 'AI_GENERATE', fulfillmentStatus: 'READY_FOR_PREVIEW' },
        { sourceType: 'PREMADE', fulfillmentStatus: 'READY_TO_PRINT' },
      ]
    },
    {
      id: 'ORD-004',
      customerId: 'CUST-004',
      customerName: 'Phạm Minh Đức',
      customerEmail: 'duc@email.com',
      customerPhone: '0904567890',
      staffId: 'STAFF-002',
      totalPrice: 750000,
      orderStatus: 'PRINTING',
      priority: 3,
      createdAt: '2024-01-12 09:00',
      itemCount: 5,
      items: [
        { sourceType: 'CUSTOMER_FILE', fulfillmentStatus: 'PRINTING' },
      ]
    },
    {
      id: 'ORD-005',
      customerId: 'CUST-005',
      customerName: 'Hoàng Thu Hà',
      customerEmail: 'ha@email.com',
      customerPhone: '0905678901',
      staffId: 'STAFF-001',
      totalPrice: 200000,
      orderStatus: 'COMPLETED',
      priority: 1,
      createdAt: '2024-01-11 11:30',
      itemCount: 1,
      items: [
        { sourceType: 'DESIGN_WORK', fulfillmentStatus: 'COMPLETED' },
      ]
    },
  ];

  // OrderStatus from Order table
  const orderStatusConfig = {
    PENDING: { label: 'Chờ xử lý', color: 'bg-yellow-100 text-yellow-800', icon: '⏳' },
    PROCESSING: { label: 'Đang xử lý', color: 'bg-blue-100 text-blue-800', icon: '⚙️' },
    PRINTING: { label: 'Đang in', color: 'bg-orange-100 text-orange-800', icon: '🖨️' },
    SHIPPED: { label: 'Đã giao', color: 'bg-indigo-100 text-indigo-800', icon: '🚚' },
    COMPLETED: { label: 'Hoàn thành', color: 'bg-green-100 text-green-800', icon: '✅' },
    CANCELLED: { label: 'Đã hủy', color: 'bg-red-100 text-red-800', icon: '❌' },
  };

  // SourceType from OrderItem table
  const sourceTypeConfig = {
    PREMADE: { label: 'Sản phẩm có sẵn', icon: '📦', color: 'text-gray-600' },
    CUSTOMER_FILE: { label: 'File khách upload', icon: '📤', color: 'text-blue-600' },
    DESIGN_WORK: { label: 'Yêu cầu thiết kế', icon: '✏️', color: 'text-purple-600' },
    AI_GENERATE: { label: 'AI Generate', icon: '🤖', color: 'text-green-600' },
  };

  const filteredOrders = orders.filter(order => {
    if (filter !== 'all' && order.orderStatus !== filter) return false;
    if (sourceTypeFilter !== 'all' && !order.items.some(i => i.sourceType === sourceTypeFilter)) return false;
    if (searchTerm && !order.id.toLowerCase().includes(searchTerm.toLowerCase()) &&
      !order.customerName.toLowerCase().includes(searchTerm.toLowerCase())) return false;
    return true;
  });

  const stats = {
    total: orders.length,
    pending: orders.filter(o => o.orderStatus === 'PENDING').length,
    processing: orders.filter(o => o.orderStatus === 'PROCESSING').length,
    printing: orders.filter(o => o.orderStatus === 'PRINTING').length,
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">📦 Quản lý đơn hàng</h1>
          <p className="text-gray-500 text-sm mt-1">Danh sách đơn hàng từ bảng Order, OrderItem</p>
        </div>
        <Link
          to="/staff/dashboard"
          className="px-4 py-2 bg-white border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 shadow-sm"
        >
          ← Dashboard
        </Link>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-4 gap-4 mb-6">
        <div className="bg-white rounded-xl p-4 border border-gray-200 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-500 text-sm">Tổng đơn</p>
              <p className="text-2xl font-bold text-gray-800">{stats.total}</p>
            </div>
            <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center text-2xl">📊</div>
          </div>
        </div>
        <div className="bg-white rounded-xl p-4 border border-gray-200 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-500 text-sm">PENDING</p>
              <p className="text-2xl font-bold text-yellow-600">{stats.pending}</p>
            </div>
            <div className="w-12 h-12 bg-yellow-100 rounded-xl flex items-center justify-center text-2xl">⏳</div>
          </div>
        </div>
        <div className="bg-white rounded-xl p-4 border border-gray-200 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-500 text-sm">PROCESSING</p>
              <p className="text-2xl font-bold text-blue-600">{stats.processing}</p>
            </div>
            <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center text-2xl">⚙️</div>
          </div>
        </div>
        <div className="bg-white rounded-xl p-4 border border-gray-200 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-500 text-sm">PRINTING</p>
              <p className="text-2xl font-bold text-orange-600">{stats.printing}</p>
            </div>
            <div className="w-12 h-12 bg-orange-100 rounded-xl flex items-center justify-center text-2xl">🖨️</div>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-xl p-4 mb-6 border border-gray-200 shadow-sm">
        <div className="flex flex-wrap gap-4 items-center">
          {/* Search */}
          <div className="flex-1 min-w-[200px]">
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">🔍</span>
              <input
                type="text"
                placeholder="Tìm theo Order ID, tên khách..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-lg text-gray-800 placeholder-gray-400 focus:outline-none focus:border-blue-500"
              />
            </div>
          </div>

          {/* OrderStatus Filter */}
          <div className="flex items-center gap-2">
            <span className="text-gray-500 text-sm">OrderStatus:</span>
            <div className="flex gap-1">
              {['all', 'PENDING', 'PROCESSING', 'PRINTING', 'COMPLETED'].map(status => (
                <button
                  key={status}
                  onClick={() => setFilter(status)}
                  className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${filter === status
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                    }`}
                >
                  {status === 'all' ? 'Tất cả' : orderStatusConfig[status]?.label || status}
                </button>
              ))}
            </div>
          </div>

          {/* SourceType Filter */}
          <div className="flex items-center gap-2">
            <span className="text-gray-500 text-sm">SourceType:</span>
            <div className="flex gap-1">
              {['all', 'PREMADE', 'CUSTOMER_FILE', 'DESIGN_WORK', 'AI_GENERATE'].map(type => (
                <button
                  key={type}
                  onClick={() => setSourceTypeFilter(type)}
                  className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${sourceTypeFilter === type
                    ? 'bg-purple-600 text-white'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                    }`}
                >
                  {type === 'all' ? 'Tất cả' : sourceTypeConfig[type]?.icon}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Orders Table */}
      <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-50 border-b border-gray-200">
            <tr>
              <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase">Order ID</th>
              <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase">Customer</th>
              <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase">Items</th>
              <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase">SourceTypes</th>
              <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase">TotalPrice</th>
              <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase">Priority</th>
              <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase">OrderStatus</th>
              <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase">CreatedAt</th>
              <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {filteredOrders.length === 0 ? (
              <tr>
                <td colSpan="9" className="px-6 py-12 text-center text-gray-400">
                  <div className="text-4xl mb-2">📭</div>
                  <p>Không tìm thấy đơn hàng</p>
                </td>
              </tr>
            ) : (
              filteredOrders.map(order => (
                <tr key={order.id} className="hover:bg-gray-50">
                  <td className="px-4 py-3">
                    <span className="font-mono font-medium text-gray-800">{order.id}</span>
                  </td>
                  <td className="px-4 py-3">
                    <div>
                      <p className="text-gray-800 font-medium">{order.customerName}</p>
                      <p className="text-gray-400 text-xs">{order.customerPhone}</p>
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <span className="px-2 py-1 bg-gray-100 rounded text-gray-700 text-sm font-medium">{order.itemCount}</span>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex gap-1">
                      {[...new Set(order.items.map(i => i.sourceType))].map(type => (
                        <span key={type} className="text-lg" title={sourceTypeConfig[type]?.label}>
                          {sourceTypeConfig[type]?.icon}
                        </span>
                      ))}
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <span className="text-green-600 font-medium">{order.totalPrice.toLocaleString()}đ</span>
                  </td>
                  <td className="px-4 py-3">
                    <span className={`px-2 py-1 rounded text-xs font-medium ${order.priority === 3 ? 'bg-red-100 text-red-700' :
                      order.priority === 2 ? 'bg-yellow-100 text-yellow-700' :
                        'bg-gray-100 text-gray-600'
                      }`}>
                      P{order.priority}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <span className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${orderStatusConfig[order.orderStatus]?.color}`}>
                      {orderStatusConfig[order.orderStatus]?.icon} {orderStatusConfig[order.orderStatus]?.label}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-gray-500 text-sm">{order.createdAt}</td>
                  <td className="px-4 py-3">
                    <Link
                      to={`/staff/custom-orders/${order.id}`}
                      className="px-3 py-1.5 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700"
                    >
                      Chi tiết
                    </Link>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Info */}
      <div className="mt-4 p-3 bg-blue-50 border border-blue-200 rounded-lg">
        <p className="text-blue-700 text-sm">
          💡 <strong>DB Tables:</strong> Order (OrderStatus, Priority, TotalPrice) → OrderItem (SourceType, FulfillmentStatus) → Customer → Account
        </p>
      </div>
    </div>
  );
};

export default StaffCustomOrdersList;
