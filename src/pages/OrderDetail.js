import React from 'react';
import { useParams, Link } from 'react-router-dom';

const OrderDetail = () => {
  const { id } = useParams();

  // Mock order data
  const order = {
    id: id,
    date: '2024-01-15',
    status: 'completed',
    total: 69.97,
    items: [
      { name: '3D Printed Vase', quantity: 2, price: 29.99, material: 'PLA' },
      { name: 'Custom Phone Case', quantity: 1, price: 19.99, material: 'TPU' }
    ],
    shipping: {
      name: 'John Doe',
      address: '123 Main St',
      city: 'New York',
      zipCode: '10001',
      phone: '+1234567890'
    },
    tracking: [
      { date: '2024-01-15', status: 'Order Placed', description: 'Your order has been received' },
      { date: '2024-01-16', status: 'Processing', description: 'Your order is being prepared' },
      { date: '2024-01-18', status: 'Shipped', description: 'Your order has been shipped' },
      { date: '2024-01-20', status: 'Delivered', description: 'Your order has been delivered' }
    ]
  };

  return (
    <div className="max-w-7xl mx-auto px-8 py-8">
      <div className="mb-6">
        <Link to="/my-orders" className="text-indigo-600 hover:text-indigo-800 font-medium">
          ← Back to Orders
        </Link>
      </div>

      <h1 className="text-3xl font-bold mb-8 text-gray-800">Order Details</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-2xl font-bold mb-6 text-gray-800">Order Items</h2>
            <div className="space-y-4">
              {order.items.map((item, idx) => (
                <div key={idx} className="flex items-center gap-4 pb-4 border-b border-gray-200 last:border-b-0">
                  <div className="bg-gray-200 w-20 h-20 rounded flex items-center justify-center text-gray-500 text-xs flex-shrink-0">
                    Image
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-gray-800">{item.name}</h3>
                    <p className="text-sm text-gray-600">Material: {item.material}</p>
                    <p className="text-sm text-gray-600">Quantity: {item.quantity}</p>
                  </div>
                  <p className="font-semibold text-gray-800">${(item.price * item.quantity).toFixed(2)}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-2xl font-bold mb-6 text-gray-800">Tracking Information</h2>
            <div className="space-y-4">
              {order.tracking.map((track, idx) => (
                <div key={idx} className="flex gap-4">
                  <div className="flex flex-col items-center">
                    <div className={`w-4 h-4 rounded-full ${idx < order.tracking.length - 1 ? 'bg-indigo-600' : 'bg-gray-300'}`}></div>
                    {idx < order.tracking.length - 1 && (
                      <div className="w-0.5 h-12 bg-indigo-600"></div>
                    )}
                  </div>
                  <div className="flex-1 pb-4">
                    <p className="font-semibold text-gray-800">{track.status}</p>
                    <p className="text-sm text-gray-600">{track.description}</p>
                    <p className="text-xs text-gray-500 mt-1">{track.date}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="lg:col-span-1">
          <div className="bg-white rounded-lg shadow-md p-6 sticky top-24 space-y-6">
            <div>
              <h3 className="font-semibold text-gray-800 mb-2">Order Summary</h3>
              <p className="text-sm text-gray-600">Order ID: {order.id}</p>
              <p className="text-sm text-gray-600">Date: {order.date}</p>
              <span className="inline-block mt-2 px-3 py-1 bg-green-100 text-green-800 rounded-full text-xs font-medium">
                {order.status}
              </span>
            </div>

            <div>
              <h3 className="font-semibold text-gray-800 mb-4">Shipping Address</h3>
              <p className="text-sm text-gray-600">{order.shipping.name}</p>
              <p className="text-sm text-gray-600">{order.shipping.address}</p>
              <p className="text-sm text-gray-600">{order.shipping.city}, {order.shipping.zipCode}</p>
              <p className="text-sm text-gray-600">{order.shipping.phone}</p>
            </div>

            <div>
              <h3 className="font-semibold text-gray-800 mb-4">Total</h3>
              <p className="text-2xl font-bold text-indigo-600">${order.total.toFixed(2)}</p>
            </div>

            <Link
              to={`/feedback/${order.id}`}
              className="block w-full py-3 text-center bg-indigo-600 text-white rounded-lg font-semibold hover:bg-indigo-700 transition-colors"
            >
              Leave Feedback
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderDetail;

