import React from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Environment } from '@react-three/drei';
import SkipModel from './SkipModel';

const SkipViewer = ({ selectedSkip, rotation }) => (
  <div className="w-full lg:w-2/3">
    <div className="bg-gray-950 rounded-xl p-4 sm:p-2 border border-gray-700 shadow-2xl flex flex-col min-h-[80vh]">
      <h3 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-2 text-silver border-b border-gray-700 pb-2">
        Choose Skip Size
      </h3>

      {/* 3D Canvas Area with Responsive Full Height */}
      <div className="relative flex-1 min-h-[320px] sm:min-h-[400px] rounded-lg border border-gray-700 overflow-hidden">
        {selectedSkip ? (
          <div className="absolute inset-0">
            <Canvas shadows camera={{ position: [0, 2, 5], fov: 50 }}>
              <ambientLight intensity={0.5} />
              <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} intensity={1} castShadow />
              <pointLight position={[-10, -10, -10]} intensity={0.5} />
              <SkipModel size={selectedSkip.size} rotationEnabled={rotation} />
              <Environment preset="city" />
              <OrbitControls
                enableZoom
                enablePan
                enableRotate
                autoRotate={rotation}
                autoRotateSpeed={rotation ? 1 : 0}
              />
            </Canvas>
            <div className="absolute bottom-2 sm:bottom-4 left-2 sm:left-4 bg-gray-900 bg-opacity-80 px-3 py-1 sm:px-4 sm:py-2 rounded-lg">
              <p className="text-silver text-xs sm:text-sm ">
                Selected: {selectedSkip.size} Yard Skip - May not reflect Exact Shape and Size
              </p>
            </div>
          </div>
        ) : (
          <div className="h-full flex items-center justify-center bg-gray-900 rounded-lg">
            <p className="text-gray-500">Select a skip to view 3D model</p>
          </div>
        )}
      </div>

      {/* Skip Details */}
      {selectedSkip && (
        <div className="mt-4 sm:mt-6 grid grid-cols-1 md:grid-cols-2 gap-2 sm:gap-4 overflow-y-auto max-h-[25vh] sm:max-h-[30vh]">
          <div className="bg-gray-900 p-3 sm:p-4 rounded-lg border border-gray-700 text-sm">
            <h3 className="font-semibold text-silver mb-1 sm:mb-2 text-base">Skip Details</h3>
            <div className="space-y-1 sm:space-y-2">
              <DetailRow label="Size" value={`${selectedSkip.size} Yards`} />
              <DetailRow label="Hire Period" value={`${selectedSkip.hire_period_days} days`} />
              <DetailRow label="Price (ex VAT)" value={`£${selectedSkip.price_before_vat}`} />
              <DetailRow label="VAT" value={`£${selectedSkip.vat}`} />
            </div>
          </div>

          <div className="bg-gray-900 p-3 sm:p-4 rounded-lg border border-gray-700 text-sm">
            <h3 className="font-semibold text-silver mb-1 sm:mb-2 text-base">Restrictions</h3>
            <div className="space-y-1 sm:space-y-2">
              <RestrictionRow label="Allowed on Road" value={selectedSkip.allowed_on_road} />
              <RestrictionRow label="Allows Heavy Waste" value={selectedSkip.allows_heavy_waste} />
            </div>
          </div>
        </div>
      )}
    </div>
  </div>
);

const DetailRow = ({ label, value }) => (
  <div className="flex justify-between text-xs sm:text-sm">
    <span className="text-gray-400">{label}:</span>
    <span className="text-silver">{value}</span>
  </div>
);

const RestrictionRow = ({ label, value }) => (
  <div className="flex items-center text-xs sm:text-sm">
    {value ? (
      <svg className="h-4 w-4 text-green-500 mr-1.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
      </svg>
    ) : (
      <svg className="h-4 w-4 text-red-500 mr-1.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
      </svg>
    )}
    <span className={value ? 'text-green-400' : 'text-red-400'}>
      {label}: {value ? 'Yes' : 'No'}
    </span>
  </div>
);

export default SkipViewer;
