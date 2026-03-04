import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import img1 from '../components/imgs/1.png';
import img2 from '../components/imgs/2.png';

// SVG Icons
const PackageIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-3.5 h-3.5">
    <path strokeLinecap="round" strokeLinejoin="round" d="m21 7.5-9-5.25L3 7.5m18 0-9 5.25m9-5.25v9l-9 5.25M3 7.5l9 5.25M3 7.5v9l9 5.25m0-9v9" />
  </svg>
);

const ClockIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-3.5 h-3.5">
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
  </svg>
);

const SparklesIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-3.5 h-3.5">
    <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904 9 18.75l-.813-2.846a4.5 4.5 0 0 0-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 0 0 3.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 0 0 3.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 0 0-3.09 3.09ZM18.259 8.715 18 9.75l-.259-1.035a3.375 3.375 0 0 0-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 0 0 2.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 0 0 2.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 0 0-2.456 2.456Z" />
  </svg>
);

const ExclamationIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 flex-shrink-0">
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126ZM12 15.75h.007v.008H12v-.008Z" />
  </svg>
);

const CheckCircleIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
  </svg>
);

const SOURCE_TYPE_CONFIG = {
  in_stock: { label: 'Sẵn hàng', className: 'bg-emerald-50 text-emerald-700 ring-1 ring-emerald-200', icon: <PackageIcon /> },
  pre_order: { label: 'Pre-Order', className: 'bg-amber-50 text-amber-700 ring-1 ring-amber-200', icon: <ClockIcon /> },
  custom: { label: 'Custom', className: 'bg-violet-50 text-violet-700 ring-1 ring-violet-200', icon: <SparklesIcon /> },
};

