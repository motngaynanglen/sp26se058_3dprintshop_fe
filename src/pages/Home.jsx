import React from 'react';
import { Link } from 'react-router-dom';

const categories = [
  'Mô hình trang trí',
  'Phụ kiện công nghệ',
  'Quà tặng / lưu niệm',
  'Mô hình kiến trúc',
  'Linh kiện kỹ thuật',
  'Dịch vụ thiết kế 3D',
];

const Home = () => {
  return (
    <div className="space-y-10">
      {/* Hero + layout chính giống trang bán hàng */}
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

            <div className="mt-4 sm:mt-0 sm:w-60 lg:w-72">
              <div className="relative rounded-2xl bg-slate-900/10 border border-white/20 p-4 backdrop-blur">
                <div className="aspect-[4/3] rounded-xl bg-slate-900/40 flex items-center justify-center text-xs text-indigo-100">
                  Preview mô hình 3D / banner sản phẩm
                </div>
                <div className="mt-4 space-y-1 text-xs text-indigo-100">
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
            </div>
          </div>
        </div>

        {/* Khối khuyến mãi bên phải */}
        <div className="space-y-4">
          <div className="rounded-xl bg-white border border-amber-200 shadow-sm p-4">
            <div className="flex items-center justify-between gap-3">
              <div>
                <p className="text-xs font-semibold uppercase tracking-wide text-amber-600">
                  Ưu đãi tháng này
                </p>
                <p className="text-sm font-semibold text-slate-900">
                  Giảm đến 20% cho đơn hàng đầu tiên
                </p>
              </div>
              <span className="rounded-full bg-amber-500 px-3 py-1 text-xs font-bold text-white">
                -20%
              </span>
            </div>
            <p className="mt-2 text-xs text-slate-500">
              Áp dụng cho dịch vụ in 3D và thiết kế file mới. Nhập mã <b>3DNEW20</b> khi thanh toán.
            </p>
          </div>

          <div className="rounded-xl bg-slate-900 text-slate-50 p-4 shadow-sm">
            <p className="text-xs font-semibold uppercase tracking-wide text-emerald-300">
              Hỗ trợ nhanh
            </p>
            <p className="mt-1 text-sm font-semibold">Tư vấn file & vật liệu miễn phí</p>
            <p className="mt-2 text-xs text-slate-300">
              Gửi file hoặc ý tưởng, kỹ sư của chúng tôi sẽ gợi ý cách in tối ưu về chi phí và chất
              lượng.
            </p>
          </div>
        </div>
      </section>

      {/* Dãy danh mục nổi bật */}
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-base sm:text-lg font-semibold text-slate-900">
            Danh mục nổi bật
          </h2>
          <Link
            to="/products"
            className="text-xs sm:text-sm font-medium text-indigo-600 hover:underline no-underline"
          >
            Xem tất cả sản phẩm
          </Link>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
          {categories.map((item) => (
            <Link
              key={item}
              to={`/products?category=${encodeURIComponent(item)}`}
              className="group relative overflow-hidden rounded-lg bg-white shadow-sm border border-slate-200 no-underline"
            >
              <div className="h-20 bg-slate-100 flex items-center justify-center text-[11px] text-slate-400">
                Hình minh họa
              </div>
              <div className="px-3 py-2 text-xs font-medium text-slate-700 group-hover:text-indigo-600">
                {item}
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Sản phẩm gợi ý */}
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-base sm:text-lg font-semibold text-slate-900">
            Gợi ý cho bạn
          </h2>
          <span className="text-xs text-slate-500">Dựa trên nhu cầu in 3D phổ biến</span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          {[1, 2, 3, 4, 5, 6, 7, 8].map((item) => (
            <Link
              key={item}
              to={`/products/${item}`}
              className="group rounded-xl bg-white border border-slate-200 shadow-sm overflow-hidden no-underline flex flex-col"
            >
              <div className="aspect-[4/3] bg-slate-100 flex items-center justify-center text-xs text-slate-400">
                Hình sản phẩm {item}
              </div>
              <div className="p-3 flex-1 flex flex-col gap-1">
                <p className="text-xs font-medium text-slate-800 group-hover:text-indigo-600 line-clamp-2">
                  Mô hình in 3D mẫu số {item}
                </p>
                <p className="text-[11px] text-slate-500">PLA / Chiều cao 10cm</p>
                <div className="mt-1 flex items-center justify-between">
                  <span className="text-sm font-semibold text-rose-600">299.000 đ</span>
                  <span className="rounded-full bg-emerald-50 px-2 py-0.5 text-[10px] font-medium text-emerald-700">
                    In nhanh 24h
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Lợi ích dịch vụ */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="rounded-xl bg-white border border-slate-200 p-4 flex gap-3">
          <div className="h-10 w-10 flex items-center justify-center rounded-full bg-indigo-600 text-white text-xl">
            🖨️
          </div>
          <div>
            <p className="text-sm font-semibold text-slate-900">Máy in công nghiệp</p>
            <p className="mt-1 text-xs text-slate-500">
              Hệ thống máy in 3D đa công nghệ, đảm bảo chi tiết chính xác và bề mặt đẹp.
            </p>
          </div>
        </div>
        <div className="rounded-xl bg-white border border-slate-200 p-4 flex gap-3">
          <div className="h-10 w-10 flex items-center justify-center rounded-full bg-emerald-600 text-white text-xl">
            📦
          </div>
          <div>
            <p className="text-sm font-semibold text-slate-900">Đóng gói & giao nhanh</p>
            <p className="mt-1 text-xs text-slate-500">
              Đóng gói chống sốc, giao hàng toàn quốc, theo dõi đơn hàng trực tuyến.
            </p>
          </div>
        </div>
        <div className="rounded-xl bg-white border border-slate-200 p-4 flex gap-3">
          <div className="h-10 w-10 flex items-center justify-center rounded-full bg-amber-500 text-white text-xl">
            👨‍💻
          </div>
          <div>
            <p className="text-sm font-semibold text-slate-900">Đội ngũ kỹ sư hỗ trợ</p>
            <p className="mt-1 text-xs text-slate-500">
              Tư vấn tối ưu file, chọn vật liệu và thông số in phù hợp với ngân sách của bạn.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;

