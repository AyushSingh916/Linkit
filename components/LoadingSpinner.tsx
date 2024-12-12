// LoadingSpinner.tsx
import React from 'react';

const LoadingSpinner = () => {
  return (
    <div className="flex justify-center items-center">
      <div className="w-8 h-8 border-4 border-t-4 border-t-custom-yellow border-gray-300 rounded-full animate-spin"></div>
    </div>
  );
};

export default LoadingSpinner;
