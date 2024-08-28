import React, { useState, useRef, useEffect } from "react";
import Image from "next/image";
import DropdownMenu from "./ProjectDropdownMenu";
// import useLocale from "../../hooks/useLocale";
// import defaultProfile from "../../../../../public/Frame 8520.png";
import defaultProject from "../../../public/defaultBee.png";
import { useRouter } from 'next/navigation';
import SkeletonLoader from "./skeleton/GridProjectSkeleton"; // Import your skeleton loader

// Status to color mapping
const statusColors: { [key: string]: string } = {
  "in progress": "#57A4FF",
  "to do": "#CC0000",
  "on hold": "#CC0000",
  completed: "#19B600",
  QA: "#FDC90E",
  "not started": "#999999",
};

// Define types for project and members
interface Project {
  id: number;
  name: string;
  status: string;
  members: {
    id: string;
    userName: string;
    firstName: string;
    lastName: string;
    image: string | null;
    isProjectAdmin: number;
  }[];
  tasksCount: number;
  image: {
    path: string;
  } | null;
}

interface GridProjectsProps {
  handleProjectDetailsClick: () => void;
  toggleUsefulLinks: () => void;
  page: number;
  status: string;
  projects: Project[];
  loading: boolean;
}

const GridProjects: React.FC<GridProjectsProps> = ({
  handleProjectDetailsClick,
  toggleUsefulLinks,
  page,
  status,
  projects,
  loading,
}) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const dropdownRef = useRef<HTMLDivElement>(null);
  // const locale = useLocale();
  const router = useRouter();

  const handleProjectClick = (projectId: number) => {
    sessionStorage.setItem('projectId', projectId.toString());
    router.push(`/taskboard?id=${projectId}`);
  };


  const handleDropdownToggle = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (
      dropdownRef.current &&
      !dropdownRef.current.contains(event.target as Node)
    ) {
      setIsDropdownOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleMenuClick = (event: React.MouseEvent) => {
    event.stopPropagation();
  };

  if (loading) return <SkeletonLoader />;

  return (
    <section className="mx-4 md:mx-10 pb-10 mt-10 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-5 xl:gap-8 lg:gap-6">
      {projects.map((project) => (
        <div
          key={project.id}
          className="bg-[#F4F4F4] rounded-md flex flex-col justify-start items-center shadow-sm border-2 border-[#999999] relative"
        >
          <div className="relative w-full">
            <div onClick={() => handleProjectClick(project.id)}>
              <Image
                src={project.image?.path || defaultProject} // Handle null image case
                alt={project.name}
                width={230}
                height={180}
                className="w-full rounded-t-md h-[200px]"
              />
            </div>
            <div
              onClick={handleMenuClick}
              className="absolute top-2 right-2 cursor-pointer"
            >
              <DropdownMenu
                handleProjectDetailsClick={handleProjectDetailsClick}
                projectId={project.id} // Pass the project ID here
              />
            </div>
          </div>
          <div className="flex flex-row justify-between items-center w-full mt-3 px-5">
            <div className="font-semibold text-[20px]">{project.name}</div>
            <div
              className="w-[20px] h-[20px] rounded-full"
              style={{ backgroundColor: statusColors[project.status] }}
            ></div>
          </div>
          <div className="flex justify-start items-center w-full mt-3 px-5">
            {project.members.length > 0 ? (
              project.members.map((member) => (
                <div
                  key={member.id}
                  className="relative -ml-2"
                >
                  <Image
                    src={member.image} // Handle null image case
                    alt={`${member.firstName} ${member.lastName}`}
                    width={30}
                    height={30}
                    className="rounded-full object-cover w-[30px] h-[30px]" // Add object-cover to maintain aspect ratio
                    quality={100}
                  />
                </div>
              ))
            ) : (
              <div>No members available</div>
            )}
          </div>
          <div className="flex justify-start items-center w-full mt-5 px-5">
            <div className="flex justify-start items-center bg-white space-x-2 w-[120px] rounded-full mb-3 px-3">
              <div>
                <Image src="/task-square-2 1.svg" alt="projects" width={20} height={20} />
              </div>
              <span className="text-[#606060] font-medium whitespace-nowrap">
                {project.tasksCount} Tasks
              </span>
            </div>
          </div>
        </div>
      ))}
    </section>
  );
};

export default GridProjects;
