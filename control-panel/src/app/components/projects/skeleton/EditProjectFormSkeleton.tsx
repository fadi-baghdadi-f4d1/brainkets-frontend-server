import React from 'react';

const SkeletonLoader: React.FC = () => {
  return (
    <div className="p-6 space-y-4">
      <div className="h-6 bg-gray-300 rounded w-1/3"></div>
      <div className="space-y-2">
        <div className="h-4 bg-gray-300 rounded w-full"></div>
        <div className="h-4 bg-gray-300 rounded w-full"></div>
      </div>
      <div className="space-y-4">
        <div className="h-12 bg-gray-300 rounded w-full"></div>
        <div className="h-12 bg-gray-300 rounded w-full"></div>
      </div>
      <div className="space-y-2">
        <div className="h-4 bg-gray-300 rounded w-full"></div>
        <div className="h-4 bg-gray-300 rounded w-full"></div>
      </div>
      <div className="h-12 bg-gray-300 rounded w-full"></div>
    </div>
  );
};

export default SkeletonLoader;
