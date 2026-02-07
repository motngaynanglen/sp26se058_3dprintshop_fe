import React, { useState } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import img1 from '../components/imgs/1.png';
import img2 from '../components/imgs/2.png';
import {
  Button,
  InputNumber,
  Select,
  Breadcrumb,
  Rate,
  Divider,
  Tag,
  Space,
  Card,
  Row,
  Col,
  Image,
  Tooltip
} from 'antd';
import {
  ArrowLeftOutlined,
  ShoppingCartOutlined,
  EyeOutlined,
  InfoCircleOutlined,
  CheckCircleOutlined
} from '@ant-design/icons';

const { Option } = Select;

const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const { isAuthenticated, isCustomer, isManager, isAdmin, isEmployee } = useAuth();
  
  const [quantity, setQuantity] = useState(1);
  const [selectedMaterial, setSelectedMaterial] = useState('PLA');

  // Detect if came from specific page
  const fromFeedback = location.state?.from === 'feedback';
  const previousPath = location.state?.previousPath || '/products';

  // Mock product data - Enhanced
  const product = {
    id: id,
    name: 'Mô hình 3D Custom Logo Công ty',
    price: 500000,
    description: 'Sản phẩm rất đẹp, chất lượng in tốt, màu sắc chuẩn. Phù hợp để làm quà tặng doanh nghiệp hoặc trang trí văn phòng.',
    materials: ['PLA', 'ABS', 'TPU', 'Wood PLA', 'PETG'],
    stock: 10,
    rating: 4.5,
    reviewCount: 24,
    images: [
      img1,
      img2,
      img1,
      img2,
      img1,
      img2,
      img1
    ],
    specifications: {
      dimensions: '20 x 20 x 15 cm',
      weight: '250g',
      printTime: '12 giờ',
      layerHeight: '0.2mm',
      infill: '20%',
      color: 'Đỏ'
    },
    features: [
      'In 3D chất lượng cao',
      'Màu sắc bền đẹp',
      'Có thể tùy chỉnh theo yêu cầu',
      'Giao hàng nhanh chóng',
      'Bảo hành 6 tháng'
    ]
  };

  const handleGoBack = () => {
    if (fromFeedback) {
      navigate('/manager/feedback');
    } else if (window.history.length > 1) {
      navigate(-1);
    } else {
      navigate('/products');
    }
  };

  const handleAddToCart = () => {
    if (!isAuthenticated) {
      navigate('/login');
      return;
    }
    // TODO: Add to cart logic
    alert(`Đã thêm ${quantity} sản phẩm vào giỏ hàng!`);
  };

  // Determine if should show Add to Cart
  const showAddToCart = isCustomer;

  const [activeImage, setActiveImage] = useState(null);
  const scrollContainerRef = React.useRef(null);

  // Set default active image
  React.useEffect(() => {
    if (product.images && product.images.length > 0) {
      setActiveImage(product.images[0]);
    }
  }, [id]); // Reset when id changes

  const scroll = (direction) => {
    if (scrollContainerRef.current) {
      const { current } = scrollContainerRef;
      const scrollAmount = 100; // Adjust scroll amount
      if (direction === 'left') {
        current.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
      } else {
        current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
      }
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Back Button & Breadcrumb */}
        <div className="mb-6">

          <Breadcrumb
            items={[
              { title: <a href="/">Trang chủ</a> },
              { title: <a href="/products">Sản phẩm</a> },
              { title: product.name }
            ]}
          />
        </div>

        {/* Main Product Section */}
        <Card className="mb-6">
          <Row gutter={[32, 32]}>
            {/* Image Gallery - Sticky & Enhanced */}
            <Col xs={24} lg={12}>
              <div className="sticky top-24">
                <div className="mb-4 overflow-hidden rounded-lg border border-gray-200">
                  <Image
                    src={activeImage || product.images[0]}
                    alt={product.name}
                    className="w-full object-contain bg-white"
                    style={{ maxHeight: '600px', height: '500px', width: '100%' }} // Increased size
                    preview={{ src: activeImage || product.images[0] }}
                  />
                </div>
                
                {/* Thumbnail Carousel */}
                <div className="relative group">
                  {/* Left Arrow */}
                  {product.images.length > 4 && (
                    <button 
                      onClick={() => scroll('left')}
                      className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white/80 hover:bg-white p-1 rounded-full shadow-md text-gray-800 opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      <ArrowLeftOutlined />
                    </button>
                  )}

                  <div 
                    ref={scrollContainerRef}
                    className="flex gap-2 overflow-x-auto hide-scrollbar scroll-smooth py-2 px-1"
                    style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
                  >
                    {product.images.map((img, idx) => (
                      <div 
                        key={idx}
                        className={`flex-shrink-0 cursor-pointer border-2 rounded-md overflow-hidden transition-all duration-200 ${
                          activeImage === img ? 'border-indigo-600 ring-1 ring-indigo-600' : 'border-transparent hover:border-gray-300'
                        }`}
                        onMouseEnter={() => setActiveImage(img)}
                        style={{ width: '100px', height: '100px' }}
                      >
                        <img
                          src={img}
                          alt={`${product.name} - ${idx + 1}`}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    ))}
                  </div>

                  {/* Right Arrow - We reuse ArrowLeftOutlined and rotate it or needed another icon, let's use a text or simple styled div for now if icon not available, but ArrowLeft is imported. Let's import ArrowRight if possible or just transform ArrowLeft */}
                  {product.images.length > 4 && (
                    <button 
                      onClick={() => scroll('right')}
                      className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white/80 hover:bg-white p-1 rounded-full shadow-md text-gray-800 opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      <ArrowLeftOutlined rotate={180} />
                    </button>
                  )}
                </div>
              </div>
            </Col>

            {/* Product Info */}
            <Col xs={24} lg={12}>
              <div>
                {/* Title & Rating */}
                <h1 className="text-3xl font-bold text-gray-900 mb-3">
                  {product.name}
                </h1>

                <div className="flex items-center gap-3 mb-4">
                  <Rate disabled value={product.rating} allowHalf />
                  <span className="text-gray-600">
                    {product.rating} ({product.reviewCount} đánh giá)
                  </span>
                </div>

                {/* Price */}
                <div className="mb-6">
                  <span className="text-4xl font-bold text-indigo-600">
                    {product.price.toLocaleString('vi-VN')} đ
                  </span>
                </div>

                {/* Description */}
                <div className="mb-6">
                  <p className="text-gray-700 leading-relaxed">
                    {product.description}
                  </p>
                </div>

                <Divider />

                {/* Material Selection */}
                <div className="mb-6">
                  <label className="block mb-2 font-semibold text-gray-800">
                    Chất liệu
                  </label>
                  <Select
                    value={selectedMaterial}
                    onChange={setSelectedMaterial}
                    size="large"
                    style={{ width: '100%' }}
                  >
                    {product.materials.map(material => (
                      <Option key={material} value={material}>
                        {material}
                      </Option>
                    ))}
                  </Select>
                </div>

                {/* Quantity Selection */}
                <div className="mb-6">
                  <label className="block mb-2 font-semibold text-gray-800">
                    Số lượng
                  </label>
                  <div className="flex items-center gap-4">
                    <InputNumber
                      min={1}
                      max={product.stock}
                      value={quantity}
                      onChange={setQuantity}
                      size="large"
                      style={{ width: 120 }}
                    />
                    <Tag color={product.stock > 5 ? 'success' : 'warning'} icon={<CheckCircleOutlined />}>
                      Còn {product.stock} sản phẩm
                    </Tag>
                  </div>
                </div>

                <Divider />

                {/* Action Buttons */}
                <Space direction="vertical" size="middle" style={{ width: '100%' }}>
                  {/* Add to Cart - Only for Customers */}
                  {showAddToCart && (
                    <Button
                      type="primary"
                      size="large"
                      icon={<ShoppingCartOutlined />}
                      onClick={handleAddToCart}
                      block
                      style={{ height: 50 }}
                    >
                      Thêm vào giỏ hàng
                    </Button>
                  )}

                  {/* View 3D Preview - For All */}
                  <Button
                    size="large"
                    icon={<EyeOutlined />}
                    onClick={() => navigate(`/preview/${id}`, {
                      state: {
                        breadcrumb: [
                          { title: 'Trang chủ', path: '/' },
                          { title: 'Sản phẩm', path: '/products' },
                          { title: product.name, path: `/products/${id}` },
                          { title: 'Xem mô hình 3D', path: null }
                        ]
                      }
                    })}
                    block
                    style={{ height: 50 }}
                  >
                    Xem mô hình 3D
                  </Button>

                  {/* Info for non-customers */}
                  {!showAddToCart && (
                    <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                      <div className="flex items-start gap-3">
                        <InfoCircleOutlined className="text-blue-600 text-xl mt-1" />
                        <div>
                          <div className="font-semibold text-blue-900 mb-1">
                            Thông tin dành cho {isManager ? 'Manager' : isAdmin ? 'Admin' : 'Nhân viên'}
                          </div>
                          <div className="text-sm text-blue-700">
                            Bạn đang xem trang này với quyền quản trị. Chức năng mua hàng chỉ dành cho khách hàng.
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </Space>
              </div>
            </Col>
          </Row>
        </Card>

        {/* Product Details Tabs */}
        <Row gutter={[16, 16]}>
          {/* Specifications */}
          <Col xs={24} lg={12}>
            <Card title="Thông số kỹ thuật" className="h-full">
              <div className="space-y-3">
                {Object.entries(product.specifications).map(([key, value]) => (
                  <div key={key} className="flex justify-between py-2 border-b border-gray-100">
                    <span className="text-gray-600 capitalize">
                      {key === 'dimensions' ? 'Kích thước' :
                       key === 'weight' ? 'Trọng lượng' :
                       key === 'printTime' ? 'Thời gian in' :
                       key === 'layerHeight' ? 'Độ cao lớp' :
                       key === 'infill' ? 'Độ đặc' :
                       key === 'color' ? 'Màu sắc' : key}:
                    </span>
                    <span className="font-semibold text-gray-900">{value}</span>
                  </div>
                ))}
              </div>
            </Card>
          </Col>

          {/* Features */}
          <Col xs={24} lg={12}>
            <Card title="Đặc điểm nổi bật" className="h-full">
              <ul className="space-y-3">
                {product.features.map((feature, idx) => (
                  <li key={idx} className="flex items-start gap-3">
                    <CheckCircleOutlined className="text-green-500 text-lg mt-1" />
                    <span className="text-gray-700">{feature}</span>
                  </li>
                ))}
              </ul>
            </Card>
          </Col>
        </Row>
      </div>
    </div>
  );
};

export default ProductDetail;
