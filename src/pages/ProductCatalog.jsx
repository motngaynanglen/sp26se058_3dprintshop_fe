import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const ProductCatalog = () => {
  const [viewMode, setViewMode] = useState('grid'); // 'grid' or 'list'
  const [filters, setFilters] = useState({
    category: '',
    priceRange: '',
    material: ''
  });

  // Mock products data
  const products = [
    { id: 1, name: '3D Printed Vase', price: 29.99, category: 'Home Decor', material: 'PLA', stock: 10 },
    { id: 2, name: 'Custom Phone Case', price: 19.99, category: 'Tech Accessories', material: 'TPU', stock: 25 },
    { id: 3, name: 'Miniature Figurine', price: 15.99, category: 'Toys & Games', material: 'PLA', stock: 15 },
    { id: 4, name: 'Jewelry Box', price: 34.99, category: 'Home Decor', material: 'Wood PLA', stock: 8 },
    { id: 5, name: 'Cable Organizer', price: 12.99, category: 'Tech Accessories', material: 'PLA', stock: 30 },
    { id: 6, name: 'Art Sculpture', price: 49.99, category: 'Art & Sculptures', material: 'Resin', stock: 5 }
  ];

  const filteredProducts = products.filter(product => {
    if (filters.category && product.category !== filters.category) return false;
    if (filters.material && product.material !== filters.material) return false;
    return true;
  });

  return (
    <div className="p-8 max-w-7xl mx-auto">
      <div className="flex justify-between items-center mb-8">
        <h1 className="m-0 text-gray-800">Product Catalog</h1>
        <div className="flex gap-2">
          <button
            className={`p-2 border rounded transition-all ${viewMode === 'grid' ? 'bg-indigo-600 text-white border-indigo-600' : 'bg-white border-gray-300'}`}
            onClick={() => setViewMode('grid')}
          >
            Grid
          </button>
          <button
            className={`p-2 border rounded transition-all ${viewMode === 'list' ? 'bg-indigo-600 text-white border-indigo-600' : 'bg-white border-gray-300'}`}
            onClick={() => setViewMode('list')}
          >
            List
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-[250px_1fr] gap-8">
        <aside className="bg-white p-6 rounded-lg shadow-md h-fit sticky top-24">
          <h3 className="m-0 mb-6 text-gray-800">Filters</h3>
          
          <div className="mb-6">
            <label className="block mb-2 text-gray-800 font-medium">Category</label>
            <select
              value={filters.category}
              onChange={(e) => setFilters({ ...filters, category: e.target.value })}
              className="w-full p-2 border border-gray-300 rounded text-sm"
            >
              <option value="">All Categories</option>
              <option value="Toys & Games">Toys & Games</option>
              <option value="Home Decor">Home Decor</option>
              <option value="Tech Accessories">Tech Accessories</option>
              <option value="Art & Sculptures">Art & Sculptures</option>
            </select>
          </div>

          <div className="mb-6">
            <label className="block mb-2 text-gray-800 font-medium">Material</label>
            <select
              value={filters.material}
              onChange={(e) => setFilters({ ...filters, material: e.target.value })}
              className="w-full p-2 border border-gray-300 rounded text-sm"
            >
              <option value="">All Materials</option>
              <option value="PLA">PLA</option>
              <option value="TPU">TPU</option>
              <option value="Wood PLA">Wood PLA</option>
              <option value="Resin">Resin</option>
            </select>
          </div>

          <div className="mb-6">
            <label className="block mb-2 text-gray-800 font-medium">Price Range</label>
            <select
              value={filters.priceRange}
              onChange={(e) => setFilters({ ...filters, priceRange: e.target.value })}
              className="w-full p-2 border border-gray-300 rounded text-sm"
            >
              <option value="">All Prices</option>
              <option value="0-20">$0 - $20</option>
              <option value="20-40">$20 - $40</option>
              <option value="40+">$40+</option>
            </select>
          </div>

          <button
            className="w-full p-3 bg-gray-100 border-none rounded cursor-pointer font-medium transition-colors hover:bg-gray-200"
            onClick={() => setFilters({ category: '', priceRange: '', material: '' })}
          >
            Clear Filters
          </button>
        </aside>

        <main>
          <div className={viewMode === 'grid' ? 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6' : 'flex flex-col gap-6'}>
            {filteredProducts.map(product => (
              <div key={product.id} className={`bg-white rounded-lg overflow-hidden shadow-md transition-all hover:-translate-y-1 hover:shadow-xl ${viewMode === 'list' ? 'flex flex-row' : 'flex flex-col'}`}>
                <div className={`bg-gray-200 flex items-center justify-center text-gray-500 ${viewMode === 'grid' ? 'w-full h-48' : 'w-48 h-48 flex-shrink-0'}`}>
                  Image
                </div>
                <div className="p-6 flex-1 flex flex-col">
                  <h3 className="m-0 mb-2 text-gray-800">{product.name}</h3>
                  <p className="my-1 text-gray-600 text-sm">{product.category}</p>
                  <p className="my-1 text-gray-600 text-sm">Material: {product.material}</p>
                  <p className="my-1 text-gray-600 text-sm">In Stock: {product.stock}</p>
                  <div className="mt-auto flex justify-between items-center pt-4">
                    <span className="text-2xl font-bold text-indigo-600">${product.price}</span>
                    <Link to={`/products/${product.id}`} className="py-2 px-4 bg-indigo-600 text-white no-underline rounded transition-colors hover:bg-indigo-700">
                      View Details
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </main>
      </div>
    </div>
  );
};

export default ProductCatalog;

