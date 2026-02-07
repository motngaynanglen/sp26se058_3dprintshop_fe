import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const CustomOrderUpload = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    file: null,
    material: 'PLA',
    quantity: 1,
    serviceType: 'print_only',
    description: ''
  });

  const handleChange = (e) => {
    if (e.target.name === 'file') {
      setFormData({ ...formData, file: e.target.files[0] });
    } else {
      setFormData({ ...formData, [e.target.name]: e.target.value });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // TODO: Submit custom order
    alert('Đơn hàng custom đã được gửi!');
    navigate('/my-custom-orders');
  };

  return (
    <div className="max-w-4xl mx-auto px-8 py-8">
      <h1 className="text-3xl font-bold mb-8 text-gray-800">Đăng tải File 3D</h1>

      <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-md p-8">
        <div className="mb-6">
          <label className="block mb-2 font-medium text-gray-800">File 3D (STL/OBJ)</label>
          <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-indigo-600 transition-colors">
            <input
              type="file"
              name="file"
              accept=".stl,.obj"
              onChange={handleChange}
              required
              className="hidden"
              id="file-upload"
            />
            <label htmlFor="file-upload" className="cursor-pointer">
              <div className="text-4xl mb-4">📁</div>
              <p className="text-gray-600">
                {formData.file ? formData.file.name : 'Nhấn để tải lên hoặc kéo thả file vào đây'}
              </p>
              <p className="text-sm text-gray-500 mt-2">Chỉ hỗ trợ file STL, OBJ</p>
            </label>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <div>
            <label className="block mb-2 font-medium text-gray-800">Vật liệu</label>
            <select
              name="material"
              value={formData.material}
              onChange={handleChange}
              required
              className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:border-indigo-600"
            >
              <option value="PLA">PLA</option>
              <option value="TPU">TPU</option>
              <option value="Wood PLA">Wood PLA</option>
              <option value="Resin">Resin</option>
            </select>
          </div>

          <div>
            <label className="block mb-2 font-medium text-gray-800">Số lượng</label>
            <input
              type="number"
              name="quantity"
              value={formData.quantity}
              onChange={handleChange}
              min="1"
              required
              className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:border-indigo-600"
            />
          </div>
        </div>

        <div className="mb-6">
          <label className="block mb-2 font-medium text-gray-800">Loại dịch vụ</label>
          <div className="space-y-3">
            <label className="flex items-center gap-3 cursor-pointer">
              <input
                type="radio"
                name="serviceType"
                value="print_only"
                checked={formData.serviceType === 'print_only'}
                onChange={handleChange}
                className="w-5 h-5"
              />
              <div>
                <span className="font-medium">Chỉ in 3D</span>
                <p className="text-sm text-gray-600">Dịch vụ in 3D cơ bản</p>
              </div>
            </label>
            <label className="flex items-center gap-3 cursor-pointer">
              <input
                type="radio"
                name="serviceType"
                value="print_paint"
                checked={formData.serviceType === 'print_paint'}
                onChange={handleChange}
                className="w-5 h-5"
              />
              <div>
                <span className="font-medium">In & Sơn màu</span>
                <p className="text-sm text-gray-600">Dịch vụ in 3D kèm hoàn thiện bề mặt và sơn màu</p>
              </div>
            </label>
          </div>
        </div>

        <div className="mb-6">
          <label className="block mb-2 font-medium text-gray-800">Mô tả thêm</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            rows="4"
            className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:border-indigo-600"
            placeholder="Ghi chú thêm về yêu cầu của bạn (nếu có)..."
          />
        </div>

        <div className="flex gap-4">
          <button
            type="submit"
            className="flex-1 py-3 bg-indigo-600 text-white rounded-lg font-semibold hover:bg-indigo-700 transition-colors"
          >
            Gửi đơn hàng
          </button>
          <button
            type="button"
            onClick={() => navigate('/custom-order')}
            className="px-6 py-3 bg-gray-200 text-gray-800 rounded-lg font-semibold hover:bg-gray-300 transition-colors"
          >
            Hủy bỏ
          </button>
        </div>
      </form>
    </div>
  );
};

export default CustomOrderUpload;

