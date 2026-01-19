import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white pt-12 pb-4 mt-16">
      <div className="max-w-7xl mx-auto px-8 grid grid-cols-1 md:grid-cols-4 gap-8">
        <div>
          <h3 className="mb-4 text-lg font-semibold">3D Print Shop</h3>
          <p className="text-gray-400 leading-relaxed">Your trusted partner for 3D printing solutions</p>
        </div>
        <div>
          <h4 className="mb-4 text-lg font-semibold">Quick Links</h4>
          <Link to="/products" className="block text-gray-400 no-underline mb-2 hover:text-white transition-colors">Products</Link>
          <Link to="/custom-order" className="block text-gray-400 no-underline mb-2 hover:text-white transition-colors">Custom Order</Link>
          <Link to="/about" className="block text-gray-400 no-underline mb-2 hover:text-white transition-colors">About Us</Link>
        </div>
        <div>
          <h4 className="mb-4 text-lg font-semibold">Support</h4>
          <Link to="/contact" className="block text-gray-400 no-underline mb-2 hover:text-white transition-colors">Contact</Link>
          <Link to="/faq" className="block text-gray-400 no-underline mb-2 hover:text-white transition-colors">FAQ</Link>
          <Link to="/shipping" className="block text-gray-400 no-underline mb-2 hover:text-white transition-colors">Shipping Info</Link>
        </div>
        <div>
          <h4 className="mb-4 text-lg font-semibold">Follow Us</h4>
          <div className="flex gap-4">
            <a href="#" aria-label="Facebook" className="text-gray-400 no-underline hover:text-white transition-colors">Facebook</a>
            <a href="#" aria-label="Instagram" className="text-gray-400 no-underline hover:text-white transition-colors">Instagram</a>
            <a href="#" aria-label="Twitter" className="text-gray-400 no-underline hover:text-white transition-colors">Twitter</a>
          </div>
        </div>
      </div>
      <div className="max-w-7xl mx-auto mt-8 pt-4 px-8 border-t border-gray-700 text-center text-gray-400">
        <p>&copy; 2024 3D Print Shop. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;

