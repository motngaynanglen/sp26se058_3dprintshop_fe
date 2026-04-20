import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { getProductById } from '../data/products';
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
  Tooltip,
  notification
} from 'antd';
import {
  ArrowLeftOutlined,
  ShoppingOutlined,
  EyeOutlined,
  InfoCircleOutlined,
  CheckCircleOutlined
} from '@ant-design/icons';
import '@google/model-viewer';

const { Option } = Select;

const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const { isAuthenticated, isCustomer, isManager, isAdmin, isEmployee } = useAuth();

  
  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [selectedMaterial, setSelectedMaterial] = useState('PLA');

  // Detect if came from specific page
  const fromFeedback = location.state?.from === 'feedback';
  const previousPath = location.state?.previousPath || '/products';

  useEffect(() => {
    const foundProduct = getProductById(id);
    if (foundProduct) {
      setProduct(foundProduct);
      if (foundProduct.materials?.length > 0) {
        setSelectedMaterial(foundProduct.materials[0]);
      }
    } else {
      // Handle not found (could redirect or show skeleton)
    }
  }, [id]);

  const handleGoBack = () => {
    if (fromFeedback) {
      navigate('/manager/feedback');
    } else if (window.history.length > 1) {
      navigate(-1);
    } else {
      navigate('/products');
    }
  };

  const handleBuyNow = () => {
    if (!isAuthenticated) {
      navigate('/login');
      return;
    }
    navigate('/checkout', {
      state: {
        product,
        quantity,
        material: selectedMaterial,
      }
    });
  };

  // Determine if should show Buy Now
  const showBuyNow = isCustomer;

  if (!product) {
    return <div className="min-h-screen flex items-center justify-center font-medium text-slate-500">Đang tải dữ liệu sản phẩm...</div>;
  }

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
                {/* Switch between 3D Model and Image */}
                <div className="mb-4 overflow-hidden rounded-xl border border-gray-200 bg-slate-50 relative aspect-square w-full">
                  {product.modelSrc ? (
                    <model-viewer
                      src={product.modelSrc}
                      camera-controls
                      auto-rotate
                      shadow-intensity="1"
                      environment-image="neutral"
                      exposure="1.2"
                      style={{ width: '100%', height: '100%', backgroundColor: '#f8fafc' }}
                    />
                  ) : (
                    <Image
                      src={activeImage || product.images?.[0]}
                      alt={product.name}
                      className="w-full h-full object-contain"
                      preview={{ src: activeImage || product.images?.[0] }}
                    />
                  )}
                  {product.modelSrc && (
                    <div className="absolute top-3 right-3 bg-indigo-600 text-white text-[11px] font-semibold px-2 py-1 rounded-full shadow-sm">
                      3D Interactive
                    </div>
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
                  {/* Buy Now - Only for Customers */}
                  {showBuyNow && (
                    <Button
                      type="primary"
                      size="large"
                      icon={<ShoppingOutlined />}
                      onClick={handleBuyNow}
                      block
                      style={{ height: 50 }}
                    >
                      Mua hàng
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
                  {!showBuyNow && (
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
