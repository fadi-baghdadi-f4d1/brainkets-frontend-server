"use client";
import React, { useState, useEffect, useRef } from 'react';
import { FaWindowClose } from "react-icons/fa";
import { IoSearchOutline } from "react-icons/io5";
import useOnClickOutside from '@/hooks/useOnClickOutside';
import EditDeleteDropDown from '../../common/EditDeleteDropdown';
import { getOptions } from '@/services/lists/GetOptionsApi'; // Import the API function

interface SelectDepartmentFormProps {
  toggleModal: () => void;
  onSelect: (departmentId: number, departmentName: string) => void;
}

const SelectDepartmentForm: React.FC<SelectDepartmentFormProps> = ({ toggleModal, onSelect }) => {
  const departmentInputRef = useRef<HTMLInputElement>(null);
  const dropdownRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [dropdownIndex, setDropdownIndex] = useState<number | null>(null);
  const [departments, setDepartments] = useState<{ id: number, name: string }[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>('');

  useEffect(() => {
    // Fetch departments when the component mounts or search query changes
    const fetchDepartments = async () => {
      try {
        const data = await getOptions('project_departments', 1, searchQuery);
        setDepartments(data.options); // Assuming 'options' is the key containing the department data
      } catch (error) {
        console.error('Failed to fetch departments:', error);
      }
    };

    fetchDepartments();
  }, [searchQuery]);

  useEffect(() => {
    if (departmentInputRef.current) {
      departmentInputRef.current.focus();
    }
  }, []);

  const handleDropdownToggle = (index: number) => {
    setDropdownIndex(prevIndex => (prevIndex === index ? null : index));
  };

  const validDropdownRefs = dropdownRefs.current.filter((ref): ref is HTMLDivElement => ref !== null);

  useOnClickOutside([departmentInputRef, ...validDropdownRefs], () => setDropdownIndex(null));

  const handleDepartmentSelect = (id: number, name: string) => {
    onSelect(id, name); // Pass selected department to the parent component
    toggleModal(); // Close the modal after selection
  };

  return (
    <div className="bg-[#F4F4F4] h-screen shadow-lg w-full max-w-md flex flex-col">
      <div className="flex bg-white p-4 items-center mb-4">
        <FaWindowClose className="text-3xl cursor-pointer" onClick={toggleModal} />
        <h2 className="flex-grow text-center text-xl font-bold">Select Department</h2>
      </div>
      <div className="relative mx-4 m-2 mb-4">
        <IoSearchOutline className="text-3xl text-[#606060] absolute left-3 top-3 w-5 h-5" />
        <input
          type="text"
          placeholder="Start typing to search"
          ref={departmentInputRef}
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full text-[#606060] border border-[#C4C4C4] rounded-lg p-2 pl-10"
        />
      </div>
      <div className="flex-grow overflow-y-auto p-4 custom-scrollbar">
        {departments.map((department) => (
          <div
            key={department.id}
            className="relative flex items-center border-b-[#C4C4C4] border-b-2 justify-between mb-2 px-2"
          >
            <div
              className="flex items-center w-full py-2 cursor-pointer"
              onClick={() => handleDepartmentSelect(department.id, department.name)}
            >
              <span className='font-medium'>{department.name}</span> {/* Render the department name */}
            </div>
            <div className="relative">
              <EditDeleteDropDown
                type="project_departments"
                entityId={department.id}
                entityName={department.name}
                onclick={() => {
                  // Optionally handle onclick here
                }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SelectDepartmentForm;
