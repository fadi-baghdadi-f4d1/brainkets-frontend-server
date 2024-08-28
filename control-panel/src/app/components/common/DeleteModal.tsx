"use client";
import React, { useState } from 'react';
import Lottie from 'react-lottie';
import alertAnimation from '../../../../public/Alert-Animation.json';
import Swal from 'sweetalert2';
import Loader from '../../components/common/loader/loader';
import { removeAnnouncement } from '@/services/home/announcement/RemoveAnnouncementApi';
import { deleteProject } from '@/services/projects/DeleteProject';
import { deleteOption } from '../../services/lists/DeleteOptionApi';
import { deleteLink } from '../../services/projects/DeleteLink';
import { deleteTask } from '../../services/tasks/tasksCrud/DeleteTaskApi';

interface DeleteModalProps {
  isOpen: boolean;
  onClose: () => void;
  entityId: number;
  entityType: 'user' | 'project' | 'task' | 'ticket' | 'finance' | 'project_categories' | 'project_departments' |
   'designations' | 'announcement' | 'links' | 'finance_categories' | null;
}

const DeleteModal: React.FC<DeleteModalProps> = ({ isOpen, onClose, entityId, entityType }) => {
  const [loading, setLoading] = useState<boolean>(false);

  // Return null early if the modal is not open
  if (!isOpen) return null;

  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: alertAnimation,
    rendererSettings: {
      preserveAspectRatio: 'xMidYMid slice'
    }
  };

  const handleDelete = async () => {
    try {
      setLoading(true);

      if (entityType === 'announcement') {
        await removeAnnouncement(entityId);
      } else if (entityType === 'project') {
        await deleteProject({ id: entityId });
      } else if (entityType === 'links') {
        await deleteLink({ id: entityId });
      } else if (entityType === 'task') {
        await deleteTask({ id: entityId });
      } else {
        await deleteOption({ id: entityId, type: entityType as string });
      }
      Swal.fire({
        icon: 'success',
        title: 'Deleted!',
        text: `The ${entityType} has been deleted successfully.`,
        confirmButtonText: 'OK',
        customClass: {
          confirmButton: 'custom-ok-button'
        }
      });
    } catch (error) {
      console.error('Deletion failed:', error);
      Swal.fire({
        icon: 'error',
        title: 'Error!',
        text: 'There was an issue deleting the item. Please try again.',
        confirmButtonText: 'OK',
        customClass: {
          confirmButton: 'custom-ok-button'
        }
      });
    } finally {
      onClose();
      setLoading(false);
    }
  };



  return (
    <div className="fixed inset-0 flex justify-center items-center z-50 bg-black bg-opacity-50">
      {loading && (
        <div className="absolute inset-0 flex justify-center items-center z-10">
          <Loader /> 
        </div>
      )}
      <div className={`relative bg-white rounded-lg w-[90%] md:w-[500px] p-5 ${loading ? 'opacity-50' : ''}`}>
        <Lottie options={defaultOptions} height={150} width={150} />
        <div className='text-center'>
          <h2 className='text-[40px] font-bold'>Warning</h2>
          <p className='text-[20px] font-semibold'>Are you sure you want to delete this {entityType}?</p>
          <div className='flex justify-end space-x-5 mt-5'>
            <button onClick={onClose} className='w-[220px] h-[50px] border border-black bg-transparent rounded-md text-[20px] font-semibold hover:bg-black hover:text-[#FDC90E]'>
              No
            </button>
            <button onClick={handleDelete} className='w-[220px] h-[50px] border border-[#FDC90E] bg-[#FDC90E] rounded-md text-[20px] font-semibold hover:bg-black hover:text-[#FDC90E]'>
              Yes
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DeleteModal;
