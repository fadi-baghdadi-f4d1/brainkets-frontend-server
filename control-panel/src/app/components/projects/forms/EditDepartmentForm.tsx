"use client";

import React, { useRef, useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import { editOption } from '../../../services/lists/EditOptionApi'; // Ensure this path is correct

interface EditDepartmentFormProps {
  onClose: () => void;
  isOpen: boolean;
  departmentId: number;
  departmentName: string;
}

const EditDepartmentForm: React.FC<EditDepartmentFormProps> = ({ onClose, isOpen, departmentId, departmentName }) => {
  const [name, setName] = useState<string>(departmentName);
  const inputRef = useRef<HTMLInputElement>(null);
  console.log('name', name);

  // Update state when departmentName prop changes
  useEffect(() => {
    setName(departmentName);
  }, [departmentName]);

  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  const handleSave = async () => {
    try {
      await editOption({
        id: departmentId,
        name,
        type: 'project_departments',
      });
      toast.success('Department updated successfully!');
      onClose();
    } catch (error) {
      console.error('Failed to update department:', error);
      toast.error('Failed to update department.');
    }
  };

  if (!isOpen) {
    return null;
  }

  return (
    <div className="w-[350px] md:w-[500px] h-[220px] flex flex-col bg-white rounded-md items-center p-[20px]">
      <div className='text-[25px] font-semibold'>Edit Department</div>
      <input
        ref={inputRef}
        className='mt-[30px] border-2 border-[#E4E4E4] rounded-md px-4 py-2 w-full h-[50px]'
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Enter Department Name"
      />
      <div className='flex justify-center space-x-5 w-full'>
        <button
          className='mt-[30px] border-2 border-black rounded-md px-4 py-2 w-[50%] h-[40px] font-semibold text-[15px]
          hover:bg-black hover:text-[#FDC90E]'
          onClick={onClose}
        >
          Cancel
        </button>
        <button
          className='mt-[30px] bg-[#FDC90E]  rounded-md px-4 py-2 w-[50%] h-[40px] font-semibold text-[15px] hover:bg-black hover:text-[#FDC90E]'
          onClick={handleSave}
        >
          Save
        </button>
      </div>
    </div>
  );
};

export default EditDepartmentForm;
