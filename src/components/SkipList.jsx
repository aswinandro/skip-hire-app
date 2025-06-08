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
      <div className="bg-gray-900 rounded-xl p-4 lg:p-6 border border-gray-700 shadow-2xl h-full max-h-[80vh] flex flex-col">
        {/* Heading with Arrows (mobile only) */}
        <div className="flex justify-between items-center mb-4 lg:mb-6">
          <h2 className="text-xl lg:text-2xl font-bold text-silver border-b border-gray-700 pb-2 w-full">
            Available Skip Sizes
          </h2>
          <div className="flex gap-2 lg:hidden ml-2">
            <button onClick={() => scroll('left')} className="p-1 rounded hover:bg-gray-800">
              <ChevronLeft className="w-5 h-5 text-silver" />
            </button>
            <button onClick={() => scroll('right')} className="p-1 rounded hover:bg-gray-800">
              <ChevronRight className="w-5 h-5 text-silver" />
            </button>
          </div>
        </div>

        {/* Skip List */}
        <div
          ref={scrollRef}
          className="flex lg:flex-col gap-3 overflow-x-auto lg:overflow-y-auto pr-1 scroll-smooth scrollbar-thin scrollbar-thumb-gray-600 scrollbar-track-gray-800"
        >
          {skips.map((skip) => (
            <div
              key={skip.id}
              className="min-w-[180px] sm:min-w-[200px] lg:min-w-0"
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
