import React from 'react';

const Footer = () => (
  <>
    {/* Fixed Back and Continue Buttons Aligned with Content Column */}
    <div className="fixed bottom-4 left-0 right-0 z-50">
      <div className="container mx-auto px-4 flex justify-between items-center">
        <button className="bg-gray-600 text-white text-sm md:text-base py-2 px-5 md:py-2.5 md:px-7 rounded-lg shadow hover:bg-gray-800 transition duration-200 hover:cursor-pointer">
          Back
        </button>
        <button className="bg-blue-500 text-white font-semibold text-sm md:text-base py-2 px-5 md:py-2.5 md:px-7 rounded-lg shadow hover:bg-blue-600 transition duration-200 hover:cursor-pointer">
          Continue
        </button>
      </div>
    </div>

    {/* Footer */}
    <footer className="mt-1 md:mt-2 lg:mt-10 md:-top-4 bg-gradient-to-r from-gray-950 via-stone-800 to-gray-950 text-gray-400 text-sm">
      <div className="container mx-auto px-4 text-center py-10">
        <p className="mb-2">
          Imagery and information shown throughout this website may not reflect the exact shape or size specification.
        </p>
        <p className="text-gray-500">
          © {new Date().getFullYear()} <span className="font-semibold text-white">We Want Waste</span>. All rights reserved.
        </p>
      </div>
    </footer>
  </>
);

export default Footer;
