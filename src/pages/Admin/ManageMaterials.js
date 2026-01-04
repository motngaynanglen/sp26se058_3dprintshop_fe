import React, { useState } from 'react';

const ManageMaterials = () => {
  const [materials, setMaterials] = useState([
    { id: 1, name: 'PLA', pricePerGram: 0.05, available: true },
    { id: 2, name: 'TPU', pricePerGram: 0.08, available: true },
    { id: 3, name: 'Wood PLA', pricePerGram: 0.10, available: true },
    { id: 4, name: 'Resin', pricePerGram: 0.15, available: false }
  ]);
  const [showModal, setShowModal] = useState(false);
  const [editingMaterial, setEditingMaterial] = useState(null);

  const handleToggle = (id) => {
    setMaterials(materials.map(m => m.id === id ? { ...m, available: !m.available } : m));
  };

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this material?')) {
      setMaterials(materials.filter(m => m.id !== id));
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-8 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-800">Manage Materials</h1>
        <button
          onClick={() => { setEditingMaterial(null); setShowModal(true); }}
          className="py-2 px-6 bg-indigo-600 text-white rounded-lg font-semibold hover:bg-indigo-700 transition-colors"
        >
          + Add Material
        </button>
      </div>

      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-4 text-left text-sm font-semibold text-gray-800">Name</th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-gray-800">Price per Gram</th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-gray-800">Availability</th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-gray-800">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {materials.map(material => (
              <tr key={material.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 text-sm font-medium text-gray-800">{material.name}</td>
                <td className="px-6 py-4 text-sm text-gray-600">${material.pricePerGram.toFixed(2)}</td>
                <td className="px-6 py-4">
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                    material.available ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                  }`}>
                    {material.available ? 'Available' : 'Unavailable'}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <div className="flex gap-2">
                    <button
                      onClick={() => { setEditingMaterial(material); setShowModal(true); }}
                      className="text-indigo-600 hover:text-indigo-800 font-medium"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleToggle(material.id)}
                      className="text-yellow-600 hover:text-yellow-800 font-medium"
                    >
                      {material.available ? 'Disable' : 'Enable'}
                    </button>
                    <button
                      onClick={() => handleDelete(material.id)}
                      className="text-red-600 hover:text-red-800 font-medium"
                    >
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ManageMaterials;

