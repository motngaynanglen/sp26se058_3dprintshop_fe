import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import shippingAddressApi from '../api/shippingAddressApi';
import { checkoutOrderApi } from '../api/orderApi';
import transactionApi from '../api/transactionApi';
import { notification } from 'antd';

// SVG Icons
const PackageIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-3.5 h-3.5">
    <path strokeLinecap="round" strokeLinejoin="round" d="m21 7.5-9-5.25L3 7.5m18 0-9 5.25m9-5.25v9l-9 5.25M3 7.5l9 5.25M3 7.5v9l9 5.25m0-9v9" />
  </svg>
);

const CheckCircleIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
  </svg>
);

const SpinnerIcon = () => (
  <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
  </svg>
);

const LocationIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
    <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z" />
  </svg>
);

const PlusIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4">
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
  </svg>
);

const PAYMENT_METHODS = [
  { value: 'PAYOS', label: 'PayOS', description: 'Thanh toán trực tuyến qua PayOS' },
  { value: 'CASH', label: 'Thanh toán trực tiếp (COD)', description: 'Thanh toán khi nhận hàng' },
];

const Checkout = () => {
  const navigate = useNavigate();
  const location = useLocation();

  // Lấy thông tin sản phẩm từ state
  const { product, quantity, material, sourceType = 'IN_STOCK' } = location.state || {};

  // === State: Chọn địa chỉ có sẵn hoặc tạo mới ===
  const [addressMode, setAddressMode] = useState('existing'); // 'existing' | 'new'
  const [savedAddresses, setSavedAddresses] = useState([]);
  const [selectedAddressId, setSelectedAddressId] = useState(null);
  const [loadingAddresses, setLoadingAddresses] = useState(true);

  const [formData, setFormData] = useState({
    receiverName: '',
    phone: '',
    addressLine: '',
    ward: '',
    district: '',
    city: '',
    province: 'Việt Nam',
    isDefault: false,
    note: '',
    paymentMethod: 'PAYOS',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  // Tính giá: nếu là CUSTOM_QUOTE_MF2 thì lấy giá từ product.latestQuotedPrice (hoặc tương đương)
  const itemPrice = (sourceType === 'CUSTOM_QUOTE_MF2' ? product?.latestQuotedPrice : product?.price) || 0;
  const subtotal = itemPrice * (quantity || 1);
  const shipping = 30000;
  const tax = Math.round(subtotal * 0.08);
  const total = subtotal + shipping + tax;

  const formatPrice = (price) =>
    new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(price);

  // === Fetch danh sách địa chỉ đã lưu ===
  useEffect(() => {
    const fetchAddresses = async () => {
      try {
        setLoadingAddresses(true);
        const response = await shippingAddressApi.getMyAddresses();
        const addresses = response?.data || response || [];
        setSavedAddresses(Array.isArray(addresses) ? addresses : []);
        // Tự động chọn địa chỉ mặc định hoặc địa chỉ đầu tiên
        if (Array.isArray(addresses) && addresses.length > 0) {
          const defaultAddr = addresses.find(a => a.isDefault) || addresses[0];
          setSelectedAddressId(defaultAddr.id);
          setAddressMode('existing');
        } else {
          // Không có địa chỉ nào → chuyển sang tạo mới
          setAddressMode('new');
        }
      } catch (error) {
        console.error('Lỗi khi tải danh sách địa chỉ:', error);
        setAddressMode('new');
      } finally {
        setLoadingAddresses(false);
      }
    };
    fetchAddresses();
  }, []);

  // Nếu không có sản phẩm (truy cập trực tiếp URL), hiển thị thông báo
  if (!product) {
    return (
      <div className="max-w-7xl mx-auto px-6 py-20 text-center">
        <h1 className="text-2xl font-bold text-gray-800 mb-4">Bạn chưa chọn sản phẩm nào để thanh toán</h1>
        <button
          onClick={() => navigate('/products')}
          className="inline-flex items-center gap-2 py-3 px-6 bg-indigo-600 text-white rounded-xl font-semibold hover:bg-indigo-700 transition"
        >
          Quay lại cửa hàng
        </button>
      </div>
    );
  }

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({ ...formData, [name]: type === 'checkbox' ? checked : value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      let shippingAddressId;

      if (addressMode === 'existing' && selectedAddressId) {
        // === Dùng địa chỉ có sẵn ===
        shippingAddressId = selectedAddressId;
      } else {
        // === Bước 1: Tạo địa chỉ giao hàng mới ===
        const shippingPayload = {
          receiverName: formData.receiverName,
          phone: formData.phone,
          addressLine: formData.addressLine,
          ward: formData.ward,
          district: formData.district,
          city: formData.city,
          province: formData.province,
          isDefault: formData.isDefault,
        };

        const shippingResponse = await shippingAddressApi.add(shippingPayload);
        console.log('Shipping address response:', shippingResponse);

        // Trích xuất ID từ response — thử nhiều pattern response
        shippingAddressId = shippingResponse?.data?.id 
          || shippingResponse?.id 
          || shippingResponse?.data
          || shippingResponse;

        if (!shippingAddressId || typeof shippingAddressId === 'object') {
          throw new Error('Không lấy được ID địa chỉ giao hàng từ response');
        }

        notification.success({
          message: 'Tạo địa chỉ thành công',
          description: `Địa chỉ cho ${formData.receiverName} đã được lưu.`,
          placement: 'topRight',
          duration: 2,
        });
      }

      // === Bước 2: Tạo đơn hàng (checkout) ===
      const orderPayload = {
        shippingAddressId,
        sourceType: sourceType,
        note: formData.note || '',
        items: [
          {
            ...(sourceType === 'CUSTOM_QUOTE_MF2' 
                ? { designWorkId: product.id } 
                : { designVariantId: product.id }),
            quantity: quantity || 1,
          },
        ],
      };

      console.log('Order payload:', orderPayload);
      const orderResponse = await checkoutOrderApi(orderPayload);
      console.log('Order response:', orderResponse);

      // Trích ID đơn hàng từ response
      const orderId = orderResponse?.data?.id || orderResponse?.id || orderResponse?.data;

      if (!orderId) {
        throw new Error('Không lấy được ID đơn hàng từ response');
      }

      notification.success({
        message: 'Tạo đơn hàng thành công',
        description: `Đơn hàng đã được tạo. Đang chuyển đến thanh toán...`,
        placement: 'topRight',
        duration: 2,
      });

      // === Bước 3: Thực hiện thanh toán ===
      const transactionPayload = {
        orderId: orderId,
        paymentMethod: formData.paymentMethod, // 'PAYOS' hoặc 'CASH'
      };

      console.log('Transaction payload:', transactionPayload);
      const transactionResponse = await transactionApi.performTransaction(transactionPayload);
      console.log('Transaction response:', transactionResponse);

      // Nếu paymentMethod = PAYOS, backend sẽ trả về link thanh toán
      const paymentUrl = transactionResponse?.data?.checkoutUrl 
        || transactionResponse?.data?.paymentUrl 
        || transactionResponse?.checkoutUrl
        || transactionResponse?.paymentUrl;

      if (formData.paymentMethod === 'PAYOS' && paymentUrl) {
        // Redirect đến trang thanh toán PayOS
        window.location.href = paymentUrl;
      } else {
        // CASH hoặc không có URL → chuyển đến trang xác nhận
        navigate('/order-confirmation', { state: { orderId } });
      }

    } catch (error) {
      console.error('Checkout error:', error);
      notification.error({
        message: 'Đặt hàng thất bại',
        description: error?.response?.data?.message || error?.response?.data?.title || error.message || 'Có lỗi xảy ra, vui lòng thử lại.',
        placement: 'topRight',
      });
    } finally {
      setIsSubmitting(false);
    }
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

          {/* ============================================ */}
          {/* PHẦN ĐỊA CHỈ GIAO HÀNG                       */}
          {/* ============================================ */}
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
            <div className="flex items-center gap-2 mb-6">
              <div className="w-1 h-6 bg-indigo-600 rounded-full"></div>
              <h2 className="text-lg font-bold text-gray-900">Địa chỉ giao hàng</h2>
            </div>

            {/* Toggle: Chọn có sẵn / Tạo mới */}
            <div className="flex gap-3 mb-6">
              <button
                type="button"
                onClick={() => setAddressMode('existing')}
                disabled={savedAddresses.length === 0}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium transition-all duration-150 cursor-pointer ${
                  addressMode === 'existing'
                    ? 'bg-indigo-600 text-white shadow-sm'
                    : savedAddresses.length === 0
                    ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                <LocationIcon />
                Chọn địa chỉ có sẵn {savedAddresses.length > 0 && `(${savedAddresses.length})`}
              </button>
              <button
                type="button"
                onClick={() => setAddressMode('new')}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium transition-all duration-150 cursor-pointer ${
                  addressMode === 'new'
                    ? 'bg-indigo-600 text-white shadow-sm'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                <PlusIcon />
                Tạo địa chỉ mới
              </button>
            </div>

            {/* === MODE: Chọn địa chỉ có sẵn === */}
            {addressMode === 'existing' && (
              <div className="space-y-3">
                {loadingAddresses ? (
                  <div className="text-center py-8 text-gray-500 text-sm">Đang tải danh sách địa chỉ...</div>
                ) : savedAddresses.length === 0 ? (
                  <div className="text-center py-8 text-gray-500 text-sm">
                    <p>Bạn chưa có địa chỉ nào được lưu.</p>
                    <button
                      type="button"
                      onClick={() => setAddressMode('new')}
                      className="mt-2 text-indigo-600 font-medium hover:underline cursor-pointer"
                    >
                      Tạo địa chỉ mới
                    </button>
                  </div>
                ) : (
                  savedAddresses.map((addr) => (
                    <label
                      key={addr.id}
                      className={`flex items-start gap-4 p-4 rounded-xl border-2 cursor-pointer transition-all duration-150 ${
                        selectedAddressId === addr.id
                          ? 'border-indigo-500 bg-indigo-50'
                          : 'border-gray-200 bg-white hover:border-gray-300 hover:bg-gray-50'
                      }`}
                    >
                      <input
                        type="radio"
                        name="selectedAddress"
                        value={addr.id}
                        checked={selectedAddressId === addr.id}
                        onChange={() => setSelectedAddressId(addr.id)}
                        className="w-4 h-4 mt-1 text-indigo-600 border-gray-300 focus:ring-indigo-500"
                      />
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="font-semibold text-sm text-gray-900">{addr.receiverName}</span>
                          <span className="text-gray-400">|</span>
                          <span className="text-sm text-gray-600">{addr.phone}</span>
                          {addr.isDefault && (
                            <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-semibold bg-indigo-100 text-indigo-700">
                              Mặc định
                            </span>
                          )}
                        </div>
                        <p className="text-xs text-gray-500 leading-relaxed">
                          {[addr.addressLine, addr.ward, addr.district, addr.city, addr.province]
                            .filter(Boolean)
                            .join(', ')}
                        </p>
                      </div>
                      {selectedAddressId === addr.id && (
                        <span className="text-indigo-600 flex-shrink-0">
                          <CheckCircleIcon />
                        </span>
                      )}
                    </label>
                  ))
                )}
              </div>
            )}

            {/* === MODE: Tạo địa chỉ mới === */}
            {addressMode === 'new' && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="receiverName" className="block mb-1.5 text-sm font-medium text-gray-700">
                    Họ và tên người nhận <span className="text-red-500">*</span>
                  </label>
                  <input
                    id="receiverName"
                    type="text"
                    name="receiverName"
                    value={formData.receiverName}
                    onChange={handleChange}
                    placeholder="Nguyễn Văn A"
                    required={addressMode === 'new'}
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
                    required={addressMode === 'new'}
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
                    placeholder="123 Đường ABC, Phường 5"
                    required={addressMode === 'new'}
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
                <div>
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
                    required={addressMode === 'new'}
                    className="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 transition-all duration-150"
                  />
                </div>
                <div>
                  <label htmlFor="province" className="block mb-1.5 text-sm font-medium text-gray-700">Quốc gia</label>
                  <input
                    id="province"
                    type="text"
                    name="province"
                    value={formData.province}
                    onChange={handleChange}
                    placeholder="Việt Nam"
                    className="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 transition-all duration-150"
                  />
                </div>
                <div className="md:col-span-2">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      name="isDefault"
                      checked={formData.isDefault}
                      onChange={handleChange}
                      className="w-4 h-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500"
                    />
                    <span className="text-sm text-gray-700">Đặt làm địa chỉ mặc định</span>
                  </label>
                </div>
              </div>
            )}
          </div>

          {/* Ghi chú đơn hàng */}
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-1 h-6 bg-indigo-600 rounded-full"></div>
              <h2 className="text-lg font-bold text-gray-900">Ghi chú</h2>
            </div>
            <textarea
              id="note"
              name="note"
              value={formData.note}
              onChange={handleChange}
              rows={3}
              placeholder="Ghi chú thêm cho đơn hàng (không bắt buộc)"
              className="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 transition-all duration-150 resize-none"
            />
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

            {/* Item */}
            <div className="space-y-3 pb-4 border-b border-gray-100">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-lg overflow-hidden bg-slate-50 flex-shrink-0 relative">
                  {product.modelSrc ? (
                    <model-viewer
                      src={product.modelSrc}
                      camera-controls={false}
                      auto-rotate
                      interaction-prompt="none"
                      shadow-intensity="1"
                      style={{ width: '100%', height: '100%', pointerEvents: 'none' }}
                    />
                  ) : product.image ? (
                    <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-slate-400">
                      <PackageIcon />
                    </div>
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-xs font-medium text-gray-800 truncate">{product.name}</p>
                  <div className="flex items-center gap-1.5 mt-0.5">
                    <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium bg-emerald-50 text-emerald-700 ring-1 ring-emerald-200">
                      <PackageIcon />
                      Sẵn hàng
                    </span>
                    <span className="text-xs text-gray-400">x{quantity}</span>
                  </div>
                </div>
                <span className="text-xs font-semibold text-gray-900 flex-shrink-0">
                  {formatPrice(subtotal)}
                </span>
              </div>
              {material && (
                <div className="text-xs text-gray-500">
                  Chất liệu: <span className="font-medium text-gray-700">{material}</span>
                </div>
              )}
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

            <button
              type="submit"
              disabled={isSubmitting || (addressMode === 'existing' && !selectedAddressId)}
              className={`w-full py-3.5 rounded-xl font-semibold text-sm transition-colors duration-200 cursor-pointer flex items-center justify-center ${
                isSubmitting || (addressMode === 'existing' && !selectedAddressId)
                  ? 'bg-indigo-400 text-white cursor-not-allowed'
                  : 'bg-indigo-600 text-white hover:bg-indigo-700 active:bg-indigo-800'
              }`}
            >
              {isSubmitting ? (
                <>
                  <SpinnerIcon />
                  Đang xử lý...
                </>
              ) : (
                'Đặt hàng ngay'
              )}
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
