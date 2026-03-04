import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const StarIcon = ({ filled }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill={filled ? 'currentColor' : 'none'}
    stroke="currentColor"
    strokeWidth={1.5}
    className="w-9 h-9"
  >
    <path strokeLinecap="round" strokeLinejoin="round" d="M11.48 3.499a.562.562 0 0 1 1.04 0l2.125 5.111a.563.563 0 0 0 .475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 0 0-.182.557l1.285 5.385a.562.562 0 0 1-.84.61l-4.725-2.885a.562.562 0 0 0-.586 0L6.982 20.54a.562.562 0 0 1-.84-.61l1.285-5.386a.562.562 0 0 0-.182-.557l-4.204-3.602a.562.562 0 0 1 .321-.988l5.518-.442a.563.563 0 0 0 .475-.345L11.48 3.5Z" />
  </svg>
);

const RATING_LABELS = {
  1: 'Rất không hài lòng',
  2: 'Không hài lòng',
  3: 'Bình thường',
  4: 'Hài lòng',
  5: 'Rất hài lòng',
};

const FeedbackForm = () => {
  const { orderId } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ rating: 5, comment: '' });
  const [hovered, setHovered] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    alert('Cảm ơn bạn đã gửi đánh giá!');
    navigate('/my-orders');
  };

  const displayRating = hovered || formData.rating;

  return (
    <div className="max-w-xl mx-auto px-6 py-8">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-900">Gửi đánh giá</h1>
        <p className="text-gray-500 mt-1">
          Mã đơn hàng: <span className="font-mono font-semibold text-gray-700">#{orderId}</span>
        </p>
      </div>

      <form onSubmit={handleSubmit} className="bg-white rounded-2xl border border-gray-100 shadow-sm p-8 space-y-6">
        {/* Rating */}
        <div>
          <label className="block mb-3 text-sm font-semibold text-gray-700 uppercase tracking-wide">
            Đánh giá của bạn
          </label>
          <div className="flex gap-1 mb-2">
            {[1, 2, 3, 4, 5].map((star) => (
              <button
                key={star}
                type="button"
                onClick={() => setFormData({ ...formData, rating: star })}
                onMouseEnter={() => setHovered(star)}
                onMouseLeave={() => setHovered(null)}
                className={`transition-colors duration-100 cursor-pointer ${
                  star <= displayRating ? 'text-amber-400' : 'text-gray-200'
                }`}
                aria-label={`Đánh giá ${star} sao`}
              >
                <StarIcon filled={star <= displayRating} />
              </button>
            ))}
          </div>
          <p className="text-sm font-medium text-indigo-600">
            {RATING_LABELS[displayRating]}
          </p>
        </div>

        {/* Comment */}
        <div>
          <label htmlFor="comment" className="block mb-2 text-sm font-semibold text-gray-700 uppercase tracking-wide">
            Nhận xét
          </label>
          <textarea
            id="comment"
            name="comment"
            value={formData.comment}
            onChange={(e) => setFormData({ ...formData, comment: e.target.value })}
            rows={5}
            required
            placeholder="Chia sẻ trải nghiệm của bạn về đơn hàng này..."
            className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 transition-all duration-150 resize-none"
          />
        </div>

        {/* Actions */}
        <div className="flex gap-3 pt-2">
          <button
            type="submit"
            className="flex-1 py-3 bg-indigo-600 text-white rounded-xl font-semibold text-sm hover:bg-indigo-700 active:bg-indigo-800 transition-colors duration-200 cursor-pointer"
          >
            Gửi đánh giá
          </button>
          <button
            type="button"
            onClick={() => navigate('/my-orders')}
            className="px-6 py-3 bg-white text-gray-700 border border-gray-200 rounded-xl font-semibold text-sm hover:bg-gray-50 transition-colors duration-200 cursor-pointer"
          >
            Huỷ
          </button>
        </div>
      </form>
    </div>
  );
};

export default FeedbackForm;
