import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import { IoSearchOutline } from 'react-icons/io5';
import { IoIosArrowDown, IoIosArrowUp } from 'react-icons/io';
import { getProjects } from '@/services/projects/GetAllProjectsAPI';
import { useRouter } from 'next/navigation';
import useLocale from '@/hooks/useLocale';

interface ProjectImage {
  path: string;
}

interface Project {
  id: number;
  name: string;
  image: ProjectImage | null; // Updated to allow null
  status: string;
}

interface ProjectDropDownProps {
  projectId: number | null;
  projectName: string | null;
}

const statusColors: { [key: string]: string } = {
  "in progress": "#57A4FF",
  "to do": "#CC0000",
  "on hold": "#CC0000",
  completed: "#19B600",
  QA: "#FDC90E",
  "not started": "#999999",
};

const ProjectDropdown: React.FC<ProjectDropDownProps> = ({ projectId, projectName }) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [searchText, setSearchText] = useState('');
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [page, setPage] = useState(1);
  const [initialLoading, setInitialLoading] = useState(true);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [projectDetails, setProjectDetails] = useState<any>(null);
  const locale = useLocale();
  const router = useRouter();

  const fetchProjects = async () => {
    try {
      setLoading(true);
      const data = await getProjects(page, undefined, searchText, projectId?.toString()); // Exclude the projectId
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
    fetchProjects(); // Fetch projects initially
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [page, searchText]);

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchText(event.target.value);
    setPage(1); // Reset to first page on new search
    setProjects([]); // Clear projects list before new search
    fetchProjects(); // Fetch projects based on search query
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
      setIsDropdownOpen(false);
    }
  };

  const toggleDropdown = () => {
    setIsDropdownOpen((prev) => !prev);
  };

  const handleProjectClick = (projectId: number) => {
    sessionStorage.setItem('projectId', projectId.toString());
    router.push(`/${locale}/taskboard?id=${projectId}`);
  };
  

  return (
    <>
      <div className="flex-1 flex justify-center items-center">
        <h2 className="text-xl font-bold text-black">
          {projectName ? projectName : 'Projects'}
        </h2>
        {isDropdownOpen ? (
          <IoIosArrowUp
            className="text-black font-bold ml-2 mt-2 cursor-pointer"
            onClick={toggleDropdown}
          />
        ) : (
          <IoIosArrowDown
            className="text-black font-bold ml-2 mt-2 cursor-pointer"
            onClick={toggleDropdown}
          />
        )}
      </div>

      <div
        ref={containerRef}
        className={`absolute z-30 top-14 right-18 lg:right-24 w-64 bg-white rounded-lg shadow-lg overflow-hidden transition-all duration-500 ease-in-out ${
          isDropdownOpen ? 'max-h-64' : 'max-h-0'
        }`}
        style={{ overflowY: 'hidden' }}
      >
        <div className="relative z-30 flex items-center border-b border-gray-200 rounded-t-lg shadow-sm">
          {!searchText && (
            <IoSearchOutline className="text-[#606060] absolute left-4 text-xl font-bold" />
          )}
          <input
            type="text"
            placeholder="Search"
            value={searchText}
            onChange={handleSearchChange}
            className="bg-[#F4F4F4] text-center outline-none text-[#606060] font-medium m-2 rounded-lg p-2 w-full"
          />
        </div>

        <div className="overflow-y-auto z-50 mx-2 cursor-pointer" onScroll={handleScroll}>
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
            projects.map((project) => (
              <div key={project.id} onClick={() => handleProjectClick(project.id)} className="flex items-center p-2 border-b border-gray-200 hover:bg-[#F4F4F4]">
                <Image
                  src={project.image?.path || '/defaultBee.png'} // Use project.image.path safely
                  alt={project.name}
                  width={32}
                  height={32}
                  className="rounded-full mr-2"
                />
                <span className="flex-1">{project.name}</span>
                <span
                  className="w-3 h-3 rounded-full"
                  style={{ backgroundColor: statusColors[project.status] }}
                ></span>
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
    </>
  );
};

export default ProjectDropdown;
