import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();
  const [quantity, setQuantity] = useState(1);
  const [selectedMaterial, setSelectedMaterial] = useState('PLA');

  // Mock product data
  const product = {
    id: id,
    name: '3D Printed Vase',
    price: 29.99,
    description: 'Beautiful handcrafted 3D printed vase perfect for home decoration.',
    materials: ['PLA', 'TPU', 'Wood PLA'],
    stock: 10,
    images: ['image1', 'image2', 'image3']
  };

  const handleAddToCart = () => {
    if (!isAuthenticated) {
      navigate('/login');
      return;
    }
    // TODO: Add to cart logic
    alert('Added to cart!');
  };

  return (
    <div className="max-w-7xl mx-auto px-8 py-8">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div>
          <div className="bg-gray-200 h-96 rounded-lg mb-4 flex items-center justify-center text-gray-500">
            3D Preview / Image Gallery
          </div>
          <div className="grid grid-cols-3 gap-4">
            {product.images.map((img, idx) => (
              <div key={idx} className="bg-gray-200 h-24 rounded flex items-center justify-center text-gray-500 text-sm">
                {img}
              </div>
            ))}
          </div>
        </div>

        <div>
          <h1 className="text-4xl font-bold mb-4 text-gray-800">{product.name}</h1>
          <p className="text-3xl font-bold text-indigo-600 mb-6">${product.price}</p>
          
          <div className="mb-6">
            <p className="text-gray-700 leading-relaxed">{product.description}</p>
          </div>

          <div className="mb-6">
            <label className="block mb-2 font-medium text-gray-800">Material</label>
            <select
              value={selectedMaterial}
              onChange={(e) => setSelectedMaterial(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded"
            >
              {product.materials.map(material => (
                <option key={material} value={material}>{material}</option>
              ))}
            </select>
          </div>

          <div className="mb-6">
            <label className="block mb-2 font-medium text-gray-800">Quantity</label>
            <div className="flex items-center gap-4">
              <button
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                className="w-10 h-10 border border-gray-300 rounded flex items-center justify-center hover:bg-gray-100"
              >
                -
              </button>
              <span className="text-xl font-semibold">{quantity}</span>
              <button
                onClick={() => setQuantity(Math.min(product.stock, quantity + 1))}
                className="w-10 h-10 border border-gray-300 rounded flex items-center justify-center hover:bg-gray-100"
              >
                +
              </button>
              <span className="text-gray-600">In Stock: {product.stock}</span>
            </div>
          </div>

          <button
            onClick={handleAddToCart}
            className="w-full py-4 bg-indigo-600 text-white rounded-lg font-semibold text-lg hover:bg-indigo-700 transition-colors mb-4"
          >
            Add to Cart
          </button>

          <button
            onClick={() => navigate(`/preview/${id}`)}
            className="w-full py-4 bg-gray-200 text-gray-800 rounded-lg font-semibold text-lg hover:bg-gray-300 transition-colors"
          >
            View 3D Preview
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;

