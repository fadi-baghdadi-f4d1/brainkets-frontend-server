"use client";

import React, { useRef, useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import { editOption } from '../../../services/lists/EditOptionApi'; // Adjust the import path as needed

interface EditCategoryFormProps {
  onClose: () => void;
  isOpen: boolean;
  entityId: number;
  entityName: string;
}

const EditCategoryForm: React.FC<EditCategoryFormProps> = ({ onClose, isOpen, entityId, entityName }) => {
  const [name, setName] = useState<string>(entityName);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  const handleSave = async () => {
    try {
      await editOption({
        id: entityId,
        name,
        type: 'finance_categories', // Adjust if needed
      });
      toast.success('Category updated successfully!'); // Show success toast
      onClose(); // Close the form on successful save
    } catch (error) {
      console.error('Failed to update category:', error);
      toast.error('Failed to update category.'); // Show error toast
    }
  };

  return (
    <div className="w-[350px] md:w-[500px] h-[220px] flex flex-col bg-white rounded-md items-center p-[20px]">
      <div className='text-[25px] font-semibold'>Edit Category</div>
      <input
        ref={inputRef} // Add ref to the input
        className='mt-[30px] border-2 border-[#E4E4E4] rounded-md px-4 py-2 w-full h-[50px]'
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Enter Category Name"
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
          className='mt-[30px] border-2 border-[#FDC90E] rounded-md px-4 py-2 w-[50%] h-[40px] font-semibold text-[15px]
          bg-[#FDC90E] hover:bg-black hover:text-[#FDC90E] hover:border-black'
          onClick={handleSave}
        >
          Save
        </button>
      </div>
    </div>
  );
};

export default EditCategoryForm;
