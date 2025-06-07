import React, { useRef } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import SkipCard from './SkipCard';

const SkipList = ({ skips, selectedSkip, handleSelectSkip }) => {
  const scrollRef = useRef(null);

  const scroll = (direction) => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({
        left: direction === 'left' ? -200 : 200,
        behavior: 'smooth',
      });
    }
  };

  return (
    <div className="w-full lg:w-1/3">
      <div className="bg-gray-900 rounded-xl p-6 border border-gray-700 shadow-2xl h-full max-h-[80vh] flex flex-col">
        <h2 className="text-2xl font-bold mb-6 text-silver border-b border-gray-700 pb-3">
          Available Skip Sizes
        </h2>

        {/* Arrows for mobile view */}
        <div className="flex justify-between items-center mb-4 lg:hidden">
          <button onClick={() => scroll('left')}>
            <ChevronLeft className="w-6 h-6 text-silver" />
          </button>
          <button onClick={() => scroll('right')}>
            <ChevronRight className="w-6 h-6 text-silver" />
          </button>
        </div>

        <div
          ref={scrollRef}
          className="flex lg:flex-col gap-4 overflow-x-auto lg:overflow-y-auto pr-2 scroll-smooth scrollbar-thin scrollbar-thumb-gray-600 scrollbar-track-gray-700"
        >
          {skips.map((skip) => (
            <div
              key={skip.id}
              className="min-w-[250px] lg:min-w-0"
            >
              <SkipCard
                skip={skip}
                isSelected={selectedSkip?.id === skip.id}
                onSelect={() => handleSelectSkip(skip)}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SkipList;
