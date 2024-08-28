"use client";
import React, { useState, useEffect, useRef } from 'react';
import { FaWindowClose } from "react-icons/fa";
import { IoSearchOutline } from "react-icons/io5";
import useOnClickOutside from '@/hooks/useOnClickOutside';
import EditDeleteDropDown from '../../common/EditDeleteDropdown';
import { getOptions } from '@/services/lists/GetOptionsApi';

interface Category {
  id: number;
  name: string;
}

interface SelectCategoryFormProps {
  toggleModal: () => void;
  onSelect: (categoryId: number, categoryName: string) => void;
  selectedCategoryId?: number;
}

const SelectCategoryForm: React.FC<SelectCategoryFormProps> = ({ toggleModal, onSelect, selectedCategoryId }) => {
  const categoryInputRef = useRef<HTMLInputElement>(null);
  const dropdownRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [dropdownIndex, setDropdownIndex] = useState<number | null>(null);
  const [categories, setCategories] = useState<Category[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [hydrated, setHydrated] = useState<boolean>(false);

  useEffect(() => {
    // Mark the component as hydrated on the client-side
    setHydrated(true);

    // Fetch categories when the component mounts
    const fetchCategories = async () => {
      try {
        const data = await getOptions('finance_categories', 1, searchQuery);
        setCategories(data.options); // Ensure this matches your API response structure
      } catch (error) {
        console.error('Failed to fetch categories:', error);
      }
    };

    fetchCategories();
  }, [searchQuery]);

  useEffect(() => {
    if (categoryInputRef.current) {
      categoryInputRef.current.focus();
    }
  }, []);

  const handleDropdownToggle = (index: number) => {
    setDropdownIndex(prevIndex => (prevIndex === index ? null : index));
  };

  const validDropdownRefs = dropdownRefs.current.filter((ref): ref is HTMLDivElement => ref !== null);

  useOnClickOutside([categoryInputRef, ...validDropdownRefs], () => setDropdownIndex(null));

  const handleCategorySelect = (id: number, name: string) => {
    onSelect(id, name); // Pass selected category to the parent component
    toggleModal(); // Close the modal after selection
  };

  if (!hydrated) return null;

  return (
    <div className="bg-[#F4F4F4] h-screen shadow-lg w-full max-w-md flex flex-col">
      <div className="flex bg-white p-4 items-center mb-4">
        <FaWindowClose className="text-3xl cursor-pointer" onClick={toggleModal} />
        <h2 className="flex-grow text-center text-xl font-bold">Select Category</h2>
      </div>
      <div className="relative mx-4 m-2 mb-4">
        <IoSearchOutline className="text-3xl text-[#606060] absolute left-3 top-3 w-5 h-5" />
        <input
          type="text"
          placeholder="Start typing to search"
          ref={categoryInputRef}
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full text-[#606060] border border-[#C4C4C4] rounded-lg p-2 pl-10"
        />
      </div>
      <div className="flex-grow overflow-y-auto p-4 custom-scrollbar">
        {categories.map((category) => (
          <div
            key={category.id}
            className="relative flex items-center border-b-[#C4C4C4] border-b-2 justify-between mb-2 px-2"
          >
            <div
              className="flex items-center w-full py-2 cursor-pointer"
              onClick={() => handleCategorySelect(category.id, category.name)}
            >
              <span className='font-medium'>{category.name}</span>
            </div>
            <div className="relative">
              <EditDeleteDropDown
                type="finance_categories"
                entityId={category.id}
                entityName={category.name}
                onclick={() => handleDropdownToggle(category.id)}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SelectCategoryForm;
