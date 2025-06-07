import React from 'react';

const Header = ({ rotation, toggleRotation }) => (
  <header className="pt-8 pb-6">
    <div className="container mx-auto px-4">
      <div className="flex flex-col md:flex-row justify-between items-center">
        <div>
          <h1 className="text-4xl font-bold text-gradient bg-clip-text text-transparent bg-gradient-to-r from-silver to-gray-400">
            <span className="text-green-400">WE</span> WANT WASTE
          </h1>
          <p className="text-gray-400 mt-2">Premium Skip Hire with Interactive 3D Visualization</p>
        </div>
        <button
          onClick={toggleRotation}
          className="mt-4 md:mt-0 px-6 py-2 bg-gray-900 border border-silver rounded-lg hover:bg-gray-700 transition-all duration-300 flex items-center"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M4 2a1 1 0 011 1v2.101..." clipRule="evenodd" />
          </svg>
          {rotation ? 'Pause Rotation' : 'Start Rotation'}
        </button>
      </div>
    </div>
  </header>
);

export default Header;
