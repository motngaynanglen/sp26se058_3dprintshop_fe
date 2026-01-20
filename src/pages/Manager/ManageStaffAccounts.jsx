import React, { useState } from 'react';

const ManageStaffAccounts = () => {
  const [staff, setStaff] = useState([
    { id: 1, name: 'John Employee', email: 'john@example.com', role: 'employee', active: true },
    { id: 2, name: 'Jane Staff', email: 'jane@example.com', role: 'employee', active: true }
  ]);
  const [showModal, setShowModal] = useState(false);
  const [editingStaff, setEditingStaff] = useState(null);

  const handleToggle = (id) => {
    setStaff(staff.map(s => s.id === id ? { ...s, active: !s.active } : s));
  };

  const handleDelete = (id) => {
    if (window.confirm('Bạn có chắc chắn muốn xóa tài khoản nhân viên này?')) {
      setStaff(staff.filter(s => s.id !== id));
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-800">Quản lý nhân viên</h1>
        <button
          onClick={() => { setEditingStaff(null); setShowModal(true); }}
          className="py-2 px-6 bg-indigo-600 text-white rounded-lg font-semibold hover:bg-indigo-700 transition-colors"
        >
          + Thêm nhân viên
        </button>
      </div>

      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-4 text-left text-sm font-semibold text-gray-800">Tên</th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-gray-800">Email</th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-gray-800">Vai trò</th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-gray-800">Trạng thái</th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-gray-800">Thao tác</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {staff.map(member => (
              <tr key={member.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 text-sm font-medium text-gray-800">{member.name}</td>
                <td className="px-6 py-4 text-sm text-gray-600">{member.email}</td>
                <td className="px-6 py-4 text-sm text-gray-600 capitalize">{member.role}</td>
                <td className="px-6 py-4">
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                    member.active ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                  }`}>
                    {member.active ? 'Hoạt động' : 'Không hoạt động'}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <div className="flex gap-2">
                    <button
                      onClick={() => { setEditingStaff(member); setShowModal(true); }}
                      className="text-indigo-600 hover:text-indigo-800 font-medium"
                    >
                      Sửa
                    </button>
                    <button
                      onClick={() => handleToggle(member.id)}
                      className="text-yellow-600 hover:text-yellow-800 font-medium"
                    >
                      {member.active ? 'Vô hiệu hóa' : 'Kích hoạt'}
                    </button>
                    <button
                      onClick={() => handleDelete(member.id)}
                      className="text-red-600 hover:text-red-800 font-medium"
                    >
                      Xóa
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      </div>
    </div>
  );
};

export default ManageStaffAccounts;

