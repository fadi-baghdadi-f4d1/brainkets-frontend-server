import React, { useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import { HiOutlineDotsVertical } from 'react-icons/hi';
import ticketIcon from '../../../public/tickets.svg';
import detailsIcon from '../../../public/details.svg';
import linkIcon from '../../../public/links.svg';
import editIcon from '../../../public/edit.svg';
import deleteIcon from '../../../public/delete.svg';
// import useLocale from '../../hooks/useLocale';
import Link from 'next/link';
import DeleteModal from '@/components/common/DeleteModal';
import UsefulLinks from '@/components/projects/forms/UsefulLinks';
import CreateLinks from '@/components/projects/forms/CreateLinks';
import EditProjectForm from '@/components/projects/forms/EditProjectForm';
import ProjectDetails from '@/components/projects/forms/ProjectDetails';

interface DropdownMenuProps {
  handleProjectDetailsClick?: () => void;
  toggleUsefulLinks?: (projectId?: number) => void;
  projectId?: number;
}

const DropdownMenu: React.FC<DropdownMenuProps> = ({ projectId }) => {
  const [open, setOpen] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [isUsefulLinksOpen, setIsUsefulLinksOpen] = useState(false);
  const [isCreateLinksOpen, setIsCreateLinksOpen] = useState(false);
  const [isEditProjectFormOpen, setIsEditProjectFormOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const [isProjectDetailsOpen, setIsProjectDetailsOpen] = useState(false); 
  // const locale = useLocale();

  const toggleDropdown = () => {
    setOpen(prev => !prev);
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
      setOpen(false);
      setIsUsefulLinksOpen(false);
      setIsCreateLinksOpen(false);
      setIsEditProjectFormOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleMenuClick = (event: React.MouseEvent) => {
    event.stopPropagation();
  };

  const openDeleteModal = (event: React.MouseEvent) => {
    event.stopPropagation();
    setShowDeleteModal(true);
    setOpen(false);
  };

  const closeDeleteModal = () => setShowDeleteModal(false);

  const handleUsefulLinksClick = (event: React.MouseEvent) => {
    event.stopPropagation();
    setIsUsefulLinksOpen(true);
    setOpen(false);
  };

  const handleEditClick = (event: React.MouseEvent) => {
    event.stopPropagation();
    setIsEditProjectFormOpen(true);
    setOpen(false);
  };

  const handleProjectDetailsClick = (event: React.MouseEvent) => {
    event.stopPropagation();
    setIsProjectDetailsOpen(true);
    setOpen(false);
  };

  // Functions to handle opening and closing modals for user and category selection
  const toggleSelectUserModal = () => {
    // Your implementation for toggling user modal
  };

  const toggleSelectCategoryModal = () => {
    // Your implementation for toggling category modal
  };

  return (
    <div className='relative' ref={dropdownRef}>
      <div className='cursor-pointer' onClick={toggleDropdown}>
        <HiOutlineDotsVertical />
      </div>
      <div
        className={`transition-all duration-300 ease-out
          absolute right-2 top-6 w-32 bg-white rounded-lg shadow-lg z-40
          ${open ? 'scale-y-100 opacity-100' : 'scale-y-0 opacity-0'} `}
        style={{ transformOrigin: 'top' }}
      >
        <div className='flex flex-col space-y-2 w-full p-3'>
          <Link href={`/tickets`} passHref>
            <div className='flex space-x-2 border-b border-[#E4E4E4] pb-1 cursor-pointer' onClick={(e) => { handleMenuClick(e); setOpen(false); }}>
              <Image src={ticketIcon} alt='ticket' width={20} height={20} />
              <span className='font-medium'>Tickets</span>
            </div>
          </Link>

          <div className='flex space-x-2 border-b border-[#E4E4E4] pb-1 cursor-pointer' onClick={handleProjectDetailsClick}>
            <Image src={detailsIcon} alt='details' width={20} height={20} />
            <span className='font-medium'>Details</span>
          </div>

          <div className='flex space-x-2 border-b border-[#E4E4E4] pb-1 cursor-pointer' onClick={handleUsefulLinksClick}>
            <Image src={linkIcon} alt='link' width={18} height={18} />
            <span className='font-medium'>Links</span>
          </div>

          <div className='flex space-x-2 border-b border-[#E4E4E4] pb-1 cursor-pointer' onClick={handleEditClick}>
            <Image src={editIcon} alt='edit' width={18} height={18} />
            <span className='font-medium'>Edit</span>
          </div>

          <div className='flex space-x-2 pb-1 cursor-pointer' onClick={(e) => openDeleteModal(e)}>
            <Image src={deleteIcon} alt='delete' width={18} height={18} />
            <span className='font-medium'>Delete</span>
          </div>
        </div>
      </div>

      {isUsefulLinksOpen && (
        <div className="fixed inset-0 flex items-center justify-end bg-black bg-opacity-50 z-50">
          <UsefulLinks
            projectId={projectId} // Pass projectId to UsefulLinks
            toggleModal={() => setIsUsefulLinksOpen(false)}
            toggleCreateLinks={() => setIsCreateLinksOpen(true)}
          />
        </div>
      )}

{isProjectDetailsOpen && (
        <div className="fixed inset-0 flex items-center justify-end bg-black bg-opacity-50 z-50">
          <ProjectDetails
            projectId={projectId} 
            onClose={() => setIsProjectDetailsOpen(false)}
          />
        </div>
      )}

      {isCreateLinksOpen && (
        <div className="fixed inset-0 flex items-center justify-end bg-black bg-opacity-50 z-50">
          <CreateLinks
            projectId={projectId} // Pass projectId to CreateLinks
            toggleModal={() => setIsCreateLinksOpen(false)}
            onSave={(title, url) => {
              // Handle the save action (e.g., update state or fetch data again)
            }}
          />
        </div>
      )}

      {isEditProjectFormOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <EditProjectForm
            projectId={projectId}
            onClose={() => setIsEditProjectFormOpen(false)}
          />
        </div>
      )}

      <DeleteModal
        isOpen={showDeleteModal}
        onClose={closeDeleteModal}
        entityId={projectId ?? 0}
        entityType="project"
      />
    </div>
  );
};

export default DropdownMenu;
