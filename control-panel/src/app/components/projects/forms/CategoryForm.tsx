"use client";

import React, { useState, useEffect, useRef } from 'react';
import { addOption } from '../../../services/lists/AddOptionsApi'; // Import your API function
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

interface CategoryFormModalProps {
  onClose: () => void;
  onCategoryAdded?: () => void; // Make onCategoryAdded optional
}

const CategoryFormModal: React.FC<CategoryFormModalProps> = ({
  onClose,
  onCategoryAdded = () => {}, // Provide a default function to avoid errors
}) => {
  const [categoryName, setCategoryName] = useState('');
  const categoryInputRef = useRef<HTMLInputElement>(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (categoryInputRef.current) {
      categoryInputRef.current.focus();
    }
  }, []);

  const handleAddCategory = async () => {
    if (!categoryName.trim()) {
      toast.error('Category name is required', {
        autoClose: 3000,
      });
      return;
    }

    setIsLoading(true);

    try {
      await addOption({ name: categoryName, type: 'project_categories' }); // Use the correct type
      toast.success('Category added successfully', {
        autoClose: 3000,
      });
      onCategoryAdded(); // Call the provided or default function
      onClose(); // Close the modal after adding the category
    } catch (error: any) {
      toast.error(error.message || 'Failed to add category', {
        autoClose: 3000,
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="category-form w-[300px] md:w-[500px] h-[220px] flex flex-col items-center">
      <div className='text-[25px] font-semibold'>Category</div>
      <input
        className='mt-[30px] border-2 border-[#E4E4E4] rounded-md px-4 py-2 w-full h-[50px]'
        type="text"
        placeholder="Enter Category Name"
        value={categoryName}
        ref={categoryInputRef}
        onChange={(e) => setCategoryName(e.target.value)}
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
          onClick={handleAddCategory}
          disabled={isLoading} // Disable button while loading
        >
          {isLoading ? 'Adding...' : 'Add'}
        </button>
      </div>
    </div>
  );
};

export default CategoryFormModal;
