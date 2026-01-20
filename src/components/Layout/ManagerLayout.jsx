import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Layout as AntLayout } from 'antd';
import { useAuth } from '../../contexts/AuthContext';

const { Sider, Content } = AntLayout;

const ManagerLayout = ({ children }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const menuItems = [
    {
      path: '/manager/dashboard',
      label: 'Trang Quản Lý',
      icon: '📊'
    },
    {
      path: '/manager/products',
      label: 'Quản lý sản phẩm',
      icon: '📦'
    },
    {
      path: '/manager/materials',
      label: 'Quản lý vật liệu in',
      icon: '🧱'
    },
    {
      path: '/manager/staff',
      label: 'Quản lý nhân viên',
      icon: '👥'
    },
    {
      path: '/manager/feedback',
      label: 'Phản hồi',
      icon: '💬'
    }
  ];

  return (
    <AntLayout style={{ minHeight: '100vh' }}>
      <Sider
        width={250}
        style={{
          background: '#fff',
          boxShadow: '2px 0 8px rgba(0,0,0,0.1)',
          position: 'fixed',
          left: 0,
          top: 0,
          bottom: 0,
          overflow: 'auto',
          height: '100vh'
        }}
      >
        <div className="p-6 border-b border-gray-200">
          <h1 className="text-xl font-bold text-gray-800">3D Print Shop</h1>
          <p className="text-sm text-gray-600 mt-1">Trang Quản Lý</p>
        </div>
        <nav className="p-4">
          {menuItems.map((item) => {
            const isActive = location.pathname === item.path;
            return (
              <Link
                key={item.path}
                to={item.path}
                className={`flex items-center gap-3 px-4 py-3 mb-2 rounded-lg transition-colors ${
                  isActive
                    ? 'bg-indigo-600 text-white'
                    : 'text-gray-700 hover:bg-gray-100'
                }`}
              >
                <span className="text-xl">{item.icon}</span>
                <span className="font-medium">{item.label}</span>
              </Link>
            );
          })}
        </nav>
        <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-gray-200 bg-white">
          <div className="mb-3 px-4">
            <p className="text-sm font-medium text-gray-800">{user?.fullName || user?.username}</p>
            <p className="text-xs text-gray-600">Manager</p>
          </div>
          <button
            onClick={handleLogout}
            className="w-full px-4 py-2 text-left text-red-600 hover:bg-red-50 rounded-lg transition-colors"
          >
            Đăng xuất
          </button>
        </div>
      </Sider>
      <AntLayout style={{ marginLeft: 250 }}>
        <Content style={{ background: '#f5f5f5', minHeight: '100vh' }}>
          <div className="max-w-6xl mx-auto px-4 lg:px-6 py-6">{children}</div>
        </Content>
      </AntLayout>
    </AntLayout>
  );
};

export default ManagerLayout;

