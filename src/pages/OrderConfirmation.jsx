import React from 'react';
import { useLocation, Link } from 'react-router-dom';

const CheckCircleIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-16 h-16 text-emerald-500">
    <path fillRule="evenodd" d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12Zm13.36-1.814a.75.75 0 1 0-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 0 0-1.06 1.06l2.25 2.25a.75.75 0 0 0 1.14-.094l3.75-5.25Z" clipRule="evenodd" />
  </svg>
);

const ArrowRightIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4">
    <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
  </svg>
);

const OrderConfirmation = () => {
  const location = useLocation();
  const orderId = location.state?.orderId || 'ORD-12345';

  return (
    <div className="max-w-2xl mx-auto px-6 py-16">
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
        {/* Top accent bar */}
        <div className="h-1.5 bg-gradient-to-r from-indigo-500 to-emerald-500" />

        <div className="p-12 text-center">
          {/* Icon */}
          <div className="flex justify-center mb-6">
            <CheckCircleIcon />
          </div>

          {/* Heading */}
          <h1 className="text-3xl font-bold text-gray-900 mb-3">Đặt hàng thành công!</h1>
          <p className="text-gray-500 mb-8 leading-relaxed">
            Cảm ơn bạn đã mua hàng. Đơn hàng của bạn đã được tiếp nhận và đang được xử lý.
            Chúng tôi sẽ thông báo qua email khi đơn hàng sẵn sàng.
          </p>

          {/* Order number */}
          <div className="bg-gray-50 rounded-xl px-8 py-5 mb-8 border border-gray-100">
            <p className="text-xs text-gray-400 uppercase tracking-wide mb-1">Mã đơn hàng</p>
            <p className="text-xl font-bold text-indigo-600 font-mono">{orderId}</p>
          </div>

          {/* Actions */}
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link
              to={`/orders/${orderId}`}
              className="inline-flex items-center justify-center gap-2 py-3 px-6 bg-indigo-600 text-white rounded-xl font-semibold text-sm hover:bg-indigo-700 transition-colors duration-200 cursor-pointer"
            >
              Xem chi tiết đơn hàng
              <ArrowRightIcon />
            </Link>
            <Link
              to="/products"
              className="inline-flex items-center justify-center py-3 px-6 bg-white text-gray-700 rounded-xl font-semibold text-sm border border-gray-200 hover:bg-gray-50 transition-colors duration-200 cursor-pointer"
            >
              Tiếp tục mua sắm
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderConfirmation;
