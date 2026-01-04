import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const Register = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: ''
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { register } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    if (formData.password.length < 6) {
      setError('Password must be at least 6 characters');
      return;
    }

    setLoading(true);

    try {
      const result = await register({
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        password: formData.password
      });

      if (result.success) {
        navigate('/');
      } else {
        setError(result.message || 'Registration failed');
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
        <h2 className="m-0 mb-6 text-gray-800 text-center text-2xl font-bold">Register</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-6">
            <label className="block mb-2 text-gray-800 font-medium">Full Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              placeholder="Enter your name"
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
              placeholder="Enter your email"
              className="w-full p-3 border border-gray-300 rounded text-base transition-colors focus:outline-none focus:border-indigo-600 box-border"
            />
          </div>

          <div className="mb-6">
            <label className="block mb-2 text-gray-800 font-medium">Phone Number</label>
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              required
              placeholder="Enter your phone number"
              className="w-full p-3 border border-gray-300 rounded text-base transition-colors focus:outline-none focus:border-indigo-600 box-border"
            />
          </div>

          <div className="mb-6">
            <label className="block mb-2 text-gray-800 font-medium">Password</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
              placeholder="Enter password"
              className="w-full p-3 border border-gray-300 rounded text-base transition-colors focus:outline-none focus:border-indigo-600 box-border"
            />
          </div>

          <div className="mb-6">
            <label className="block mb-2 text-gray-800 font-medium">Confirm Password</label>
            <input
              type="password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              required
              placeholder="Confirm password"
              className="w-full p-3 border border-gray-300 rounded text-base transition-colors focus:outline-none focus:border-indigo-600 box-border"
            />
          </div>

          {error && <div className="bg-red-100 text-red-700 p-3 rounded mb-4 text-center">{error}</div>}

          <button 
            type="submit" 
            className="w-full p-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white border-none rounded text-base font-semibold cursor-pointer transition-all hover:-translate-y-0.5 hover:shadow-lg disabled:opacity-60 disabled:cursor-not-allowed"
            disabled={loading}
          >
            {loading ? 'Registering...' : 'Register'}
          </button>
        </form>

        <p className="mt-6 text-center text-gray-600">
          Already have an account? <Link to="/login" className="text-indigo-600 no-underline font-medium hover:underline">Login here</Link>
        </p>
      </div>
    </div>
  );
};

export default Register;

