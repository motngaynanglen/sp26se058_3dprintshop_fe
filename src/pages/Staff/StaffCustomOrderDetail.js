import React, { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';

const StaffCustomOrderDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [notes, setNotes] = useState('');

  // Mock order data
  const order = {
    id: id,
    type: 'request_design',
    customer: 'John Doe',
    date: '2024-01-15',
    status: 'designing',
    description: 'Custom design for home decoration',
    referenceImages: ['image1.jpg', 'image2.jpg'],
    files: []
  };

  const handleMarkReadyForPreview = () => {
    // TODO: Mark as ready for preview
    alert('Order marked as ready for preview! Customer will be notified via Zalo.');
  };

  const handleUpdateStatus = (newStatus) => {
    // TODO: Update status
    alert(`Status updated to: ${newStatus}`);
  };

  const handleCalculatePrice = () => {
    // TODO: Calculate price
    alert('Price calculated!');
  };

  return (
    <div className="max-w-7xl mx-auto px-8 py-8">
      <div className="mb-6">
        <Link to="/staff/custom-orders" className="text-indigo-600 hover:text-indigo-800 font-medium">
          ← Back to Orders
        </Link>
      </div>

      <div className="bg-white rounded-lg shadow-md p-8 mb-6">
        <div className="flex justify-between items-start mb-6">
          <div>
            <h1 className="text-3xl font-bold mb-2 text-gray-800">Custom Order #{order.id}</h1>
            <p className="text-gray-600">Customer: {order.customer} | Date: {order.date}</p>
          </div>
          <span className="px-4 py-2 bg-yellow-100 text-yellow-800 rounded-full text-sm font-medium">
            {order.status}
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <div>
            <h3 className="font-semibold text-gray-800 mb-2">Order Type</h3>
            <p className="text-gray-600 capitalize">{order.type.replace('_', ' ')}</p>
          </div>
          <div>
            <h3 className="font-semibold text-gray-800 mb-2">Description</h3>
            <p className="text-gray-600">{order.description}</p>
          </div>
        </div>

        {order.referenceImages && order.referenceImages.length > 0 && (
          <div className="mb-6">
            <h3 className="font-semibold text-gray-800 mb-4">Reference Images</h3>
            <div className="grid grid-cols-4 gap-4">
              {order.referenceImages.map((img, idx) => (
                <div key={idx} className="bg-gray-200 h-32 rounded flex items-center justify-center text-gray-500 text-sm">
                  {img}
                </div>
              ))}
            </div>
          </div>
        )}

        <div className="mb-6">
          <h3 className="font-semibold text-gray-800 mb-4">Design Files</h3>
          {order.files.length === 0 ? (
            <p className="text-gray-600">No files uploaded yet</p>
          ) : (
            <div className="space-y-2">
              {order.files.map((file, idx) => (
                <div key={idx} className="flex items-center justify-between p-3 bg-gray-50 rounded">
                  <span className="text-gray-800">{file.name}</span>
                  <button className="text-indigo-600 hover:text-indigo-800 font-medium">Download</button>
                </div>
              ))}
            </div>
          )}
          <Link
            to={`/staff/upload-design/${order.id}`}
            className="inline-block mt-4 py-2 px-4 bg-indigo-600 text-white rounded-lg font-medium hover:bg-indigo-700 transition-colors"
          >
            Upload Design File
          </Link>
        </div>

        <div className="mb-6">
          <label className="block mb-2 font-medium text-gray-800">Internal Notes</label>
          <textarea
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            rows="4"
            className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:border-indigo-600"
            placeholder="Add internal notes for this order..."
          />
        </div>

        <div className="flex gap-4 flex-wrap">
          <button
            onClick={handleMarkReadyForPreview}
            className="py-2 px-6 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors"
          >
            Mark as Ready for Preview
          </button>
          <button
            onClick={handleCalculatePrice}
            className="py-2 px-6 bg-green-600 text-white rounded-lg font-medium hover:bg-green-700 transition-colors"
          >
            Calculate Price
          </button>
          <button
            onClick={() => handleUpdateStatus('printing')}
            className="py-2 px-6 bg-indigo-600 text-white rounded-lg font-medium hover:bg-indigo-700 transition-colors"
          >
            Update to Printing
          </button>
          <button
            onClick={() => handleUpdateStatus('completed')}
            className="py-2 px-6 bg-gray-600 text-white rounded-lg font-medium hover:bg-gray-700 transition-colors"
          >
            Mark as Completed
          </button>
        </div>
      </div>
    </div>
  );
};

export default StaffCustomOrderDetail;

