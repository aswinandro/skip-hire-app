import React, { useState, useEffect } from 'react';
import { fetchSkipsByLocation } from './services/api';
import SkipCard from './components/SkipCard';
import SkipModel from './components/SkipModel';
import LoadingSpinner from './components/LoadingSpinner';
import Header from './components/Header';
import SkipList from './components/SkipList';
import SkipViewer from './components/SkipViewer';
import Footer from './components/Footer';
import './App.css';

function App() {
  const [skips, setSkips] = useState([]);
  const [selectedSkip, setSelectedSkip] = useState(null);
  const [loading, setLoading] = useState(true);
  const [rotation, setRotation] = useState(true);

  useEffect(() => {
    const getSkips = async () => {
      try {
        setLoading(true);
        const data = await fetchSkipsByLocation('NR32', 'Lowestoft');
        setSkips(data);
        if (data.length > 0) {
          setSelectedSkip(data[0]);
        }
      } catch (error) {
        console.error('Error fetching skips:', error);
      } finally {
        setLoading(false);
      }
    };

    getSkips();
  }, []);

  const handleSelectSkip = (skip) => {
    setSelectedSkip(skip);
  };

  const toggleRotation = () => {
    setRotation(!rotation);
  };

  if (loading) return <LoadingSpinner />;

  return (
    <div className="min-h-screen bg-gray-900 text-silver">
      <Header rotation={rotation} toggleRotation={toggleRotation} />

      <div className="container mx-auto my-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row gap-6 w-full">
          <SkipViewer
            selectedSkip={selectedSkip}
            rotation={rotation}
          />
          <SkipList
            skips={skips}
            selectedSkip={selectedSkip}
            handleSelectSkip={handleSelectSkip}
          />
          
        </div>
      </div>

      <Footer />
    </div>
  );
}

export default App;
