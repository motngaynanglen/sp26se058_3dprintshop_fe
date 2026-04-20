import React, { useEffect, useState } from 'react';
import { Link, useSearchParams, useNavigate } from 'react-router-dom';

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
import materialApi from '../api/materialApi';
import designTemplateApi from '../api/designTemplateApi';
import designVariantApi from '../api/designVariantApi';

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
  const navigate = useNavigate();
  const formatPrice = (v) => `${v.toLocaleString('vi-VN')} đ`;

  const isGrid = viewMode === 'grid';

  return (
    <Link
      to={`/products/${product.id}`}
      className={`group rounded-xl bg-white border border-slate-200 shadow-sm overflow-hidden no-underline cursor-pointer hover:shadow-md transition-shadow duration-200 ${isGrid ? 'flex flex-col' : 'flex flex-row'
        }`}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Model Viewer */}
      <div
        className={`relative bg-slate-50 flex-shrink-0 overflow-hidden ${isGrid ? 'aspect-[4/3]' : 'w-32 sm:w-44 h-28 sm:h-36'
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
        <p className={`text-[11px] font-medium m-0 ${product.stock <= 5 ? 'text-rose-500' : 'text-emerald-600'
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
              navigate('/checkout', {
                state: {
                  product,
                  quantity: 1,
                  material: product.materials && product.materials[0] ? product.materials[0] : 'PLA',
                }
              });
            }}
            className="hidden sm:inline-flex items-center justify-center rounded-full border border-indigo-500 px-3 py-1 text-[11px] font-medium text-indigo-600 group-hover:bg-indigo-600 group-hover:text-white transition-colors cursor-pointer"
          >
            Mua ngay
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
  const [selectedMaterial, setSelectedMaterial] = useState('');
  const [listMaterial, setListMaterial] = useState([]);
  const [listProduct, setListProduct] = useState([]);
  const [searchParams] = useSearchParams();
  const categoryFromUrl = searchParams.get('category');
  console.log('category:', categoryFromUrl);


  const fetchMaterials = async () => {
    const response = await materialApi.getAll();
    setListMaterial(response.data);
  };

  useEffect(() => {
    fetchMaterials();
  }, []);

  const filteredProducts = PRODUCTS.filter((p) => {
    if (selectedMaterial && p.material !== selectedMaterial) return false;
    return true;
  });

  const handleMaterialChange = async (materialId) => {
    console.log(materialId);
    const designTemplateId = searchParams.get('category')
    const response = await designVariantApi.getAll({ materialId, designTemplateId, isActive: true })
    console.log(response);
    setListProduct(response.data);
  }



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
              className={`flex items-center gap-1 rounded-full border px-3 py-1.5 text-xs font-medium transition-all cursor-pointer ${viewMode === mode
                ? 'border-indigo-600 bg-indigo-50 text-indigo-700'
                : 'border-slate-200 bg-white text-slate-600 hover:border-indigo-400'
                }`}
            >
              {label}
            </button>
          ))}
        </div>
      </div>

      {/* Material Tags */}
      <div className="flex flex-wrap items-center gap-2">
        <span className="text-xs font-semibold text-slate-700 mr-1">Chất liệu:</span>
        <button
          type="button"
          onClick={() => handleMaterialChange()}
          className={`rounded-full border px-3 py-1 text-xs font-medium transition-all cursor-pointer ${selectedMaterial === ''
            ? 'border-indigo-600 bg-indigo-600 text-white shadow-sm'
            : 'border-slate-200 bg-white text-slate-600 hover:border-indigo-400 hover:text-indigo-600'
            }`}
        >
          Tất cả
        </button>
        {listMaterial.map((material) => (
          <button
            key={material.id}
            type="button"
            onClick={() => handleMaterialChange(material.id)}
            className={`rounded-full border px-3 py-1 text-xs font-medium transition-all cursor-pointer ${selectedMaterial === material.name
              ? 'border-indigo-600 bg-indigo-600 text-white shadow-sm'
              : 'border-slate-200 bg-white text-slate-600 hover:border-indigo-400 hover:text-indigo-600'
              }`}
          >
            {material.name}
          </button>
        ))}
      </div>

      {/* Product list */}
      <div className="space-y-3">
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
          {listProduct.map((product) => (
            <ProductCard key={product.id} product={product} viewMode={viewMode} />
          ))}
        </div>

        {listProduct.length === 0 && (
          <div className="py-16 text-center text-slate-500">
            <p className="font-medium">Không tìm thấy sản phẩm nào</p>
            <button
              className="mt-3 text-sm text-indigo-600 hover:underline cursor-pointer"
              onClick={() => setSelectedMaterial('')}
            >
              Xóa bộ lọc
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductCatalog;
