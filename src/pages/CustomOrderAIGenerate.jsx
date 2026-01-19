import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

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
      <h1 className="text-3xl font-bold mb-8 text-gray-800">AI Generate 3D Model</h1>

      {!result ? (
        <form onSubmit={handleGenerate} className="bg-white rounded-lg shadow-md p-8">
          <div className="mb-6">
            <label className="block mb-2 font-medium text-gray-800">Upload Images</label>
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
                    ? `${formData.images.length} image(s) selected`
                    : 'Click to upload images for AI processing'}
                </p>
                <p className="text-sm text-gray-500 mt-2">Upload one or more reference images</p>
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
            <label className="block mb-2 font-medium text-gray-800">Additional Prompt (Optional)</label>
            <textarea
              name="prompt"
              value={formData.prompt}
              onChange={handleChange}
              rows="4"
              className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:border-indigo-600"
              placeholder="Add any additional instructions or preferences for the AI model generation..."
            />
          </div>

          <div className="bg-purple-50 border border-purple-200 rounded-lg p-4 mb-6">
            <p className="text-sm text-purple-800">
              <strong>AI Generation:</strong> Our AI will analyze your images and generate a prototype 3D model. 
              This is a quick preview - you can request refinements or proceed with the design.
            </p>
          </div>

          <div className="flex gap-4">
            <button
              type="submit"
              disabled={loading}
              className="flex-1 py-3 bg-indigo-600 text-white rounded-lg font-semibold hover:bg-indigo-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? 'Generating...' : 'Generate 3D Model'}
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
      ) : (
        <div className="bg-white rounded-lg shadow-md p-8">
          <h2 className="text-2xl font-bold mb-6 text-gray-800">Generated 3D Model</h2>
          
          <div className="bg-gray-200 h-96 rounded-lg mb-6 flex items-center justify-center text-gray-500">
            3D Model Preview
            <br />
            {result.preview}
          </div>

          <div className="flex gap-4">
            <button
              onClick={handleUseResult}
              className="flex-1 py-3 bg-indigo-600 text-white rounded-lg font-semibold hover:bg-indigo-700 transition-colors"
            >
              Use This Model
            </button>
            <button
              onClick={() => setResult(null)}
              className="px-6 py-3 bg-gray-200 text-gray-800 rounded-lg font-semibold hover:bg-gray-300 transition-colors"
            >
              Generate Again
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default CustomOrderAIGenerate;

