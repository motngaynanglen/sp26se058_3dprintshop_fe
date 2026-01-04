import React, { useState } from 'react';

const ManageProducts = () => {
  const [products, setProducts] = useState([
    { id: 1, name: '3D Printed Vase', price: 29.99, category: 'Home Decor', stock: 10, enabled: true },
    { id: 2, name: 'Custom Phone Case', price: 19.99, category: 'Tech Accessories', stock: 25, enabled: true }
  ]);
  const [showModal, setShowModal] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      setProducts(products.filter(p => p.id !== id));
    }
  };

  const handleToggle = (id) => {
    setProducts(products.map(p => p.id === id ? { ...p, enabled: !p.enabled } : p));
  };

  return (
    <div className="max-w-7xl mx-auto px-8 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-800">Manage Products</h1>
        <button
          onClick={() => { setEditingProduct(null); setShowModal(true); }}
          className="py-2 px-6 bg-indigo-600 text-white rounded-lg font-semibold hover:bg-indigo-700 transition-colors"
        >
          + Add Product
        </button>
      </div>

      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-4 text-left text-sm font-semibold text-gray-800">Name</th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-gray-800">Category</th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-gray-800">Price</th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-gray-800">Stock</th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-gray-800">Status</th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-gray-800">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {products.map(product => (
              <tr key={product.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 text-sm font-medium text-gray-800">{product.name}</td>
                <td className="px-6 py-4 text-sm text-gray-600">{product.category}</td>
                <td className="px-6 py-4 text-sm text-gray-600">${product.price}</td>
                <td className="px-6 py-4 text-sm text-gray-600">{product.stock}</td>
                <td className="px-6 py-4">
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                    product.enabled ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                  }`}>
                    {product.enabled ? 'Enabled' : 'Disabled'}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <div className="flex gap-2">
                    <button
                      onClick={() => { setEditingProduct(product); setShowModal(true); }}
                      className="text-indigo-600 hover:text-indigo-800 font-medium"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleToggle(product.id)}
                      className="text-yellow-600 hover:text-yellow-800 font-medium"
                    >
                      {product.enabled ? 'Disable' : 'Enable'}
                    </button>
                    <button
                      onClick={() => handleDelete(product.id)}
                      className="text-red-600 hover:text-red-800 font-medium"
                    >
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ManageProducts;

