import React from 'react';

const Footer = () => (
  <footer className="bg-gray-900 border-t border-gray-800 py-8 mt-12">
    <div className="container mx-auto px-4 text-center text-gray-500">
      <p>Imagery and information shown throughout this website may not reflect the exact shape or size specification</p>
      <p className="mt-2">© {new Date().getFullYear()} WE WANT WASTE. All rights reserved.</p>
    </div>
  </footer>
);

export default Footer;
