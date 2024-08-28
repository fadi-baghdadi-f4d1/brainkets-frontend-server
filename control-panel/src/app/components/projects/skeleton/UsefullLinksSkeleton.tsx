// components/SkeletonLoader.tsx
import React from 'react';

const SkeletonLoader: React.FC = () => {
  return (
    <div className="bg-[#F4F4F4] h-screen shadow-lg w-full max-w-md flex flex-col">
      <div className='bg-white px-6 flex items-center h-16 p-2 w-full'>
        
        <div className="flex-grow text-center text-xl font-bold bg-gray-200 w-24 h-6 mx-auto mt-1 rounded"></div>
        <div className="w-8 h-8 rounded-md mx-2 bg-gray-200"></div>
      </div>
      <div className="w-full max-w-md space-y-4 p-4">
        {[...Array(8)].map((_, index) => (
          <div key={index} className="bg-white mx-4 mt-2 p-2 border border-[#C4C4C4] rounded-xl flex justify-between">
            <div className="w-3/4">
              <div className="bg-gray-200 h-4 mb-2 rounded"></div>
              <div className="bg-gray-200 h-4 rounded"></div>
            </div>
           
          </div>
        ))}
      </div>
    </div>
  );
};

export default SkeletonLoader;
