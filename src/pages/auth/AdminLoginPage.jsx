import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { App, Card, Input, Button, Form } from 'antd';
import { LockOutlined, UserOutlined } from '@ant-design/icons';
// Đảm bảo đường dẫn này trỏ đúng vào file AuthContext của bạn
import { useAuth } from '../../contexts/AuthContext';

const AdminLoginPage = () => {
    const { systemLogin } = useAuth(); // Gọi hàm systemLogin chuyên biệt dành cho Admin
    const navigate = useNavigate();
    const { message } = App.useApp(); // Dùng chuẩn Antd v5 để không báo lỗi vàng
    const [loading, setLoading] = useState(false);

    // Hàm này tự động chạy khi người dùng điền đủ thông tin và bấm Submit
    const onFinish = async (values) => {
        setLoading(true);

        // Ant Design tự gom username và password vào object 'values'
        const result = await systemLogin(values.username, values.password);

        if (result.success) {
            message.success('Chào mừng Quản trị viên quay trở lại!');

            // Phân luồng điều hướng dựa trên Role của nhân viên
            const role = result.user?.role?.toLowerCase();
            if (role === 'manager') {
                navigate('/manager/dashboard');
            } else if (['employee', 'staff'].includes(role)) {
                navigate('/staff/dashboard');
            } else {
                navigate('/admin'); // Mặc định cho Admin
            }
        } else {
            message.error(result.message);
        }

        setLoading(false);
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-900 p-4">
            {/* Thẻ Card tạo khối hộp có bóng đổ và viền đỏ nổi bật */}
            <Card className="w-full max-w-md shadow-2xl border-t-4 border-t-red-600 rounded-lg bg-white">

                <div className="text-center mb-8">
                    <h2 className="text-3xl font-black text-gray-800 tracking-wider m-0">
                        SYSTEM PORTAL
                    </h2>
                    <p className="text-gray-500 mt-2 text-sm font-medium">
                        Khu vực đăng nhập dành cho nhân viên
                    </p>
                </div>

                {/* Form của Ant Design tự lo việc quản lý State và Validate */}
                <Form
                    name="admin_login"
                    onFinish={onFinish}
                    layout="vertical"
                    size="large"
                    className="mt-6"
                >
                    <Form.Item
                        name="username"
                        rules={[{ required: true, message: 'Vui lòng nhập tài khoản quản trị!' }]}
                    >
                        <Input
                            prefix={<UserOutlined className="text-gray-400" />}
                            placeholder="Tên đăng nhập"
                            className="h-12"
                        />
                    </Form.Item>

                    <Form.Item
                        name="password"
                        rules={[{ required: true, message: 'Vui lòng nhập mật khẩu!' }]}
                    >
                        <Input.Password
                            prefix={<LockOutlined className="text-gray-400" />}
                            placeholder="Mật khẩu"
                            className="h-12"
                        />
                    </Form.Item>

                    <Form.Item className="mt-8 mb-2">
                        <Button
                            type="primary"
                            htmlType="submit"
                            className="w-full bg-red-600 hover:bg-red-700 border-none font-bold tracking-wide h-12 rounded-md transition-all shadow-md"
                            loading={loading}
                        >
                            {loading ? 'ĐANG XÁC THỰC...' : 'ĐĂNG NHẬP HỆ THỐNG'}
                        </Button>
                    </Form.Item>
                </Form>

            </Card>
        </div>
    );
};

export default AdminLoginPage;