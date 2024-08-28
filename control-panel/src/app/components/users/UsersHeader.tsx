"use client";
import React, { useState } from 'react';
import Image from 'next/image';
// import usersIcon from '../../../public/users.svg';
import { LuPlus } from "react-icons/lu";
import { useModalContext } from "@/context/ModalContext";
import ViewToggleButtons from '../common/ViewToggleButtons'; 
// import leftArrow from '../../../public/left arrow.svg';
// import rightArrow from '../../../public/right arrow.svg';
import { IoSearchOutline } from "react-icons/io5";

interface UsersHeaderProps {
  setViewMode: (mode: 'grid' | 'list') => void;
  viewMode: 'grid' | 'list';
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  onSearch: (query: string) => void;
}

const UsersHeader: React.FC<UsersHeaderProps> = ({ setViewMode, viewMode, currentPage, totalPages, onPageChange, onSearch }) => {
  const { toggleCreateUserModal } = useModalContext();
  const [searchQuery, setSearchQuery] = useState<string>('');

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value;
    setSearchQuery(query);
    onSearch(query);  // Trigger search
  };

  return (
    <div>
      {/* Title Section */}
      <div className='flex items-center border-b-[1px] border-[#C4C4C4] pb-[5px] mb-4'>
        <Image
          src={""}
          alt="users"
          width={50}
          height={50}
          className="ml-4"
        />
        <span className='font-semibold text-[20px] ml-2'>Users</span>
      </div>

      {/* Main Content Section */}
      <div className='flex items-center justify-between mx-10'>
        {/* Add User Button */}
        <div
          className='flex items-center bg-[#FDC90E] rounded-md px-3 py-2 cursor-pointer hover:bg-black hover:text-[#FDC90E]'
          onClick={toggleCreateUserModal}
        >
          <LuPlus className='text-[20px] mr-2' />
          <span className='font-semibold text-[15px]'>Add User</span>
        </div>

        {/* Search Input */}
        <div className="relative w-[600px]">
          <IoSearchOutline className="text-2xl text-[#606060] absolute left-3 top-2" />
          <input
            type="text"
            placeholder="Start typing to search"
            value={searchQuery}
            onChange={handleSearchChange}  // Update search query on input change
            className="w-full text-[#606060] border border-[#C4C4C4] rounded-lg p-2 pl-10"
          />
        </div>

        {/* Pagination and View Toggle */}
        <div className='flex items-center space-x-4'>
          {/* Pagination Controls */}
          <div className='font-semibold text-[15px] mr-2'>
            {((currentPage - 1) * 12) + 1}-{Math.min(currentPage * 12, totalPages * 12)}/{totalPages * 12}
          </div>
          <div className='flex items-center space-x-1'>
            <button
              className='bg-[#E4E4E4] rounded-l-md p-3'
              onClick={() => onPageChange(currentPage - 1)}
              disabled={currentPage === 1}
            >
              <Image
                src={""}
                alt="Previous"
                width={10}
                height={10}
              />
            </button>
            <button
              className='bg-[#E4E4E4] rounded-r-md p-3'
              onClick={() => onPageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
            >
              <Image
                src={""}
                alt="Next"
                width={10}
                height={10}
              />
            </button>
          </div>
          {/* View Toggle Buttons */}
          <ViewToggleButtons viewMode={viewMode} setViewMode={setViewMode} />
        </div>
      </div>
    </div>
  );
};

export default UsersHeader;
