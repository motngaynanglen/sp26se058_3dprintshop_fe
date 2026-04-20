import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { message } from 'antd';
import { createDesignRequest } from '../api/mainflow2Api';
import img1 from '../components/imgs/1.png';
import img2 from '../components/imgs/2.png';

const CustomOrderRequestDesign = () => {
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    images: [],
    description: ''
  });

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

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.title || !formData.description) {
      message.warning('Vui lòng nhập đầy đủ tiêu đề và mô tả!');
      return;
    }

    try {
      setIsSubmitting(true);
      // Giả lập upload ảnh lấy URL thật, ở đây truyền url tượng trưng
      const mockImageUrls = formData.images.length > 0 
        ? formData.images.map(img => `https://mock.com/${img.name}`)
        : [];

      const payload = {
        title: formData.title,
        requirementBrief: formData.description,
        initialIdeaImageUrls: mockImageUrls
      };

      const res = await createDesignRequest(payload);
      if (res && res.statusCode === 200) {
        message.success('Yêu cầu thiết kế đã được gửi!');
        navigate('/my-custom-orders');
      } else {
        message.error(res?.message || 'Có lỗi xảy ra khi tạo yêu cầu!');
      }
    } catch (error) {
      console.error(error);
      message.error('Có lỗi xảy ra, vui lòng thử lại sau.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-8 py-8">
      <h1 className="text-3xl font-bold mb-8 text-gray-800">Yêu cầu Dịch vụ Thiết kế</h1>

      <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-md p-8">
        <div className="mb-6">
          <label className="block mb-2 font-medium text-gray-800">Tiêu đề yêu cầu</label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            required
            className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:border-indigo-600"
            placeholder="Ví dụ: Thiết kế nhân vật anh hùng mini..."
          />
        </div>

        <div className="mb-6">
          <label className="block mb-2 font-medium text-gray-800">Hình ảnh tham khảo</label>
          <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-indigo-600 transition-colors">
            <input
              type="file"
              accept="image/*"
              multiple
              onChange={handleImageChange}
              required
              className="hidden"
              id="image-upload"
            />
            <label htmlFor="image-upload" className="cursor-pointer">
              <div className="text-4xl mb-4">🖼️</div>
              <p className="text-gray-600">
                {formData.images.length > 0 
                  ? `Đã chọn ${formData.images.length} ảnh`
                  : 'Nhấn để tải lên hình ảnh tham khảo (có thể chọn nhiều ảnh)'}
              </p>
              <p className="text-sm text-gray-500 mt-2">Đội ngũ kỹ thuật sẽ dựa vào ảnh này để thiết kế</p>
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
          <label className="block mb-2 font-medium text-gray-800">Mô tả chi tiết</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            rows="8"
            required
            className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:border-indigo-600"
            placeholder="Vui lòng mô tả chi tiết về mẫu thiết kế bạn mong muốn. Bao gồm kích thước, phong cách, màu sắc, và các yêu cầu cụ thể khác..."
          />
        </div>

        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
          <p className="text-sm text-blue-800">
            <strong>Lưu ý:</strong> Đội ngũ thiết kế sẽ xem xét yêu cầu của bạn và tạo mô hình 3D dựa trên hình ảnh và mô tả. 
            Bạn sẽ nhận được thông báo qua Zalo khi file xem trước sẵn sàng để duyệt.
          </p>
        </div>

        <div className="flex gap-4">
          <button
            type="submit"
            disabled={isSubmitting}
            className={`flex-1 py-3 text-white rounded-lg font-semibold transition-colors ${
              isSubmitting ? 'bg-indigo-400 cursor-not-allowed' : 'bg-indigo-600 hover:bg-indigo-700'
            }`}
          >
            {isSubmitting ? 'Đang gửi...' : 'Gửi yêu cầu'}
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

export default CustomOrderRequestDesign;

