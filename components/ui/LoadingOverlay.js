import React from 'react';

const LoadingOverlay = () => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50 z-50">
      <div className="text-white text-lg">Loading...</div>
    </div>
  );
};

export default LoadingOverlay;
