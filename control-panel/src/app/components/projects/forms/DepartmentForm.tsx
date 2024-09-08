"use client";

import React, { useState, useEffect, useRef } from 'react';
import { addOption } from '../../../services/lists/AddOptionsApi';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

interface DepartmentFormModalProps {
  onClose: () => void;
  onDepartmentAdded?: () => void; // Make onDepartmentAdded optional
}

const DepartmentFormModal: React.FC<DepartmentFormModalProps> = ({
  onClose,
  onDepartmentAdded = () => {}, // Provide a default function to avoid errors
}) => {
  const [departmentName, setDepartmentName] = useState('');
  const departmentInputRef = useRef<HTMLInputElement>(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (departmentInputRef.current) {
      departmentInputRef.current.focus();
    }
  }, []);

  const handleAddDepartment = async () => {
    if (!departmentName.trim()) {
      toast.error('Department name is required', {
        autoClose: 3000,
      });
      return;
    }

    setIsLoading(true);

    try {
      await addOption({ name: departmentName, type: 'project_departments' });
      toast.success('Department added successfully', {
        autoClose: 3000,
      });
      onDepartmentAdded(); // Call the provided or default function
      onClose(); // Close the modal after adding the department
    } catch (error: any) {
      toast.error(error.message || 'Failed to add department', {
        autoClose: 3000,
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="department-form w-[300px] md:w-[500px] h-[220px] flex flex-col items-center">
      <div className='text-[25px] font-semibold'>Department</div>
      <input
        className='mt-[30px] border-2 border-[#E4E4E4] rounded-md px-4 py-2 w-full h-[50px]'
        type="text"
        placeholder="Enter Department Name"
        value={departmentName}
        ref={departmentInputRef}
        onChange={(e) => setDepartmentName(e.target.value)}
      />
      <div className='flex justify-center space-x-5 w-full'>
        <button
          className='mt-[30px] border-2 border-black rounded-md px-4 py-2 w-[50%] h-[40px] font-semibold text-[15px]
          hover:bg-black hover:text-[#FDC90E]'
          onClick={onClose} // Close the form on Cancel
        >
          Cancel
        </button>
        <button
          className='mt-[30px] border-2 border-[#FDC90E] rounded-md px-4 py-2 w-[50%] h-[40px] font-semibold text-[15px]
          bg-[#FDC90E] hover:bg-black hover:text-[#FDC90E] hover:border-black'
          onClick={handleAddDepartment}
          disabled={isLoading} // Disable button while loading
        >
          {isLoading ? 'Adding...' : 'Add'}
        </button>
      </div>
    </div>
  );
};

export default DepartmentFormModal;
