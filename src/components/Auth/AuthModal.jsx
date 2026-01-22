import React, { useState, useEffect } from 'react';
import { Modal } from 'antd';
import { useAuth } from '../../contexts/AuthContext';
import { useAuthModal } from '../../contexts/AuthModalContext';
import { useNavigate } from 'react-router-dom';

const AuthModal = () => {
  const { isOpen, mode: contextMode, closeModal } = useAuthModal();
  const [mode, setMode] = useState('login'); // 'login' or 'register'
  
  // Sync with context
  useEffect(() => {
    if (contextMode) {
      setMode(contextMode);
    }
  }, [contextMode]);
  const [loginForm, setLoginForm] = useState({ username: '', password: '' });
  const [registerForm, setRegisterForm] = useState({
    username: '',
    fullName: '',
    email: '',
    phoneNumber: '',
    password: '',
    confirmPassword: '',
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const { login, register } = useAuth();
  const navigate = useNavigate();

  const handleLoginChange = (e) => {
    setLoginForm({ ...loginForm, [e.target.name]: e.target.value });
    setError('');
  };

  const handleRegisterChange = (e) => {
    setRegisterForm({ ...registerForm, [e.target.name]: e.target.value });
    setError('');
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    // Tạm thời tắt API call vì API đang bị lỗi
    // TODO: Bật lại khi API đã sửa xong
    setTimeout(() => {
      setLoading(false);
      
      // ✅ Detect role từ username/email để test
      const username = loginForm.username.toLowerCase();
      let role = 'Customer'; // Default
      let fullName = 'Khách hàng Test';
      
      if (username.includes('manager')) {
        role = 'Manager';
        fullName = 'Quản lý Test';
      } else if (username.includes('admin')) {
        role = 'Admin';
        fullName = 'Admin Test';
      } else if (username.includes('employee') || username.includes('staff')) {
        role = 'Employee';
        fullName = 'Nhân viên Test';
      }
      
      // ✅ Mock user data để test UI
      const mockUser = {
        id: 1,
        username: loginForm.username,
        fullName: fullName,
        image: null,
        role: role
      };
      
      // ✅ Lưu vào localStorage để AuthContext đọc lại khi reload
      localStorage.setItem('user', JSON.stringify(mockUser));
      localStorage.setItem('token', 'mock-token-123');
      
      // Giả lập đăng nhập thành công
      alert(`Đăng nhập thành công với role: ${role}! (API đã tắt tạm thời)`);
      handleClose();
      
      // ✅ Redirect dựa vào role
      let redirectPath = '/';
      switch(role.toLowerCase()) {
        case 'manager':
          redirectPath = '/manager/dashboard';
          break;
        case 'admin':
          redirectPath = '/admin/dashboard';
          break;
        case 'employee':
        case 'staff':
          redirectPath = '/staff/dashboard';
          break;
        default:
          redirectPath = '/';
      }
      
      window.location.href = redirectPath;
    }, 1000);

    /* API call đã tắt
    try {
      const result = await login(loginForm.username, loginForm.password);
      if (result.success) {
        handleClose();
        navigate('/');
      } else {
        setError(result.message || 'Đăng nhập thất bại');
      }
    } catch (err) {
      setError('Đã xảy ra lỗi. Vui lòng thử lại.');
    } finally {
      setLoading(false);
    }
    */
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setError('');

    if (registerForm.password !== registerForm.confirmPassword) {
      setError('Mật khẩu xác nhận không khớp');
      return;
    }

    if (registerForm.password.length < 6) {
      setError('Mật khẩu phải có ít nhất 6 ký tự');
      return;
    }

    setLoading(true);

    // Tạm thời tắt API call vì API đang bị lỗi
    // TODO: Bật lại khi API đã sửa xong
    setTimeout(() => {
      setLoading(false);
      
      // ✅ Mock user data sau khi đăng ký thành công
      const mockUser = {
        id: Math.floor(Math.random() * 1000),
        username: registerForm.username,
        fullName: registerForm.fullName,
        image: null,
        role: 'Customer'
      };
      
      // ✅ Lưu vào localStorage để AuthContext đọc lại khi reload
      localStorage.setItem('user', JSON.stringify(mockUser));
      localStorage.setItem('token', 'mock-token-' + Date.now());
      
      // Giả lập đăng ký thành công
      alert('Đăng ký thành công! (API đã tắt tạm thời)');
      handleClose();
      
      // ✅ Reload page để AuthContext đọc lại localStorage và tự động đăng nhập
      window.location.href = '/';
    }, 1000);

    /* API call đã tắt
    try {
      const result = await register({
        username: registerForm.username,
        password: registerForm.password,
        fullName: registerForm.fullName,
        email: registerForm.email,
        phoneNumber: registerForm.phoneNumber,
      });

      if (result.success) {
        // Chuyển sang chế độ đăng nhập sau khi đăng ký thành công
        setMode('login');
        setRegisterForm({
          username: '',
          fullName: '',
          email: '',
          phoneNumber: '',
          password: '',
          confirmPassword: '',
        });
        setError('');
        // Có thể tự động điền username vào form đăng nhập
        setLoginForm({ username: registerForm.username, password: '' });
      } else {
        setError(result.message || 'Đăng ký thất bại');
      }
    } catch (err) {
      setError('Đã xảy ra lỗi. Vui lòng thử lại.');
    } finally {
      setLoading(false);
    }
    */
  };

  const handleClose = () => {
    setError('');
    setMode('login');
    setLoginForm({ username: '', password: '' });
    setRegisterForm({
      username: '',
      fullName: '',
      email: '',
      phoneNumber: '',
      password: '',
      confirmPassword: '',
    });
    closeModal();
  };

  return (
    <Modal
      open={isOpen}
      onCancel={handleClose}
      footer={null}
      width={500}
      centered
      className="auth-modal"
    >
      <div className="p-6">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-800 m-0">
            {mode === 'login' ? 'ĐĂNG NHẬP HOẶC TẠO TÀI KHOẢN' : 'ĐĂNG KÝ TÀI KHOẢN'}
          </h2>
        </div>

        {/* Login Form */}
        {mode === 'login' && (
          <form onSubmit={handleLogin}>
            <div className="mb-4">
              <a
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  setMode('register');
                  setError('');
                }}
                className="text-sm text-indigo-600 hover:underline"
              >
                Đăng ký bằng số điện thoại
              </a>
            </div>

            <div className="mb-4">
              <label className="block mb-2 text-sm font-medium text-gray-700">Email</label>
              <input
                type="text"
                name="username"
                value={loginForm.username}
                onChange={handleLoginChange}
                required
                placeholder="Nhập email hoặc tên đăng nhập"
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>

            <div className="mb-4">
              <div className="flex justify-between items-center mb-2">
                <label className="block text-sm font-medium text-gray-700">Mật khẩu</label>
                <a href="/forgot-password" className="text-sm text-indigo-600 hover:underline">
                  Quên mật khẩu email?
                </a>
              </div>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  name="password"
                  value={loginForm.password}
                  onChange={handleLoginChange}
                  required
                  placeholder="Nhập mật khẩu"
                  className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 pr-10"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
                >
                  {showPassword ? '👁️' : '👁️‍🗨️'}
                </button>
              </div>
            </div>

            {error && (
              <div className="mb-4 p-3 bg-red-50 border border-red-200 text-red-700 rounded-lg text-sm">
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 bg-red-600 text-white rounded-lg font-semibold hover:bg-red-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed mb-4"
            >
              {loading ? 'Đang đăng nhập...' : 'ĐĂNG NHẬP'}
            </button>

            <div className="text-center mb-4">
              <span className="text-sm text-gray-500">hoặc đăng nhập bằng</span>
            </div>

            <div className="flex gap-3 mb-4">
              <button
                type="button"
                className="flex-1 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors flex items-center justify-center gap-2"
              >
                <span className="text-blue-600 font-bold">G+</span>
                <span>Google</span>
              </button>
              <button
                type="button"
                className="flex-1 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors flex items-center justify-center gap-2"
              >
                <span className="text-blue-600 font-bold">f</span>
                <span>Facebook</span>
              </button>
            </div>

            <div className="text-center">
              <span className="text-sm text-gray-600">Bạn chưa có tài khoản? </span>
              <a
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  setMode('register');
                  setError('');
                }}
                className="text-sm text-indigo-600 font-medium hover:underline"
              >
                Đăng ký ngay!
              </a>
            </div>
          </form>
        )}

        {/* Register Form */}
        {mode === 'register' && (
          <form onSubmit={handleRegister}>
            <div className="mb-4">
              <a
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  setMode('login');
                  setError('');
                }}
                className="text-sm text-indigo-600 hover:underline"
              >
                Đăng ký bằng số điện thoại
              </a>
            </div>

            <div className="mb-4">
              <label className="block mb-2 text-sm font-medium text-gray-700">Email</label>
              <input
                type="email"
                name="email"
                value={registerForm.email}
                onChange={handleRegisterChange}
                required
                placeholder="Nhập email"
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>

            <div className="grid grid-cols-2 gap-3 mb-4">
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-700">Họ</label>
                <input
                  type="text"
                  name="fullName"
                  value={registerForm.fullName}
                  onChange={handleRegisterChange}
                  required
                  placeholder="Nhập họ"
                  className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-700">Tên</label>
                <input
                  type="text"
                  name="username"
                  value={registerForm.username}
                  onChange={handleRegisterChange}
                  required
                  placeholder="Nhập tên"
                  className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>
            </div>

            <div className="mb-4">
              <label className="block mb-2 text-sm font-medium text-gray-700">Mật khẩu</label>
              <input
                type="password"
                name="password"
                value={registerForm.password}
                onChange={handleRegisterChange}
                required
                placeholder="Nhập mật khẩu"
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>

            {error && (
              <div className="mb-4 p-3 bg-red-50 border border-red-200 text-red-700 rounded-lg text-sm">
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 bg-red-600 text-white rounded-lg font-semibold hover:bg-red-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed mb-4"
            >
              {loading ? 'Đang đăng ký...' : 'TẠO TÀI KHOẢN'}
            </button>

            <div className="flex gap-3 mb-4">
              <button
                type="button"
                className="flex-1 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors flex items-center justify-center gap-2"
              >
                <span className="text-blue-600 font-bold">G+</span>
                <span>Google</span>
              </button>
              <button
                type="button"
                className="flex-1 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors flex items-center justify-center gap-2"
              >
                <span className="text-blue-600 font-bold">f</span>
                <span>Facebook</span>
              </button>
            </div>

            <div className="text-center">
              <span className="text-sm text-gray-600">Bạn đã có tài khoản? </span>
              <a
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  setMode('login');
                  setError('');
                }}
                className="text-sm text-indigo-600 font-medium hover:underline"
              >
                Đăng nhập!
              </a>
            </div>
          </form>
        )}
      </div>
    </Modal>
  );
};

export default AuthModal;

