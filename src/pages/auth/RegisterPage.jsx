import React from "react";
import { Link, useNavigate } from "react-router-dom";
import RegisterForm from "../../components/Auth/RegisterForm"; // Import phần lõi Đăng ký

const RegisterPage = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-[calc(100vh-200px)] flex justify-center items-center p-8 bg-gradient-to-br from-gray-100 to-gray-300">
      <div className="bg-white p-10 rounded-lg shadow-xl w-full max-w-md border border-gray-100">
        <h2 className="m-0 mb-6 text-gray-800 text-center text-3xl font-extrabold uppercase tracking-tight">
          Tạo tài khoản
        </h2>

        {/* 1. Gọi Component Form Lõi ra đây */}
        {/* Truyền lệnh chuyển trang vào onSuccess: Đăng ký xong tự động bay về trang Login */}
        <RegisterForm onSuccess={() => navigate('/login')} />

        {/* 2. Phần đuôi (Footer) */}
        <div className="relative my-8">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-200"></div>
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="px-2 bg-white text-gray-500 font-medium">Hoặc</span>
          </div>
        </div>

        <p className="mt-6 text-center text-gray-600 text-sm">
          Đã có tài khoản?{" "}
          <Link
            to="/login"
            className="text-indigo-600 no-underline font-bold hover:underline"
          >
            Đăng nhập ngay
          </Link>
        </p>
      </div>
    </div>
  );
};

export default RegisterPage;