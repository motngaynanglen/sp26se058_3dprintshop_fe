import React, { useState, useMemo } from 'react';
import { 
  Table, 
  Input, 
  Select, 
  Button, 
  Modal, 
  Avatar, 
  Rate, 
  Tag, 
  Space, 
  Card, 
  Row, 
  Col, 
  Statistic,
  Empty,
  Tooltip,
  Image
} from 'antd';
import {
  SearchOutlined,
  EyeOutlined,
  MessageOutlined,
  ShoppingOutlined,
  UserOutlined,
  StarFilled,
  TrophyOutlined,
  SmileOutlined,
  RiseOutlined
} from '@ant-design/icons';
import { format, formatDistanceToNow } from 'date-fns';
import { vi } from 'date-fns/locale';

const { Search } = Input;
const { Option } = Select;

const FeedbackList = () => {
  // State management
  const [searchQuery, setSearchQuery] = useState('');
  const [ratingFilter, setRatingFilter] = useState('all');
  const [sortBy, setSortBy] = useState('newest');
  const [selectedFeedback, setSelectedFeedback] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Mock data - Feedback theo sản phẩm/biến thể
  const feedbacks = [
    {
      id: 1,
      customer: {
        name: 'Nguyễn Văn An',
        email: 'nguyenvanan@gmail.com',
        phone: '0123456789',
        avatar: 'https://i.pravatar.cc/150?img=1',
        zaloPhone: '0123456789'
      },
      product: {
        id: 'PROD-001',
        name: 'Mô hình 3D Custom Logo Công ty',
        variant: 'Màu đỏ - Kích thước L (20cm)',
        image: 'https://via.placeholder.com/100',
        price: 500000
      },
      orderId: 'ORD-001',
      rating: 5,
      comment: 'Sản phẩm rất đẹp, chất lượng in tốt, màu sắc chuẩn. Nhân viên tư vấn nhiệt tình. Sẽ ủng hộ shop lâu dài!',
      images: ['https://via.placeholder.com/300'],
      date: '2024-01-20T10:30:00Z'
    },
    {
      id: 2,
      customer: {
        name: 'Trần Thị Bình',
        email: 'tranthib@gmail.com',
        phone: '0987654321',
        avatar: 'https://i.pravatar.cc/150?img=5',
        zaloPhone: '0987654321'
      },
      product: {
        id: 'PROD-002',
        name: 'Phụ kiện điện thoại in 3D',
        variant: 'Màu xanh - Kích thước M',
        image: 'https://via.placeholder.com/100',
        price: 150000
      },
      orderId: 'ORD-002',
      rating: 4,
      comment: 'Sản phẩm tốt, đúng mô tả. Thời gian giao hàng nhanh.',
      images: [],
      date: '2024-01-19T14:20:00Z'
    },
    {
      id: 3,
      customer: {
        name: 'Lê Minh Cường',
        email: 'leminhcuong@gmail.com',
        phone: '0369852147',
        avatar: 'https://i.pravatar.cc/150?img=8',
        zaloPhone: '0369852147'
      },
      product: {
        id: 'PROD-003',
        name: 'Mô hình nhân vật Anime',
        variant: 'Cao 15cm - Màu đa sắc',
        image: 'https://via.placeholder.com/100',
        price: 800000
      },
      orderId: 'ORD-003',
      rating: 3,
      comment: 'Sản phẩm ổn nhưng có một số chi tiết chưa sắc nét lắm.',
      images: [],
      date: '2024-01-18T09:15:00Z'
    },
    {
      id: 4,
      customer: {
        name: 'Phạm Thu Hà',
        email: 'phamthuha@gmail.com',
        phone: '0912345678',
        avatar: 'https://i.pravatar.cc/150?img=9',
        zaloPhone: '0912345678'
      },
      product: {
        id: 'PROD-004',
        name: 'Đồ chơi giáo dục in 3D',
        variant: 'Bộ 5 món - Nhiều màu',
        image: 'https://via.placeholder.com/100',
        price: 350000
      },
      orderId: 'ORD-004',
      rating: 5,
      comment: 'Con rất thích! Chất liệu an toàn, không mùi. Cảm ơn shop!',
      images: ['https://via.placeholder.com/300', 'https://via.placeholder.com/300'],
      date: '2024-01-17T16:45:00Z'
    },
    {
      id: 5,
      customer: {
        name: 'Hoàng Văn Đức',
        email: 'hoangvanduc@gmail.com',
        phone: '0778899001',
        avatar: 'https://i.pravatar.cc/150?img=12',
        zaloPhone: '0778899001'
      },
      product: {
        id: 'PROD-005',
        name: 'Khuôn bánh in 3D',
        variant: 'Hình trái tim - Size S',
        image: 'https://via.placeholder.com/100',
        price: 200000
      },
      orderId: null, // Không có order ID
      rating: 2,
      comment: 'Khuôn hơi mỏng, dễ bị cong khi dùng. Cần cải thiện độ dày.',
      images: [],
      date: '2024-01-16T11:00:00Z'
    }
  ];

  // Filtering and sorting
  const filteredAndSortedFeedbacks = useMemo(() => {
    let result = feedbacks;

    // Search filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      result = result.filter(fb =>
        fb.customer.name.toLowerCase().includes(query) ||
        fb.product.name.toLowerCase().includes(query) ||
        (fb.orderId && fb.orderId.toLowerCase().includes(query))
      );
    }

    // Rating filter
    if (ratingFilter !== 'all') {
      result = result.filter(fb => fb.rating === parseInt(ratingFilter));
    }

    // Sort
    result = [...result].sort((a, b) => {
      switch (sortBy) {
        case 'newest':
          return new Date(b.date) - new Date(a.date);
        case 'oldest':
          return new Date(a.date) - new Date(b.date);
        case 'rating-high':
          return b.rating - a.rating;
        case 'rating-low':
          return a.rating - b.rating;
        default:
          return 0;
      }
    });

    return result;
  }, [feedbacks, searchQuery, ratingFilter, sortBy]);

  // Statistics calculation
  const stats = useMemo(() => {
    const total = feedbacks.length;
    const avgRating = total > 0 
      ? (feedbacks.reduce((sum, fb) => sum + fb.rating, 0) / total).toFixed(1)
      : 0;
    
    const distribution = [5, 4, 3, 2, 1].map(rating => ({
      rating,
      count: feedbacks.filter(fb => fb.rating === rating).length,
      percentage: total > 0 
        ? ((feedbacks.filter(fb => fb.rating === rating).length / total) * 100).toFixed(0)
        : 0
    }));

    const recentCount = feedbacks.filter(fb =>
      new Date(fb.date) > new Date(Date.now() - 7 * 24 * 60 * 60 * 1000)
    ).length;

    const satisfactionRate = total > 0
      ? ((feedbacks.filter(fb => fb.rating >= 4).length / total) * 100).toFixed(0)
      : 0;

    return { total, avgRating, distribution, recentCount, satisfactionRate };
  }, [feedbacks]);

  // Handlers
  const handleViewDetails = (feedback) => {
    setSelectedFeedback(feedback);
    setIsModalOpen(true);
  };

  const handleContactZalo = (phone) => {
    // Open Zalo chat
    window.open(`https://zalo.me/${phone}`, '_blank');
  };

  const handleViewProduct = (productId) => {
    // Navigate to product detail page
    window.location.href = `/products/${productId}`;
  };

  // Table columns
  const columns = [
    {
      title: 'Khách hàng',
      dataIndex: 'customer',
      key: 'customer',
      width: 200,
      render: (customer) => (
        <Space>
          <Avatar src={customer.avatar} icon={<UserOutlined />} />
          <div>
            <div className="font-medium text-gray-900">{customer.name}</div>
            <div className="text-xs text-gray-500">{customer.phone}</div>
          </div>
        </Space>
      ),
    },
    {
      title: 'Sản phẩm',
      dataIndex: 'product',
      key: 'product',
      width: 300,
      render: (product) => (
        <Space>
          <Avatar src={product.image} shape="square" size={50} icon={<ShoppingOutlined />} />
          <div>
            <div className="font-medium text-gray-900">{product.name}</div>
            <div className="text-xs text-gray-500">{product.variant}</div>
            <div className="text-xs text-indigo-600 font-semibold">
              {product.price.toLocaleString('vi-VN')} đ
            </div>
          </div>
        </Space>
      ),
    },
    {
      title: 'Đánh giá',
      dataIndex: 'rating',
      key: 'rating',
      width: 120,
      align: 'center',
      render: (rating) => (
        <div>
          <Rate disabled value={rating} style={{ fontSize: 16 }} />
          <div className="text-sm font-semibold text-gray-700 mt-1">{rating}/5</div>
        </div>
      ),
    },
    {
      title: 'Nội dung',
      dataIndex: 'comment',
      key: 'comment',
      ellipsis: true,
      render: (comment) => (
        <Tooltip title={comment}>
          <div className="text-gray-600">{comment}</div>
        </Tooltip>
      ),
    },
    {
      title: 'Ngày gửi',
      dataIndex: 'date',
      key: 'date',
      width: 150,
      render: (date) => (
        <Tooltip title={format(new Date(date), 'dd/MM/yyyy HH:mm', { locale: vi })}>
          <div className="text-gray-600">
            {formatDistanceToNow(new Date(date), { addSuffix: true, locale: vi })}
          </div>
        </Tooltip>
      ),
    },
    {
      title: 'Hành động',
      key: 'actions',
      width: 180,
      fixed: 'right',
      render: (_, record) => (
        <Space size="small">
          <Tooltip title="Xem chi tiết">
            <Button
              type="text"
              icon={<EyeOutlined />}
              onClick={() => handleViewDetails(record)}
            />
          </Tooltip>
          <Tooltip title="Liên hệ Zalo">
            <Button
              type="text"
              icon={<MessageOutlined />}
              onClick={() => handleContactZalo(record.customer.zaloPhone)}
              style={{ color: '#0068FF' }}
            />
          </Tooltip>
          <Tooltip title="Xem sản phẩm">
            <Button
              type="text"
              icon={<ShoppingOutlined />}
              onClick={() => handleViewProduct(record.product.id)}
            />
          </Tooltip>
        </Space>
      ),
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-gray-900">Phản hồi khách hàng</h1>
          <p className="text-gray-500 mt-1">Quản lý và theo dõi đánh giá sản phẩm từ khách hàng</p>
        </div>

        {/* Statistics Cards */}
        <Row gutter={[16, 16]} className="mb-6">
          <Col xs={24} sm={12} lg={6}>
            <Card>
              <Statistic
                title="Tổng feedback"
                value={stats.total}
                prefix={<MessageOutlined style={{ color: '#6366F1' }} />}
                valueStyle={{ color: '#6366F1' }}
              />
            </Card>
          </Col>
          <Col xs={24} sm={12} lg={6}>
            <Card>
              <Statistic
                title="Đánh giá trung bình"
                value={stats.avgRating}
                suffix="/ 5"
                prefix={<StarFilled style={{ color: '#F59E0B' }} />}
                valueStyle={{ color: '#F59E0B' }}
              />
            </Card>
          </Col>
          <Col xs={24} sm={12} lg={6}>
            <Card>
              <Statistic
                title="Feedback mới (7 ngày)"
                value={stats.recentCount}
                prefix={<RiseOutlined style={{ color: '#10B981' }} />}
                valueStyle={{ color: '#10B981' }}
              />
            </Card>
          </Col>
          <Col xs={24} sm={12} lg={6}>
            <Card>
              <Statistic
                title="Tỷ lệ hài lòng"
                value={stats.satisfactionRate}
                suffix="%"
                prefix={<SmileOutlined style={{ color: '#8B5CF6' }} />}
                valueStyle={{ color: '#8B5CF6' }}
              />
            </Card>
          </Col>
        </Row>

        {/* Rating Distribution */}
        <Card className="mb-6" title="Phân bố đánh giá">
          <div className="space-y-3">
            {stats.distribution.map(({ rating, count, percentage }) => (
              <div key={rating} className="flex items-center gap-3">
                <div className="w-16 text-sm font-medium text-gray-700">
                  {rating} <StarFilled className="text-yellow-400" />
                </div>
                <div className="flex-1">
                  <div className="bg-gray-200 rounded-full h-6 overflow-hidden">
                    <div
                      className="bg-gradient-to-r from-yellow-400 to-orange-500 h-full flex items-center justify-end px-2 transition-all duration-300"
                      style={{ width: `${percentage}%` }}
                    >
                      {percentage > 10 && (
                        <span className="text-xs font-semibold text-white">
                          {percentage}%
                        </span>
                      )}
                    </div>
                  </div>
                </div>
                <div className="w-12 text-sm text-gray-600 text-right">{count}</div>
              </div>
            ))}
          </div>
        </Card>

        {/* Filters */}
        <Card className="mb-6">
          <Space direction="vertical" size="middle" style={{ width: '100%' }}>
            <Search
              placeholder="Tìm kiếm khách hàng, tên sản phẩm..."
              allowClear
              enterButton={<SearchOutlined />}
              size="large"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onSearch={setSearchQuery}
            />
            <Row gutter={16}>
              <Col xs={24} md={12}>
                <Space>
                  <span className="text-gray-700 font-medium">Đánh giá:</span>
                  <Select
                    value={ratingFilter}
                    onChange={setRatingFilter}
                    style={{ width: 200 }}
                  >
                    <Option value="all">Tất cả</Option>
                    <Option value="5">5 ⭐</Option>
                    <Option value="4">4 ⭐</Option>
                    <Option value="3">3 ⭐</Option>
                    <Option value="2">2 ⭐</Option>
                    <Option value="1">1 ⭐</Option>
                  </Select>
                </Space>
              </Col>
              <Col xs={24} md={12}>
                <Space>
                  <span className="text-gray-700 font-medium">Sắp xếp:</span>
                  <Select value={sortBy} onChange={setSortBy} style={{ width: 200 }}>
                    <Option value="newest">Mới nhất</Option>
                    <Option value="oldest">Cũ nhất</Option>
                    <Option value="rating-high">Rating cao nhất</Option>
                    <Option value="rating-low">Rating thấp nhất</Option>
                  </Select>
                </Space>
              </Col>
            </Row>
          </Space>
        </Card>

        {/* Table */}
        <Card>
          <Table
            columns={columns}
            dataSource={filteredAndSortedFeedbacks}
            rowKey="id"
            pagination={{
              pageSize: 10,
              showSizeChanger: true,
              showTotal: (total) => `Tổng ${total} feedback`,
            }}
            locale={{
              emptyText: (
                <Empty
                  description="Không có feedback nào"
                  image={Empty.PRESENTED_IMAGE_SIMPLE}
                />
              ),
            }}
            scroll={{ x: 1200 }}
          />
        </Card>

        {/* Detail Modal */}
        <Modal
          title="Chi tiết phản hồi"
          open={isModalOpen}
          onCancel={() => setIsModalOpen(false)}
          footer={[
            <Button
              key="zalo"
              type="primary"
              icon={<MessageOutlined />}
              onClick={() => handleContactZalo(selectedFeedback?.customer.zaloPhone)}
              style={{ backgroundColor: '#0068FF' }}
            >
              Liên hệ Zalo
            </Button>,
            <Button key="close" onClick={() => setIsModalOpen(false)}>
              Đóng
            </Button>,
          ]}
          width={700}
        >
          {selectedFeedback && (
            <div className="space-y-6">
              {/* Customer Info */}
              <div>
                <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
                  <UserOutlined /> Thông tin khách hàng
                </h3>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <Space direction="vertical" size="small">
                    <div className="flex items-center gap-3">
                      <Avatar src={selectedFeedback.customer.avatar} size={50} />
                      <div>
                        <div className="font-semibold text-gray-900">
                          {selectedFeedback.customer.name}
                        </div>
                        <div className="text-sm text-gray-600">
                          {selectedFeedback.customer.email}
                        </div>
                        <div className="text-sm text-gray-600">
                          📞 {selectedFeedback.customer.phone}
                        </div>
                      </div>
                    </div>
                  </Space>
                </div>
              </div>

              {/* Product Info */}
              <div>
                <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
                  <ShoppingOutlined /> Sản phẩm được đánh giá
                </h3>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <div className="flex gap-4">
                    <Avatar
                      src={selectedFeedback.product.image}
                      shape="square"
                      size={80}
                      icon={<ShoppingOutlined />}
                    />
                    <div className="flex-1">
                      <div className="font-semibold text-gray-900 mb-1">
                        {selectedFeedback.product.name}
                      </div>
                      <div className="text-sm text-gray-600 mb-1">
                        Biến thể: {selectedFeedback.product.variant}
                      </div>
                      <div className="text-lg font-bold text-indigo-600">
                        {selectedFeedback.product.price.toLocaleString('vi-VN')} đ
                      </div>
                      <Button
                        type="link"
                        onClick={() => handleViewProduct(selectedFeedback.product.id)}
                        className="p-0 mt-2"
                      >
                        Xem chi tiết sản phẩm →
                      </Button>
                    </div>
                  </div>
                </div>
              </div>

              {/* Order Info (if exists) */}
              {selectedFeedback.orderId && (
                <div>
                  <h3 className="text-lg font-semibold mb-3">📝 Đơn hàng liên quan</h3>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <div className="text-sm">
                      <span className="text-gray-600">Mã đơn hàng: </span>
                      <span className="font-semibold text-gray-900">
                        {selectedFeedback.orderId}
                      </span>
                    </div>
                    <div className="text-sm mt-1">
                      <span className="text-gray-600">Ngày đặt: </span>
                      <span className="text-gray-900">
                        {format(new Date(selectedFeedback.date), 'dd/MM/yyyy', { locale: vi })}
                      </span>
                    </div>
                  </div>
                </div>
              )}

              {/* Rating & Comment */}
              <div>
                <h3 className="text-lg font-semibold mb-3">⭐ Đánh giá</h3>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <Rate disabled value={selectedFeedback.rating} style={{ fontSize: 24 }} />
                  <div className="text-2xl font-bold text-gray-900 mt-2">
                    {selectedFeedback.rating}/5
                  </div>
                  <div className="mt-4">
                    <div className="text-sm font-semibold text-gray-700 mb-2">
                      💬 Nội dung feedback:
                    </div>
                    <div className="text-gray-900 leading-relaxed">
                      {selectedFeedback.comment}
                    </div>
                  </div>
                  {selectedFeedback.images && selectedFeedback.images.length > 0 && (
                    <div className="mt-4">
                      <div className="text-sm font-semibold text-gray-700 mb-2">
                        📷 Hình ảnh từ khách hàng:
                      </div>
                      <Image.PreviewGroup>
                        <Space>
                          {selectedFeedback.images.map((img, idx) => (
                            <Image
                              key={idx}
                              src={img}
                              width={100}
                              height={100}
                              style={{ objectFit: 'cover', borderRadius: 8 }}
                            />
                          ))}
                        </Space>
                      </Image.PreviewGroup>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}
        </Modal>
      </div>
    </div>
  );
};

export default FeedbackList;
