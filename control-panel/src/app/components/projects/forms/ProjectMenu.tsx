"use client";

import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import ProjectSettingForm from './ProjectSettings'; 
import Link from 'next/link';
import useLocale from '@/hooks/useLocale';
import { useModalContext } from '@/context/ModalContext';

interface ProjectImage {
  path: string;
}

interface ProjectMenuProps {
  projectId: number | null;
  projectImage: ProjectImage | null;
}

const ProjectMenu: React.FC<ProjectMenuProps> = ({ projectId, projectImage }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isOverlayOpen, setIsOverlayOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const locale = useLocale();

  const { toggleEditProjectModal, toggleProjectDetailsModal, toggleUsefulLinks } = useModalContext();

  const toggleMenu = () => {
    setIsMenuOpen(prevState => !prevState);
  };

  const handleEditProjectClick = () => {
    toggleEditProjectModal();
    toggleMenu();
  };

  const handleProjectDetailsClick = () => {
    toggleProjectDetailsModal();
    toggleMenu();
  };

  const handleUsefulLinksClick = () => {
    toggleUsefulLinks();
    toggleMenu();
  };  

  const handleClickOutside = (event: MouseEvent) => {
    if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
      setIsMenuOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleSettingsClick = () => {
    setIsOverlayOpen(true);
  };

  const closeOverlay = () => {
    setIsOverlayOpen(false);
  };

  return (
    <div  className="relative" ref={menuRef}>
      <button onClick={toggleMenu}>
        <Image
          className="beeflexSquare rounded-md"
          src={projectImage?.path || '/deadBee.png'}
          alt="Menu"
          width={50}
          height={50}
        />
      </button>
      <div className={`absolute z-50 right-0 top-12 bg-white border border-gray-300 rounded-md shadow-lg transition-transform duration-300 ease-in-out ${isMenuOpen ? 'opacity-100 transform scale-100' : 'opacity-0 transform scale-95 pointer-events-none'}`}>
        <ul className="py-1">
          <li className="flex items-center py-2 pr-6 hover:bg-gray-100 cursor-pointer">
            <Image src="/yellowSearch.svg" alt="Search Icon" width={16} height={16} className="mx-3" />
            Search
          </li>
          <Link href={`/tickets`} passHref>
            <li className="flex items-center pr-6 py-2 hover:bg-gray-100 cursor-pointer">
              <Image src="/tickets.svg" alt="Tickets Icon" width={16} height={16} className="mx-3" />
              Tickets
            </li>
          </Link>
          <li
            className="flex items-center pr-6 py-2 hover:bg-gray-100 cursor-pointer"
            onClick={handleProjectDetailsClick}
          >
            <Image src="/details.svg" alt="Details Icon" width={16} height={16} className="mx-3" />
            Details
          </li>
          <li className="flex items-center pr-6 py-2 hover:bg-gray-100 cursor-pointer" onClick={handleUsefulLinksClick}>
            <Image src="/links.svg" alt="Links Icon" width={16} height={16} className="mx-3" />
            Links
          </li>
          <li onClick={handleEditProjectClick} className="flex items-center pr-6 py-2 hover:bg-gray-100 cursor-pointer">
            <Image src="/edit.svg" alt="Edit Icon" width={16} height={16} className="mx-3" />
            Edit
          </li>
          <Link href={`/${locale}/projectDashboard`} passHref>
          <li className="flex items-center pr-6 py-2 hover:bg-gray-100 cursor-pointer">
            <Image src="/orangeDash.svg" alt="Dashboard Icon" width={16} height={16} className="mx-3" />
            Dashboard
          </li>
          </Link>
          <li
            className="flex items-center pr-6 py-2 hover:bg-gray-100 cursor-pointer"
            onClick={() => {
              handleSettingsClick();
              toggleMenu();
            }}
          >
            <Image src="/blackSetting.svg" alt="Settings Icon" width={16} height={16} className="mx-3" />
            Settings
          </li>
        </ul>
      </div>
      {isOverlayOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <ProjectSettingForm onClose={closeOverlay} />
        </div>
      )}
    </div>
  );
};

export default ProjectMenu;
