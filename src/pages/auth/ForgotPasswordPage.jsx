import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { App, Card, Input, Button, Form } from 'antd';
import { MailOutlined, ArrowLeftOutlined } from '@ant-design/icons';
import { requestForgotPasswordApi } from '../../api/authApi'; 

const ForgotPasswordPage = () => {
  const [loading, setLoading] = useState(false);
  const { message } = App.useApp();
  const navigate = useNavigate();

  const onFinish = async (values) => {
    setLoading(true);
    try {
      // Gọi API với method PATCH
      const result = await requestForgotPasswordApi(values.email);
      
      // Tùy thuộc vào BE của bạn trả về statusCode 200 hay code 'SUCCESS'
      if (result.statusCode === 200 || result.code === 'SUCCESS') {
        message.success('Mã xác nhận đã được gửi! Vui lòng kiểm tra email.');
        
        // Chuyển sang trang Reset và truyền luôn email qua URL để trang sau xài
        navigate(`/reset-password?email=${values.email}`); 
      } else {
        message.error(result.message || 'Không tìm thấy email trong hệ thống.');
      }
    } catch (error) {
      // Bắt lỗi HTTP 400, 404 từ Backend trả về
      message.error(error.response?.data?.message || 'Lỗi kết nối đến máy chủ.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
      <Card className="w-full max-w-md shadow-xl border-0 rounded-2xl">
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-indigo-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <MailOutlined className="text-2xl text-indigo-600" />
          </div>
          <h2 className="text-2xl font-extrabold text-gray-800">Quên mật khẩu?</h2>
          <p className="text-gray-500 mt-2 text-sm">
            Đừng lo lắng! Hãy nhập email bạn đã đăng ký, chúng tôi sẽ gửi mã xác nhận để đặt lại mật khẩu.
          </p>
        </div>

        <Form onFinish={onFinish} layout="vertical" size="large">
          <Form.Item
            name="email"
            rules={[
              { required: true, message: 'Vui lòng nhập email!' },
              { type: 'email', message: 'Email không đúng định dạng!' }
            ]}
          >
            <Input 
              placeholder="Nhập địa chỉ email của bạn" 
              className="h-12 rounded-lg"
            />
          </Form.Item>

          <Button 
            type="primary" 
            htmlType="submit" 
            className="w-full bg-indigo-600 hover:bg-indigo-700 h-12 rounded-lg font-semibold text-base mt-2 transition-all" 
            loading={loading}
          >
            {loading ? 'ĐANG GỬI...' : 'GỬI MÃ XÁC NHẬN'}
          </Button>
        </Form>
        
        <div className="text-center mt-8">
          <Link to="/login" className="text-gray-600 hover:text-indigo-600 font-medium flex items-center justify-center gap-2 transition-colors">
            <ArrowLeftOutlined /> Quay lại trang đăng nhập
          </Link>
        </div>
      </Card>
    </div>
  );
};

export default ForgotPasswordPage;