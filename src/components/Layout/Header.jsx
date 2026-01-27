import React, { useMemo, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Badge, Button, Grid, Input, Layout, Menu, Space, Typography } from 'antd';
import { ShoppingCartOutlined, SearchOutlined, UserOutlined } from '@ant-design/icons';
import { useAuth } from '../../contexts/AuthContext';
import { useAuthModal } from '../../contexts/AuthModalContext';

const Header = () => {
  const { user, logout, isAuthenticated } = useAuth();
  const { openModal } = useAuthModal();
  const navigate = useNavigate();
  const location = useLocation();
  const screens = Grid.useBreakpoint();
  const [q, setQ] = useState('');

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const selectedKey = useMemo(() => {
    if (location.pathname.startsWith('/products')) return 'products';
    if (location.pathname.startsWith('/custom-order')) return 'custom';
    if (location.pathname.startsWith('/my-orders')) return 'orders';
    if (location.pathname.startsWith('/staff')) return 'staff';
    if (location.pathname.startsWith('/admin')) return 'admin';
    return 'home';
  }, [location.pathname]);

  const onSearch = (value) => {
    const term = (value ?? '').trim();
    setQ(term);
    navigate(`/products${term ? `?q=${encodeURIComponent(term)}` : ''}`);
  };

  return (
    <Layout.Header style={{ padding: 0, height: 'auto', lineHeight: 'normal' }}>
      {/* Top info bar */}
      <div className="bg-slate-900 text-slate-100">
        <div className="max-w-7xl mx-auto px-4 lg:px-6 py-2 flex flex-col sm:flex-row gap-2 sm:gap-0 sm:items-center justify-between">
          <Space size={10} wrap>
            <Typography.Text style={{ color: '#fff', fontWeight: 700 }}>
              3D Print Shop
            </Typography.Text>
            <Typography.Text style={{ color: 'rgba(255,255,255,0.65)' }} className="hidden md:inline">
              Biến ý tưởng của bạn thành sản phẩm 3D thực tế
            </Typography.Text>
          </Space>
          <Space size={16} wrap>
            <Typography.Text style={{ color: 'rgba(255,255,255,0.7)' }}>
              Email: contact@3dprintshop.com
            </Typography.Text>
            <Typography.Text style={{ color: '#fbbf24', fontWeight: 700 }}>
              Hotline: 1900 1234
            </Typography.Text>
          </Space>
        </div>
      </div>

      {/* Main bar */}
      <div className="bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 lg:px-6 py-3 flex flex-col md:flex-row md:items-center gap-3">
          <Link to="/" className="no-underline">
            <Space size={10} align="center">
              <div className="h-9 w-9 rounded-lg bg-indigo-600 flex items-center justify-center text-white font-black text-lg">
                3D
              </div>
              <div className="leading-tight">
                <div className="font-bold text-slate-900 text-lg">3D Print Shop</div>
                <div className="text-xs text-slate-500 uppercase tracking-wide">Custom 3D Printing</div>
              </div>
            </Space>
          </Link>

          <div className="flex-1 md:px-6">
            <Input.Search
              value={q}
              onChange={(e) => setQ(e.target.value)}
              onSearch={onSearch}
              placeholder="Tìm sản phẩm in 3D, vật liệu, phụ kiện..."
              allowClear
              enterButton={
                <Button type="primary" icon={<SearchOutlined />}>
                  {screens.sm ? 'Tìm kiếm' : ''}
                </Button>
              }
              size="large"
            />
          </div>

          <Space size={12} align="center" wrap style={{ justifyContent: 'flex-end' }}>
            <Badge count={0} size="small">
              <Button
                type="default"
                icon={<ShoppingCartOutlined />}
                onClick={() => navigate('/cart')}
              >
                {screens.sm ? 'Giỏ hàng' : ''}
              </Button>
            </Badge>

            {isAuthenticated ? (
              <Space size={10} align="center">
                <Space direction="vertical" size={0} className="hidden md:flex" style={{ alignItems: 'flex-end' }}>
                  <Typography.Text type="secondary" style={{ fontSize: 12 }}>
                    Xin chào,
                  </Typography.Text>
                  <Typography.Text strong style={{ maxWidth: 180 }} ellipsis>
                    {user?.fullName || user?.username}
                  </Typography.Text>
                </Space>
                <Button onClick={handleLogout}>Đăng xuất</Button>
              </Space>
            ) : (
              <Space size={8} align="center">
                <Button icon={<UserOutlined />} onClick={() => openModal('login')}>
                  Đăng nhập
                </Button>
                <Button type="primary" onClick={() => openModal('register')}>
                  Đăng ký
                </Button>
              </Space>
            )}
          </Space>
        </div>
      </div>

    </Layout.Header>
  );
};

export default Header;

