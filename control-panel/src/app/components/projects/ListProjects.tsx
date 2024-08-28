"use client";

import React from "react";
import Image from "next/image";
import DropdownMenu from "./ProjectDropdownMenu";
import Link from "next/link";
// import useLocale from "../../hooks/useLocale";
// import defaultProfile from "../../../../../public/Frame 8520.png"; // Default profile image
import defaultProject from "../../../public/defaultBee.png"; // Default project image
import SkeletonLoader from "./skeleton/ListProjectSkeleton"; // Import the SkeletonLoader

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
  clients: {
    id: string;
    userName: string;
    firstName: string;
    lastName: string;
    image: string | null;
  }[];
  tasksCount: number;
  image: {
    path: string;
  } | null;
}

interface ListProjectsProps {
  handleProjectDetailsClick: () => void;
  toggleUsefulLinks: () => void;
  page: number;
  status: string;
  projects: Project[];
  loading: boolean;
}

const ListProjects: React.FC<ListProjectsProps> = ({
  handleProjectDetailsClick,
  toggleUsefulLinks,
  page,
  status,
  projects,
  loading,
}) => {
  // const locale = useLocale();

  if (loading) {
    return <SkeletonLoader />;
  }

  return (
    <div className="mt-6 xl:mx-10 lg:mx-10">
      <div className="border rounded-md border-[#E4E4E4] overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y h-auto divide-gray-200 border rounded-md border-[#E4E4E4]">
            <thead>
              <tr>
                <th className="px-6 py-3 text-left text-[15px] font-semibold tracking-wider">Name</th>
                <th className="px-6 py-3 text-left text-[15px] font-semibold tracking-wider">Customer</th>
                <th className="px-6 py-3 text-left text-[15px] font-semibold tracking-wider">Project Members</th>
                <th className="px-6 py-3 text-left text-[15px] font-semibold tracking-wider">Status</th>
                <th className="px-6 py-3 text-left text-[15px] font-semibold tracking-wider"></th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {projects.map((project) => (
                <tr key={project.id}>
                  <td className="px-6 py-2 whitespace-nowrap">
                    <div className="flex items-center">
                      <span className="text-[15px] font-semibold">{project.name}</span>
                    </div>
                  </td>
                  <td className="px-6 py-2 whitespace-nowrap text-[15px] font-semibold">
                    {project.clients.length > 0
                      ? `${project.clients[0].firstName} ${project.clients[0].lastName}`
                      : "No client"}
                  </td>
                  <td className="px-6 py-2 whitespace-nowrap">
                    <div className="flex items-center">
                      {project.members.length > 0 ? (
                        project.members.map((member) => (
                          <Image
                            key={member.id}
                            src={member.image} // Handle null image case
                            alt={`${member.firstName} ${member.lastName}`}
                            width={30}
                            height={30}
                            className="h-[30px] w-[30px] rounded-full"
                          />
                        ))
                      ) : (
                        <div>No members available</div>
                      )}
                    </div>
                  </td>
                  <td className="px-6 py-2 whitespace-nowrap">
                    <div
                      className="w-5 h-5 inline-block rounded-full"
                      style={{ backgroundColor: statusColors[project.status] }}
                    ></div>
                  </td>
                  <td className="px-6 py-2 whitespace-nowrap">
                    <Link href={`/taskboard`} passHref>
                      <div className="flex cursor-pointer items-center space-x-2 text-[#FDC90E] font-semibold text-[15px]">
                        View Tasks
                      </div>
                    </Link>
                  </td>
                  <td className="px-6 py-2 whitespace-nowrap">
                    <div className="relative">
                      <DropdownMenu
                        handleProjectDetailsClick={handleProjectDetailsClick}
                        toggleUsefulLinks={toggleUsefulLinks}
                        projectId={project.id} // Pass the project ID here
                      />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ListProjects;
