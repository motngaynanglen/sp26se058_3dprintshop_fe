import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const result = await login(username, password);

      if (result.success) {
        navigate("/");
      } else {
        setError(result.message || "Đăng nhập thất bại");
      }
    } catch (err) {
      setError("Đã xảy ra lỗi. Vui lòng thử lại.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[calc(100vh-200px)] flex justify-center items-center p-8 bg-gradient-to-br from-gray-100 to-gray-300">
      <div className="bg-white p-10 rounded-lg shadow-xl w-full max-w-md">
        <h2 className="m-0 mb-6 text-gray-800 text-center text-2xl font-bold">
          Đăng nhập
        </h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-6">
            <label className="block mb-2 text-gray-800 font-medium">
              Tên đăng nhập
            </label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              placeholder="Nhập tên đăng nhập"
              className="w-full p-3 border border-gray-300 rounded text-base transition-colors focus:outline-none focus:border-indigo-600 box-border"
            />
          </div>

          <div className="mb-6">
            <label className="block mb-2 text-gray-800 font-medium">
              Mật khẩu
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              placeholder="Nhập mật khẩu"
              className="w-full p-3 border border-gray-300 rounded text-base transition-colors focus:outline-none focus:border-indigo-600 box-border"
            />
          </div>

          <div className="flex justify-end items-center mb-6">
            <Link
              to="/forgot-password"
              className="text-indigo-600 no-underline text-sm hover:underline"
            >
              Quên mật khẩu?
            </Link>
          </div>

          {error && (
            <div className="bg-red-100 text-red-700 p-3 rounded mb-4 text-center">
              {error}
            </div>
          )}

          <button
            type="submit"
            className="w-full p-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white border-none rounded text-base font-semibold cursor-pointer transition-all hover:-translate-y-0.5 hover:shadow-lg disabled:opacity-60 disabled:cursor-not-allowed"
            disabled={loading}
          >
            {loading ? "Đang đăng nhập..." : "Đăng nhập"}
          </button>
        </form>

        <p className="mt-6 text-center text-gray-600">
          Chưa có tài khoản?{" "}
          <Link
            to="/register"
            className="text-indigo-600 no-underline font-medium hover:underline"
          >
            Đăng ký ngay
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
