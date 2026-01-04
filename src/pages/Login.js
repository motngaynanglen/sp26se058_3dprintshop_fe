import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const Login = () => {
  const [emailOrPhone, setEmailOrPhone] = useState('');
  const [password, setPassword] = useState('');
  const [useOTP, setUseOTP] = useState(false);
  const [otp, setOtp] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { login, loginWithOTP } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      let result;
      if (useOTP) {
        result = await loginWithOTP(emailOrPhone);
      } else {
        result = await login(emailOrPhone, password);
      }

      if (result.success) {
        navigate('/');
      } else {
        setError(result.message || 'Login failed');
      }
    } catch (err) {
      setError('An error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[calc(100vh-200px)] flex justify-center items-center p-8 bg-gradient-to-br from-gray-100 to-gray-300">
      <div className="bg-white p-10 rounded-lg shadow-xl w-full max-w-md">
        <h2 className="m-0 mb-6 text-gray-800 text-center text-2xl font-bold">Login</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-6">
            <label className="block mb-2 text-gray-800 font-medium">Email or Phone Number</label>
            <input
              type="text"
              value={emailOrPhone}
              onChange={(e) => setEmailOrPhone(e.target.value)}
              required
              placeholder="Enter email or phone"
              className="w-full p-3 border border-gray-300 rounded text-base transition-colors focus:outline-none focus:border-indigo-600 box-border"
            />
          </div>

          {!useOTP && (
            <div className="mb-6">
              <label className="block mb-2 text-gray-800 font-medium">Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                placeholder="Enter password"
                className="w-full p-3 border border-gray-300 rounded text-base transition-colors focus:outline-none focus:border-indigo-600 box-border"
              />
            </div>
          )}

          {useOTP && (
            <div className="mb-6">
              <label className="block mb-2 text-gray-800 font-medium">OTP Code</label>
              <input
                type="text"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                required
                placeholder="Enter OTP"
                className="w-full p-3 border border-gray-300 rounded text-base transition-colors focus:outline-none focus:border-indigo-600 box-border"
              />
            </div>
          )}

          <div className="flex justify-between items-center mb-6">
            <label className="flex items-center gap-2 cursor-pointer font-normal">
              <input
                type="checkbox"
                checked={useOTP}
                onChange={(e) => setUseOTP(e.target.checked)}
                className="w-auto cursor-pointer"
              />
              Login with OTP
            </label>
            {!useOTP && (
              <Link to="/forgot-password" className="text-indigo-600 no-underline text-sm hover:underline">
                Forgot Password?
              </Link>
            )}
          </div>

          {error && <div className="bg-red-100 text-red-700 p-3 rounded mb-4 text-center">{error}</div>}

          <button 
            type="submit" 
            className="w-full p-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white border-none rounded text-base font-semibold cursor-pointer transition-all hover:-translate-y-0.5 hover:shadow-lg disabled:opacity-60 disabled:cursor-not-allowed"
            disabled={loading}
          >
            {loading ? 'Logging in...' : 'Login'}
          </button>
        </form>

        <p className="mt-6 text-center text-gray-600">
          Don't have an account? <Link to="/register" className="text-indigo-600 no-underline font-medium hover:underline">Register here</Link>
        </p>
      </div>
    </div>
  );
};

export default Login;

