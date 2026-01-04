import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const ShoppingCart = () => {
  const navigate = useNavigate();
  const [cartItems, setCartItems] = useState([
    { id: 1, name: '3D Printed Vase', price: 29.99, quantity: 2, material: 'PLA' },
    { id: 2, name: 'Custom Phone Case', price: 19.99, quantity: 1, material: 'TPU' }
  ]);

  const updateQuantity = (id, newQuantity) => {
    if (newQuantity <= 0) {
      setCartItems(cartItems.filter(item => item.id !== id));
    } else {
      setCartItems(cartItems.map(item =>
        item.id === id ? { ...item, quantity: newQuantity } : item
      ));
    }
  };

  const removeItem = (id) => {
    setCartItems(cartItems.filter(item => item.id !== id));
  };

  const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const tax = subtotal * 0.1;
  const total = subtotal + tax;

  if (cartItems.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-8 py-16 text-center">
        <h1 className="text-3xl font-bold mb-4 text-gray-800">Your Cart is Empty</h1>
        <p className="text-gray-600 mb-8">Add some products to get started!</p>
        <Link to="/products" className="inline-block py-3 px-6 bg-indigo-600 text-white rounded-lg font-semibold hover:bg-indigo-700 transition-colors">
          Browse Products
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-8 py-8">
      <h1 className="text-3xl font-bold mb-8 text-gray-800">Shopping Cart</h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            {cartItems.map(item => (
              <div key={item.id} className="p-6 border-b border-gray-200 last:border-b-0 flex items-center gap-6">
                <div className="bg-gray-200 w-24 h-24 rounded flex items-center justify-center text-gray-500 text-sm flex-shrink-0">
                  Image
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-semibold mb-2 text-gray-800">{item.name}</h3>
                  <p className="text-gray-600 mb-2">Material: {item.material}</p>
                  <p className="text-xl font-bold text-indigo-600">${item.price}</p>
                </div>
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity - 1)}
                      className="w-8 h-8 border border-gray-300 rounded flex items-center justify-center hover:bg-gray-100"
                    >
                      -
                    </button>
                    <span className="w-12 text-center font-semibold">{item.quantity}</span>
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      className="w-8 h-8 border border-gray-300 rounded flex items-center justify-center hover:bg-gray-100"
                    >
                      +
                    </button>
                  </div>
                  <button
                    onClick={() => removeItem(item.id)}
                    className="text-red-600 hover:text-red-800 font-medium"
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="lg:col-span-1">
          <div className="bg-white rounded-lg shadow-md p-6 sticky top-24">
            <h2 className="text-2xl font-bold mb-6 text-gray-800">Order Summary</h2>
            <div className="space-y-4 mb-6">
              <div className="flex justify-between">
                <span className="text-gray-600">Subtotal</span>
                <span className="font-semibold">${subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Tax</span>
                <span className="font-semibold">${tax.toFixed(2)}</span>
              </div>
              <div className="border-t border-gray-200 pt-4 flex justify-between">
                <span className="text-xl font-bold text-gray-800">Total</span>
                <span className="text-xl font-bold text-indigo-600">${total.toFixed(2)}</span>
              </div>
            </div>
            <button
              onClick={() => navigate('/checkout')}
              className="w-full py-4 bg-indigo-600 text-white rounded-lg font-semibold text-lg hover:bg-indigo-700 transition-colors"
            >
              Proceed to Checkout
            </button>
            <Link
              to="/products"
              className="block w-full py-3 mt-4 text-center bg-gray-200 text-gray-800 rounded-lg font-semibold hover:bg-gray-300 transition-colors"
            >
              Continue Shopping
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShoppingCart;

