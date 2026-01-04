import React from 'react';
import { useLocation, Link } from 'react-router-dom';

const OrderConfirmation = () => {
  const location = useLocation();
  const orderId = location.state?.orderId || 'ORD-12345';

  return (
    <div className="max-w-3xl mx-auto px-8 py-16 text-center">
      <div className="bg-white rounded-lg shadow-lg p-12">
        <div className="text-6xl mb-6">✅</div>
        <h1 className="text-4xl font-bold mb-4 text-gray-800">Order Confirmed!</h1>
        <p className="text-xl text-gray-600 mb-8">
          Thank you for your purchase. Your order has been received and is being processed.
        </p>
        <div className="bg-gray-50 rounded-lg p-6 mb-8">
          <p className="text-gray-600 mb-2">Order Number</p>
          <p className="text-2xl font-bold text-indigo-600">{orderId}</p>
        </div>
        <div className="space-y-4">
          <Link
            to={`/orders/${orderId}`}
            className="inline-block py-3 px-8 bg-indigo-600 text-white rounded-lg font-semibold hover:bg-indigo-700 transition-colors"
          >
            View Order Details
          </Link>
          <Link
            to="/products"
            className="inline-block py-3 px-8 bg-gray-200 text-gray-800 rounded-lg font-semibold hover:bg-gray-300 transition-colors ml-4"
          >
            Continue Shopping
          </Link>
        </div>
      </div>
    </div>
  );
};

export default OrderConfirmation;

