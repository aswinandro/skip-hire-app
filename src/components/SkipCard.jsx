import React from 'react';

const SkipCard = ({ skip, isSelected, onSelect }) => {
  return (
    <div
      className={`p-4 rounded-lg cursor-pointer transition-all duration-300 ${
        isSelected
          ? 'bg-gradient-to-r from-gray-700 to-gray-900 border-l-4 border-blue-500 shadow-lg'
          : 'bg-gray-900 hover:bg-gray-900'
      }`}
      onClick={onSelect}
    >
      {/* Top section: Title + Price (always shown) */}
      <div className="flex justify-between items-center">
        <div>
          <h3 className="text-xl font-bold text-silver">
            {skip.size} Yard Skip
          </h3>

          {/* Desktop only: hire period */}
          <p className="text-gray-400 mt-1 hidden sm:block">
            {skip.hire_period_days} day hire period
          </p>
        </div>

        <div className="text-right">
          <p className="text-2xl font-bold text-blue-400">
            £{skip.price_before_vat}
          </p>

          {/* Desktop only: ex VAT */}
          <p className="text-gray-400 hidden sm:block">ex VAT</p>
        </div>
      </div>

      {/* Desktop only: tags */}
      <div className="mt-4 flex flex-wrap gap-2 hidden sm:flex">
        <span
          className={`px-3 py-1 rounded-full text-xs font-medium ${
            skip.allowed_on_road
              ? 'bg-green-900 text-green-300'
              : 'bg-red-900 text-red-300'
          }`}
        >
          {skip.allowed_on_road ? 'Road Allowed' : 'Not Road Allowed'}
        </span>
        <span
          className={`px-3 py-1 rounded-full text-xs font-medium ${
            skip.allows_heavy_waste
              ? 'bg-green-900 text-green-300'
              : 'bg-red-900 text-red-300'
          }`}
        >
          {skip.allows_heavy_waste ? 'Heavy Waste OK' : 'No Heavy Waste'}
        </span>
      </div>
    </div>
  );
};

export default SkipCard;
