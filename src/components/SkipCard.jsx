import React from 'react';

const SkipCard = ({ skip, isSelected, onSelect }) => {
  return (
    <div
      className={`p-3 sm:p-4 rounded-lg cursor-pointer transition-all duration-300 ${
        isSelected
          ? 'bg-gradient-to-r from-gray-700 to-gray-900 border-l-4 border-blue-500 shadow-lg'
          : 'bg-gray-900 hover:bg-gray-800'
      }`}
      onClick={onSelect}
    >
      {/* Top section: Title + Price */}
      <div className="flex justify-between items-start">
        <div>
          <h3 className="text-sm sm:text-xl font-semibold text-silver leading-tight">
            {skip.size} Yard Skip
          </h3>
          <p className="text-gray-400 mt-0.5 text-xs sm:text-sm hidden sm:block leading-snug">
            {skip.hire_period_days} day hire period
          </p>
        </div>

        <div className="text-right">
          <p className="text-base sm:text-2xl font-bold text-blue-400 leading-tight">
            £{skip.price_before_vat}
          </p>
          <p className="text-gray-400 text-xs hidden sm:block leading-snug">
            ex VAT
          </p>
        </div>
      </div>

      {/* Desktop only: tags */}
      <div className="mt-2 sm:mt-4 flex flex-wrap gap-1 sm:gap-2 hidden sm:flex">
        <span
          className={`px-2 py-0.5 sm:px-3 sm:py-1 rounded-full text-[10px] sm:text-xs font-medium ${
            skip.allowed_on_road
              ? 'bg-green-900 text-green-300'
              : 'bg-red-900 text-red-300'
          }`}
        >
          {skip.allowed_on_road ? 'Road Allowed' : 'Not Road Allowed'}
        </span>
        <span
          className={`px-2 py-0.5 sm:px-3 sm:py-1 rounded-full text-[10px] sm:text-xs font-medium ${
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
