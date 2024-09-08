"use client";
import React, { useState, useEffect, useRef } from 'react';
import { FaWindowClose } from 'react-icons/fa';
import { IoSearchOutline } from 'react-icons/io5';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import EditDeleteDropDown from '../../common/EditDeleteDropdown';
import { getOptions } from '../../../services/lists/GetOptionsApi';
import EditDesignationForm from './EditDesignationForm';

interface Designation {
  id: number;
  name: string;
}

interface SelectDesignationFormProps {
  onSelect: (designationId: number, designation: string) => void;
  toggleModal: () => void;
}

const SelectDesignationForm: React.FC<SelectDesignationFormProps> = ({ toggleModal, onSelect }) => {
  const [designations, setDesignations] = useState<Designation[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [page, setPage] = useState<number>(1);
  const [hasMore, setHasMore] = useState<boolean>(true);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [editingDesignation, setEditingDesignation] = useState<Designation | null>(null);
  const dropdownRefs = useRef<Array<HTMLDivElement | null>>([]);

  useEffect(() => {
    const fetchDesignations = async () => {
      try {
        setLoading(true);
        const { options: newDesignations, isEnd } = await getOptions('designations', page, searchQuery);
        setDesignations(prevDesignations => page === 1 ? newDesignations : [...prevDesignations, ...newDesignations]);
        setHasMore(!isEnd);
      } catch (error) {
        console.error('Failed to fetch designations', error);
      } finally {
        setLoading(false);
      }
    };

    fetchDesignations();
  }, [page, searchQuery]);

  useEffect(() => {
    setPage(1);
    setDesignations([]);
  }, [searchQuery]);

  const handleDesignationClick = (designation: Designation) => {
    onSelect(designation.id, designation.name);
    toggleModal();
  };

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
  };

  const handleEditClick = (designation: Designation) => {
    setEditingDesignation(designation); // Set the editing designation
  };

  const handleSave = (updatedDesignation: Designation) => {
    setDesignations(prevDesignations =>
      prevDesignations.map(designation =>
        designation.id === updatedDesignation.id
          ? { ...designation, name: updatedDesignation.name }
          : designation
      )
    );
    setEditingDesignation(null); // Close the editing modal
  };
  
  // Refresh method
  const refreshDesignations = async () => {
    try {
      setLoading(true);
      const { options: newDesignations, isEnd } = await getOptions('designations', page, searchQuery);
      setDesignations(prevDesignations => page === 1 ? newDesignations : [...prevDesignations, ...newDesignations]);
      setHasMore(!isEnd);
    } catch (error) {
      console.error('Failed to fetch designations', error);
    } finally {
      setLoading(false);
    }
  };
  
  // Edit modal save handler
  const handleEditSave = (updatedDesignation: Designation) => {
    handleSave(updatedDesignation);
    refreshDesignations(); // Optionally, refresh the designations list
  };
  
  return (
    <div className="bg-[#F4F4F4] h-screen shadow-lg w-full max-w-md flex flex-col absolute right-0">
      <div className="flex bg-white p-4 items-center mb-4">
        <FaWindowClose className="text-3xl cursor-pointer" onClick={toggleModal} />
        <h2 className="flex-grow text-center text-xl font-bold">Select Designation</h2>
      </div>

      <div className="relative mx-4 m-2 mb-4">
        <IoSearchOutline className="text-3xl text-[#606060] absolute left-3 top-3 w-5 h-5" />
        <input
          type="text"
          placeholder="Start typing to search"
          value={searchQuery}
          onChange={handleSearchChange}
          className="w-full text-[#606060] border border-[#C4C4C4] rounded-lg p-2 pl-10"
        />
      </div>

      <div className="flex-grow overflow-y-auto p-4 custom-scrollbar">
        {loading ? (
          Array.from({ length: 8 }).map((_, index) => (
            <div key={index} className="mb-2">
              <Skeleton height={30} />
            </div>
          ))
        ) : (
          <>
            {designations.map((designation, index) => (
              <div
                key={designation.id}
                className="relative flex items-center border-b-[#C4C4C4] border-b-2 justify-between mb-2 px-2 cursor-pointer"
                onClick={() => handleDesignationClick(designation)}
              >
                <div className="flex items-center w-full py-2">
                  <span className="font-medium">{designation.name}</span>
                </div>
                <div
                  className="relative"
                  ref={el => { dropdownRefs.current[index] = el; }}
                  onClick={(e) => e.stopPropagation()}
                >
                  <EditDeleteDropDown
                    onclick={() => handleEditClick(designation)} // Pass the edit handler here
                    entityId={designation.id}
                    entityName={designation.name}
                    type="designations"
                  />
                </div>
              </div>
            ))}
            {hasMore && (
              <button
                onClick={() => setPage(prevPage => prevPage + 1)}
                className="mt-4 p-2 bg-[#FFC700] text-black rounded-md w-full"
              >
                Load More
              </button>
            )}
          </>
        )}
      </div>

      {editingDesignation && (
        <EditDesignationForm
          isOpen={!!editingDesignation}
          onClose={() => setEditingDesignation(null)}
          designationId={editingDesignation.id}
          designationName={editingDesignation.name}
          onSave={(updatedDesignation) => {
            handleEditSave(updatedDesignation);
          }}
        />
      )}
    </div>
  );
};

export default SelectDesignationForm;
