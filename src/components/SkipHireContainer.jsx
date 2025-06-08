import React, { useState, useEffect } from 'react';
import { fetchSkipsByLocation } from '../services/api';
import Header from './Header';
import SkipViewer from './SkipViewer';
import SkipList from './SkipList';
import Footer from './Footer';
import LoadingSpinner from './LoadingSpinner';

const SkipHireContainer = () => {
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
        if (data.length > 0) setSelectedSkip(data[0]);
      } catch (error) {
        console.error('Error fetching skips:', error);
      } finally {
        setLoading(false);
      }
    };
    getSkips();
  }, []);

  const handleSelectSkip = (skip) => setSelectedSkip(skip);
  const toggleRotation = () => setRotation(!rotation);

  if (loading) return <LoadingSpinner />;

  return (
    <div className='bg-gray-950'>
      <Header rotation={rotation} toggleRotation={toggleRotation} />
      <main className="container mx-auto px-4 ">
        <div className="flex flex-col lg:flex-row gap-6 lg:h-[calc(100vh-160px)]">
          <SkipViewer selectedSkip={selectedSkip} rotation={rotation} />
          <SkipList
            skips={skips}
            selectedSkip={selectedSkip}
            handleSelectSkip={handleSelectSkip}
          />
        </div>
              <Footer />
      </main>

    </div>
  );
};

export default SkipHireContainer;
