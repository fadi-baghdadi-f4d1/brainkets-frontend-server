import React from 'react';
import Image from 'next/image';
// import squareList from "../../../public/squares.svg";
// import list from "../../../public/list.svg";

interface ViewToggleButtonsProps {
  viewMode: 'grid' | 'list';
  setViewMode: (mode: 'grid' | 'list') => void;
}

const ViewToggleButtons: React.FC<ViewToggleButtonsProps> = ({ viewMode, setViewMode }) => {
  return (

    <div className="flex items-center space-x-1">

      <button
        className={`rounded-l-md p-3 border ${
          viewMode === 'grid'
            ? "bg-[#FDC90E] bg-opacity-30 border-[#FDC90E]"
            : "bg-[#E4E4E4]"
        }`}
        onClick={() => setViewMode('grid')}
      >
        <Image src={""} alt="Graph View" width={20} height={16} />
      </button>
      <button
        className={`rounded-r-md p-3 border ${
          viewMode === 'list'
            ? "bg-[#FDC90E] bg-opacity-30 border-[#FDC90E]"
            : "bg-[#E4E4E4]"
        }`}
        onClick={() => setViewMode('list')}
      >
        <Image src={""} alt="List View" height={16}  />
      </button>
    </div>
  );
};

export default ViewToggleButtons;
