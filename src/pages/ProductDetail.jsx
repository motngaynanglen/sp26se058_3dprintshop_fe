import React, { useState } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
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
      'https://via.placeholder.com/600x600?text=Product+Image+1',
      'https://via.placeholder.com/600x600?text=Product+Image+2',
      'https://via.placeholder.com/600x600?text=Product+Image+3',
      'https://via.placeholder.com/600x600?text=Product+Image+4'
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

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Back Button & Breadcrumb */}
        <div className="mb-6">
          <Button
            icon={<ArrowLeftOutlined />}
            onClick={handleGoBack}
            size="large"
            className="mb-4"
          >
            Quay lại {fromFeedback ? 'Feedback' : ''}
          </Button>

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
            {/* Image Gallery */}
            <Col xs={24} lg={12}>
              <div className="sticky top-4">
                <Image.PreviewGroup>
                  <div className="mb-4">
                    <Image
                      src={product.images[0]}
                      alt={product.name}
                      className="w-full rounded-lg"
                      style={{ maxHeight: 500, objectFit: 'cover' }}
                    />
                  </div>
                  <div className="grid grid-cols-4 gap-2">
                    {product.images.map((img, idx) => (
                      <Image
                        key={idx}
                        src={img}
                        alt={`${product.name} - ${idx + 1}`}
                        className="rounded cursor-pointer hover:opacity-80 transition-opacity"
                        style={{ height: 100, objectFit: 'cover' }}
                      />
                    ))}
                  </div>
                </Image.PreviewGroup>
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
                    onClick={() => navigate(`/preview/${id}`)}
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
