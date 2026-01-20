import React, { useState } from 'react';

const ManageProducts = () => {
  const [products, setProducts] = useState([
    { id: 1, name: '3D Printed Vase', price: 29.99, category: 'Home Decor', stock: 10, enabled: true },
    { id: 2, name: 'Custom Phone Case', price: 19.99, category: 'Tech Accessories', stock: 25, enabled: true }
  ]);
  const [showModal, setShowModal] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);

  const handleDelete = (id) => {
    if (window.confirm('Bạn có chắc chắn muốn xóa sản phẩm này?')) {
      setProducts(products.filter(p => p.id !== id));
    }
  };

  const handleToggle = (id) => {
    setProducts(products.map(p => p.id === id ? { ...p, enabled: !p.enabled } : p));
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-800">Quản lý sản phẩm</h1>
        <button
          onClick={() => { setEditingProduct(null); setShowModal(true); }}
          className="py-2 px-6 bg-indigo-600 text-white rounded-lg font-semibold hover:bg-indigo-700 transition-colors"
        >
          + Thêm sản phẩm
        </button>
      </div>

      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-4 text-left text-sm font-semibold text-gray-800">Tên sản phẩm</th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-gray-800">Danh mục</th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-gray-800">Giá</th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-gray-800">Tồn kho</th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-gray-800">Trạng thái</th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-gray-800">Thao tác</th>
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
                    {product.enabled ? 'Đang bán' : 'Đã tắt'}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <div className="flex gap-2">
                    <button
                      onClick={() => { setEditingProduct(product); setShowModal(true); }}
                      className="text-indigo-600 hover:text-indigo-800 font-medium"
                    >
                      Sửa
                    </button>
                    <button
                      onClick={() => handleToggle(product.id)}
                      className="text-yellow-600 hover:text-yellow-800 font-medium"
                    >
                      {product.enabled ? 'Tắt' : 'Bật'}
                    </button>
                    <button
                      onClick={() => handleDelete(product.id)}
                      className="text-red-600 hover:text-red-800 font-medium"
                    >
                      Xóa
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      </div>
    </div>
  );
};

export default ManageProducts;

