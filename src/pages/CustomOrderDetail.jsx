import React from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';

const CustomOrderDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  // Mock order data
  const order = {
    id: id,
    type: 'upload',
    date: '2024-01-15',
    status: 'ready_for_preview',
    material: 'PLA',
    quantity: 1,
    serviceType: 'print_paint',
    description: 'Custom design for home decoration',
    total: 150.00,
    files: [
      { name: 'design_v1.stl', version: 1, isPreview: true },
      { name: 'design_v2.stl', version: 2, isPreview: false }
    ]
  };

  const handlePreview = (fileId) => {
    navigate(`/preview/${fileId}`);
  };

  const handleApprove = () => {
    // TODO: Approve order and proceed to payment
    alert('Order approved! Proceeding to payment...');
  };

  return (
    <div className="max-w-7xl mx-auto px-8 py-8">
      <div className="mb-6">
        <Link to="/my-custom-orders" className="text-indigo-600 hover:text-indigo-800 font-medium">
          ← Back to Custom Orders
        </Link>
      </div>

      <div className="bg-white rounded-lg shadow-md p-8 mb-6">
        <div className="flex justify-between items-start mb-6">
          <div>
            <h1 className="text-3xl font-bold mb-2 text-gray-800">Custom Order #{order.id}</h1>
            <p className="text-gray-600">Created on {order.date}</p>
          </div>
          <span className="px-4 py-2 bg-blue-100 text-blue-800 rounded-full text-sm font-medium">
            {order.status.replace('_', ' ')}
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <div>
            <h3 className="font-semibold text-gray-800 mb-2">Order Details</h3>
            <p className="text-gray-600">Type: {order.type}</p>
            <p className="text-gray-600">Material: {order.material}</p>
            <p className="text-gray-600">Quantity: {order.quantity}</p>
            <p className="text-gray-600">Service: {order.serviceType.replace('_', ' ')}</p>
          </div>
          <div>
            <h3 className="font-semibold text-gray-800 mb-2">Description</h3>
            <p className="text-gray-600">{order.description}</p>
          </div>
        </div>

        {order.total && (
          <div className="border-t border-gray-200 pt-6">
            <div className="flex justify-between items-center">
              <span className="text-xl font-bold text-gray-800">Total Amount</span>
              <span className="text-2xl font-bold text-indigo-600">${order.total.toFixed(2)}</span>
            </div>
          </div>
        )}
      </div>

      <div className="bg-white rounded-lg shadow-md p-8 mb-6">
        <h2 className="text-2xl font-bold mb-6 text-gray-800">Design Files</h2>
        <div className="space-y-4">
          {order.files.map((file, idx) => (
            <div key={idx} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
              <div className="flex items-center gap-4">
                <div className="text-3xl">📁</div>
                <div>
                  <p className="font-semibold text-gray-800">{file.name}</p>
                  <p className="text-sm text-gray-600">Version {file.version}</p>
                  {file.isPreview && (
                    <span className="inline-block mt-1 px-2 py-1 bg-blue-100 text-blue-800 rounded text-xs font-medium">
                      Ready for Preview
                    </span>
                  )}
                </div>
              </div>
              <div className="flex gap-2">
                {file.isPreview && (
                  <button
                    onClick={() => handlePreview(file.name)}
                    className="py-2 px-4 bg-indigo-600 text-white rounded-lg font-medium hover:bg-indigo-700 transition-colors"
                  >
                    Preview 3D
                  </button>
                )}
                <button className="py-2 px-4 bg-gray-200 text-gray-800 rounded-lg font-medium hover:bg-gray-300 transition-colors">
                  Download
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {order.status === 'pending_approval' && (
        <div className="bg-white rounded-lg shadow-md p-8">
          <h2 className="text-2xl font-bold mb-4 text-gray-800">Approve & Pay</h2>
          <p className="text-gray-600 mb-6">Review the design files and approve to proceed with payment.</p>
          <button
            onClick={handleApprove}
            className="py-3 px-8 bg-indigo-600 text-white rounded-lg font-semibold hover:bg-indigo-700 transition-colors"
          >
            Approve & Pay ${order.total.toFixed(2)}
          </button>
        </div>
      )}
    </div>
  );
};

export default CustomOrderDetail;

