import React from 'react';

const SkeletonLoader: React.FC = () => {
  return (
    <div className="h-screen overflow-y-scroll custom-scrollbar pb-6 shadow-lg w-full max-w-md flex flex-col bg-[#F4F4F4]">
      <div className="flex bg-white p-4 h-14 items-center mb-4 relative">
      
        <div className="flex-grow mx-4 bg-gray-300 h-6 rounded-md animate-pulse"></div>
        <div className="w-10 h-10 bg-gray-300 rounded-full animate-pulse"></div>
      </div>
      <div className="mb-4 items-center flex flex-col bg-white mx-6 rounded-md">
        <div className="h-28 w-28 bg-gray-300 rounded-full animate-pulse"></div>
      </div>
      <div className="mb-4 flex flex-col bg-white mx-6 rounded-md shadow-lg">
        <div className="mb-4 w-full py-1 bg-white-500 rounded-t-lg">
          <div className="h-6 bg-gray-300 rounded-md animate-pulse"></div>
        </div>
        <div className="mb-2 px-4">
          <div className="flex items-center mb-2">
            <div className="w-6 h-6 bg-gray-300 rounded-full animate-pulse"></div>
            <div className="ml-4 w-1/2 bg-gray-300 h-4 rounded-md animate-pulse"></div>
            <div className="ml-4 w-1/4 bg-gray-300 h-4 rounded-md animate-pulse"></div>
          </div>
          <div className="flex items-center mb-2">
            <div className="w-6 h-6 bg-gray-300 rounded-full animate-pulse"></div>
            <div className="ml-4 w-1/2 bg-gray-300 h-4 rounded-md animate-pulse"></div>
            <div className="ml-4 w-1/4 bg-gray-300 h-4 rounded-md animate-pulse"></div>
          </div>
          <div className="flex items-center mb-2">
            <div className="w-6 h-6 bg-gray-300 rounded-full animate-pulse"></div>
            <div className="ml-4 w-1/2 bg-gray-300 h-4 rounded-md animate-pulse"></div>
            <div className="ml-4 w-1/4 bg-gray-300 h-4 rounded-md animate-pulse"></div>
          </div>
        </div>
        <div className="mb-2 px-4">
          <div className="flex items-center mb-2">
            <div className="w-6 h-6 bg-gray-300 rounded-full animate-pulse"></div>
            <div className="ml-4 w-1/2 bg-gray-300 h-4 rounded-md animate-pulse"></div>
            <div className="ml-4 w-1/4 bg-gray-300 h-4 rounded-md animate-pulse"></div>
          </div>
        </div>
        <div className="mb-2 px-4">
          <div className="flex items-center mb-2">
            <div className="w-6 h-6 bg-gray-300 rounded-full animate-pulse"></div>
            <div className="ml-4 w-1/2 bg-gray-300 h-4 rounded-md animate-pulse"></div>
            <div className="ml-4 w-1/4 bg-gray-300 h-4 rounded-md animate-pulse"></div>
          </div>
        </div>
      </div>
      <div>

        <textarea
          readOnly
          className="mx-6  w-[90%] text-xs border border-[#C4C4C4] bg-gray-300 h-24 rounded-md animate-pulse"
          style={{ resize: 'none' }}
        />
      </div>
      <div>
      
        <div className="mx-6 border border-[#C4C4C4] text-xs  bg-gray-300 h-24 rounded-md animate-pulse"></div>
      </div>
    </div>
  );
};

export default SkeletonLoader;
