import React, { useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import { useModalContext } from '@/context/ModalContext';
import DeleteModal from '@/components/common/DeleteModal';
import HighlightTask from './HighlightTask';
import EditTaskModal from '@/components/taskboard/modals/EditTaskModal';
import { Task } from "@/types/Task";
import MoveTaskModal from '@/components/taskboard/modals/MoveTaskModal';

interface TaskMenuProps {
  task: Task | null;
  showMenu: boolean;
  toggleMenu: (event: React.MouseEvent, task: Task) => void;
  modalType: 'task' | 'ticket'; 
  entityId: number; 
  entityType: 'user' | 'project' | 'task' | 'ticket' | 'finance' | 'project_categories' | 'project_departments' | 'designations' | 'announcement' | 'links' | null;
}

const TaskMenu: React.FC<TaskMenuProps> = ({ showMenu, toggleMenu, modalType, entityType, entityId, task }) => {
  const { toggleEditTaskModal, toggleEditTicketModal, toggleMoveTaskModal } = useModalContext();
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const [isHighlightTaskModalOpen, setIsHighlightTaskModalOpen] = useState(false);
  const [editTaskModalOpen, setEditTaskModalOpen] = useState(false);
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);
  const [actionType, setActionType] = useState<'edit' | 'clone' | null>(null); // New state to track action type
  const [moveTaskModalOpen, setMoveTaskModalOpen] = useState(false);


  const closeMenu = () => {
    if (dropdownRef.current) {
      dropdownRef.current.classList.remove('opacity-100');
      dropdownRef.current.classList.add('opacity-0');
    }
  };

  const openDeleteModal = (event: React.MouseEvent) => {
    setIsDeleteModalOpen(true);
    closeMenu();
  };

  const openHighlightTaskModal = (event: React.MouseEvent) => {
    event.stopPropagation();
    console.log('Entity ID for Highlight:', entityId); 
    setIsHighlightTaskModalOpen(true);
    closeMenu();
  };

  const handleOptionClick = (event: React.MouseEvent) => {
    event.stopPropagation();
    closeMenu();
  };

  const closeDeleteModal = () => setIsDeleteModalOpen(false);

  const handleClickOutside = (event: MouseEvent) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
      closeMenu();
    }
  };

  useEffect(() => {
    if (showMenu) {
      dropdownRef.current?.classList.add('opacity-100');
      dropdownRef.current?.classList.remove('opacity-0');
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [showMenu]);

  const handleEditTask = (event: React.MouseEvent) => {
    if (task) {
      setSelectedTask(task);
      setActionType('edit');
      setEditTaskModalOpen(true);
      closeMenu();
    }
    event.stopPropagation();
  };

  const handleCloneClick = (event: React.MouseEvent) => {
    if (task) {
      setSelectedTask(task);
      setActionType('clone');
      setEditTaskModalOpen(true);
      closeMenu();
    }
    event.stopPropagation();
  };


  const handleMoveClick = (event: React.MouseEvent) => {
    if (task) {
      setSelectedTask(task);
      setMoveTaskModalOpen(true);
      closeMenu();
    }
    event.stopPropagation();
  };

  return (
    <>
      {showMenu && (
        <div
          ref={dropdownRef}
          className="fixed task-menu bg-white rounded-xl shadow-md right-0 mt-2 w-48 transition-opacity duration-300"
          style={{ top: '100%' }} 
        >
          <ul>
            <li onClick={handleOptionClick} className='p-2 hover:rounded-t-xl cursor-pointer flex flex-row border-b-[#F4F4F4] border-b-2 hover:bg-[#F4F4F4]'>
              <Image src="/movetonext.svg" alt="Move to Next" width={20} height={20} className="mr-2" />
              Move to Next
            </li>
            <li onClick={openHighlightTaskModal} className='p-2 cursor-pointer flex flex-row border-b-[#F4F4F4] border-b-2 hover:bg-[#F4F4F4]'>
              <Image src="/highlight.svg" alt="Highlight" width={16} height={16} className="mr-2 mt-1" />
              Highlight
            </li>
            <li onClick={handleCloneClick} className='p-2 cursor-pointer flex flex-row border-b-[#F4F4F4] border-b-2 hover:bg-[#F4F4F4]'>
              <Image src="/clone.svg" alt="Clone" width={16} height={16} className="mr-2 mt-1" />
              Clone
            </li>
            <li onClick={handleMoveClick} className='p-2 cursor-pointer flex flex-row border-b-[#F4F4F4] border-b-2 hover:bg-[#F4F4F4]'>
              <Image src="/move.svg" alt="Move" width={16} height={16} className="mr-2 mt-1" />
              Move
            </li>
            <li onClick={handleEditTask} className='p-2 cursor-pointer flex flex-row border-b-[#F4F4F4] border-b-2 hover:bg-[#F4F4F4]'>
              <Image src="/editicon.svg" alt="Edit" width={16} height={16} className="mr-2 mt-1" />
              Edit
            </li>
            <li onClick={openDeleteModal} className='p-2 cursor-pointer flex flex-row hover:rounded-b-xl hover:bg-[#F4F4F4]'>
              <Image src="/deleteicon.svg" alt="Delete" width={16} height={16} className="mr-2 mt-1" />
              Delete
            </li>
          </ul>
        </div>
      )}
      {moveTaskModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <MoveTaskModal
            task={selectedTask}
            onClose={() => setMoveTaskModalOpen(false)}
          />
        </div>
      )}
      {editTaskModalOpen && (
        <div className="fixed inset-0 flex items-end justify-end bg-black bg-opacity-50 z-50">
          <EditTaskModal
            actiontype={actionType || 'edit'} 
            task={selectedTask}
            onClose={() => setEditTaskModalOpen(false)}
          />
        </div>
      )}
      {isHighlightTaskModalOpen && (
        <HighlightTask entityId={entityId} onClose={() => setIsHighlightTaskModalOpen(false)} />
      )}
      <DeleteModal
        isOpen={isDeleteModalOpen}
        onClose={closeDeleteModal}
        entityId={entityId}
        entityType={entityType}
      />
    </>
  );
};

export default TaskMenu;
