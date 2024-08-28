"use client";

import React, { useState, ChangeEvent, useRef, useEffect } from 'react';
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import { IoSearchOutline } from "react-icons/io5";
import Image from 'next/image';
import { FaPlus } from "react-icons/fa";
import { useModalContext } from '@/context/ModalContext';
import ProjectMenu from '../projects/forms/ProjectMenu'; // Ensure path is correct

interface TicketsHeadProps {
  handleProjectDetailsClick: () => void;
}

const TicketsHead: React.FC<TicketsHeadProps> = ({
  handleProjectDetailsClick,
}) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [searchText, setSearchText] = useState('');
  const dropdownRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const { toggleCreateTicketModal, toggleProjectDetailsModal, toggleAddTicketStatusColumnModal, toggleUsefulLinks, toggleSortTicketsModal } = useModalContext();

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const toggleProjectDetails = () => {
    handleProjectDetailsClick();
  };

  const toggleUsefulLinksModal = () => {
    toggleUsefulLinks();
  };

  const handleSearchChange = (event: ChangeEvent<HTMLInputElement>) => {
    setSearchText(event.target.value);
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
      setIsDropdownOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const projects = [
    { name: "Time Square", image: "/timesquare.png", statusColor: "red" },
    { name: "SMC", image: "/medical.png", statusColor: "green" },
    { name: "K Decor", image: "/kassemdecor.png", statusColor: "red" },
    { name: "IQ Mall", image: "/iqmall.png", statusColor: "blue" },
    { name: "IQ Mall", image: "/iqmall.png", statusColor: "blue" },
    // Add more projects as needed
  ];

  useEffect(() => {
    if (dropdownRef.current) {
      if (isDropdownOpen) {
        dropdownRef.current.style.height = `${dropdownRef.current.scrollHeight}px`;
      } else {
        dropdownRef.current.style.height = '0px';
      }
    }
  }, [isDropdownOpen]);

  return (
    <div ref={containerRef}>
      <div className="flex mx-10 flex-row justify-between items-center mt-4 border-[#C4C4C4] border-b-2 pb-2">
        <div className="hidden sm:flex flex-row items-center">
          <Image src="/human.svg" alt="taskboard" width={24} height={24} className="pr-3" />
          <h2 className="text-black text-xl font-semibold">Angelina Smith Tickets</h2>
          <p className="text-[#707070] ml-4 mt-1 font-semibold text-[14px]">Home . Angelina Smith Tickets</p>
          <button
            onClick={toggleCreateTicketModal}
            className="flex items-center ml-4 px-4 py-2 bg-[#FDC90E] text-black font-semibold rounded-lg hover:bg-black hover:text-[#FDC90E]"
          >
            <FaPlus className="w-4 h-4 mr-2" />
            Add Ticket
          </button>
        </div>
        
        <div className="flex flex-row items-center relative justify-center sm:justify-between">
          <h2 className="text-xl font-bold text-black sm:hidden">BeeFlex</h2>
          {isDropdownOpen ? (
            <IoIosArrowUp className="text-black font-bold ml-2 cursor-pointer" onClick={toggleDropdown} />
          ) : (
            <IoIosArrowDown className="text-black font-bold ml-2 cursor-pointer" onClick={toggleDropdown} />
          )}
          <div
            ref={dropdownRef}
            className={`absolute z-30 top-14 right-0 sm:right-24 w-64 bg-white rounded-lg shadow-lg overflow-hidden transition-all duration-500 ease-in-out ${
              isDropdownOpen ? 'max-h-64' : 'max-h-0'
            }`}
            style={{ overflowY: 'hidden' }}
          >
            <div className='relative z-30 flex items-center border-b-0 border-gray-200 rounded-t-lg shadow-sm'>
              {!searchText && <IoSearchOutline className='text-[#606060] absolute left-4 text-xl font-bold' />}
              <input
                type="text"
                placeholder="Search"
                value={searchText}
                onChange={handleSearchChange}
                className="bg-[#F4F4F4] text-center outline-none text-[#606060] font-medium m-2 rounded-lg p-2 w-full"
              />
            </div>
            <div className="overflow-y-auto z-50 mx-2 cursor-pointer">
              {projects.map((project, index) => (
                <div
                  key={index}
                  className={`flex items-center p-2 ${index !== projects.length - 1 ? 'border-b' : ''} border-gray-200 hover:bg-[#F4F4F4]`}
                >
                  <Image src={project.image} alt={project.name} width={32} height={32} className="rounded-full mr-2" />
                  <span className="flex-1">{project.name}</span>
                  <span className={`w-3 h-3 bg-${project.statusColor}-500 rounded-full`}></span>
                </div>
              ))}
            </div>
          </div>
          <div onClick={toggleAddTicketStatusColumnModal} className="hidden sm:flex border mx-4 rounded-lg cursor-pointer border-black flex items-center justify-center">
            <Image src="/addColumn.svg" alt="column" width={20} height={20} className="m-2 h-4 w-4" />
          </div>
          <div onClick={toggleSortTicketsModal} className="hidden sm:flex border mr-4 rounded-lg cursor-pointer border-black flex items-center justify-center">
            <Image src="/sort.svg" alt="sort" width={22} height={22} className="m-2 h-4 w-4" />
          </div>
          
          {/* <ProjectMenu  /> */}
        </div>
      </div>
    </div>
  );
}

export default TicketsHead;
