import React from 'react';

const Loader = () => {
  return (
    <div className="flex flex-col items-center justify-center py-20">
      <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-green-600"></div>
      <p className="mt-4 text-lg text-gray-600">Loading skip options...</p>
    </div>
  );
};

export default Loader;