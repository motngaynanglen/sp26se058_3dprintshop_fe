import React from "react";
import { Link } from "react-router-dom";
import LoginForm from "../components/Auth/LoginForm"; // Import phần lõi vừa tạo

const Login = () => {
  return (
    <div className="min-h-[calc(100vh-200px)] flex justify-center items-center p-8 bg-gradient-to-br from-gray-100 to-gray-300">
      <div className="bg-white p-10 rounded-lg shadow-xl w-full max-w-md border border-gray-100">
        <h2 className="m-0 mb-6 text-gray-800 text-center text-3xl font-extrabold uppercase tracking-tight">
          Đăng nhập
        </h2>

        {/* 1. Gọi Component Form Lõi ra đây */}
        <LoginForm />

        {/* 2. Phần đuôi chuyển sang trang Đăng ký */}
        <div className="relative my-8">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-200"></div>
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="px-2 bg-white text-gray-500 font-medium">Hoặc</span>
          </div>
        </div>

        <p className="mt-6 text-center text-gray-600 text-sm">
          Bạn mới đến 3D Print Shop?{" "}
          <Link
            to="/register"
            className="text-indigo-600 no-underline font-bold hover:underline"
          >
            Đăng ký ngay
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;