import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../contexts/CartContext';
import '@google/model-viewer';

// ─── GLB FILES (local)
import glbBeeCute from '../components/imgs/glb/BeeCute.glb';
import glbBirdCute from '../components/imgs/glb/BirdCute.glb';
import glbBumbleCute from '../components/imgs/glb/BumbleCute.glb';
import glbChickCute from '../components/imgs/glb/ChickCute.glb';
import glbEggCute from '../components/imgs/glb/EggCute.glb';
import glbModel1 from '../components/imgs/glb/model1.glb';
import glbModel2 from '../components/imgs/glb/model2.glb';
import glbModel3 from '../components/imgs/glb/model3.glb';
import glbModel4 from '../components/imgs/glb/model4.glb';
import glbModel5 from '../components/imgs/glb/model5.glb';
import glbModel6 from '../components/imgs/glb/model6.glb';

// ─── PRODUCT CATALOG với 11 sản phẩm từ file GLB thật
const PRODUCTS = [
  { id: 1, name: 'Chú Ong Cute trang trí bàn', price: 299000, category: 'Mô hình trang trí', material: 'PLA', stock: 10, badge: '-10%', modelSrc: glbBeeCute },
  { id: 2, name: 'Chú Chim nhỏ sưu tầm', price: 249000, category: 'Mô hình trang trí', material: 'Resin', stock: 8, badge: 'New', modelSrc: glbBirdCute },
  { id: 3, name: 'Chú Ong Nghệ – Limited Edition', price: 319000, category: 'Quà tặng / lưu niệm', material: 'PLA', stock: 5, badge: 'Limited', modelSrc: glbBumbleCute },
  { id: 4, name: 'Gà con Cute decor bàn học', price: 199000, category: 'Mô hình trang trí', material: 'PLA', stock: 20, badge: 'Hot', modelSrc: glbChickCute },
  { id: 5, name: 'Trứng Phục Sinh trang trí', price: 159000, category: 'Quà tặng / lưu niệm', material: 'PLA', stock: 15, badge: null, modelSrc: glbEggCute },
  { id: 6, name: 'Mô hình sưu tầm Vol.1', price: 459000, category: 'Mô hình trang trí', material: 'Resin', stock: 3, badge: 'Best seller', modelSrc: glbModel1 },
  { id: 7, name: 'Mô hình thiết kế Vol.2', price: 399000, category: 'Linh kiện kỹ thuật', material: 'PLA', stock: 12, badge: null, modelSrc: glbModel2 },
  { id: 8, name: 'Phụ kiện kỹ thuật 3D Vol.3', price: 499000, category: 'Linh kiện kỹ thuật', material: 'Resin', stock: 7, badge: '-15%', modelSrc: glbModel3 },
  { id: 9, name: 'Khung mô hình kiến trúc mini', price: 699000, category: 'Mô hình kiến trúc', material: 'PLA', stock: 4, badge: 'Limited', modelSrc: glbModel4 },
  { id: 10, name: 'Bộ phụ kiện sáng tạo 3D Vol.5', price: 349000, category: 'Phụ kiện công nghệ', material: 'TPU', stock: 18, badge: null, modelSrc: glbModel5 },
  { id: 11, name: 'Mô hình nghệ thuật Vol.6', price: 559000, category: 'Mô hình trang trí', material: 'Resin', stock: 6, badge: 'New', modelSrc: glbModel6 },
];

