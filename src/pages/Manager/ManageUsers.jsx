import React, { useState } from 'react';

const ManageUsers = () => {
  const [users, setUsers] = useState([
    { id: 1, name: 'John Doe', email: 'john@example.com', role: 'customer', registered: '2024-01-01' },
    { id: 2, name: 'Jane Smith', email: 'jane@example.com', role: 'customer', registered: '2024-01-05' },
    { id: 3, name: 'Bob Admin', email: 'bob@example.com', role: 'admin', registered: '2023-12-01' }
  ]);
  const [filter, setFilter] = useState('all');

  const filteredUsers = filter === 'all' 
    ? users 
    : users.filter(user => user.role === filter);

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-800">Quản lý người dùng</h1>
        <div className="flex gap-2">
          <button
            onClick={() => setFilter('all')}
            className={`px-4 py-2 rounded-lg font-medium transition-colors ${
              filter === 'all' ? 'bg-indigo-600 text-white' : 'bg-gray-200 text-gray-800 hover:bg-gray-300'
            }`}
          >
            Tất cả
          </button>
          <button
            onClick={() => setFilter('customer')}
            className={`px-4 py-2 rounded-lg font-medium transition-colors ${
              filter === 'customer' ? 'bg-indigo-600 text-white' : 'bg-gray-200 text-gray-800 hover:bg-gray-300'
            }`}
          >
            Khách hàng
          </button>
          <button
            onClick={() => setFilter('employee')}
            className={`px-4 py-2 rounded-lg font-medium transition-colors ${
              filter === 'employee' ? 'bg-indigo-600 text-white' : 'bg-gray-200 text-gray-800 hover:bg-gray-300'
            }`}
          >
            Nhân viên
          </button>
          <button
            onClick={() => setFilter('admin')}
            className={`px-4 py-2 rounded-lg font-medium transition-colors ${
              filter === 'admin' ? 'bg-indigo-600 text-white' : 'bg-gray-200 text-gray-800 hover:bg-gray-300'
            }`}
          >
            Quản trị viên
          </button>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-4 text-left text-sm font-semibold text-gray-800">Tên</th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-gray-800">Email</th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-gray-800">Vai trò</th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-gray-800">Ngày đăng ký</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {filteredUsers.map(user => (
              <tr key={user.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 text-sm font-medium text-gray-800">{user.name}</td>
                <td className="px-6 py-4 text-sm text-gray-600">{user.email}</td>
                <td className="px-6 py-4">
                  <span className="px-3 py-1 rounded-full text-xs font-medium bg-indigo-100 text-indigo-800 capitalize">
                    {user.role}
                  </span>
                </td>
                <td className="px-6 py-4 text-sm text-gray-600">{user.registered}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      </div>
    </div>
  );
};

export default ManageUsers;

