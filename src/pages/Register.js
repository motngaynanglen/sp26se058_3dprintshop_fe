import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const Register = () => {
  const [formData, setFormData] = useState({
    username: '',
    fullName: '',
    email: '',
    phoneNumber: '',
    password: '',
    confirmPassword: '',
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { register } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (formData.password !== formData.confirmPassword) {
      setError('Mật khẩu xác nhận không khớp');
      return;
    }

    if (formData.password.length < 6) {
      setError('Mật khẩu phải có ít nhất 6 ký tự');
      return;
    }

    setLoading(true);

    try {
      const result = await register({
        username: formData.username,
        password: formData.password,
        fullName: formData.fullName,
        email: formData.email,
        phoneNumber: formData.phoneNumber,
      });

      if (result.success) {
        // Sau khi đăng ký thành công chuyển sang trang đăng nhập
        navigate('/login');
      } else {
        setError(result.message || 'Đăng ký thất bại');
      }
    } catch (err) {
      setError('Đã xảy ra lỗi. Vui lòng thử lại.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[calc(100vh-200px)] flex justify-center items-center p-8 bg-gradient-to-br from-gray-100 to-gray-300">
      <div className="bg-white p-10 rounded-lg shadow-xl w-full max-w-md">
        <h2 className="m-0 mb-6 text-gray-800 text-center text-2xl font-bold">Đăng ký</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-6">
            <label className="block mb-2 text-gray-800 font-medium">Tên đăng nhập</label>
            <input
              type="text"
              name="username"
              value={formData.username}
              onChange={handleChange}
              required
              placeholder="Nhập tên đăng nhập"
              className="w-full p-3 border border-gray-300 rounded text-base transition-colors focus:outline-none focus:border-indigo-600 box-border"
            />
          </div>

          <div className="mb-6">
            <label className="block mb-2 text-gray-800 font-medium">Họ và tên</label>
            <input
              type="text"
              name="fullName"
              value={formData.fullName}
              onChange={handleChange}
              required
              placeholder="Nhập họ và tên"
              className="w-full p-3 border border-gray-300 rounded text-base transition-colors focus:outline-none focus:border-indigo-600 box-border"
            />
          </div>

          <div className="mb-6">
            <label className="block mb-2 text-gray-800 font-medium">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              placeholder="Nhập email"
              className="w-full p-3 border border-gray-300 rounded text-base transition-colors focus:outline-none focus:border-indigo-600 box-border"
            />
          </div>

          <div className="mb-6">
            <label className="block mb-2 text-gray-800 font-medium">Số điện thoại</label>
            <input
              type="tel"
              name="phoneNumber"
              value={formData.phoneNumber}
              onChange={handleChange}
              required
              placeholder="Nhập số điện thoại"
              className="w-full p-3 border border-gray-300 rounded text-base transition-colors focus:outline-none focus:border-indigo-600 box-border"
            />
          </div>

          <div className="mb-6">
            <label className="block mb-2 text-gray-800 font-medium">Mật khẩu</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
              placeholder="Nhập mật khẩu"
              className="w-full p-3 border border-gray-300 rounded text-base transition-colors focus:outline-none focus:border-indigo-600 box-border"
            />
          </div>

          <div className="mb-6">
            <label className="block mb-2 text-gray-800 font-medium">Xác nhận mật khẩu</label>
            <input
              type="password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              required
              placeholder="Nhập lại mật khẩu"
              className="w-full p-3 border border-gray-300 rounded text-base transition-colors focus:outline-none focus:border-indigo-600 box-border"
            />
          </div>

          {error && <div className="bg-red-100 text-red-700 p-3 rounded mb-4 text-center">{error}</div>}

          <button
            type="submit"
            className="w-full p-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white border-none rounded text-base font-semibold cursor-pointer transition-all hover:-translate-y-0.5 hover:shadow-lg disabled:opacity-60 disabled:cursor-not-allowed"
            disabled={loading}
          >
            {loading ? 'Đang đăng ký...' : 'Đăng ký'}
          </button>
        </form>

        <p className="mt-6 text-center text-gray-600">
          Đã có tài khoản?{' '}
          <Link to="/login" className="text-indigo-600 no-underline font-medium hover:underline">
            Đăng nhập
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Register;

