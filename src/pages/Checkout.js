import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Checkout = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    zipCode: '',
    paymentMethod: 'credit_card'
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // TODO: Process payment
    navigate('/order-confirmation', { state: { orderId: 'ORD-12345' } });
  };

  return (
    <div className="max-w-7xl mx-auto px-8 py-8">
      <h1 className="text-3xl font-bold mb-8 text-gray-800">Checkout</h1>
      
      <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-2xl font-bold mb-6 text-gray-800">Shipping Information</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block mb-2 font-medium text-gray-800">Full Name</label>
                <input
                  type="text"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleChange}
                  required
                  className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:border-indigo-600"
                />
              </div>
              <div>
                <label className="block mb-2 font-medium text-gray-800">Email</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:border-indigo-600"
                />
              </div>
              <div>
                <label className="block mb-2 font-medium text-gray-800">Phone</label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  required
                  className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:border-indigo-600"
                />
              </div>
              <div>
                <label className="block mb-2 font-medium text-gray-800">City</label>
                <input
                  type="text"
                  name="city"
                  value={formData.city}
                  onChange={handleChange}
                  required
                  className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:border-indigo-600"
                />
              </div>
              <div className="md:col-span-2">
                <label className="block mb-2 font-medium text-gray-800">Address</label>
                <input
                  type="text"
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  required
                  className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:border-indigo-600"
                />
              </div>
              <div>
                <label className="block mb-2 font-medium text-gray-800">Zip Code</label>
                <input
                  type="text"
                  name="zipCode"
                  value={formData.zipCode}
                  onChange={handleChange}
                  required
                  className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:border-indigo-600"
                />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-2xl font-bold mb-6 text-gray-800">Payment Method</h2>
            <div className="space-y-4">
              <label className="flex items-center gap-3 cursor-pointer">
                <input
                  type="radio"
                  name="paymentMethod"
                  value="credit_card"
                  checked={formData.paymentMethod === 'credit_card'}
                  onChange={handleChange}
                  className="w-5 h-5"
                />
                <span className="font-medium">Credit Card</span>
              </label>
              <label className="flex items-center gap-3 cursor-pointer">
                <input
                  type="radio"
                  name="paymentMethod"
                  value="paypal"
                  checked={formData.paymentMethod === 'paypal'}
                  onChange={handleChange}
                  className="w-5 h-5"
                />
                <span className="font-medium">PayPal</span>
              </label>
              <label className="flex items-center gap-3 cursor-pointer">
                <input
                  type="radio"
                  name="paymentMethod"
                  value="bank_transfer"
                  checked={formData.paymentMethod === 'bank_transfer'}
                  onChange={handleChange}
                  className="w-5 h-5"
                />
                <span className="font-medium">Bank Transfer</span>
              </label>
            </div>
          </div>
        </div>

        <div className="lg:col-span-1">
          <div className="bg-white rounded-lg shadow-md p-6 sticky top-24">
            <h2 className="text-2xl font-bold mb-6 text-gray-800">Order Summary</h2>
            <div className="space-y-4 mb-6">
              <div className="flex justify-between">
                <span className="text-gray-600">Subtotal</span>
                <span className="font-semibold">$69.97</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Shipping</span>
                <span className="font-semibold">$5.00</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Tax</span>
                <span className="font-semibold">$7.00</span>
              </div>
              <div className="border-t border-gray-200 pt-4 flex justify-between">
                <span className="text-xl font-bold text-gray-800">Total</span>
                <span className="text-xl font-bold text-indigo-600">$81.97</span>
              </div>
            </div>
            <button
              type="submit"
              className="w-full py-4 bg-indigo-600 text-white rounded-lg font-semibold text-lg hover:bg-indigo-700 transition-colors"
            >
              Place Order
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Checkout;

