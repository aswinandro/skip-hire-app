// src/components/LoadingSpinner.js
import React from 'react';

const LoadingSpinner = () => {
  return (
    <div className="min-h-screen bg-gray-900 flex items-center justify-center">
      <div className="text-center">
        <div className="relative">
          <div className="w-16 h-16 border-t-4 border-green-500 border-solid rounded-full animate-spin mx-auto"></div>
          <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center">
            <div className="w-8 h-8 bg-gray-900 rounded-full"></div>
          </div>
        </div>
        <p className="mt-4 text-silver font-medium">Loading skip options...</p>
      </div>
    </div>
  );
};

export default LoadingSpinner;