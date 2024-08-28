"use client";
import React, { useState, ChangeEvent, useRef, useEffect } from 'react';
import Image from 'next/image';
import { FaPlus } from "react-icons/fa";
import { useModalContext } from '@/context/ModalContext';
import ProjectMenu from '../projects/forms/ProjectMenu'; 
import { useSelector } from 'react-redux';
import { RootState } from '@/redux/store';
import { getProjectDetails } from "@/services/projects/GetSingleProject";
import ProjectDropdown from './modals/ProjectDropDown';
import SortModal from './modals/SortModal';


interface TaskboardHeadProps {
  handleProjectDetailsClick: () => void;
  projectId: number | null; 
}



const TaskboardHead: React.FC<TaskboardHeadProps> = ({ projectId, handleProjectDetailsClick }) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [projectDetails, setProjectDetails] = useState<any>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [isSortModalOpen, setIsSortModalOpen] = useState(false);
  const { toggleCreateTaskModal, toggleAddStatusColumnModal } = useModalContext();
  const user = useSelector((state: RootState) => state.user);

  useEffect(() => {
    const fetchProjectDetails = async () => {
      if (projectId) {
        try {
          const data = await getProjectDetails(projectId);
          setProjectDetails(data);
        } catch (error) {
          console.error('Error fetching project details:', error);
        }
      }
    };
    fetchProjectDetails();
  }, [projectId]);


  const handleAddStatusColumnClick = () => {
    toggleAddStatusColumnModal();
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
      setIsDropdownOpen(false);
    }
  };

  const handleSortModal = () => {
    setIsSortModalOpen(true);
  };

  const handleSortModalClose = () => {
    setIsSortModalOpen(false);
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const capitalizeFirstLetter = (string: string) => {
    return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
  };
  

  return (
    <div ref={containerRef}>
      {projectId && (
        <div className="flex mx-10 flex-row justify-between items-center mt-4 border-[#C4C4C4] border-b-2 pb-2">
          <div className="flex-row flex items-center">
            <Image src="/human.svg" alt="taskboard" width={24} height={24} className="pr-3 hidden lg:flex" />
            <h2 className="text-black text-xl font-semibold hidden lg:flex">
  {capitalizeFirstLetter(user.firstName)} {capitalizeFirstLetter(user.lastName)} Tasks
</h2>
<p className="text-[#707070] ml-4 mt-1 font-semibold text-[14px] hidden lg:flex">
  Home . {capitalizeFirstLetter(user.firstName)} {capitalizeFirstLetter(user.lastName)} Tasks
</p>

            <button
              onClick={toggleCreateTaskModal}
              className="hidden lg:flex md:flex items-center ml-4 px-4 py-2 bg-[#FDC90E] text-black font-semibold rounded-lg hover:bg-black hover:text-[#FDC90E]"
            >
              <FaPlus className="w-4 h-4 mr-2" />
              Add Task
            </button>
          </div>
          <button 
            onClick={toggleCreateTaskModal}
            className="ml-4 p-2 rounded-full bg-[#FDC90E] hover:bg-black hover:text-[#FDC90E] text-black md:hidden"
          >
            <FaPlus className="w-4 h-4" />
          </button>

          <div className="flex flex-row items-center justify-between w-full md:w-auto relative">


            <ProjectDropdown projectName={projectDetails?.name} projectId={projectId} />

            <div className="flex items-center justify-end">
              <div onClick={handleAddStatusColumnClick} className='border hidden md:block lg:block mx-4 rounded-lg cursor-pointer border-black flex items-center justify-center'>
                <Image src="/addColumn.svg" alt="column" width={20} height={20} className="m-2 h-4 w-4" />
              </div>
              <div onClick={handleSortModal} className='border mr-4 hidden md:block lg:block rounded-lg cursor-pointer border-black flex items-center justify-center'>
                <Image src="/sort.svg" alt="sort" width={22} height={22} className="m-2 h-4 w-4" />
              </div>
              <ProjectMenu projectId={projectId} projectImage={projectDetails?.image} />
            </div>
          </div>
        </div>
      )}
      {isSortModalOpen &&
       <SortModal 
       projectId={projectId}
       onClose={handleSortModalClose} />}
    </div>
  );
};

export default TaskboardHead;
