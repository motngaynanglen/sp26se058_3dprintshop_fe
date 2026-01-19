import React, { useState } from 'react';

const FeedbackList = () => {
  const [filter, setFilter] = useState('all');
  const [ratingFilter, setRatingFilter] = useState('all');

  const feedbacks = [
    { id: 1, orderId: 'ORD-001', customer: 'John Doe', rating: 5, comment: 'Excellent service!', date: '2024-01-15' },
    { id: 2, orderId: 'ORD-002', customer: 'Jane Smith', rating: 4, comment: 'Good quality product', date: '2024-01-14' },
    { id: 3, orderId: 'CUST-001', customer: 'Bob Johnson', rating: 3, comment: 'Could be better', date: '2024-01-13' }
  ];

  const filteredFeedbacks = feedbacks.filter(feedback => {
    if (ratingFilter !== 'all' && feedback.rating.toString() !== ratingFilter) return false;
    return true;
  });

  return (
    <div className="max-w-7xl mx-auto px-8 py-8">
      <h1 className="text-3xl font-bold mb-8 text-gray-800">Customer Feedback</h1>

      <div className="mb-6 flex gap-4 flex-wrap">
        <div className="flex gap-2">
          <span className="py-2 px-4 font-medium text-gray-700">Rating:</span>
          {['all', '5', '4', '3', '2', '1'].map(rating => (
            <button
              key={rating}
              onClick={() => setRatingFilter(rating)}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                ratingFilter === rating ? 'bg-indigo-600 text-white' : 'bg-gray-200 text-gray-800 hover:bg-gray-300'
              }`}
            >
              {rating === 'all' ? 'All' : `${rating} ⭐`}
            </button>
          ))}
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-4 text-left text-sm font-semibold text-gray-800">Order ID</th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-gray-800">Customer</th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-gray-800">Rating</th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-gray-800">Comment</th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-gray-800">Date</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {filteredFeedbacks.map(feedback => (
              <tr key={feedback.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 text-sm font-medium text-gray-800">{feedback.orderId}</td>
                <td className="px-6 py-4 text-sm text-gray-600">{feedback.customer}</td>
                <td className="px-6 py-4">
                  <div className="flex items-center gap-1">
                    {[...Array(5)].map((_, i) => (
                      <span key={i} className={i < feedback.rating ? 'text-yellow-400' : 'text-gray-300'}>
                        ★
                      </span>
                    ))}
                  </div>
                </td>
                <td className="px-6 py-4 text-sm text-gray-600">{feedback.comment}</td>
                <td className="px-6 py-4 text-sm text-gray-600">{feedback.date}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default FeedbackList;

