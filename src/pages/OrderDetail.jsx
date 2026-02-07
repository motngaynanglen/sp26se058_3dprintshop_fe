import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { Breadcrumb } from 'antd';
import img1 from '../components/imgs/1.png';
import img2 from '../components/imgs/2.png';

const OrderDetail = () => {
  const { id } = useParams();

  // Mock order data
  const order = {
    id: id,
    date: '2024-01-15',
    status: 'completed',
    total: 69.97,
    items: [
      { name: 'Bình hoa in 3D', quantity: 2, price: 29.99, material: 'PLA', image: img1 },
      { name: 'Ốp lưng điện thoại Custom', quantity: 1, price: 19.99, material: 'TPU', image: img2 }
    ],
    shipping: {
      name: 'Nguyễn Văn A',
      address: '123 Đường Chính',
      city: 'Hồ Chí Minh',
      zipCode: '70000',
      phone: '+84123456789'
    },
    tracking: [
      { date: '2024-01-15', status: 'Đã đặt hàng', description: 'Đơn hàng của bạn đã được tiếp nhận' },
      { date: '2024-01-16', status: 'Đang xử lý', description: 'Đơn hàng đang được chuẩn bị' },
      { date: '2024-01-18', status: 'Đã gửi hàng', description: 'Đơn hàng đã được giao cho đơn vị vận chuyển' },
      { date: '2024-01-20', status: 'Đã giao hàng', description: 'Đơn hàng đã được giao thành công' }
    ]
  };

  return (
    <div className="max-w-7xl mx-auto px-8 py-8">
      <div className="mb-6">
        <Breadcrumb
          items={[
            { title: <Link to="/">Trang chủ</Link> },
            { title: <Link to="/my-orders">Đơn hàng của tôi</Link> },
            { title: 'Chi tiết đơn hàng' }
          ]}
        />
      </div>

      <h1 className="text-3xl font-bold mb-8 text-gray-800">Chi tiết đơn hàng</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-2xl font-bold mb-6 text-gray-800">Sản phẩm</h2>
            <div className="space-y-4">
              {order.items.map((item, idx) => (
                <div key={idx} className="flex items-center gap-4 pb-4 border-b border-gray-200 last:border-b-0">
                  <div className="bg-gray-200 w-20 h-20 rounded overflow-hidden flex-shrink-0">
                    <img 
                      src={item.image} 
                      alt={item.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-gray-800">{item.name}</h3>
                    <p className="text-sm text-gray-600">Vật liệu: {item.material}</p>
                    <p className="text-sm text-gray-600">Số lượng: {item.quantity}</p>
                  </div>
                  <p className="font-semibold text-gray-800">${(item.price * item.quantity).toFixed(2)}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-2xl font-bold mb-6 text-gray-800">Thông tin vận chuyển</h2>
            <div className="space-y-4">
              {order.tracking.map((track, idx) => (
                <div key={idx} className="flex gap-4">
                  <div className="flex flex-col items-center">
                    <div className={`w-4 h-4 rounded-full ${idx < order.tracking.length - 1 ? 'bg-indigo-600' : 'bg-gray-300'}`}></div>
                    {idx < order.tracking.length - 1 && (
                      <div className="w-0.5 h-12 bg-indigo-600"></div>
                    )}
                  </div>
                  <div className="flex-1 pb-4">
                    <p className="font-semibold text-gray-800">{track.status}</p>
                    <p className="text-sm text-gray-600">{track.description}</p>
                    <p className="text-xs text-gray-500 mt-1">{track.date}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="lg:col-span-1">
          <div className="bg-white rounded-lg shadow-md p-6 sticky top-24 space-y-6">
            <div>
              <h3 className="font-semibold text-gray-800 mb-2">Tóm tắt đơn hàng</h3>
              <p className="text-sm text-gray-600">Mã đơn: {order.id}</p>
              <p className="text-sm text-gray-600">Ngày đặt: {order.date}</p>
              <span className="inline-block mt-2 px-3 py-1 bg-green-100 text-green-800 rounded-full text-xs font-medium">
                {order.status === 'completed' ? 'Hoàn thành' : order.status}
              </span>
            </div>

            <div>
              <h3 className="font-semibold text-gray-800 mb-4">Địa chỉ giao hàng</h3>
              <p className="text-sm text-gray-600">{order.shipping.name}</p>
              <p className="text-sm text-gray-600">{order.shipping.address}</p>
              <p className="text-sm text-gray-600">{order.shipping.city}, {order.shipping.zipCode}</p>
              <p className="text-sm text-gray-600">{order.shipping.phone}</p>
            </div>

            <div>
              <h3 className="font-semibold text-gray-800 mb-4">Tổng cộng</h3>
              <p className="text-2xl font-bold text-indigo-600">${order.total.toFixed(2)}</p>
            </div>

            <Link
              to={`/feedback/${order.id}`}
              className="block w-full py-3 text-center bg-indigo-600 text-white rounded-lg font-semibold hover:bg-indigo-700 transition-colors"
            >
              Gửi đánh giá
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderDetail;

