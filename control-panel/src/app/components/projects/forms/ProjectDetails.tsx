import React, { useState, useEffect, useRef } from "react";
import { FaWindowClose } from "react-icons/fa";
import Image from "next/image";
import beeflex from "../../../../public/bee.svg";
// import useLocale from "@/hooks/useLocale";
import { useRouter } from "next/navigation";
import { useModalContext } from "@/context/ModalContext";
import DropdownMenu from "./ProjectDetailsDropDown";
import { getProjectDetails } from "@/services/projects/GetSingleProject"; // Import the function
import defaultProject from "../../../../public/defaultBee.png";
// import defaultProfile from "../../../../../../public/Frame 8520.png";
import { getLinks } from "@/services/projects/GetAllLinks";
import SkeletonLoader from "../skeleton/ProjectDetailsSekelton";

interface ProjectDetailsProps {
  onClose: () => void;
  projectId?: number;
}
interface Link {
  id: number;
  title: string;
  link: string;
}

const ProjectDetails: React.FC<ProjectDetailsProps> = ({
  onClose,
  projectId,
}) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  // const locale = useLocale();
  const router = useRouter(); // Use useRouter for navigation
  const { toggleEditProjectModal, toggleUsefulLinks } = useModalContext();
  const [project, setProject] = useState<any>(null); // State for project details
  const [loading, setLoading] = useState(false); // State for loading status
  const [error, setError] = useState<string | null>(null); // State for error message
  const [links, setLinks] = useState<Link[]>([]);

  useEffect(() => {
    if (projectId) {
      setLoading(true);
      getLinks(projectId)
        .then((data) => {
          setLinks(data);
          setLoading(false);
        })
        .catch((err) => {
          setError(err.message);
          setLoading(false);
        });
    }
  }, [projectId]);

  useEffect(() => {
    if (projectId) {
      setLoading(true);
      getProjectDetails(projectId)
        .then((data) => {
          setProject(data);
          setLoading(false);
        })
        .catch((err) => {
          setError(err.message);
          setLoading(false);
        });
    }
  }, [projectId]);

  const handleNavigation = (path: string) => {
    onClose(); // Close the modal
    router.push(`/${path}`); // Navigate to the new page
  };

  const handleProjectClick = () => {
    toggleEditProjectModal();
  };

  const handleUsefulLinksClick = () => {
    toggleUsefulLinks();
  };

  if (loading) return <SkeletonLoader />;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="h-screen overflow-y-scroll custom-scrollbar pb-6 shadow-lg w-full max-w-md flex flex-col bg-[#F4F4F4]">
      <div className="flex bg-white p-4 h-14 items-center mb-4 relative">
        <FaWindowClose className="text-2xl cursor-pointer" onClick={onClose} />
        <h2 className="flex-grow text-center text-lg font-bold">
          Project Details
        </h2>

        <DropdownMenu
          dropdownRef={dropdownRef}
          isDropdownOpen={isDropdownOpen}
          setIsDropdownOpen={setIsDropdownOpen}
          handleNavigation={handleNavigation}
          handleProjectClick={handleProjectClick}
          handleUsefulLinksClick={handleUsefulLinksClick}
        />
      </div>
      <div className="mb-4 items-center flex flex-col bg-white mx-6 rounded-md">
        <Image
          src={project?.image?.path || defaultProject}
          alt="Project Logo"
          width={112}
          height={112}
          className="h-28 w-28 object-cover"
        />
      </div>
      <div className="mb-4 flex flex-col bg-white mx-6 rounded-md shadow-lg">
        <div className="mb-4 w-full py-1 bg-orange-500 rounded-t-lg">
          <h3 className="text-white text-center text-xl font-bold">
            {project?.name || "BeeFlex"}
          </h3>
        </div>
        <div className="mb-2 px-4">
          <div className="flex items-center mb-2">
            <Image
              src="/blueBoy.svg"
              alt="Assigned By"
              width={15}
              height={15}
              className="mr-2"
            />
            <span className="text-black font-medium w-1/2 text-xs mr-2">
              Assigned By
            </span>
            <Image
              src={project?.assignedBy?.image}
              alt="Profile"
              width={20}
              height={20}
              className="mr-2 w-5 h-5 rounded-full"
            />
            <span className="text-[#606060] font-medium text-xs">
              {project?.assignedBy?.firstName} {project?.assignedBy?.lastName}
            </span>
          </div>
          <div className="flex items-center mb-2">
            <Image
              src="/yellowCalendar.svg"
              alt="Start Date"
              width={15}
              height={15}
              className="mr-2"
            />
            <span className="text-black w-1/2 font-medium text-xs mr-2">
              Start Date
            </span>
            <span className="text-[#606060] font-medium text-xs">
              {project?.startDate || "Jun 20, 2024"}
            </span>
          </div>
          <div className="flex items-center mb-2">
            <Image
              src="/orangeCalendar.svg"
              alt="Due Date"
              width={15}
              height={15}
              className="mr-2"
            />
            <span className="text-black w-1/2 font-medium text-xs mr-2">
              Due Date
            </span>
            <span className="text-[#606060] font-medium text-xs">
              {project?.dueDate || "July 20, 2024"}
            </span>
          </div>
        </div>
        <div className="mb-2 px-4">
          <div className="flex items-center mb-2">
            <Image
              src="/progress.svg"
              alt="Progress"
              width={15}
              height={15}
              className="mr-2"
            />
            <span className="text-black w-1/2 font-medium text-xs mr-2">
              Progress
            </span>
            <div className="w-1/4 h-1 bg-gray-200 rounded-full">
              <div
                className="h-full bg-green-500 rounded-full"
                style={{ width: `${project?.progress}%` }}
              ></div>
            </div>
            <span className="text-black font-medium text-xs ml-2">
              {project?.progress}
            </span>
          </div>
        </div>
        <div className="mb-2 px-4">
          <div className="flex items-start mb-2">
            <Image
              src="/purplePeople.svg"
              alt="Assigned to"
              width={15}
              height={15}
              className="mr-2"
            />
            <span className="text-black w-1/2 font-medium text-xs mr-2">
              Assigned to
            </span>
            <div className="flex flex-col">
              {project?.members?.map((member: any, index: number) => (
                <div key={index} className="flex items-center mb-2">
                  <Image
                    src={member.image || defaultProfile}
                    alt={member.userName}
                    width={20}
                    height={20}
                    className="mr-2 w-5 h-5 rounded-full"
                  />
                  <span className="text-[#606060] font-medium text-xs">
                    {member.firstName} {member.lastName}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="mb-2 px-4">
          <div className="flex items-center mb-2">
            <Image
              src="/redCategory.svg"
              alt="Category"
              width={15}
              height={15}
              className="mr-2"
            />
            <span className="text-black w-1/2 font-medium text-xs mr-2">
              Category
            </span>
            <span className="text-[#606060] font-medium text-xs">
              {project?.categoryName}
            </span>
          </div>
        </div>
        <div className="mb-2 px-4">
          <div className="flex items-start mb-2">
            <Image
              src="/clientHand.svg"
              alt="Clients"
              width={15}
              height={15}
              className="mr-2"
            />
            <span className="text-black w-1/2 font-medium text-xs mr-2">
              Clients
            </span>
            <div className="flex flex-col">
              {project?.clients?.map((client: any, index: number) => (
                <div key={index} className="flex items-center mb-2">
                  <Image
                    src={client.image || defaultProfile}
                    alt={client.userName}
                    width={20}
                    height={20}
                    className="rounded-full mr-2 w-5 h-5"
                  />
                  <span className="text-[#606060] font-medium text-xs">
                    {client.firstName} {client.lastName}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div>
        <h4 className="text-xs  mx-6 pb-2 font-semibold">
          Project Description
        </h4>
        <textarea
          readOnly
          value={project?.description || "no description"}
          className="mx-6 bg-white p-2 rounded-md w-[90%] text-xs border border-[#C4C4C4]"
          style={{ resize: "none" }}
        />
      </div>

      <div>
    <h4 className="text-xs mx-6 pb-2 font-semibold mt-2">Useful Links</h4>
    <div className="mx-6 border border-[#C4C4C4] text-xs bg-white p-2 rounded-md">
        {links.length > 0 ? (
            <ul className="text-xs text-[#57A4FF]">
                {links.map((link) => (
                    <li key={link.id} className="pb-1 border-b border-b-[#C4C4C4] last:border-none mt-1">
                        <a
                            href={`https://${link.link}`}
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            {link.link}
                        </a>
                    </li>
                ))}
            </ul>
        ) : (
            <div className="text-center text-gray-500">No links available.</div>
        )}
    </div>
</div>

    </div>
  );
};

export default ProjectDetails;
