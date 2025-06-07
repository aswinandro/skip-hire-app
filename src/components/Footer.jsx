import React from 'react';

const Footer = () => (
  <>
    {/* Fixed Back and Continue Buttons Aligned with Content Column */}
    <div className="fixed bottom-4 left-0 right-0 z-50">
      <div className="container mx-auto px-4 flex justify-between">
        <button className="bg-gray-800 text-white text-sm md:text-base py-1.5 px-4 md:py-2 md:px-6 rounded-lg shadow-md hover:bg-gray-700 transition">
          ← Back
        </button>
        <button className="bg-blue-500 text-gray-900 font-semibold text-sm md:text-base py-1.5 px-4 md:py-2 md:px-6 rounded-lg shadow-md hover:bg-blue-700 transition">
          Continue →
        </button>
      </div>
    </div>

    {/* Footer */}
    <footer className="bg-gray-900 border-t border-gray-800 py-8 mt-24">
      <div className="container mx-auto px-4 text-center text-gray-500 text-sm">
        <p>
          Imagery and information shown throughout this website may not reflect the exact shape or size specification
        </p>
        <p className="mt-2">
          © {new Date().getFullYear()} WE WANT WASTE. All rights reserved.
        </p>
      </div>
    </footer>
  </>
);

export default Footer;
