"use client";
import React, { useState, useEffect, useRef } from 'react';
import Swal from 'sweetalert2';
import { addOption } from '../../../services/lists/AddOptionsApi'; // Adjust the path as needed
import Loader from '../../common/loader/loader';

interface CreateDesignationFormProps {
  onClose: () => void;
}

const CreateDesignationForm: React.FC<CreateDesignationFormProps> = ({ onClose }) => {
  const [designationName, setDesignationName] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const inputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  const handleAddDesignation = async () => {
    if (!designationName.trim()) {
      Swal.fire({
        icon: 'error',
        title: 'Validation Error',
        text: 'Designation name cannot be empty.',
      });
      return;
    }
    setLoading(true);
    try {
      await addOption({ name: designationName, type: 'designations' });
      Swal.fire({
        icon: 'success',
        title: 'Success',
        text: 'Designation added successfully!',
        customClass: {
          confirmButton: 'custom-ok-button'
        }
      });
      setDesignationName(''); // Clear input field
      onClose(); // Close the modal
    } catch (error: any) {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: error.message || 'Failed to add designation.',
        customClass: {
          confirmButton: 'custom-ok-button'
        }
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-[500px] h-[220px] flex flex-col bg-white rounded-md items-center p-[20px] relative">
      {loading && (
        <div className="absolute inset-0 bg-white bg-opacity-75 flex justify-center items-center z-10">
          <Loader /> 
        </div>
      )}

      <div className='text-[25px] font-semibold'>Add Designation</div>
      <input 
        ref={inputRef}
        value={designationName}
        onChange={(e) => setDesignationName(e.target.value)}
        className='mt-[30px] border-2 border-[#E4E4E4] rounded-md px-4 py-2 w-[460px] h-[50px]'
        type="text" 
        placeholder="Enter Designation Name" 
        disabled={loading}
      />
      <div className='flex justify-center space-x-5'>
        <button
          className='mt-[30px] border-2 border-black rounded-md px-4 py-2 w-[220px] h-[40px] font-semibold text-[15px]
          hover:bg-black hover:text-[#FDC90E]'
          onClick={onClose}
          disabled={loading}
        >
          Cancel
        </button>
        <button
          className='mt-[30px] border-2 border-[#FDC90E] rounded-md px-4 py-2 w-[220px] h-[40px] font-semibold text-[15px]
          bg-[#FDC90E] hover:bg-black hover:text-[#FDC90E] hover:border-black'
          onClick={handleAddDesignation}
          disabled={loading}
        >
          {loading ? 'Adding...' : 'Add'}
        </button>
      </div>
    </div>
  );
};

export default CreateDesignationForm;
