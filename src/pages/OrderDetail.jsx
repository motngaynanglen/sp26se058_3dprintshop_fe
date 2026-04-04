import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { Breadcrumb } from 'antd';
import { useOrder } from '../contexts/OrderContext';
import img1 from '../components/imgs/1.png';
import img2 from '../components/imgs/2.png';

// SVG Icons
const PackageIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-3.5 h-3.5">
    <path strokeLinecap="round" strokeLinejoin="round" d="m21 7.5-9-5.25L3 7.5m18 0-9 5.25m9-5.25v9l-9 5.25M3 7.5l9 5.25M3 7.5v9l9 5.25m0-9v9" />
  </svg>
);

const ClockIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-3.5 h-3.5">
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
  </svg>
);

const SparklesIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-3.5 h-3.5">
    <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904 9 18.75l-.813-2.846a4.5 4.5 0 0 0-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 0 0 3.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 0 0 3.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 0 0-3.09 3.09ZM18.259 8.715 18 9.75l-.259-1.035a3.375 3.375 0 0 0-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 0 0 2.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 0 0 2.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 0 0-2.456 2.456Z" />
  </svg>
);

const ExclamationIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 flex-shrink-0">
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126ZM12 15.75h.007v.008H12v-.008Z" />
  </svg>
);

const XCircleIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
    <path fillRule="evenodd" d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25Zm-1.72 6.97a.75.75 0 1 0-1.06 1.06L10.94 12l-1.72 1.72a.75.75 0 1 0 1.06 1.06L12 13.06l1.72 1.72a.75.75 0 1 0 1.06-1.06L13.06 12l1.72-1.72a.75.75 0 1 0-1.06-1.06L12 10.94l-1.72-1.72Z" clipRule="evenodd" />
  </svg>
);

const CheckCircleSolidIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
    <path fillRule="evenodd" d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12Zm13.36-1.814a.75.75 0 1 0-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 0 0-1.06 1.06l2.25 2.25a.75.75 0 0 0 1.14-.094l3.75-5.25Z" clipRule="evenodd" />
  </svg>
);

const MapPinIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4 text-gray-400">
    <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z" />
  </svg>
);

// ─── SOURCE TYPE BADGES (loại nguồn hàng — không phải OrderStatus)
const SOURCE_TYPE_CONFIG = {
  in_stock: { label: 'Sẵn hàng', className: 'bg-emerald-50 text-emerald-700 ring-1 ring-emerald-200', icon: <PackageIcon /> },
  pre_order: { label: 'Pre-Order', className: 'bg-amber-50 text-amber-700 ring-1 ring-amber-200', icon: <ClockIcon /> },
  custom: { label: 'Custom Design', className: 'bg-violet-50 text-violet-700 ring-1 ring-violet-200', icon: <SparklesIcon /> },
};

// ─── FULFILLMENT STATUS BADGES cho từng OrderItem (theo backend)
const FULFILLMENT_CONFIG = {
  pending: { label: 'Chờ xử lý', className: 'bg-gray-100 text-gray-500' },
  confirmed: { label: 'Đã xác nhận', className: 'bg-blue-50 text-blue-600' },
  producing: { label: 'Đang sản xuất', className: 'bg-orange-50 text-orange-600' },
  preparing: { label: 'Đang chuẩn bị', className: 'bg-amber-50 text-amber-600' },
  shipping: { label: 'Đang giao', className: 'bg-indigo-50 text-indigo-600' },
  delivered: { label: 'Đã giao', className: 'bg-emerald-50 text-emerald-600' },
  failed: { label: 'Thất bại', className: 'bg-red-50 text-red-600' },
};

// ─── ORDER STATUS BADGES (cấp Order)
const ORDER_STATUS_CONFIG = {
  created: { label: 'Chờ thanh toán', className: 'bg-gray-100 text-gray-600 ring-1 ring-gray-200' },
  confirmed: { label: 'Đã xác nhận', className: 'bg-blue-50 text-blue-700 ring-1 ring-blue-200' },
  processing: { label: 'Đang xử lý', className: 'bg-amber-50 text-amber-700 ring-1 ring-amber-200' },
  shipping: { label: 'Đang vận chuyển', className: 'bg-indigo-50 text-indigo-700 ring-1 ring-indigo-200' },
  completed: { label: 'Hoàn thành', className: 'bg-emerald-50 text-emerald-700 ring-1 ring-emerald-200' },
  failed: { label: 'Thất bại', className: 'bg-red-50 text-red-700 ring-1 ring-red-200' },
};

const ItemSourceBadge = ({ sourceType }) => {
  const config = SOURCE_TYPE_CONFIG[sourceType] || SOURCE_TYPE_CONFIG.in_stock;
  return (
    <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium ${config.className}`}>
      {config.icon}
      {config.label}
    </span>
  );
};

const FulfillmentBadge = ({ status }) => {
  const config = FULFILLMENT_CONFIG[status] || FULFILLMENT_CONFIG.pending;
  return (
    <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${config.className}`}>
      {config.label}
    </span>
  );
};

