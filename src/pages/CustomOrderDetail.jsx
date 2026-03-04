import React from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { Breadcrumb } from 'antd';

// SVG Icons
const DocumentIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8 text-indigo-500">
    <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m2.25 0H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Z" />
  </svg>
);

const EyeIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
    <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
  </svg>
);

const ArrowDownTrayIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
    <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5M16.5 12 12 16.5m0 0L7.5 12m4.5 4.5V3" />
  </svg>
);

const CheckCircleSolidIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
    <path fillRule="evenodd" d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12Zm13.36-1.814a.75.75 0 1 0-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 0 0-1.06 1.06l2.25 2.25a.75.75 0 0 0 1.14-.094l3.75-5.25Z" clipRule="evenodd" />
  </svg>
);

const BeakerIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
    <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 3.104v5.714a2.25 2.25 0 0 1-.659 1.591L5 14.5M9.75 3.104c-.251.023-.501.05-.75.082m.75-.082a24.301 24.301 0 0 1 4.5 0m0 0v5.714c0 .597.237 1.17.659 1.591L19.8 15M14.25 3.104c.251.023.501.05.75.082M19.8 15a2.25 2.25 0 0 1 .45 1.348V19.5a2.25 2.25 0 0 1-2.25 2.25H6a2.25 2.25 0 0 1-2.25-2.25v-3.152c0-.486.178-.95.45-1.348L5 14.5m14.8.5-7.4-7.4M5 14.5l7.4-7.4" />
  </svg>
);

const CUSTOM_STATUS_STEPS = [
  { key: 'submitted', label: 'Đã gửi yêu cầu' },
  { key: 'designing', label: 'Đang thiết kế' },
  { key: 'ready_for_preview', label: 'Sẵn sàng xem trước' },
  { key: 'pending_approval', label: 'Chờ duyệt & Thanh toán' },
  { key: 'printing', label: 'Đang in' },
  { key: 'completed', label: 'Hoàn thành' },
];

const STATUS_ORDER = CUSTOM_STATUS_STEPS.map(s => s.key);

const STATUS_BADGE_CONFIG = {
  submitted: 'bg-gray-100 text-gray-600 ring-1 ring-gray-200',
  designing: 'bg-violet-50 text-violet-700 ring-1 ring-violet-200',
  ready_for_preview: 'bg-blue-50 text-blue-700 ring-1 ring-blue-200',
  pending_approval: 'bg-amber-50 text-amber-700 ring-1 ring-amber-200',
  printing: 'bg-indigo-50 text-indigo-700 ring-1 ring-indigo-200',
  completed: 'bg-emerald-50 text-emerald-700 ring-1 ring-emerald-200',
};

const STATUS_LABEL = {
  submitted: 'Đã gửi yêu cầu',
  designing: 'Đang thiết kế',
  ready_for_preview: 'Sẵn sàng xem trước',
  pending_approval: 'Chờ duyệt',
  printing: 'Đang in',
  completed: 'Hoàn thành',
};

const TechInfoItem = ({ label, value, unit }) => (
  <div className="flex flex-col gap-0.5">
    <p className="text-xs text-gray-400 uppercase tracking-wide">{label}</p>
    <p className="text-sm font-semibold text-gray-800">
      {value}
      {unit && <span className="text-xs font-normal text-gray-500 ml-1">{unit}</span>}
    </p>
  </div>
);

const CustomOrderDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const order = {
    id,
    type: 'upload',
    date: '15/01/2024',
    status: 'pending_approval',
    material: 'Resin',
    quantity: 2,
    serviceType: 'print_paint',
    description: 'Thiết kế mô hình nhân vật game theo yêu cầu riêng, sơn màu tùy chỉnh, đế trưng bày có khắc tên.',
    total: 1500000,
    subtotal: 1300000,
    tax: 104000,
    shipping: 96000,
    technicalDraft: {
      material: 'Resin',
      infillDensity: 85,
      layerHeight: 0.05,
      estimatedWeight: 320,
      estimatedPrintTime: 18.5,
      markupPercentage: 15,
      note: 'Cần hỗ trợ ở phần cánh tay và bệ đặt. Hướng in nghiêng 45° để tối ưu độ bền.',
    },
    files: [
      { name: 'character_v2.stl', version: 2, isPreview: true, isPrintable: true },
      { name: 'character_v1.stl', version: 1, isPreview: false, isPrintable: false },
    ],
  };

  const currentStepIdx = STATUS_ORDER.indexOf(order.status);

  const handlePreview = (fileName) => {
    navigate(`/preview/${fileName}`, {
      state: {
        breadcrumb: [
          { title: 'Trang chủ', path: '/' },
          { title: 'Đơn hàng Custom', path: '/my-custom-orders' },
          { title: `Chi tiết #${id}`, path: `/custom-orders/${id}` },
          { title: 'Xem mô hình 3D', path: null },
        ],
      },
    });
  };

  const handleApprove = () => {
    alert('Đã duyệt đơn hàng! Chuyển đến trang thanh toán...');
  };

  const formatPrice = (price) =>
    new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(price);

  return (
    <div className="max-w-7xl mx-auto px-6 py-8">
      <div className="mb-6">
        <Breadcrumb
          items={[
            { title: <Link to="/">Trang chủ</Link> },
            { title: <Link to="/my-custom-orders">Đơn Custom</Link> },
            { title: `Chi tiết #${id}` },
          ]}
        />
      </div>

      {/* Header */}
      <div className="flex items-start justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Đơn Custom #{order.id}</h1>
          <p className="text-gray-500 mt-1">Tạo ngày {order.date}</p>
        </div>
        <span className={`inline-flex items-center px-3 py-1.5 rounded-full text-sm font-medium ${STATUS_BADGE_CONFIG[order.status] || 'bg-gray-100 text-gray-600'}`}>
          {STATUS_LABEL[order.status] || order.status}
        </span>
      </div>

      {/* Custom Status Timeline */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 mb-6">
        <div className="flex items-center gap-2 mb-5">
          <div className="w-1 h-6 bg-indigo-600 rounded-full"></div>
          <h2 className="text-lg font-bold text-gray-900">Tiến trình đơn hàng</h2>
        </div>
        <div className="flex items-start gap-0 overflow-x-auto pb-2">
          {CUSTOM_STATUS_STEPS.map((step, idx) => {
            const isDone = idx <= currentStepIdx;
            const isCurrent = idx === currentStepIdx;
            return (
              <React.Fragment key={step.key}>
                <div className="flex flex-col items-center min-w-[90px] max-w-[100px]">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300 ${
                    isCurrent ? 'bg-indigo-600 ring-4 ring-indigo-100 text-white' :
                    isDone ? 'bg-indigo-600 text-white' : 'bg-gray-100 text-gray-400'
                  }`}>
                    {isDone ? <CheckCircleSolidIcon /> : (
                      <span className="text-xs font-semibold">{idx + 1}</span>
                    )}
                  </div>
                  <p className={`text-xs text-center mt-2 leading-tight font-medium ${
                    isCurrent ? 'text-indigo-600' : isDone ? 'text-gray-600' : 'text-gray-400'
                  }`}>
                    {step.label}
                  </p>
                </div>
                {idx < CUSTOM_STATUS_STEPS.length - 1 && (
                  <div className={`flex-1 h-0.5 mt-4 min-w-[24px] ${isDone && idx < currentStepIdx ? 'bg-indigo-400' : 'bg-gray-100'}`} />
                )}
              </React.Fragment>
            );
          })}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left */}
        <div className="lg:col-span-2 space-y-6">
          {/* Order Details */}
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
            <div className="flex items-center gap-2 mb-5">
              <div className="w-1 h-6 bg-indigo-600 rounded-full"></div>
              <h2 className="text-lg font-bold text-gray-900">Thông tin đơn hàng</h2>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              <TechInfoItem label="Loại đơn" value={order.type === 'upload' ? 'Đăng tải File' : order.type} />
              <TechInfoItem label="Vật liệu" value={order.material} />
              <TechInfoItem label="Số lượng" value={order.quantity} unit="sản phẩm" />
              <TechInfoItem label="Dịch vụ" value={order.serviceType === 'print_paint' ? 'In & Sơn' : order.serviceType} />
            </div>
            {order.description && (
              <div className="mt-4 p-3 bg-gray-50 rounded-xl">
                <p className="text-xs text-gray-500 mb-1 font-medium uppercase tracking-wide">Mô tả yêu cầu</p>
                <p className="text-sm text-gray-700 leading-relaxed">{order.description}</p>
              </div>
            )}
          </div>

          {/* Technical Draft */}
          {order.technicalDraft && (
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
              <div className="flex items-center gap-2 mb-5">
                <div className="w-1 h-6 bg-violet-500 rounded-full"></div>
                <h2 className="text-lg font-bold text-gray-900">Thông số kỹ thuật</h2>
                <div className="ml-auto">
                  <BeakerIcon />
                </div>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-4">
                <TechInfoItem label="Vật liệu" value={order.technicalDraft.material} />
                <TechInfoItem label="Độ đặc lớp in" value={order.technicalDraft.infillDensity} unit="%" />
                <TechInfoItem label="Độ dày lớp" value={order.technicalDraft.layerHeight} unit="mm" />
                <TechInfoItem label="Trọng lượng ước tính" value={order.technicalDraft.estimatedWeight} unit="g" />
                <TechInfoItem label="Thời gian in ước tính" value={order.technicalDraft.estimatedPrintTime} unit="giờ" />
                <TechInfoItem label="Markup" value={`+${order.technicalDraft.markupPercentage}`} unit="%" />
              </div>
              {order.technicalDraft.note && (
                <div className="p-3 bg-violet-50 rounded-xl border border-violet-100">
                  <p className="text-xs text-violet-600 font-medium mb-1 uppercase tracking-wide">Ghi chú kỹ thuật</p>
                  <p className="text-sm text-violet-800 leading-relaxed">{order.technicalDraft.note}</p>
                </div>
              )}
            </div>
          )}

          {/* Design Files */}
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
            <div className="flex items-center gap-2 mb-5">
              <div className="w-1 h-6 bg-indigo-600 rounded-full"></div>
              <h2 className="text-lg font-bold text-gray-900">File thiết kế</h2>
            </div>
            <div className="space-y-3">
              {order.files.map((file, idx) => (
                <div
                  key={idx}
                  className={`flex items-center justify-between p-4 rounded-xl border transition-colors duration-150 ${
                    file.isPreview ? 'border-indigo-200 bg-indigo-50/50' : 'border-gray-100 bg-gray-50'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div className={`p-2 rounded-lg ${file.isPreview ? 'bg-indigo-100' : 'bg-gray-100'}`}>
                      <DocumentIcon />
                    </div>
                    <div>
                      <p className="font-medium text-sm text-gray-900">{file.name}</p>
                      <div className="flex items-center gap-2 mt-0.5">
                        <p className="text-xs text-gray-500">Phiên bản {file.version}</p>
                        {file.isPreview && (
                          <span className="inline-flex items-center px-1.5 py-0.5 rounded-full text-xs font-medium bg-indigo-100 text-indigo-700 ring-1 ring-indigo-200">
                            Xem trước được
                          </span>
                        )}
                        {file.isPrintable && (
                          <span className="inline-flex items-center px-1.5 py-0.5 rounded-full text-xs font-medium bg-emerald-50 text-emerald-700 ring-1 ring-emerald-200">
                            Sẵn sàng in
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    {file.isPreview && (
                      <button
                        onClick={() => handlePreview(file.name)}
                        className="inline-flex items-center gap-1.5 py-2 px-3 bg-indigo-600 text-white rounded-lg text-xs font-medium hover:bg-indigo-700 transition-colors duration-150 cursor-pointer"
                      >
                        <EyeIcon />
                        Xem 3D
                      </button>
                    )}
                    <button className="inline-flex items-center gap-1.5 py-2 px-3 bg-white text-gray-600 border border-gray-200 rounded-lg text-xs font-medium hover:bg-gray-50 transition-colors duration-150 cursor-pointer">
                      <ArrowDownTrayIcon />
                      Tải xuống
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right: Sidebar */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 sticky top-24 space-y-5">
            {/* Price Summary */}
            <div>
              <h3 className="font-bold text-gray-900 mb-3">Chi tiết giá</h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-500">Tạm tính</span>
                  <span className="text-gray-700">{formatPrice(order.subtotal)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Phí vận chuyển</span>
                  <span className="text-gray-700">{formatPrice(order.shipping)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Thuế VAT (8%)</span>
                  <span className="text-gray-700">{formatPrice(order.tax)}</span>
                </div>
                <div className="pt-2 border-t border-gray-100 flex justify-between">
                  <span className="font-bold text-gray-900">Tổng cộng</span>
                  <span className="font-bold text-indigo-600 text-lg">{formatPrice(order.total)}</span>
                </div>
              </div>
            </div>

            {/* ETA */}
            {order.technicalDraft && (
              <div className="pt-4 border-t border-gray-100">
                <p className="text-xs text-gray-500 mb-1">Thời gian in ước tính</p>
                <p className="font-semibold text-gray-900 text-sm">{order.technicalDraft.estimatedPrintTime} giờ / sản phẩm</p>
                <p className="text-xs text-gray-500 mt-0.5">Tổng: ~{(order.technicalDraft.estimatedPrintTime * order.quantity).toFixed(1)} giờ cho {order.quantity} sản phẩm</p>
              </div>
            )}

            {/* Approve & Pay */}
            {order.status === 'pending_approval' && (
              <div className="pt-4 border-t border-gray-100 space-y-3">
                <div className="p-3 bg-amber-50 rounded-xl border border-amber-200 text-xs text-amber-800">
                  <p className="font-semibold mb-1">Chờ xác nhận của bạn</p>
                  <p>Vui lòng xem lại file thiết kế và thông số kỹ thuật trước khi duyệt.</p>
                </div>
                <button
                  onClick={handleApprove}
                  className="w-full py-3.5 bg-gradient-to-r from-indigo-600 to-indigo-500 text-white rounded-xl font-semibold text-sm hover:from-indigo-700 hover:to-indigo-600 active:from-indigo-800 transition-all duration-200 cursor-pointer shadow-sm shadow-indigo-200"
                >
                  Duyệt & Thanh toán {formatPrice(order.total)}
                </button>
              </div>
            )}

            {/* Review if completed */}
            {order.status === 'completed' && (
              <Link
                to={`/feedback/${order.id}`}
                className="block w-full py-3 text-center bg-indigo-600 text-white rounded-xl font-semibold text-sm hover:bg-indigo-700 transition-colors duration-200 cursor-pointer"
              >
                Gửi đánh giá
              </Link>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CustomOrderDetail;
