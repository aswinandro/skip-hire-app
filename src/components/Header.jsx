import React from 'react';

const Header = () => {
  return (
    <header className="text-center mb-12">
      <div className="flex justify-center mb-4">
        <div className="bg-green-600 text-white font-bold text-xl px-6 py-3 rounded-lg inline-block">
          WE WANT WASTE
        </div>
      </div>
      <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-4">
        Skip Hire Service
      </h1>
      <p className="text-lg text-gray-600 max-w-2xl mx-auto">
        Fast, reliable skip hire with environmentally responsible waste disposal
      </p>
    </header>
  );
};

export default Header;