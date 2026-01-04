import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const CustomOrderRequestDesign = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
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

  const handleSubmit = (e) => {
    e.preventDefault();
    // TODO: Submit design request
    alert('Design request submitted!');
    navigate('/my-custom-orders');
  };

  return (
    <div className="max-w-4xl mx-auto px-8 py-8">
      <h1 className="text-3xl font-bold mb-8 text-gray-800">Request Design Service</h1>

      <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-md p-8">
        <div className="mb-6">
          <label className="block mb-2 font-medium text-gray-800">Reference Images</label>
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
                  ? `${formData.images.length} image(s) selected`
                  : 'Click to upload reference images'}
              </p>
              <p className="text-sm text-gray-500 mt-2">You can upload multiple images</p>
            </label>
          </div>
          {formData.images.length > 0 && (
            <div className="mt-4 grid grid-cols-4 gap-4">
              {formData.images.map((img, idx) => (
                <div key={idx} className="bg-gray-200 h-24 rounded flex items-center justify-center text-xs text-gray-500">
                  {img.name}
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="mb-6">
          <label className="block mb-2 font-medium text-gray-800">Detailed Description</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            rows="8"
            required
            className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:border-indigo-600"
            placeholder="Please provide a detailed description of the design you want. Include dimensions, style preferences, colors, and any specific requirements..."
          />
        </div>

        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
          <p className="text-sm text-blue-800">
            <strong>Note:</strong> Our design team will review your request and create a 3D model based on your reference images and description. 
            You'll be notified via Zalo when the preview file is ready for review.
          </p>
        </div>

        <div className="flex gap-4">
          <button
            type="submit"
            className="flex-1 py-3 bg-indigo-600 text-white rounded-lg font-semibold hover:bg-indigo-700 transition-colors"
          >
            Submit Request
          </button>
          <button
            type="button"
            onClick={() => navigate('/custom-order')}
            className="px-6 py-3 bg-gray-200 text-gray-800 rounded-lg font-semibold hover:bg-gray-300 transition-colors"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default CustomOrderRequestDesign;

