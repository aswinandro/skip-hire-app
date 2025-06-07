import React from 'react';
import SkipCard from './SkipCard';

const SkipList = ({ skips, selectedSkip, handleSelectSkip }) => (
  <div className="w-full lg:w-1/3">
    <div className="bg-gray-800 rounded-xl p-6 border border-gray-700 shadow-2xl">
      <h2 className="text-2xl font-bold mb-6 text-silver border-b border-gray-700 pb-3">Available Skip Sizes</h2>
      <div className="space-y-4">
        {skips.map((skip) => (
          <SkipCard
            key={skip.id}
            skip={skip}
            isSelected={selectedSkip?.id === skip.id}
            onSelect={() => handleSelectSkip(skip)}
          />
        ))}
      </div>
    </div>
  </div>
);

export default SkipList;
