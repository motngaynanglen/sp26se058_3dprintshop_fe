import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import img1 from '../components/imgs/1.png';
import img2 from '../components/imgs/2.png';

const CustomOrderAIGenerate = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    images: [],
    prompt: ''
  });
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);

  const handleImageChange = (e) => {
    setFormData({
      ...formData,
      images: Array.from(e.target.files)
    });
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleGenerate = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    // TODO: Call Hunyuan 3D AI API
    setTimeout(() => {
      setResult({
        modelUrl: '/mock-model.stl',
        preview: 'Generated 3D model preview'
      });
      setLoading(false);
    }, 2000);
  };

  const handleUseResult = () => {
    // TODO: Save result and proceed
    navigate('/my-custom-orders');
  };

  return (
    <div className="max-w-4xl mx-auto px-8 py-8">
      <h1 className="text-3xl font-bold mb-8 text-gray-800">AI Tạo Mẫu 3D</h1>

      {!result ? (
        <form onSubmit={handleGenerate} className="bg-white rounded-lg shadow-md p-8">
          <div className="mb-6">
            <label className="block mb-2 font-medium text-gray-800">Đăng tải Hình ảnh</label>
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-indigo-600 transition-colors">
              <input
                type="file"
                accept="image/*"
                multiple
                onChange={handleImageChange}
                required
                className="hidden"
                id="ai-image-upload"
              />
              <label htmlFor="ai-image-upload" className="cursor-pointer">
                <div className="text-4xl mb-4">🤖</div>
                <p className="text-gray-600">
                  {formData.images.length > 0 
                    ? `Đã chọn ${formData.images.length} ảnh`
                    : 'Nhấn để tải lên ảnh cho AI xử lý'}
                </p>
                <p className="text-sm text-gray-500 mt-2">Tải lên một hoặc nhiều ảnh tham khảo</p>
              </label>
            </div>
            {formData.images.length > 0 && (
              <div className="mt-4 grid grid-cols-4 gap-4">
                {formData.images.map((img, idx) => (
                  <div key={idx} className="bg-gray-200 h-24 rounded overflow-hidden">
                    <img 
                      src={idx % 2 === 0 ? img1 : img2} 
                      alt={img.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="mb-6">
            <label className="block mb-2 font-medium text-gray-800">Mô tả thêm (Tùy chọn)</label>
            <textarea
              name="prompt"
              value={formData.prompt}
              onChange={handleChange}
              rows="4"
              className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:border-indigo-600"
              placeholder="Thêm hướng dẫn hoặc yêu cầu cụ thể cho việc tạo mẫu AI..."
            />
          </div>

          <div className="bg-purple-50 border border-purple-200 rounded-lg p-4 mb-6">
            <p className="text-sm text-purple-800">
              <strong>Quy trình AI:</strong> AI sẽ phân tích hình ảnh của bạn và tạo ra một mô hình 3D nguyên mẫu. 
              Đây là bản xem trước nhanh - bạn có thể yêu cầu chỉnh sửa hoặc tiến hành đặt in với mẫu này.
            </p>
          </div>

          <div className="flex gap-4">
            <button
              type="submit"
              disabled={loading}
              className="flex-1 py-3 bg-indigo-600 text-white rounded-lg font-semibold hover:bg-indigo-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? 'Đang tạo...' : 'Tạo Mô hình 3D'}
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
      ) : (
        <div className="bg-white rounded-lg shadow-md p-8">
          <h2 className="text-2xl font-bold mb-6 text-gray-800">Mô hình 3D đã tạo</h2>
          
          <div className="bg-gray-200 h-96 rounded-lg mb-6 overflow-hidden">
            <img 
              src={img1} 
              alt="Generated 3D Model Preview"
              className="w-full h-full object-cover"
            />
          </div>

          <div className="flex gap-4">
            <button
              onClick={handleUseResult}
              className="flex-1 py-3 bg-indigo-600 text-white rounded-lg font-semibold hover:bg-indigo-700 transition-colors"
            >
              Sử dụng mẫu này
            </button>
            <button
              onClick={() => setResult(null)}
              className="px-6 py-3 bg-gray-200 text-gray-800 rounded-lg font-semibold hover:bg-gray-300 transition-colors"
            >
              Tạo lại
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default CustomOrderAIGenerate;

