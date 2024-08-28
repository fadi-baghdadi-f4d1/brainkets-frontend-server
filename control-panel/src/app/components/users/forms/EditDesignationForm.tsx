import React, { useRef, useEffect, useState } from 'react';
import Swal from 'sweetalert2';
import { editOption } from '../../../services/lists/EditOptionApi'; 
import Loader from '../../../components/common/loader/loader';

interface EditDesignationFormProps {
  isOpen: boolean;
  onClose: () => void;
  designationId: number;
  designationName: string;
  onSave: (designation: Designation) => void;
}

interface Designation {
  id: number;
  name: string;
}

const EditDesignationForm: React.FC<EditDesignationFormProps> = ({
  isOpen,
  onClose,
  designationId,
  designationName,
  onSave
}) => {
  const [name, setName] = useState<string>(designationName);
  const inputRef = useRef<HTMLInputElement>(null);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
    setName(designationName); // Update the name when designationName changes
  }, [isOpen, designationName]);

  const handleSave = async () => {
    if (!name.trim()) {
      Swal.fire({
        icon: 'warning',
        title: 'Validation Error',
        text: 'Designation name cannot be empty',
        customClass: {
          confirmButton: 'custom-ok-button'
        }
      });
      return;
    }

    setLoading(true);
    try {
      // Call the API to update the designation
      await editOption({ id: designationId, name, type: 'designations' });

      Swal.fire({
        icon: 'success',
        title: 'Success',
        text: 'Designation updated successfully',
        customClass: {
          confirmButton: 'custom-ok-button'
        }
      });

      // Notify parent component of the update
      onSave({ id: designationId, name });
      onClose(); // Close the modal
    } catch (error: any) {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: error.message || 'Failed to update designation',
        customClass: {
          confirmButton: 'custom-ok-button'
        }
      });
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null; // Render nothing if the modal is not open

  return (
    <div className="w-[500px] h-[220px] flex flex-col bg-white rounded-md items-center p-[20px] relative">
      {loading && (
        <div className="absolute inset-0 bg-white bg-opacity-75 flex justify-center items-center z-10">
          <Loader /> 
        </div>
      )}

      <div className="text-[25px] font-semibold">Edit Designation</div>
      <input
        ref={inputRef}
        className="mt-[30px] border-2 border-[#E4E4E4] rounded-md px-4 py-2 w-[460px] h-[50px]"
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <div className="flex justify-center space-x-5">
        <button
          className="mt-[30px] border-2 border-black rounded-md px-4 py-2 w-[220px] h-[40px] font-semibold text-[15px]
          hover:bg-black hover:text-[#FDC90E]"
          onClick={onClose}
        >
          Cancel
        </button>
        <button
          className="mt-[30px] border-2 border-[#FDC90E] rounded-md px-4 py-2 w-[220px] h-[40px] font-semibold text-[15px]
          bg-[#FDC90E] hover:bg-black hover:text-[#FDC90E] hover:border-black"
          onClick={handleSave}
        >
          Save
        </button>
      </div>
    </div>
  );
};

export default EditDesignationForm;
