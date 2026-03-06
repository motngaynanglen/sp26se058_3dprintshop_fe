import React, { useState } from 'react';
import { Link } from 'react-router-dom';
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

const categories = [
  'Mô hình trang trí',
  'Phụ kiện công nghệ',
  'Quà tặng / lưu niệm',
  'Mô hình kiến trúc',
  'Linh kiện kỹ thuật',
  'Dịch vụ thiết kế 3D',
];

// Mỗi danh mục nổi bật → 1 file GLB
const CATEGORY_CARDS = [
  { title: 'Mô hình trang trí', modelSrc: glbBeeCute, category: 'Mô hình trang trí' },
  { title: 'Phụ kiện công nghệ', modelSrc: glbBirdCute, category: 'Phụ kiện công nghệ' },
  { title: 'Quà tặng / lưu niệm', modelSrc: glbBumbleCute, category: 'Quà tặng / lưu niệm' },
  { title: 'Mô hình kiến trúc', modelSrc: glbChickCute, category: 'Mô hình kiến trúc' },
  { title: 'Linh kiện kỹ thuật', modelSrc: glbEggCute, category: 'Linh kiện kỹ thuật' },
  { title: 'Dịch vụ thiết kế 3D', modelSrc: glbModel1, category: 'Dịch vụ thiết kế 3D' },
];

// Sản phẩm gợi ý – dùng tất cả 11 GLB
const SUGGESTED_PRODUCTS = [
  { id: 1, name: 'Chú Ong Cute trang trí bàn', price: 299000, modelSrc: glbBeeCute, material: 'PLA' },
  { id: 2, name: 'Chú Chim nhỏ xinh', price: 249000, modelSrc: glbBirdCute, material: 'Resin' },
  { id: 3, name: 'Ong nghệ sưu tầm', price: 319000, modelSrc: glbBumbleCute, material: 'PLA' },
  { id: 4, name: 'Chú Gà con đáng yêu', price: 199000, modelSrc: glbChickCute, material: 'PLA' },
  { id: 5, name: 'Quả Trứng decor', price: 159000, modelSrc: glbEggCute, material: 'PLA' },
  { id: 6, name: 'Mô hình sưu tầm Vol.1', price: 459000, modelSrc: glbModel1, material: 'Resin' },
  { id: 7, name: 'Mô hình sưu tầm Vol.2', price: 399000, modelSrc: glbModel2, material: 'PLA' },
  { id: 8, name: 'Mô hình thiết kế Vol.3', price: 499000, modelSrc: glbModel3, material: 'Resin' },
];

// ─── INTERACTIVE 3D CARD (Hover → xem model-viewer)
const Interactive3DCard = ({ title, modelSrc, to }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <Link
      to={to}
      className="group relative block overflow-hidden rounded-xl bg-slate-900 border border-slate-700 no-underline h-48 sm:h-56 cursor-pointer"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Model Viewer */}
      <div className="absolute inset-0">
        <model-viewer
          src={modelSrc}
          camera-controls={isHovered ? true : undefined}
          auto-rotate
          shadow-intensity="1"
          environment-image="neutral"
          exposure="1.2"
          autoplay
          interaction-prompt="none"
          style={{ width: '100%', height: '100%', backgroundColor: 'transparent' }}
        />
      </div>

      {/* Dark overlay when not hovered */}
      <div className={`absolute inset-0 bg-black/30 transition-opacity duration-300 ${isHovered ? 'opacity-0' : 'opacity-100'}`} />

      {/* Bottom gradient + text */}
      <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent p-4">
        <h3 className="text-sm sm:text-base font-semibold text-white group-hover:text-indigo-300 transition-colors leading-tight">
          {title}
        </h3>
        <p className="text-[10px] sm:text-xs text-slate-300 mt-0.5">
          {isHovered ? 'Kéo để xem 360°' : 'Khám phá ngay'}
        </p>
      </div>

      {/* Hover badge */}
      {isHovered && (
        <div className="absolute top-2 right-2 bg-indigo-600 text-white text-[10px] font-semibold px-2 py-0.5 rounded-full">
          3D Live
        </div>
      )}
    </Link>
  );
};