const StatusBadge = ({ sourceType }) => {
  const config = SOURCE_TYPE_CONFIG[sourceType] || SOURCE_TYPE_CONFIG.in_stock;
  return (
    <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium ${config.className}`}>
      {config.icon}
      {config.label}
    </span>
  );
};

const PAYMENT_METHODS = [
  { value: 'vnpay', label: 'VNPay', description: 'Thanh toán qua cổng VNPay' },
  { value: 'bank_transfer', label: 'Chuyển khoản ngân hàng', description: 'Chuyển khoản trực tiếp vào tài khoản shop' },
  { value: 'cod', label: 'Thanh toán khi nhận hàng (COD)', description: 'Trả tiền khi nhận hàng' },
];

const Checkout = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    addressLine: '',
    ward: '',
    district: '',
    city: '',
    paymentMethod: 'vnpay',
  });

  // Mock cart items with source types
  const cartItems = [
    { id: 1, name: 'Bình hoa in 3D', price: 299000, quantity: 2, material: 'PLA', image: img1, sourceType: 'in_stock' },
    { id: 2, name: 'Ốp lưng điện thoại Custom', price: 199000, quantity: 1, material: 'TPU', image: img2, sourceType: 'pre_order' },
  ];

  const hasPreOrder = cartItems.some(i => i.sourceType === 'pre_order');
  const hasCustom = cartItems.some(i => i.sourceType === 'custom');
  const showDeliveryWarning = hasPreOrder || hasCustom;

  const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const shipping = 30000;
  const tax = Math.round(subtotal * 0.08);
  const total = subtotal + shipping + tax;

  const formatPrice = (price) =>
    new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(price);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    navigate('/order-confirmation', { state: { orderId: 'ORD-' + Date.now() } });
  };

  return (
    <div className="max-w-7xl mx-auto px-6 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Thanh toán</h1>
        <p className="text-gray-500 mt-1">Hoàn tất thông tin để đặt hàng</p>
      </div>

      <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left: Shipping + Payment */}
        <div className="lg:col-span-2 space-y-6">
          {/* Shipping Info */}
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
            <div className="flex items-center gap-2 mb-6">
              <div className="w-1 h-6 bg-indigo-600 rounded-full"></div>
              <h2 className="text-lg font-bold text-gray-900">Thông tin giao hàng</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="fullName" className="block mb-1.5 text-sm font-medium text-gray-700">
                  Họ và tên <span className="text-red-500">*</span>
                </label>
                <input
                  id="fullName"
                  type="text"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleChange}
                  placeholder="Nguyễn Văn A"
                  required
                  className="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 transition-all duration-150"
                />
              </div>
              <div>
                <label htmlFor="phone" className="block mb-1.5 text-sm font-medium text-gray-700">
                  Số điện thoại <span className="text-red-500">*</span>
                </label>
                <input
                  id="phone"
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="0901 234 567"
                  required
                  className="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 transition-all duration-150"
                />
              </div>
              <div className="md:col-span-2">
                <label htmlFor="email" className="block mb-1.5 text-sm font-medium text-gray-700">
                  Email <span className="text-red-500">*</span>
                </label>
                <input
                  id="email"
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="email@example.com"
                  required
                  className="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 transition-all duration-150"
                />
              </div>
              <div className="md:col-span-2">
                <label htmlFor="addressLine" className="block mb-1.5 text-sm font-medium text-gray-700">
                  Địa chỉ (Số nhà, Tên đường) <span className="text-red-500">*</span>
                </label>
                <input
                  id="addressLine"
                  type="text"
                  name="addressLine"
                  value={formData.addressLine}
                  onChange={handleChange}
                  placeholder="123 Đường Lê Lợi"
                  required
                  className="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 transition-all duration-150"
                />
              </div>
              <div>
                <label htmlFor="ward" className="block mb-1.5 text-sm font-medium text-gray-700">Phường/Xã</label>
                <input
                  id="ward"
                  type="text"
                  name="ward"
                  value={formData.ward}
                  onChange={handleChange}
                  placeholder="Phường Bến Nghé"
                  className="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 transition-all duration-150"
                />
              </div>
              <div>
                <label htmlFor="district" className="block mb-1.5 text-sm font-medium text-gray-700">Quận/Huyện</label>
                <input
                  id="district"
                  type="text"
                  name="district"
                  value={formData.district}
                  onChange={handleChange}
                  placeholder="Quận 1"
                  className="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 transition-all duration-150"
                />
              </div>
              <div className="md:col-span-2">
                <label htmlFor="city" className="block mb-1.5 text-sm font-medium text-gray-700">
                  Tỉnh/Thành phố <span className="text-red-500">*</span>
                </label>
                <input
                  id="city"
                  type="text"
                  name="city"
                  value={formData.city}
                  onChange={handleChange}
                  placeholder="Hồ Chí Minh"
                  required
                  className="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 transition-all duration-150"
                />
              </div>
            </div>
          </div>

          {/* Payment Method */}
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
            <div className="flex items-center gap-2 mb-6">
              <div className="w-1 h-6 bg-indigo-600 rounded-full"></div>
              <h2 className="text-lg font-bold text-gray-900">Phương thức thanh toán</h2>
            </div>
            <div className="space-y-3">
              {PAYMENT_METHODS.map((method) => (
                <label
                  key={method.value}
                  className={`flex items-center gap-4 p-4 rounded-xl border-2 cursor-pointer transition-all duration-150 ${
                    formData.paymentMethod === method.value
                      ? 'border-indigo-500 bg-indigo-50'
                      : 'border-gray-200 bg-white hover:border-gray-300 hover:bg-gray-50'
                  }`}
                >
                  <input
                    type="radio"
                    name="paymentMethod"
                    value={method.value}
                    checked={formData.paymentMethod === method.value}
                    onChange={handleChange}
                    className="w-4 h-4 text-indigo-600 border-gray-300 focus:ring-indigo-500"
                  />
                  <div className="flex-1">
                    <p className="font-medium text-sm text-gray-900">{method.label}</p>
                    <p className="text-xs text-gray-500 mt-0.5">{method.description}</p>
                  </div>
                  {formData.paymentMethod === method.value && (
                    <span className="text-indigo-600">
                      <CheckCircleIcon />
                    </span>
                  )}
                </label>
              ))}
            </div>
          </div>
        </div>

        {/* Right: Order Summary */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 sticky top-24 space-y-5">
            <h2 className="text-lg font-bold text-gray-900">Đơn hàng của bạn</h2>

            {/* Items list */}
            <div className="space-y-3 pb-4 border-b border-gray-100">
              {cartItems.map(item => (
                <div key={item.id} className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-lg overflow-hidden bg-gray-100 flex-shrink-0">
                    <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-medium text-gray-800 truncate">{item.name}</p>
                    <div className="flex items-center gap-1.5 mt-0.5">
                      <StatusBadge sourceType={item.sourceType} />
                      <span className="text-xs text-gray-400">x{item.quantity}</span>
                    </div>
                  </div>
                  <span className="text-xs font-semibold text-gray-900 flex-shrink-0">
                    {formatPrice(item.price * item.quantity)}
                  </span>
                </div>
              ))}
            </div>

            {/* Price breakdown */}
            <div className="space-y-2.5 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-500">Tạm tính</span>
                <span className="font-medium text-gray-900">{formatPrice(subtotal)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Phí vận chuyển</span>
                <span className="font-medium text-gray-900">{formatPrice(shipping)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Thuế VAT (8%)</span>
                <span className="font-medium text-gray-900">{formatPrice(tax)}</span>
              </div>
              <div className="pt-3 border-t border-gray-100 flex justify-between">
                <span className="font-bold text-gray-900">Tổng cộng</span>
                <span className="font-bold text-indigo-600 text-lg">{formatPrice(total)}</span>
              </div>
            </div>

            {/* Delivery Warning */}
            {showDeliveryWarning && (
              <div className="flex items-start gap-3 p-3 bg-amber-50 rounded-xl border border-amber-200 text-xs text-amber-800">
                <ExclamationIcon />
                <p>
                  Đơn hàng sẽ được gửi sau khi hoàn tất in ấn (ước tính <strong>{hasCustom ? '5–7' : '3–5'} ngày</strong>). Chúng tôi sẽ thông báo qua email.
                </p>
              </div>
            )}

            <button
              type="submit"
              className="w-full py-3.5 bg-indigo-600 text-white rounded-xl font-semibold text-sm hover:bg-indigo-700 active:bg-indigo-800 transition-colors duration-200 cursor-pointer"
            >
              Đặt hàng ngay
            </button>
            <p className="text-xs text-center text-gray-400">
              Bằng cách đặt hàng, bạn đồng ý với điều khoản sử dụng của chúng tôi.
            </p>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Checkout;
