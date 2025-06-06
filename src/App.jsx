// src/App.js
import React, { useState, useEffect } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Environment } from '@react-three/drei';
import SkipModel from './components/SkipModel';
import SkipCard from './components/SkipCard';
import LoadingSpinner from './components/LoadingSpinner';
import './App.css';

function App() {
  const [skips, setSkips] = useState([]);
  const [selectedSkip, setSelectedSkip] = useState(null);
  const [loading, setLoading] = useState(true);
  const [rotation, setRotation] = useState(true);

  useEffect(() => {
    const fetchSkips = async () => {
      try {
        setLoading(true);
        const response = await fetch('https://app.wewantwaste.co.uk/api/skips/by-location?postcode=NR32&area=Lowestoft');
        const data = await response.json();
        setSkips(data);
        if (data.length > 0) {
          setSelectedSkip(data[0]);
        }
        setLoading(false);
      } catch (error) {
        console.error('Error fetching skips:', error);
        setLoading(false);
      }
    };

    fetchSkips();
  }, []);

  const handleSelectSkip = (skip) => {
    setSelectedSkip(skip);
  };

  const toggleRotation = () => {
    setRotation(!rotation);
  };

  if (loading) {
    return <LoadingSpinner />;
  }

  return (
    <div className="min-h-screen bg-gray-900 text-silver">
      {/* Header */}
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
              className="mt-4 md:mt-0 px-6 py-2 bg-gray-800 border border-silver rounded-lg hover:bg-gray-700 transition-all duration-300 flex items-center"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M4 2a1 1 0 011 1v2.101a7.002 7.002 0 0111.601 2.566 1 1 0 11-1.885.666A5.002 5.002 0 005.999 7H9a1 1 0 010 2H4a1 1 0 01-1-1V3a1 1 0 011-1zm.008 9.057a1 1 0 011.276.61A5.002 5.002 0 0014.001 13H11a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0v-2.101a7.002 7.002 0 01-11.601-2.566 1 1 0 01.61-1.276z" clipRule="evenodd" />
              </svg>
              {rotation ? 'Pause Rotation' : 'Start Rotation'}
            </button>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Left Column - Skip Cards */}
          <div className="w-full lg:w-1/3">
            <div className="bg-gray-800 rounded-xl p-6 border border-gray-700 shadow-2xl">
              <h2 className="text-2xl font-bold mb-6 text-silver border-b border-gray-700 pb-3">Available Skip Sizes</h2>
              <div className="space-y-4">
                {skips.map((skip) => (
                  <SkipCard 
                    key={skip.id}
                    skip={skip}
                    isSelected={selectedSkip?.id === skip.id}
                    onSelect={() => handleSelectSkip(skip)}
                  />
                ))}
              </div>
            </div>
          </div>

          {/* Right Column - 3D Viewer */}
          <div className="w-full lg:w-2/3">
            <div className="bg-gray-800 rounded-xl p-6 border border-gray-700 shadow-2xl h-full">
              <h2 className="text-2xl font-bold mb-6 text-silver border-b border-gray-700 pb-3">Interactive 3D Preview</h2>
              
              {selectedSkip ? (
                <div className="h-[500px] rounded-lg overflow-hidden border border-gray-700 relative">
                  <Canvas shadows camera={{ position: [0, 2, 5], fov: 50 }}>
                    <ambientLight intensity={0.5} />
                    <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} intensity={1} castShadow />
                    <pointLight position={[-10, -10, -10]} intensity={0.5} />
                    
                    <SkipModel 
                      size={selectedSkip.size} 
                      rotationEnabled={rotation}
                    />
                    
                    <Environment preset="city" />
                    <OrbitControls 
                      enableZoom={true}
                      enablePan={true}
                      enableRotate={true}
                      autoRotate={rotation}
                      autoRotateSpeed={rotation ? 1 : 0}
                    />
                  </Canvas>
                  
                  <div className="absolute bottom-4 left-4 bg-gray-900 bg-opacity-80 px-4 py-2 rounded-lg">
                    <p className="text-silver font-bold">Current: {selectedSkip.size} Yard Skip</p>
                  </div>
                </div>
              ) : (
                <div className="h-[500px] flex items-center justify-center bg-gray-900 rounded-lg">
                  <p className="text-gray-500">Select a skip to view 3D model</p>
                </div>
              )}

              {/* Skip Details */}
              {selectedSkip && (
                <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-gray-900 p-4 rounded-lg border border-gray-700">
                    <h3 className="font-bold text-silver mb-2">Skip Details</h3>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-gray-400">Size:</span>
                        <span className="text-silver">{selectedSkip.size} Yards</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-400">Hire Period:</span>
                        <span className="text-silver">{selectedSkip.hire_period_days} days</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-400">Price (ex VAT):</span>
                        <span className="text-silver">£{selectedSkip.price_before_vat}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-400">VAT:</span>
                        <span className="text-silver">£{selectedSkip.vat}</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="bg-gray-900 p-4 rounded-lg border border-gray-700">
                    <h3 className="font-bold text-silver mb-2">Restrictions</h3>
                    <div className="space-y-2">
                      <div className="flex items-center">
                        {selectedSkip.allowed_on_road ? (
                          <svg className="h-5 w-5 text-green-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                        ) : (
                          <svg className="h-5 w-5 text-red-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                          </svg>
                        )}
                        <span className={selectedSkip.allowed_on_road ? "text-green-400" : "text-red-400"}>
                          Allowed on Road: {selectedSkip.allowed_on_road ? "Yes" : "No"}
                        </span>
                      </div>
                      <div className="flex items-center">
                        {selectedSkip.allows_heavy_waste ? (
                          <svg className="h-5 w-5 text-green-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                        ) : (
                          <svg className="h-5 w-5 text-red-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                          </svg>
                        )}
                        <span className={selectedSkip.allows_heavy_waste ? "text-green-400" : "text-red-400"}>
                          Allows Heavy Waste: {selectedSkip.allows_heavy_waste ? "Yes" : "No"}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-gray-900 border-t border-gray-800 py-8 mt-12">
        <div className="container mx-auto px-4 text-center text-gray-500">
          <p>Imagery and information shown throughout this website may not reflect the exact shape or size specification</p>
          <p className="mt-2">© {new Date().getFullYear()} WE WANT WASTE. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}

export default App;