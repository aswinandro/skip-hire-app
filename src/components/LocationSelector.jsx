import React, { useState } from 'react';

const LocationSelector = ({ postcode, area, onUpdate }) => {
  const [localPostcode, setLocalPostcode] = useState(postcode);
  const [localArea, setLocalArea] = useState(area);

  const handleSubmit = (e) => {
    e.preventDefault();
    onUpdate(localPostcode, localArea);
  };

  return (
    <div className="bg-white rounded-xl shadow-md p-6 max-w-2xl mx-auto">
      <h2 className="text-xl font-bold text-gray-800 mb-4">Select Your Location</h2>
      <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-4">
        <div className="flex-1">
          <label htmlFor="postcode" className="block text-sm font-medium text-gray-700 mb-1">
            Postcode
          </label>
          <input
            type="text"
            id="postcode"
            value={localPostcode}
            onChange={(e) => setLocalPostcode(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-green-500 focus:border-green-500"
            placeholder="Enter postcode"
          />
        </div>
        <div className="flex-1">
          <label htmlFor="area" className="block text-sm font-medium text-gray-700 mb-1">
            Area
          </label>
          <input
            type="text"
            id="area"
            value={localArea}
            onChange={(e) => setLocalArea(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-green-500 focus:border-green-500"
            placeholder="Enter area"
          />
        </div>
        <div className="self-end">
          <button
            type="submit"
            className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-lg font-medium transition-colors duration-300"
          >
            Update
          </button>
        </div>
      </form>
    </div>
  );
};

export default LocationSelector;