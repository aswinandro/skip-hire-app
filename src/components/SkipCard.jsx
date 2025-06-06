import React from 'react';

const SkipCard = ({ skip, isSelected, onSelect }) => {
  const { size, price, hirePeriod, restrictions } = skip;
  
  return (
    <div 
      className={`relative rounded-xl border-2 overflow-hidden transition-all duration-300 ${
        isSelected 
          ? 'border-green-500 shadow-xl transform -translate-y-1' 
          : 'border-gray-200 hover:border-green-300 hover:shadow-lg'
      }`}
    >
      <div className="bg-green-600 p-4">
        <div className="flex justify-between items-center">
          <h2 className="text-xl font-bold text-white">{size} Yards</h2>
          <span className="bg-green-800 text-white text-xs font-bold px-3 py-1 rounded-full">
            WE WANT WASTE
          </span>
        </div>
      </div>
      
      <div className="p-6">
        <div className="flex justify-center mb-4">
          <div className="relative">
            <div className="bg-gray-200 border-2 border-dashed rounded-xl w-64 h-32 flex items-center justify-center">
              <span className="text-2xl font-bold text-gray-600">{size} YD</span>
            </div>
            <div className="absolute -bottom-3 left-1/2 transform -translate-x-1/2 bg-green-500 text-white text-sm font-bold px-4 py-1 rounded-full">
              {size} Yard Skip
            </div>
          </div>
        </div>
        
        <div className="text-center mb-4">
          <p className="text-gray-600">{hirePeriod}</p>
        </div>
        
        <div className="flex justify-between items-center mb-4">
          <div>
            <p className="text-sm text-gray-500">Price</p>
            <p className="text-2xl font-bold text-green-600">£{price}</p>
            <p className="text-xs text-gray-500">ex VAT</p>
          </div>
          
          {isSelected ? (
            <button className="bg-green-100 text-green-700 px-4 py-2 rounded-lg font-bold flex items-center">
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
              </svg>
              Selected
            </button>
          ) : (
            <button 
              onClick={() => onSelect(skip.id)}
              className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg font-bold transition-colors duration-300 flex items-center"
            >
              Select This Skip
              <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
              </svg>
            </button>
          )}
        </div>
        
        {restrictions.length > 0 && (
          <div className="mt-4 pt-4 border-t border-gray-200">
            <div className="flex items-start">
              <svg className="w-5 h-5 text-yellow-500 mr-2 mt-0.5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd"></path>
              </svg>
              <div>
                {restrictions.map((restriction, index) => (
                  <p key={index} className="text-sm text-yellow-700">{restriction}</p>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SkipCard;