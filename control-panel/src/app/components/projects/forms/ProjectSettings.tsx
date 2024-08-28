import React, { useState } from 'react';
import { FaWindowClose } from 'react-icons/fa';
import { IoIosArrowDown } from 'react-icons/io';
import Image from 'next/image';
import SelectUserModal from '../../modals/SelectClientModal'; 
import ActionDropdown from '@/components/common/EditDeleteDropdown';
import AddBoardForm from './AddBoardForm';

interface ProjectSettingFormProps {
  onClose: () => void;
}

const ProjectSettingForm: React.FC<ProjectSettingFormProps> = ({ onClose }) => {
  const [selectedPriority, setSelectedPriority] = useState<string | null>(null);
  const [selectedStatus, setSelectedStatus] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [isAddBoardFormOpen, setIsAddBoardFormOpen] = useState<boolean>(false);
  const [boards, setBoards] = useState<{ name: string; color: string }[]>([
    { name: 'Todo', color: '#CC0000' },
    { name: 'In Progress', color: '#488091' },
    { name: 'QA', color: '#F3B271' },
    { name: 'Completed', color: '#19B600' }
  ]);

  const handlePriorityChange = (priority: string) => {
    setSelectedPriority(priority);
  };

  const handleStatusChange = (status: string) => {
    setSelectedStatus(status);
  };

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const openAddBoardForm = () => {
    setIsAddBoardFormOpen(true);
  };

  const closeAddBoardForm = () => {
    setIsAddBoardFormOpen(false);
  };

  const handleAddBoard = (name: string, color: string) => {
    setBoards([...boards, { name, color }]);
  };

  return (
    <div className="fixed inset-0 top-0 left-0 min-h-screen flex items-end justify-end z-50">
      <div className="bg-[#F4F4F4] w-[750px] max-w-lg min-h-screen relative">
        {/* Header */}
        <div className='flex p-4 bg-white border-b border-b-[#E4E4E4] justify-between items-center'>
          <FaWindowClose onClick={onClose} className='text-3xl cursor-pointer' />
          <h2 className="text-center text-xl font-bold mt-1">Project Settings</h2>
          <button className="bg-[#FDC90E] hover:bg-black hover:text-[#FDC90E] text-black font-semibold rounded-lg py-1 px-6">
            Save
          </button>
        </div>
        
        <div className=" flex flex-col space-y-8 mx-[30px] mt-[30px]">
          {/* Priority */}
          <div>
            <label className="block font-semibold text-[20px] mb-2">Priority</label>
            <div className="flex space-x-4 w-full">
              {['Urgent', 'High', 'Medium', 'Low'].map((priority) => (
                <div
                  key={priority}
                  className={`flex w-full justify-center items-center bg-white rounded-lg p-1 font-semibold text-[15px] space-x-2 cursor-pointer ${
                    selectedPriority === priority ? 'border-2 border-[#606060]' : ''
                  }`}
                  onClick={() => handlePriorityChange(priority)}
                >
                  <span
                    className={`w-4 h-4 rounded-full ${
                      priority === 'Urgent'
                        ? 'bg-[#CC0000]'
                        : priority === 'High'
                        ? 'bg-[#F9781D]'
                        : priority === 'Medium'
                        ? 'bg-[#57A4FF]'
                        : 'bg-[#FDC90E]'
                    }`}
                  ></span>
                  <span>{priority}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Status */}
          <div>
            <label className="block font-semibold mb-2 text-[20px]">Status</label>
            <div className="flex space-x-4">
              {['Todo', 'In Progress', 'QA', 'Completed'].map((status) => (
                <div
                  key={status}
                  className={`flex justify-center items-center bg-white rounded-lg px-3 py-1 font-semibold text-[15px] space-x-2 cursor-pointer ${
                    selectedStatus === status ? 'border-2 border-[#606060]' : ''
                  }`}
                  onClick={() => handleStatusChange(status)}
                >
                  <span
                    className={`w-4 h-4 rounded-full ${
                      status === 'Todo'
                        ? 'bg-[#CC0000]'
                        : status === 'In Progress'
                        ? 'bg-[#488091]'
                        : status === 'QA'
                        ? 'bg-[#F3B271]'
                        : 'bg-[#19B600]'
                    }`}
                  ></span>
                  <span>{status}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Default Assignee */}
          <div>
            <label className="block font-semibold text-[20px] mb-2">Default Assignee</label>
            <div
              className="flex cursor-pointer w-full bg-white items-center border border-gray-300 rounded-lg p-2"
              onClick={openModal}
            >
              <Image
                src="/profile image.png"
                alt="Client"
                width={24}
                height={24}
                className="rounded-full mr-2"
              />
              <p className="flex-grow text-[#606060] font-medium text-[15px]">John Smith</p>
              <IoIosArrowDown className="text-xl" />
            </div>
          </div>

          {/* Boards */}
          <div>
            <div className='flex justify-between mb-2'>
              <label className="block font-semibold text-[20px]">Boards</label>
              <button
                className="bg-[#FDC90E] hover:bg-black hover:text-[#FDC90E] text-black font-semibold rounded-lg py-1 px-3 flex items-center"
                onClick={openAddBoardForm}
              >
                <span className="text-xl mr-2">+</span> Add Board
              </button>
            </div>
            <div className="bg-white rounded-lg p-5 border border-[#CFCFCF] flex flex-col space-y-5">
              {boards.map((board, index) => (
                <div key={index} className="flex justify-between items-center">
                  <div className="flex items-center">
                    <span
                      className={`w-4 h-4 rounded-full mr-2`}
                      style={{ backgroundColor: board.color }}
                    ></span>
                    <span className='font-semibold text-[15px]'>{board.name}</span>
                  </div>
                  {/* <ActionDropdown type="category" entityId={`board-${index}`} /> */}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Modal Overlay and Positioning */}
        {isModalOpen && (
          <div className="fixed inset-0 bg-black bg-opacity-50 z-40" onClick={closeModal}></div>
        )}
        {/* {isModalOpen && (
          <div className="absolute right-0 top-0  z-50">
            <SelectUserModal toggleModal={closeModal} />
          </div>
        )} */}
      </div>

      {/* Add Board Form Overlay */}
      {isAddBoardFormOpen && (
        <AddBoardForm onClose={closeAddBoardForm} onAddBoard={handleAddBoard} />
      )}
    </div>
  );
};

export default ProjectSettingForm;