// ─── MODEL CARD COMPONENT (Grid + List mode)
const ProductCard = ({ product, viewMode }) => {
  const [hovered, setHovered] = useState(false);
  const { addToCart } = useCart();
  const formatPrice = (v) => `${v.toLocaleString('vi-VN')} đ`;

  const isGrid = viewMode === 'grid';

  return (
    <Link
      to={`/products/${product.id}`}
      className={`group rounded-xl bg-white border border-slate-200 shadow-sm overflow-hidden no-underline cursor-pointer hover:shadow-md transition-shadow duration-200 ${
        isGrid ? 'flex flex-col' : 'flex flex-row'
      }`}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Model Viewer */}
      <div
        className={`relative bg-slate-50 flex-shrink-0 overflow-hidden ${
          isGrid ? 'aspect-[4/3]' : 'w-32 sm:w-44 h-28 sm:h-36'
        }`}
      >
        <model-viewer
          src={product.modelSrc}
          camera-controls={hovered ? true : undefined}
          auto-rotate
          shadow-intensity="0.8"
          environment-image="neutral"
          exposure="1.1"
          interaction-prompt="none"
          style={{ width: '100%', height: '100%' }}
        />
        {/* Badge */}
        {product.badge && (
          <span className="absolute left-2 top-2 rounded-full bg-rose-500 px-2 py-0.5 text-[10px] font-semibold text-white shadow-sm z-10">
            {product.badge}
          </span>
        )}
        {/* 360° hint on hover */}
        {hovered && (
          <div className="absolute top-2 right-2 bg-indigo-600 text-white text-[9px] font-semibold px-1.5 py-0.5 rounded-full z-10">
            360°
          </div>
        )}
      </div>

      {/* Info */}
      <div className="flex-1 p-3 sm:p-4 flex flex-col gap-1">
        <p className="text-xs sm:text-sm font-medium text-slate-900 group-hover:text-indigo-600 line-clamp-2 m-0">
          {product.name}
        </p>
        <p className="text-[11px] text-slate-500 m-0">
          {product.category} • {product.material}
        </p>
        <p className={`text-[11px] font-medium m-0 ${
          product.stock <= 5 ? 'text-rose-500' : 'text-emerald-600'
        }`}>
          {product.stock <= 5 ? `Chỉ còn ${product.stock} sản phẩm` : `Còn ${product.stock} sản phẩm`}
        </p>

        <div className="mt-1 flex items-center justify-between gap-2">
          <span className="text-sm sm:text-base font-semibold text-rose-600">
            {formatPrice(product.price)}
          </span>
          <button
            type="button"
            onClick={(e) => {
              e.preventDefault();
              addToCart(product, 1, product.materials && product.materials[0] ? product.materials[0] : 'PLA');
            }}
            className="hidden sm:inline-flex items-center justify-center rounded-full border border-indigo-500 px-3 py-1 text-[11px] font-medium text-indigo-600 group-hover:bg-indigo-600 group-hover:text-white transition-colors cursor-pointer"
          >
            Thêm vào giỏ
          </button>
        </div>

        {!isGrid && (
          <p className="mt-1 text-[11px] text-slate-500">
            Xoay mô hình để xem chi tiết. Có thể tùy chỉnh kích thước, màu sắc và vật liệu khi đặt in.
          </p>
        )}
      </div>
    </Link>
  );
};

