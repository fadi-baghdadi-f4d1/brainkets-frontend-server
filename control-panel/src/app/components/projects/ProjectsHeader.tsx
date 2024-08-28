import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import projectIcon from '../../../public/projects.svg';
import leftArrow from '../../../public/left arrow.svg';
import rightArrow from '../../../public/right arrow.svg';
import ViewToggleButtons from '@/components/common/ViewToggleButtons';
import { LuPlus } from "react-icons/lu";
import { useTranslations } from 'next-intl';
import { getProjects } from '../../services/projects/GetAllProjectsAPI'; // Adjust import path as needed

interface ProjectsHeaderProps {
  viewMode: 'grid' | 'list';
  setViewMode: (mode: 'grid' | 'list') => void;
  handleCreateProjectClick: () => void;
  currentPage: number;
  onPageChange: (newPage: number) => void;
  status: string; // Add status prop

}

const ProjectsHeader: React.FC<ProjectsHeaderProps> = ({
  viewMode,
  setViewMode,
  handleCreateProjectClick,
  currentPage,
  onPageChange,
  status,

}) => {
  const t = useTranslations('project');
  const [totalProjects, setTotalProjects] = useState<number>(0);
  const [totalPages, setTotalPages] = useState<number>(0);

  // Function to fetch projects and calculate total pages
  const fetchTotalProjects = async () => {
    try {
      const response = await getProjects(currentPage, status); // Pass status to API call if needed
     
      const totalProjects = response.total;
      console.log('Total Projects:', totalProjects);
      setTotalProjects(totalProjects);
      setTotalPages(Math.ceil(totalProjects / 12)); // Assuming 12 projects per page
    } catch (error) {
      console.error('Failed to fetch projects:', error);
    }
  };

  useEffect(() => {
    fetchTotalProjects();
  }, [currentPage, status]); // Fetch projects when currentPage or status changes

  useEffect(() => {
    if (currentPage !== 1) {
      onPageChange(1); // Reset page number to 1 when status changes
    }
  }, [status]); // Trigger page reset on status change

  const handlePrevPage = () => {
    if (currentPage > 1) {
      onPageChange(currentPage - 1);
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      onPageChange(currentPage + 1);
    }
  };

  return (
    <div>
      <div className='flex justify-center lg:justify-start mt-[20px] border-b-[1px] border-[#C4C4C4] pb-[5px]'>
        <Image
          src={projectIcon}
          alt="projects"
          width={50}
          height={50}
          className="ml-1 lg:ml-7 -mt-1"
        />
        <span className='font-semibold text-[20px]'>{t('project')}</span>
      </div>

      <div className='flex justify-between mt-5 mx-4 md:mx-10 mb-5'>
        <div
          className='hidden sm:flex justify-center items-center bg-[#FDC90E] rounded-md px-3 cursor-pointer hover:bg-black hover:text-[#FDC90E]'
          onClick={handleCreateProjectClick}
        >
          <LuPlus className='-ml-1 hover:text-[#FDC90E] font-semibold text-[20px]' />
          <span className='font-semibold text-[15px]'>Create Project</span>
        </div>

        <div className='sm:hidden flex justify-center items-center w-[40px] h-[40px] bg-[#FDC90E] rounded-full cursor-pointer hover:bg-black hover:text-[#FDC90E]' onClick={handleCreateProjectClick}>
          <LuPlus className='text-[24px]' />
        </div>

        <div className='flex items-center space-x-3'>
          <div className='font-semibold text-[15px] mr-2'>{`Page ${currentPage} of ${totalPages}`}</div>

          <div className='flex items-center space-x-1'>
            <button className='bg-[#E4E4E4] rounded-l-md p-3' onClick={handlePrevPage} disabled={currentPage === 1}>
              <Image
                src={leftArrow}
                alt="Previous"
                width={10}
                height={10}
              />
            </button>
            <button className='bg-[#E4E4E4] rounded-r-md p-3' onClick={handleNextPage} disabled={currentPage === totalPages}>
              <Image
                src={rightArrow}
                alt="Next"
                width={10}
                height={10}
              />
            </button>
            <div className='pl-3'>
              <ViewToggleButtons viewMode={viewMode} setViewMode={setViewMode} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectsHeader;