// ─── MINI PRODUCT CARD (Gợi ý cho bạn)
const MiniProductCard = ({ product }) => {
  const [hovered, setHovered] = useState(false);
  const formatPrice = (v) => `${v.toLocaleString('vi-VN')} đ`;

  return (
    <Link
      to={`/products/${product.id}`}
      className="group rounded-xl bg-white border border-slate-200 shadow-sm overflow-hidden no-underline flex flex-col cursor-pointer hover:shadow-md transition-shadow duration-200"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div className="aspect-[4/3] bg-slate-50 overflow-hidden relative">
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
        {hovered && (
          <div className="absolute top-1.5 right-1.5 bg-indigo-600 text-white text-[9px] font-semibold px-1.5 py-0.5 rounded-full">
            360°
          </div>
        )}
      </div>
      <div className="p-3 flex-1 flex flex-col gap-1">
        <p className="text-xs font-medium text-slate-800 group-hover:text-indigo-600 line-clamp-2">
          {product.name}
        </p>
        <p className="text-[11px] text-slate-400">{product.material}</p>
        <div className="mt-auto flex items-center justify-between">
          <span className="text-sm font-semibold text-rose-600">{formatPrice(product.price)}</span>
          <span className="text-[10px] bg-emerald-50 text-emerald-700 px-1.5 py-0.5 rounded-full font-medium">In nhanh 24h</span>
        </div>
      </div>
    </Link>
  );
};

// ─── HERO 3D DISPLAY
const HeroModelViewer = () => (
  <div className="relative rounded-2xl bg-slate-900/10 border border-white/20 p-4 backdrop-blur">
    <div className="aspect-[4/3] rounded-xl overflow-hidden bg-slate-900/40">
      <model-viewer
        src={glbModel1}
        camera-controls
        auto-rotate
        shadow-intensity="1"
        environment-image="neutral"
        exposure="1.2"
        interaction-prompt="none"
        style={{ width: '100%', height: '100%' }}
      />
    </div>
    <div className="mt-3 space-y-1 text-xs text-indigo-100">
      <div className="flex justify-between">
        <span>Công nghệ</span>
        <span className="font-semibold">FDM / SLA / SLS</span>
      </div>
      <div className="flex justify-between">
        <span>Thời gian</span>
        <span className="font-semibold">24h - 72h</span>
      </div>
      <div className="flex justify-between">
        <span>Độ phân giải</span>
        <span className="font-semibold">tới 25µm</span>
      </div>
    </div>
  </div>
);

// ─── SVG ICONS
const PrinterIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
    <path strokeLinecap="round" strokeLinejoin="round" d="M6.72 13.829c-.24.03-.48.062-.72.096m.72-.096a42.415 42.415 0 0 1 10.56 0m-10.56 0L6.34 18m10.94-4.171c.24.03.48.062.72.096m-.72-.096L17.66 18m0 0 .229 2.523a1.125 1.125 0 0 1-1.12 1.227H7.231c-.662 0-1.18-.568-1.12-1.227L6.34 18m11.318 0h1.091A2.25 2.25 0 0 0 21 15.75V9.456c0-1.081-.768-2.015-1.837-2.175a48.055 48.055 0 0 0-1.913-.247M6.34 18H5.25A2.25 2.25 0 0 1 3 15.75V9.456c0-1.081.768-2.015 1.837-2.175a48.041 48.041 0 0 1 1.913-.247m10.5 0a48.536 48.536 0 0 0-10.5 0m10.5 0V3.375c0-.621-.504-1.125-1.125-1.125h-8.25c-.621 0-1.125.504-1.125 1.125v3.659M18 10.5h.008v.008H18V10.5Zm-3 0h.008v.008H15V10.5Z" />
  </svg>
);

const TruckIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
    <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 18.75a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 0 1-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m3 0h1.125c.621 0 1.129-.504 1.09-1.124a17.902 17.902 0 0 0-3.213-9.193 2.056 2.056 0 0 0-1.58-.86H14.25M16.5 18.75h-2.25m0-11.177v-.958c0-.568-.422-1.048-.987-1.106a48.554 48.554 0 0 0-10.026 0 1.106 1.106 0 0 0-.987 1.106v7.635m12-6.677v6.677m0 4.5v-4.5m0 0h-12" />
  </svg>
);

const UserIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
    <path strokeLinecap="round" strokeLinejoin="round" d="M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 0a9 9 0 1 0-11.963 0m11.963 0A8.966 8.966 0 0 1 12 21a8.966 8.966 0 0 1-5.982-2.275M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
  </svg>
);

const Home = () => {
  return (
    <div className="space-y-10">
      {/* ─── Hero Section */}
      <section className="grid grid-cols-1 lg:grid-cols-[240px_minmax(0,1.7fr)_minmax(0,0.9fr)] gap-5">
        {/* Sidebar danh mục */}
        <aside className="hidden lg:block rounded-xl bg-white shadow-sm border border-slate-200 overflow-hidden">
          <div className="px-4 py-3 border-b border-slate-100 bg-slate-50 font-semibold text-sm text-slate-800">
            Danh mục sản phẩm
          </div>
          <ul className="divide-y divide-slate-100 text-sm">
            {categories.map((item) => (
              <li key={item}>
                <Link
                  to={`/products?category=${encodeURIComponent(item)}`}
                  className="flex items-center justify-between px-4 py-2.5 text-slate-700 hover:bg-indigo-50 hover:text-indigo-600 no-underline transition-colors"
                >
                  <span>{item}</span>
                  <span className="text-xs text-slate-400">›</span>
                </Link>
              </li>
            ))}
          </ul>
        </aside>

        {/* Banner chính */}
        <div className="relative overflow-hidden rounded-xl bg-gradient-to-r from-indigo-600 via-purple-600 to-sky-500 text-white shadow-md">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_#ffffff33_0,_transparent_55%)]" />
          <div className="relative px-8 py-8 sm:px-10 sm:py-10 flex flex-col gap-6 sm:flex-row sm:items-center">
            <div className="flex-1 space-y-3 sm:space-y-4">
              <p className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1 text-xs font-medium uppercase tracking-wide">
                <span className="inline-block h-1.5 w-1.5 rounded-full bg-emerald-300" />
                Dịch vụ in 3D trọn gói
              </p>
              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold leading-tight">
                Siêu thị in 3D chuyên nghiệp
                <span className="block text-amber-200 text-lg sm:text-xl font-semibold mt-1">
                  Nhận thiết kế, in ấn & giao hàng toàn quốc
                </span>
              </h1>
              <p className="text-sm sm:text-base text-indigo-100 max-w-xl">
                Từ mô hình sưu tầm đến linh kiện kỹ thuật chính xác cao, chúng tôi giúp bạn hiện
                thực hóa mọi ý tưởng với nhiều vật liệu và công nghệ in hiện đại.
              </p>
              <div className="flex flex-wrap gap-3">
                <Link
                  to="/products"
                  className="inline-flex items-center justify-center rounded-full bg-white px-6 py-2.5 text-sm font-semibold text-indigo-700 shadow-sm hover:bg-slate-50 no-underline"
                >
                  Xem sản phẩm in sẵn
                </Link>
                <Link
                  to="/custom-order"
                  className="inline-flex items-center justify-center rounded-full border border-white/60 px-6 py-2.5 text-sm font-semibold text-white hover:bg-white/10 no-underline"
                >
                  Đặt in theo yêu cầu
                </Link>
              </div>
            </div>

            {/* Hero 3D Model preview */}
            <div className="mt-4 sm:mt-0 sm:w-60 lg:w-72">
              <HeroModelViewer />
            </div>
          </div>
        </div>

        {/* Khối khuyến mãi bên phải */}
        <div className="space-y-4">
          <div className="rounded-xl bg-white border border-amber-200 shadow-sm p-4">
            <div className="flex items-center justify-between gap-3">
              <div>
                <p className="text-xs font-semibold uppercase tracking-wide text-amber-600">Ưu đãi tháng này</p>
                <p className="text-sm font-semibold text-slate-900">Giảm đến 20% cho đơn hàng đầu tiên</p>
              </div>
              <span className="rounded-full bg-amber-500 px-3 py-1 text-xs font-bold text-white">-20%</span>
            </div>
            <p className="mt-2 text-xs text-slate-500">
              Áp dụng cho dịch vụ in 3D và thiết kế file mới. Nhập mã <b>3DNEW20</b> khi thanh toán.
            </p>
          </div>
          <div className="rounded-xl bg-slate-900 text-slate-50 p-4 shadow-sm">
            <p className="text-xs font-semibold uppercase tracking-wide text-emerald-300">Hỗ trợ nhanh</p>
            <p className="mt-1 text-sm font-semibold">Tư vấn file & vật liệu miễn phí</p>
            <p className="mt-2 text-xs text-slate-300">
              Gửi file hoặc ý tưởng, kỹ sư của chúng tôi sẽ gợi ý cách in tối ưu về chi phí và chất lượng.
            </p>
          </div>
        </div>
      </section>

      {/* ─── Danh mục nổi bật (6 ô, dùng GLB thật) */}
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-xl sm:text-2xl font-bold text-slate-900">
            Danh mục nổi bật
            <span className="ml-2 text-sm font-normal text-slate-500 bg-slate-100 px-2 py-0.5 rounded-full">
              Xem 3D trực tiếp ✨
            </span>
          </h2>
          <Link
            to="/products"
            className="text-sm font-medium text-indigo-600 hover:text-indigo-800 flex items-center gap-1 no-underline"
          >
            Xem tất cả <span className="text-lg">›</span>
          </Link>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 lg:gap-5">
          {CATEGORY_CARDS.map((card) => (
            <Interactive3DCard
              key={card.category}
              title={card.title}
              modelSrc={card.modelSrc}
              to={`/products?category=${encodeURIComponent(card.category)}`}
            />
          ))}
        </div>
      </section>

      {/* ─── Gợi ý cho bạn (8 sản phẩm với model-viewer) */}
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-base sm:text-lg font-semibold text-slate-900">Gợi ý cho bạn</h2>
          <span className="text-xs text-slate-500">Dựa trên nhu cầu in 3D phổ biến</span>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          {SUGGESTED_PRODUCTS.map((p) => (
            <MiniProductCard key={p.id} product={p} />
          ))}
        </div>
      </section>

      {/* ─── Lợi ích dịch vụ */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {[
          {
            icon: <PrinterIcon />,
            color: 'bg-indigo-600',
            title: 'Máy in công nghiệp',
            desc: 'Hệ thống máy in 3D đa công nghệ, đảm bảo chi tiết chính xác và bề mặt đẹp.',
          },
          {
            icon: <TruckIcon />,
            color: 'bg-emerald-600',
            title: 'Đóng gói & giao nhanh',
            desc: 'Đóng gói chống sốc, giao hàng toàn quốc, theo dõi đơn hàng trực tuyến.',
          },
          {
            icon: <UserIcon />,
            color: 'bg-amber-500',
            title: 'Đội ngũ kỹ sư hỗ trợ',
            desc: 'Tư vấn tối ưu file, chọn vật liệu và thông số in phù hợp với ngân sách.',
          },
        ].map((item) => (
          <div key={item.title} className="rounded-xl bg-white border border-slate-200 p-4 flex gap-3">
            <div className={`h-10 w-10 flex-shrink-0 flex items-center justify-center rounded-full ${item.color} text-white`}>
              {item.icon}
            </div>
            <div>
              <p className="text-sm font-semibold text-slate-900">{item.title}</p>
              <p className="mt-1 text-xs text-slate-500">{item.desc}</p>
            </div>
          </div>
        ))}
      </section>
    </div>
  );
};

export default Home;