// ─── MAIN COMPONENT
const ProductCatalog = () => {
  const [viewMode, setViewMode] = useState('grid');
  const [filters, setFilters] = useState({ category: '', priceRange: '', material: '' });

  const filteredProducts = PRODUCTS.filter((p) => {
    if (filters.category && p.category !== filters.category) return false;
    if (filters.material && p.material !== filters.material) return false;
    if (filters.priceRange) {
      if (filters.priceRange === '0-200' && p.price > 200000) return false;
      if (filters.priceRange === '200-500' && (p.price < 200000 || p.price > 500000)) return false;
      if (filters.priceRange === '500+' && p.price < 500000) return false;
    }
    return true;
  });

  return (
    <div className="space-y-5">
      {/* Header */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-lg sm:text-xl font-semibold text-slate-900 m-0">
            Danh sách sản phẩm in 3D
          </h1>
          <p className="mt-1 text-xs sm:text-sm text-slate-500">
            Di chuột vào sản phẩm để xem mô hình 3D trực tiếp. Chọn nhanh mẫu in sẵn hoặc đặt in theo yêu cầu.
          </p>
        </div>

        <div className="flex items-center gap-2 self-start">
          {[
            { mode: 'grid', label: 'Grid' },
            { mode: 'list', label: 'List' },
          ].map(({ mode, label }) => (
            <button
              key={mode}
              onClick={() => setViewMode(mode)}
              className={`flex items-center gap-1 rounded-full border px-3 py-1.5 text-xs font-medium transition-all cursor-pointer ${
                viewMode === mode
                  ? 'border-indigo-600 bg-indigo-50 text-indigo-700'
                  : 'border-slate-200 bg-white text-slate-600 hover:border-indigo-400'
              }`}
            >
              {label}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-[260px_minmax(0,1fr)] gap-5">
        {/* Sidebar filter */}
        <aside className="h-fit rounded-xl bg-white border border-slate-200 shadow-sm lg:sticky lg:top-28">
          <div className="px-4 py-3 border-b border-slate-100 flex items-center justify-between">
            <h3 className="m-0 text-sm font-semibold text-slate-900">Bộ lọc tìm kiếm</h3>
            <button
              type="button"
              className="text-[11px] font-medium text-indigo-600 hover:underline cursor-pointer"
              onClick={() => setFilters({ category: '', priceRange: '', material: '' })}
            >
              Xóa lọc
            </button>
          </div>

          <div className="px-4 py-3 space-y-4 text-xs">
            {[
              {
                key: 'category',
                label: 'Danh mục',
                options: [
                  { value: '', label: 'Tất cả' },
                  { value: 'Mô hình trang trí', label: 'Mô hình trang trí' },
                  { value: 'Quà tặng / lưu niệm', label: 'Quà tặng / lưu niệm' },
                  { value: 'Phụ kiện công nghệ', label: 'Phụ kiện công nghệ' },
                  { value: 'Linh kiện kỹ thuật', label: 'Linh kiện kỹ thuật' },
                  { value: 'Mô hình kiến trúc', label: 'Mô hình kiến trúc' },
                ],
              },
              {
                key: 'material',
                label: 'Vật liệu',
                options: [
                  { value: '', label: 'Tất cả' },
                  { value: 'PLA', label: 'PLA' },
                  { value: 'TPU', label: 'TPU dẻo' },
                  { value: 'Resin', label: 'Resin' },
                ],
              },
              {
                key: 'priceRange',
                label: 'Khoảng giá',
                options: [
                  { value: '', label: 'Tất cả' },
                  { value: '0-200', label: 'Dưới 200.000 đ' },
                  { value: '200-500', label: '200.000 - 500.000 đ' },
                  { value: '500+', label: 'Trên 500.000 đ' },
                ],
              },
            ].map(({ key, label, options }) => (
              <div key={key}>
                <p className="mb-1 font-semibold text-slate-700">{label}</p>
                <select
                  value={filters[key]}
                  onChange={(e) => setFilters({ ...filters, [key]: e.target.value })}
                  className="w-full rounded-md border border-slate-200 px-2 py-1.5 text-xs outline-none focus:border-indigo-500 cursor-pointer"
                >
                  {options.map((o) => (
                    <option key={o.value} value={o.value}>{o.label}</option>
                  ))}
                </select>
              </div>
            ))}

            <div className="rounded-lg bg-slate-50 px-3 py-2 text-[11px] text-slate-600">
              Gợi ý: nếu bạn chỉ cần tham khảo giá để đặt in mẫu riêng, hãy dùng tính năng{' '}
              <span className="font-semibold text-indigo-600">Đặt in theo yêu cầu</span> ở menu trên.
            </div>
          </div>
        </aside>

        {/* Product list */}
        <main className="space-y-3">
          <div className="flex items-center justify-between text-[11px] text-slate-500">
            <span>Tìm thấy <b>{filteredProducts.length}</b> sản phẩm</span>
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
              <ProductCard key={product.id} product={product} viewMode={viewMode} />
            ))}
          </div>

          {filteredProducts.length === 0 && (
            <div className="py-16 text-center text-slate-500">
              <p className="font-medium">Không tìm thấy sản phẩm nào</p>
              <button
                className="mt-3 text-sm text-indigo-600 hover:underline cursor-pointer"
                onClick={() => setFilters({ category: '', priceRange: '', material: '' })}
              >
                Xóa bộ lọc
              </button>
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default ProductCatalog;
