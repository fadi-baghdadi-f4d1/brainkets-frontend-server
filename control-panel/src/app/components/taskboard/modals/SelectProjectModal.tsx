"use client";
import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import { FaWindowClose } from "react-icons/fa";
import { IoSearchOutline } from "react-icons/io5";
import { getProjects } from '@/services/projects/GetAllProjectsAPI';
import { useSearchParams } from 'next/navigation';

interface SelectProjectModalProps {
  onClose: () => void;
  onSelectProject: (projectName: string, projectId: string) => void;
  exceptId?: number; // Add optional exceptId prop
}

const statusColors: { [key: string]: string } = {
  "in progress": "#57A4FF",
  "to do": "#CC0000",
  "on hold": "#CC0000",
  completed: "#19B600",
  QA: "#FDC90E",
  "not started": "#999999",
};

const SelectProjectModal: React.FC<SelectProjectModalProps> = ({ onClose, onSelectProject, exceptId }) => {
  const [projects, setProjects] = useState<any[]>([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [initialLoading, setInitialLoading] = useState(true);
  const searchInputRef = useRef<HTMLInputElement>(null);

  const searchParams = useSearchParams(); // Initialize searchParams
  const projectIdString = searchParams.get('id');

  useEffect(() => {
    if (searchInputRef.current) {
      searchInputRef.current.focus();
    }
    fetchProjects(); // Fetch initial projects
    document.body.style.overflow = 'hidden'; // Prevent background scrolling
    return () => {
      document.body.style.overflow = 'auto'; // Enable scrolling when modal closes
    };
  }, []);

  const fetchProjects = async () => {
    try {
      setLoading(true);
      const data = await getProjects(page, undefined, searchQuery, projectIdString); // Pass exceptId here
      setProjects((prevProjects) => [...prevProjects, ...data.projects]);
      setHasMore(data.projects.length > 0); // Stop loading if no more projects
    } catch (error) {
      console.error('Error fetching projects:', error);
    } finally {
      setLoading(false);
      setInitialLoading(false);
    }
  };

  const handleScroll = (e: React.UIEvent<HTMLDivElement, UIEvent>) => {
    if (loading || !hasMore) return;

    const { scrollTop, scrollHeight, clientHeight } = e.currentTarget;
    if (scrollHeight - scrollTop <= clientHeight + 100) {
      setPage((prevPage) => prevPage + 1);
    }
  };

  useEffect(() => {
    if (page > 1) {
      fetchProjects(); // Fetch more projects when the page changes
    }
  }, [page]);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
    setPage(1); // Reset to first page on new search
    setProjects([]); // Clear projects list before new search
    fetchProjects(); // Fetch projects based on search query
  };

  const handleProjectSelect = (projectName: string, projectId: string) => {
    onSelectProject(projectName, projectId); // Call the callback with the selected project name
    onClose(); // Close the modal
  };

  return (
    <div className="fixed inset-0 flex items-end justify-end bg-black bg-opacity-50 z-50">
      <div className="bg-[#F4F4F4] z-80 h-screen shadow-lg w-full max-w-md flex flex-col">
        <div className='bg-white px-6 flex items-center h-16 p-2 w-full'>
          <FaWindowClose className="text-3xl cursor-pointer" onClick={onClose} />
          <h2 className="flex-grow text-center text-xl font-bold">Select Project</h2>
        </div>

        <div className="relative m-5 mb-4">
          <IoSearchOutline className="text-3xl text-[#606060] absolute left-3 top-3 w-5 h-5" />
          <input
            type="text"
            placeholder="Start typing to search"
            ref={searchInputRef}
            onChange={handleSearch}
            className="w-full text-[#606060] border border-[#C4C4C4] rounded-lg p-2 pl-10"
          />
        </div>

        <div className="flex-grow mx-4 overflow-y-auto custom-scrollbar" onScroll={handleScroll}>
          {initialLoading ? (
            // Skeleton loader when loading the first batch of projects
            <div className="space-y-4">
              {[...Array(5)].map((_, index) => (
                <div key={index} className="animate-pulse flex items-center space-x-4">
                  <div className="w-10 h-10 bg-gray-300 rounded-full"></div>
                  <div className="flex-1">
                    <div className="h-4 bg-gray-300 rounded w-3/4"></div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            projects.map((project, index) => (
              <div key={index}
              onClick={() => handleProjectSelect(project.name, project.id)}
              className="flex items-center justify-between mb-2 px-2">
                <div className="flex items-center w-full py-2 cursor-pointer">
                  <Image src={project.image?.path || '/defaultBee.png'} alt={project.name} width={35} height={40} className="rounded-full mr-2" />
                  <span className='font-medium'>{project.name}</span>
                </div>
                <div
                  className="w-[20px] h-[20px] rounded-full"
                  style={{ backgroundColor: statusColors[project.status] }}
                ></div>
              </div>
            ))
          )}
          {/* Loading spinner for infinite scroll */}
          {loading && hasMore && (
            <div className="flex justify-center py-4">
              <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-gray-900"></div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SelectProjectModal;
