import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const ProductCatalog = () => {
  const [viewMode, setViewMode] = useState('grid'); // 'grid' or 'list'
  const [filters, setFilters] = useState({
    category: '',
    priceRange: '',
    material: '',
  });

  // Mock products data
  const products = [
    {
      id: 1,
      name: 'Bộ mô hình trang trí bàn làm việc',
      price: 299000,
      category: 'Home Decor',
      material: 'PLA',
      stock: 10,
      badge: '-10%',
    },
    {
      id: 2,
      name: 'Ốp lưng điện thoại in 3D',
      price: 199000,
      category: 'Tech Accessories',
      material: 'TPU',
      stock: 25,
      badge: 'Hot',
    },
    {
      id: 3,
      name: 'Mô hình nhân vật sưu tầm',
      price: 459000,
      category: 'Toys & Games',
      material: 'Resin',
      stock: 5,
      badge: 'New',
    },
    {
      id: 4,
      name: 'Đế tai nghe / giá trưng bày',
      price: 249000,
      category: 'Tech Accessories',
      material: 'PLA',
      stock: 18,
      badge: '-15%',
    },
    {
      id: 5,
      name: 'Khung mô hình kiến trúc mini',
      price: 699000,
      category: 'Art & Sculptures',
      material: 'PLA',
      stock: 3,
      badge: 'Limited',
    },
    {
      id: 6,
      name: 'Bộ phụ kiện cable management',
      price: 159000,
      category: 'Tech Accessories',
      material: 'PLA',
      stock: 30,
      badge: 'Best seller',
    },
  ];

  const filteredProducts = products.filter((product) => {
    if (filters.category && product.category !== filters.category) return false;
    if (filters.material && product.material !== filters.material) return false;

    if (filters.priceRange) {
      if (filters.priceRange === '0-200' && product.price > 200000) return false;
      if (
        filters.priceRange === '200-500' &&
        (product.price < 200000 || product.price > 500000)
      )
        return false;
      if (filters.priceRange === '500+' && product.price < 500000) return false;
    }

    return true;
  });

  const formatPrice = (value) =>
    `${value.toLocaleString('vi-VN', { maximumFractionDigits: 0 })} đ`;

  return (
    <div className="space-y-5">
      {/* Header bộ lọc */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-lg sm:text-xl font-semibold text-slate-900 m-0">
            Danh sách sản phẩm in 3D
          </h1>
          <p className="mt-1 text-xs sm:text-sm text-slate-500">
            Chọn nhanh các mẫu in sẵn hoặc dùng như gợi ý cho đơn in theo yêu cầu của bạn.
          </p>
        </div>

        <div className="flex items-center gap-2 self-start">
          <button
            className={`flex items-center gap-1 rounded-full border px-3 py-1.5 text-xs font-medium transition-all ${
              viewMode === 'grid'
                ? 'border-indigo-600 bg-indigo-50 text-indigo-700'
                : 'border-slate-200 bg-white text-slate-600 hover:border-indigo-400'
            }`}
            onClick={() => setViewMode('grid')}
          >
            <span>🔳</span>
            <span>Grid</span>
          </button>
          <button
            className={`flex items-center gap-1 rounded-full border px-3 py-1.5 text-xs font-medium transition-all ${
              viewMode === 'list'
                ? 'border-indigo-600 bg-indigo-50 text-indigo-700'
                : 'border-slate-200 bg-white text-slate-600 hover:border-indigo-400'
            }`}
            onClick={() => setViewMode('list')}
          >
            <span>📋</span>
            <span>List</span>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-[260px_minmax(0,1fr)] gap-5">
        {/* Sidebar bộ lọc */}
        <aside className="h-fit rounded-xl bg-white border border-slate-200 shadow-sm lg:sticky lg:top-28">
          <div className="px-4 py-3 border-b border-slate-100 flex items-center justify-between">
            <h3 className="m-0 text-sm font-semibold text-slate-900">Bộ lọc tìm kiếm</h3>
            <button
              type="button"
              className="text-[11px] font-medium text-indigo-600 hover:underline"
              onClick={() => setFilters({ category: '', priceRange: '', material: '' })}
            >
              Xóa lọc
            </button>
          </div>

          <div className="px-4 py-3 space-y-4 text-xs">
            <div>
              <p className="mb-1 font-semibold text-slate-700">Danh mục</p>
              <select
                value={filters.category}
                onChange={(e) => setFilters({ ...filters, category: e.target.value })}
                className="w-full rounded-md border border-slate-200 px-2 py-1.5 text-xs outline-none focus:border-indigo-500"
              >
                <option value="">Tất cả</option>
                <option value="Toys & Games">Mô hình / đồ chơi</option>
                <option value="Home Decor">Trang trí</option>
                <option value="Tech Accessories">Phụ kiện công nghệ</option>
                <option value="Art & Sculptures">Nghệ thuật / điêu khắc</option>
              </select>
            </div>

            <div>
              <p className="mb-1 font-semibold text-slate-700">Vật liệu</p>
              <select
                value={filters.material}
                onChange={(e) => setFilters({ ...filters, material: e.target.value })}
                className="w-full rounded-md border border-slate-200 px-2 py-1.5 text-xs outline-none focus:border-indigo-500"
              >
                <option value="">Tất cả</option>
                <option value="PLA">PLA</option>
                <option value="TPU">TPU dẻo</option>
                <option value="Resin">Resin</option>
              </select>
            </div>

            <div>
              <p className="mb-1 font-semibold text-slate-700">Khoảng giá</p>
              <select
                value={filters.priceRange}
                onChange={(e) => setFilters({ ...filters, priceRange: e.target.value })}
                className="w-full rounded-md border border-slate-200 px-2 py-1.5 text-xs outline-none focus:border-indigo-500"
              >
                <option value="">Tất cả</option>
                <option value="0-200">Dưới 200.000 đ</option>
                <option value="200-500">200.000 - 500.000 đ</option>
                <option value="500+">Trên 500.000 đ</option>
              </select>
            </div>

            <div className="rounded-lg bg-slate-50 px-3 py-2 text-[11px] text-slate-600">
              Gợi ý: nếu bạn chỉ cần tham khảo giá để đặt in mẫu riêng, hãy dùng tính năng{' '}
              <span className="font-semibold text-indigo-600">Đặt in theo yêu cầu</span> ở menu
              trên.
            </div>
          </div>
        </aside>

        {/* Danh sách sản phẩm */}
        <main className="space-y-3">
          <div className="flex items-center justify-between text-[11px] text-slate-500">
            <span>
              Tìm thấy <b>{filteredProducts.length}</b> sản phẩm
            </span>
            <span>Giá đã bao gồm chi phí vật liệu in cơ bản</span>
          </div>

          <div
            className={
              viewMode === 'grid'
                ? 'grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-4 gap-4'
                : 'flex flex-col gap-3'
            }
          >
            {filteredProducts.map((product) => (
              <Link
                key={product.id}
                to={`/products/${product.id}`}
                className={`group rounded-xl bg-white border border-slate-200 shadow-sm overflow-hidden no-underline ${
                  viewMode === 'list' ? 'flex flex-row' : 'flex flex-col'
                }`}
              >
                <div
                  className={`relative bg-slate-100 flex items-center justify-center text-[11px] text-slate-400 ${
                    viewMode === 'grid' ? 'aspect-[4/3]' : 'w-32 sm:w-40 md:w-48 h-28 sm:h-32'
                  }`}
                >
                  Hình sản phẩm
                  {product.badge && (
                    <span className="absolute left-2 top-2 rounded-full bg-rose-500 px-2 py-0.5 text-[10px] font-semibold text-white shadow-sm">
                      {product.badge}
                    </span>
                  )}
                </div>

                <div className="flex-1 p-3 sm:p-4 flex flex-col gap-1">
                  <p className="text-xs sm:text-sm font-medium text-slate-900 group-hover:text-indigo-600 line-clamp-2 m-0">
                    {product.name}
                  </p>
                  <p className="text-[11px] text-slate-500 m-0">
                    {product.category} • {product.material}
                  </p>
                  <p className="text-[11px] text-emerald-600 font-medium m-0">
                    Còn {product.stock} sản phẩm
                  </p>

                  <div className="mt-1 flex items-center justify-between gap-2">
                    <span className="text-sm sm:text-base font-semibold text-rose-600">
                      {formatPrice(product.price)}
                    </span>
                    <button
                      type="button"
                      className="hidden sm:inline-flex items-center justify-center rounded-full border border-indigo-500 px-3 py-1 text-[11px] font-medium text-indigo-600 group-hover:bg-indigo-600 group-hover:text-white transition-colors"
                    >
                      Thêm vào giỏ
                    </button>
                  </div>

                  {viewMode === 'list' && (
                    <p className="mt-1 text-[11px] text-slate-500">
                      Phù hợp làm mẫu tham khảo cho dự án in 3D riêng, có thể tùy chỉnh kích thước và
                      vật liệu khi đặt in.
                    </p>
                  )}
                </div>
              </Link>
            ))}
          </div>
        </main>
      </div>
    </div>
  );
};

export default ProductCatalog;

