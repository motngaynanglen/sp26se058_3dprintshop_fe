import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const FeedbackForm = () => {
  const { orderId } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    rating: 5,
    comment: ''
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // TODO: Submit feedback
    alert('Thank you for your feedback!');
    navigate('/my-orders');
  };

  return (
    <div className="max-w-2xl mx-auto px-8 py-8">
      <h1 className="text-3xl font-bold mb-8 text-gray-800">Leave Feedback</h1>
      <p className="text-gray-600 mb-8">Order #{orderId}</p>

      <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-md p-8">
        <div className="mb-6">
          <label className="block mb-4 font-medium text-gray-800">Rating</label>
          <div className="flex gap-2">
            {[1, 2, 3, 4, 5].map((star) => (
              <button
                key={star}
                type="button"
                onClick={() => setFormData({ ...formData, rating: star })}
                className={`text-4xl transition-transform hover:scale-110 ${
                  star <= formData.rating ? 'text-yellow-400' : 'text-gray-300'
                }`}
              >
                ★
              </button>
            ))}
          </div>
          <p className="text-sm text-gray-600 mt-2">Selected: {formData.rating} out of 5</p>
        </div>

        <div className="mb-6">
          <label className="block mb-2 font-medium text-gray-800">Comments</label>
          <textarea
            name="comment"
            value={formData.comment}
            onChange={handleChange}
            rows="6"
            required
            className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:border-indigo-600"
            placeholder="Share your experience with this order..."
          />
        </div>

        <div className="flex gap-4">
          <button
            type="submit"
            className="flex-1 py-3 bg-indigo-600 text-white rounded-lg font-semibold hover:bg-indigo-700 transition-colors"
          >
            Submit Feedback
          </button>
          <button
            type="button"
            onClick={() => navigate('/my-orders')}
            className="px-6 py-3 bg-gray-200 text-gray-800 rounded-lg font-semibold hover:bg-gray-300 transition-colors"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default FeedbackForm;

