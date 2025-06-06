import React, { useState, useEffect } from 'react';
import { fetchSkipsByLocation } from '../services/api';
import Header from '../components/Header';
import SkipCard from '../components/SkipCard';
import LocationSelector from '../components/LocationSelector';
import Loader from '../components/Loader';
import Footer from '../components/Footer';

const SkipSelection = () => {
  const [skips, setSkips] = useState([]);
  const [selectedSkip, setSelectedSkip] = useState(null);
  const [loading, setLoading] = useState(true);
  const [postcode, setPostcode] = useState('NR32');
  const [area, setArea] = useState('Lowestoft');
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadSkips = async () => {
      setLoading(true);
      setError(null);
      try {
        const data = await fetchSkipsByLocation(postcode, area);
        setSkips(data);
      } catch (err) {
        setError('Failed to load skip options. Please try again later.');
        console.error('API Error:', err);
      }
      setLoading(false);
    };
    
    loadSkips();
  }, [postcode, area]);

  const handleLocationUpdate = (newPostcode, newArea) => {
    setPostcode(newPostcode);
    setArea(newArea);
  };

  const handleSelectSkip = (id) => {
    setSelectedSkip(id);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <Header />
      
      <div className="my-8">
        <LocationSelector 
          postcode={postcode} 
          area={area} 
          onUpdate={handleLocationUpdate} 
        />
      </div>
      
      <h1 className="text-3xl md:text-4xl font-bold text-center text-gray-800 mb-2">
        Choose Your Skip Size
      </h1>
      <p className="text-lg text-center text-gray-600 mb-10">
        Select the skip size that best suits your needs
      </p>

      {error && (
        <div className="bg-red-50 border-l-4 border-red-500 p-4 mb-6 rounded">
          <div className="flex">
            <div className="flex-shrink-0">
              <svg className="h-5 w-5 text-red-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
              </svg>
            </div>
            <div className="ml-3">
              <p className="text-sm text-red-700">{error}</p>
            </div>
          </div>
        </div>
      )}

      {loading ? (
        <Loader />
      ) : (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            {skips.map(skip => (
              <SkipCard 
                key={skip.id}
                skip={skip}
                isSelected={selectedSkip === skip.id}
                onSelect={handleSelectSkip}
              />
            ))}
          </div>
          
          <Footer />
        </>
      )}
    </div>
  );
};

export default SkipSelection;