import React from 'react';
import {
  MapPin,
  Trash2,
  Truck,
  ShieldCheck,
  CalendarDays,
  CreditCard,
  RotateCcw
} from 'lucide-react';

const steps = [
  { label: 'Postcode', icon: MapPin },
  { label: 'Waste Type', icon: Trash2 },
  { label: 'Select Skip', icon: Truck },
  { label: 'Permit Check', icon: ShieldCheck },
  { label: 'Choose Date', icon: CalendarDays },
  { label: 'Payment', icon: CreditCard }
];

const Header = ({ currentStep = 2, rotation, toggleRotation }) => (
  <header className="pt-6 bg-black text-white relative">
    <div className="container mx-auto px-4">

      {/* Stepper */}
      <div className="flex justify-between items-center text-sm text-gray-500 border-b border-gray-700 pb-2 overflow-x-auto">
        {steps.map((step, index) => {
          const Icon = step.icon;
          const isActive = index === currentStep;
          const isCompleted = index < currentStep;

          return (
            <div key={index} className="flex items-center space-x-2">
              <div className="flex items-center space-x-1">
                <Icon className={`w-4 h-4 ${isActive || isCompleted ? 'text-blue-400' : 'text-gray-600'}`} />
                <span className={`hidden md:inline ${isActive ? 'text-blue-400' : 'text-gray-400'}`}>
                  {step.label}
                </span>
              </div>
              {index < steps.length - 1 && (
                <span className="mx-2 h-0.5 w-6 bg-gray-600"></span>
              )}
            </div>
          );
        })}
      </div>

      {/* Subtitle and Rotate toggle aligned in same row */}
      <div className="flex items-center justify-between mt-2 mb-2">
        <p className="text-gray-400 text-sm">Premium Skip Hire - 3D Visualization</p>
        <button
          onClick={toggleRotation}
          className="p-1 rounded-md hover:bg-gray-800 transition"
          title={rotation ? 'Pause Rotation' : 'Start Rotation'}
        >
          <RotateCcw className="w-4 h-4 text-gray-300" />
        </button>
      </div>
    </div>
  </header>
);

export default Header;
