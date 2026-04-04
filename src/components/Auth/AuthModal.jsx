import React, { useState, useEffect } from 'react';
import { Modal } from 'antd';
import { useAuthModal } from '../../contexts/AuthModalContext';

// Import 2 Lõi Component chúng ta vừa tách ra
// (Hãy chỉnh lại đường dẫn './' cho đúng với cấu trúc thư mục của bạn nhé)
import LoginForm from './LoginForm';
import RegisterForm from './RegisterForm';

const AuthModal = () => {
  const { isOpen, mode: contextMode, closeModal } = useAuthModal();
  const [mode, setMode] = useState('login');

  // Lắng nghe sự thay đổi mode từ Context (khi ai đó bấm nút mở Modal ở chỗ khác)
  useEffect(() => {
    if (contextMode) setMode(contextMode);
  }, [contextMode]);

  // Đóng Modal (Không cần dọn dẹp state nữa vì state nằm trong Form con, đóng Modal là form con tự reset)
  const handleClose = () => {
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
      destroyOnClose // Thêm cờ này để React xóa sạch dữ liệu form cũ khi Modal đóng lại
    >
      <div className="p-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center uppercase">
          {mode === 'login' ? 'Đăng nhập' : 'Tạo tài khoản'}
        </h2>

        {mode === 'login' ? (
          <>
            {/* Truyền hàm đóng Modal vào để đăng nhập xong tự biến mất */}
            <LoginForm onSuccess={handleClose} />

            <p className="mt-6 text-center text-sm text-gray-600">
              Chưa có tài khoản?{' '}
              <span
                className="text-indigo-600 font-bold cursor-pointer hover:underline"
                onClick={() => setMode('register')}
              >
                Đăng ký ngay
              </span>
            </p>
          </>
        ) : (
          <>
            {/* Truyền hàm đổi mode để đăng ký xong thì tự nhảy sang form Đăng nhập */}
            <RegisterForm onSuccess={() => setMode('login')} />

            <p className="mt-6 text-center text-sm text-gray-600">
              Đã có tài khoản?{' '}
              <span
                className="text-indigo-600 font-bold cursor-pointer hover:underline"
                onClick={() => setMode('login')}
              >
                Đăng nhập
              </span>
            </p>
          </>
        )}
      </div>
    </Modal>
  );
};

export default AuthModal;