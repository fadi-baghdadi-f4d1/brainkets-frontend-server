"use client";
import React, { useState, useEffect } from 'react';
import Swal from 'sweetalert2';
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import { Task, Member } from "@/types/Task";
import SelectProjectModal from "./SelectProjectModal";
import { getStatus } from "@/services/tasks/status/GetStatusApi";
import { getMembers } from "@/services/tasks/members/GetMembersApi";
import SelectMemberForm from "./SelectMemberForm";
import { moveTaskToProject } from '@/services/tasks/tasksCrud/MoveTaskToProjectApi';

interface MoveTaskModalProps {
  task: Task | null;
  onClose: () => void;
}

interface StatusOption {
  id: number;
  name: string;
  color: string;
}

const MoveTaskModal: React.FC<MoveTaskModalProps> = ({ onClose, task }) => {
  const [isStatusOpen, setIsStatusOpen] = useState(false);
  const [status, setStatus] = useState("");
  const [isProjectModalOpen, setIsProjectModalOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState<{ name: string; id: string } | null>(null);
  const [statusOptions, setStatusOptions] = useState<{ id: number; name: string; color: string }[]>([]);
  const [selectedStatus, setSelectedStatus] = useState<string | null>(null);
  const [isMemberModalOpen, setIsMemberModalOpen] = useState(false);
  const [selectedMembers, setSelectedMembers] = useState<Member[]>([]);
  const [members, setMembers] = useState<Member[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (selectedProject?.id) {
      const fetchStatusOptions = async () => {
        try {
          const response = await getStatus(Number(selectedProject.id), false);
          const statuses = response.boards.map((board: any) => ({
            id: board.id,
            name: board.name,
            color: board.color,
          }));
          setStatusOptions(statuses);
        } catch (error) {
          console.error('Failed to fetch status options:', error);
        }
      };

      const fetchMembers = async () => {
        try {
          const response = await getMembers(1, Number(selectedProject.id), "");
          setMembers(response.members);
        } catch (error) {
          console.error('Failed to fetch members:', error);
        }
      };

      fetchStatusOptions();
      fetchMembers();
    } else {
      setStatusOptions([]);
      setMembers([]);
    }
  }, [selectedProject]);

  const handleProjectSelect = (projectName: string, projectId: string) => {
    setSelectedProject({ name: projectName, id: projectId });
    setIsProjectModalOpen(false);
  };

  const handleStatusClick = () => {
    setIsStatusOpen(!isStatusOpen);
  };

  const handleProjectClick = () => {
    setIsProjectModalOpen(!isProjectModalOpen);
  };

  const handleStatusChange = (statusOption: StatusOption) => {
    setStatus(statusOption.name);
    setSelectedStatus(statusOption.id.toString()); // Set status ID instead of name
    setIsStatusOpen(false);
  };
  
  
  const handleMemberClick = () => {
    setIsMemberModalOpen(!isMemberModalOpen);
  };

  const handleMemberSelect = (selectedMembers: Member[]) => {
    setSelectedMembers(selectedMembers);
    setIsMemberModalOpen(false);
  };
  

  const handleSave = async () => {
    console.log('Selected Status:', selectedStatus);
    console.log('Selected Project:', selectedProject);
    console.log('Selected Members:', selectedMembers);
  
    if (!task || !selectedProject || !selectedStatus || selectedMembers.length === 0) {
      Swal.fire({
        title: 'Validation Error!',
        text: 'Please fill all required fields.',
        icon: 'warning',
        confirmButtonText: 'OK',
        customClass: {
          confirmButton: 'custom-ok-button'
        }
      });
      return;
    }
  
    setLoading(true);
  
    try {
      const payload = {
        id: task.id,
        projectId: selectedProject.id,
        status: selectedStatus, // Send status ID
        assignedTo: selectedMembers.map(member => member.id).join(','),
      };
      
      await moveTaskToProject(payload);
  
      Swal.fire({
        title: 'Success!',
        text: 'Task moved successfully!',
        icon: 'success',
        confirmButtonText: 'OK',
        customClass: {
          confirmButton: 'custom-ok-button'
        }
      });
      onClose(); // Close the modal on success
    } catch (error: any) {
      Swal.fire({
        title: 'Error!',
        text: error.message || 'Failed to move task',
        icon: 'error',
        confirmButtonText: 'OK',
        customClass: {
          confirmButton: 'custom-ok-button'
        }
      });
    } finally {
      setLoading(false);
    }
  };
  
  return (
    <div className="flex flex-col items-center justify-center p-6 bg-white rounded-lg shadow-lg w-[500px] mx-auto">
      <h2 className="text-xl font-bold text-center mb-6">Move To Project</h2>

      <div className="w-full mb-6">
        <label className="sr-only" htmlFor="assignee">Project</label>
        <button
          onClick={handleProjectClick}
          className="w-full flex flex-row justify-between items-center p-3 border rounded-lg text-[#606060] focus:outline-none text-left"
        >
          {selectedProject ? selectedProject.name : "Project"}
          <IoIosArrowDown className="text-black pointer-events-none" />
        </button>
      </div>

      <div className="w-full mb-4 relative">
        <label className="sr-only" htmlFor="status">Status</label>
        <button
          onClick={handleStatusClick}
          className="w-full flex flex-row justify-between items-center p-3 border rounded-lg text-[#606060] focus:outline-none text-left"
        >
          {status || "Status"}
          {isStatusOpen ? (
            <IoIosArrowUp className="text-black pointer-events-none" />
          ) : (
            <IoIosArrowDown className="text-black pointer-events-none" />
          )}
        </button>

        <div
          className={`absolute left-0 w-full mt-1 bg-white border rounded-lg overflow-hidden transition-all duration-300 ease-in-out ${
            isStatusOpen ? 'max-h-60 opacity-100' : 'max-h-0 opacity-0 pointer-events-none'
          }`}
          style={{ zIndex: 10 }}
        >
          <ul className="flex flex-col text-left">
            {statusOptions.length > 0 ? (
              statusOptions.map((statusOption) => (
                <li
                  key={statusOption.id}
                  className="p-3 flex items-center cursor-pointer hover:bg-gray-100"
                  onClick={() => handleStatusChange(statusOption)} // Pass the statusOption object
                >
                  <div className="w-4 h-4 rounded-full mr-2" style={{ backgroundColor: statusOption.color }} />
                  {statusOption.name}
                </li>
              ))              
            ) : (
              <li className="p-3">No statuses available</li>
            )}
          </ul>
        </div>
      </div>

      <div className="w-full mb-6 relative">
        <label className="sr-only" htmlFor="assignee">Assignee</label>
        <button
          onClick={handleMemberClick}
          className="w-full flex flex-row justify-between items-center p-3 border rounded-lg text-[#606060] focus:outline-none text-left"
        >
          {selectedMembers.length > 0 ? `${selectedMembers[0].firstName} ${selectedMembers[0].lastName}` : "Assignee"}
          <IoIosArrowDown className="text-black pointer-events-none" />
        </button>

        {isMemberModalOpen && (
          <SelectMemberForm
            selectedMembers={new Set(selectedMembers.map((member) => member.id))}
            onSelectMembers={handleMemberSelect}
            toggleModal={() => setIsMemberModalOpen(false)}
            projectId={selectedProject?.id ? Number(selectedProject.id) : null}
          />
        )}
      </div>

      <div className="flex w-full">
        <button
          onClick={onClose}
          className="flex-1 py-3 mr-2 border border-black text-black rounded-lg text-center font-semibold hover:bg-black hover:text-[#FDC90E]"
        >
          Cancel
        </button>
        <button
        type='submit'
          onClick={handleSave}
          className={`flex-1 py-3 ${loading ? 'bg-gray-300' : 'bg-[#FDC90E]'} text-white rounded-lg text-center font-semibold hover:bg-black hover:text-[#FDC90E]`}
          disabled={loading}
        >
          {loading ? 'Saving...' : 'Save'}
        </button>
      </div>

      {isProjectModalOpen && 
        <SelectProjectModal 
          onClose={() => setIsProjectModalOpen(false)}
          onSelectProject={handleProjectSelect}
        />
      }
    </div>
  );
};

export default MoveTaskModal;