const OrderStatusBadge = ({ status }) => {
  const config = ORDER_STATUS_CONFIG[status] || ORDER_STATUS_CONFIG.created;
  return (
    <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${config.className}`}>
      {config.label}
    </span>
  );
};

// ─── TIMELINE: mapping OrderStatus/FulfillmentStatus → tracking steps (theo backend lifecycle)
// Created → Confirmed → Processing(Preparing/Producing) → Shipping → Completed
const buildTrackingSteps = (orderStatus, hasPreOrder) => {
  const isFailed = orderStatus === 'failed';

  const steps = [
    {
      key: 'created',
      label: 'Đã đặt hàng',
      description: 'Đơn hàng đã được tiếp nhận, chờ thanh toán.',
      done: true,
    },
    {
      key: 'confirmed',
      label: 'Đã xác nhận',
      description: 'Staff xác nhận đơn hàng sau khi thanh toán thành công.',
      done: ['confirmed', 'processing', 'shipping', 'completed'].includes(orderStatus),
    },
  ];

  if (hasPreOrder) {
    steps.push({
      key: 'producing',
      label: 'Đang sản xuất (Pre-Order)',
      description: 'Hàng chưa có sẵn, đang bổ sung / sản xuất theo đơn đặt trước.',
      done: ['processing', 'shipping', 'completed'].includes(orderStatus),
      isPreOrder: true,
    });
  }

  steps.push(
    {
      key: 'processing',
      label: 'Đang chuẩn bị hàng',
      description: 'Đơn hàng đang được đóng gói và chuẩn bị giao.',
      done: ['processing', 'shipping', 'completed'].includes(orderStatus),
    },
    {
      key: 'shipping',
      label: 'Đang vận chuyển',
      description: 'Đơn hàng đã được bàn giao cho đơn vị vận chuyển.',
      done: ['shipping', 'completed'].includes(orderStatus),
    },
    {
      key: 'completed',
      label: 'Đã giao hàng',
      description: 'Tất cả sản phẩm đã được giao thành công.',
      done: orderStatus === 'completed',
    }
  );

  if (isFailed) {
    return [{
      key: 'failed',
      label: 'Đơn hàng thất bại',
      description: 'Thanh toán không thành công hoặc đơn hàng bị huỷ.',
      done: true,
      isFailed: true,
    }];
  }

  return steps;
};

const OrderDetail = () => {
  const { id } = useParams();

  const { getOrderById } = useOrder();
  const order = getOrderById(id);

  if (!order) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 px-4">
        <h2 className="text-2xl font-bold text-gray-800 mb-2">Đơn hàng không tồn tại</h2>
        <p className="text-gray-500 mb-6">Chúng tôi không tìm thấy thông tin đơn hàng này.</p>
        <Link to="/my-orders" className="text-indigo-600 font-medium hover:underline">
          Quay lại danh sách Đơn hàng
        </Link>
      </div>
    );
  }

  const hasPreOrder = order.items.some(i => i.sourceType === 'pre_order');
  const hasCustom = order.items.some(i => i.sourceType === 'custom');
  const isFailed = order.status === 'failed';
  const trackingSteps = buildTrackingSteps(order.status, hasPreOrder);

  const formatPrice = (price) =>
    new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(price);

  return (
    <div className="max-w-7xl mx-auto px-6 py-8">
      <div className="mb-6">
        <Breadcrumb
          items={[
            { title: <Link to="/">Trang chủ</Link> },
            { title: <Link to="/my-orders">Đơn hàng của tôi</Link> },
            { title: `Chi tiết đơn hàng #${id}` },
          ]}
        />
      </div>

      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Chi tiết đơn hàng</h1>
          <p className="text-gray-500 mt-1">
            Mã đơn: <span className="font-mono font-semibold text-gray-700">{order.id}</span> · Đặt ngày {order.date}
          </p>
        </div>
        <OrderStatusBadge status={order.status} />
      </div>

      {/* Failed banner */}
      {isFailed && (
        <div className="flex items-center gap-3 p-4 mb-6 bg-red-50 rounded-2xl border border-red-200 text-red-700">
          <XCircleIcon />
          <div>
            <p className="font-semibold text-sm">Đơn hàng thất bại</p>
            <p className="text-xs text-red-600 mt-0.5">Thanh toán không thành công. Vui lòng liên hệ hỗ trợ nếu cần thiết.</p>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left */}
        <div className="lg:col-span-2 space-y-6">

          {/* Items */}
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
            <div className="flex items-center gap-2 mb-5">
              <div className="w-1 h-6 bg-indigo-600 rounded-full" />
              <h2 className="text-lg font-bold text-gray-900">Sản phẩm</h2>
            </div>

            {/* Delivery notice for pre-order/custom */}
            {(hasPreOrder || hasCustom) && !isFailed && (
              <div className="flex items-start gap-3 p-3 mb-4 bg-amber-50 rounded-xl border border-amber-200 text-sm text-amber-800">
                <ExclamationIcon />
                <p>
                  Đơn hàng có sản phẩm <strong>{hasCustom ? 'Custom Design' : 'Pre-Order'}</strong> —
                  sẽ chuyển sang trạng thái <em>Đang sản xuất</em> trước khi chuẩn bị giao.
                </p>
              </div>
            )}

            <div className="space-y-4">
              {order.items.map((item, idx) => (
                <div key={idx} className="flex items-start gap-4 pb-4 border-b border-gray-50 last:border-b-0 last:pb-0">
                  <div className="w-20 h-20 rounded-xl overflow-hidden bg-gray-100 flex-shrink-0">
                    <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-gray-900 text-sm leading-snug mb-2">{item.name}</h3>
                    <div className="flex flex-wrap items-center gap-2 mb-1">
                      {/* Nguồn hàng */}
                      <ItemSourceBadge sourceType={item.sourceType} />
                      {/* Fulfillment status từng item */}
                      <FulfillmentBadge status={item.fulfillmentStatus} />
                    </div>
                    <p className="text-xs text-gray-400">Vật liệu: {item.material} · SL: {item.quantity}</p>
                  </div>
                  <p className="font-bold text-gray-900 text-sm flex-shrink-0">
                    {formatPrice(item.price * item.quantity)}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Order Lifecycle Tracking */}
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
            <div className="flex items-center gap-2 mb-5">
              <div className="w-1 h-6 bg-indigo-600 rounded-full" />
              <h2 className="text-lg font-bold text-gray-900">Theo dõi đơn hàng</h2>
            </div>
            <div className="space-y-0">
              {trackingSteps.map((step, idx) => (
                <div key={step.key} className="flex gap-4">
                  <div className="flex flex-col items-center">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                      step.isFailed
                        ? 'bg-red-500 text-white'
                        : step.done
                          ? step.isPreOrder ? 'bg-amber-500 text-white' : 'bg-indigo-600 text-white'
                          : 'bg-gray-100 text-gray-300'
                    }`}>
                      {step.isFailed ? <XCircleIcon /> : step.done ? <CheckCircleSolidIcon /> : (
                        <div className="w-2.5 h-2.5 rounded-full bg-gray-300" />
                      )}
                    </div>
                    {idx < trackingSteps.length - 1 && (
                      <div className={`w-0.5 h-12 ${step.done ? (step.isPreOrder ? 'bg-amber-200' : 'bg-indigo-200') : 'bg-gray-100'}`} />
                    )}
                  </div>
                  <div className="flex-1 pb-6">
                    <div className="flex items-center gap-2">
                      <p className={`font-semibold text-sm ${step.done ? 'text-gray-900' : 'text-gray-400'}`}>
                        {step.label}
                      </p>
                      {step.isPreOrder && (
                        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium bg-amber-50 text-amber-700 ring-1 ring-amber-200">
                          <ClockIcon />
                          Pre-Order
                        </span>
                      )}
                    </div>
                    <p className={`text-xs mt-0.5 ${step.done ? 'text-gray-500' : 'text-gray-400'}`}>
                      {step.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Sidebar */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 sticky top-24 space-y-5">
            {/* Price breakdown */}
            <div>
              <h3 className="font-bold text-gray-900 mb-3">Tóm tắt đơn hàng</h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-500">Tạm tính</span>
                  <span className="text-gray-700">{formatPrice(order.subtotal)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Phí vận chuyển</span>
                  <span className="text-gray-700">{formatPrice(order.shipping)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Thuế VAT</span>
                  <span className="text-gray-700">{formatPrice(order.tax)}</span>
                </div>
                <div className="pt-2 border-t border-gray-100 flex justify-between">
                  <span className="font-bold text-gray-900">Tổng cộng</span>
                  <span className="font-bold text-indigo-600">{formatPrice(order.total)}</span>
                </div>
              </div>
            </div>

            {/* Shipping address */}
            <div className="pt-4 border-t border-gray-100">
              <div className="flex items-center gap-1.5 mb-3">
                <MapPinIcon />
                <h3 className="font-bold text-gray-900 text-sm">Địa chỉ giao hàng</h3>
              </div>
              <div className="text-sm text-gray-600 space-y-0.5">
                <p className="font-medium text-gray-800">{order.shippingInfo.name}</p>
                <p>{order.shippingInfo.address}</p>
                <p>{order.shippingInfo.city}</p>
                <p>{order.shippingInfo.phone}</p>
              </div>
            </div>

            {/* ETA */}
            {order.estimatedDelivery && !isFailed && (
              <div className="pt-4 border-t border-gray-100">
                <p className="text-xs text-gray-500 mb-1">Ngày giao hàng dự kiến</p>
                <p className="font-semibold text-gray-900 text-sm">{order.estimatedDelivery}</p>
              </div>
            )}

            {/* Feedback only when completed */}
            {order.status === 'completed' && (
              <Link
                to={`/feedback/${order.id}`}
                className="block w-full py-3 text-center bg-indigo-600 text-white rounded-xl font-semibold text-sm hover:bg-indigo-700 transition-colors duration-200 cursor-pointer"
              >
                Gửi đánh giá
              </Link>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderDetail;
