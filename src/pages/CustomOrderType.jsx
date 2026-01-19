import React from 'react';
import { Link } from 'react-router-dom';

const CustomOrderType = () => {
  return (
    <div className="max-w-7xl mx-auto px-8 py-16">
      <h1 className="text-4xl font-bold mb-4 text-center text-gray-800">Create Custom Order</h1>
      <p className="text-xl text-gray-600 mb-12 text-center">Choose the type of custom order you'd like to create</p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <Link
          to="/custom-order/upload"
          className="bg-white rounded-lg shadow-lg p-8 text-center hover:shadow-xl transition-shadow group"
        >
          <div className="text-6xl mb-6 group-hover:scale-110 transition-transform">📁</div>
          <h2 className="text-2xl font-bold mb-4 text-gray-800">Upload File</h2>
          <p className="text-gray-600 leading-relaxed">
            Upload your own 3D design file (STL/OBJ) and select material, quantity, and service type
          </p>
        </Link>

        <Link
          to="/custom-order/request-design"
          className="bg-white rounded-lg shadow-lg p-8 text-center hover:shadow-xl transition-shadow group"
        >
          <div className="text-6xl mb-6 group-hover:scale-110 transition-transform">✏️</div>
          <h2 className="text-2xl font-bold mb-4 text-gray-800">Request Design</h2>
          <p className="text-gray-600 leading-relaxed">
            Send reference images and description for our staff to design a 3D file for you
          </p>
        </Link>

        <Link
          to="/custom-order/ai-generate"
          className="bg-white rounded-lg shadow-lg p-8 text-center hover:shadow-xl transition-shadow group"
        >
          <div className="text-6xl mb-6 group-hover:scale-110 transition-transform">🤖</div>
          <h2 className="text-2xl font-bold mb-4 text-gray-800">AI Generate</h2>
          <p className="text-gray-600 leading-relaxed">
            Use AI-powered tool to convert your images into a prototype 3D model
          </p>
        </Link>
      </div>
    </div>
  );
};

export default CustomOrderType;

