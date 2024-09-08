"use client";

import React, { useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import { BsThreeDotsVertical } from 'react-icons/bs';
import DeleteModal from './DeleteModal';
import EditDesignationForm from '../users/forms/EditDesignationForm';
import EditCategoryForm from '../../components/projects/forms/EditCategoryForm';
import EditDepartmentForm from '../../components/projects/forms/EditDepartmentForm';
import EditLinks from '../projects/forms/EditLinks';
import EditCategoryFinanceForm from '../../components/finance/forms/EditFinanceCategoryForm';

interface EditDeleteDropDownProps {
  type: 'project_categories' | 'designations' | 'project_departments' | 'links' | 'finance_categories';
  entityId: number;
  entityName: string;
  entityLink?: string; // Add the entityLink prop
  onclick: () => void;
}

const EditDeleteDropDown: React.FC<EditDeleteDropDownProps> = ({ type, entityId, entityName, entityLink, onclick }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const [editDesignationModal, setEditDesignationModal] = useState(false);
  const [editCategoryModal, setEditCategoryModal] = useState(false);
  const [editCategoryFinanceModal, setEditCategoryFinanceModal] = useState(false);
  const [editDepartmentModal, setEditDepartmentModal] = useState(false);
  const [editLinksModal, setEditLinksModal] = useState(false);

  const toggleDropdown = () => setIsOpen(!isOpen);

  const handleClickOutside = (event: MouseEvent) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const openModal = () => {
    setIsModalOpen(true);
    setIsOpen(false);
  };

  const closeModal = () => setIsModalOpen(false);

  const handleEditClick = () => {
    switch (type) {
      case 'designations':
        setEditDesignationModal(true);
        break;
      case 'project_categories':
        setEditCategoryModal(true);
        break;
      case 'finance_categories':
        setEditCategoryFinanceModal(true);
        break;
      case 'project_departments':
        setEditDepartmentModal(true);
        break;
      case 'links':
        setEditLinksModal(true);
        break;
      default:
        break;
    }
    setIsOpen(false);
  };

  const closeEditModal = () => {
    setEditDesignationModal(false);
    setEditCategoryModal(false);
    setEditDepartmentModal(false);
    setEditLinksModal(false);
    setEditCategoryFinanceModal(false); // Ensure this is included
  };

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={toggleDropdown}
        className="flex items-center px-2 py-1 rounded-full hover:bg-gray-100 focus:outline-none z-30"
        aria-expanded={isOpen}
        aria-haspopup="true"
      >
        <BsThreeDotsVertical />
      </button>
      <div
        className={`transition-all duration-300 ease-out absolute right-3 w-32 bg-white rounded-lg shadow-lg z-40
          ${isOpen ? 'scale-y-100 opacity-100' : 'scale-y-0 opacity-0'}`}
        style={{ transformOrigin: 'top' }}
      >
        {['designations', 'project_categories', 'project_departments', 'links' , 'finance_categories'].includes(type) && (
          <div
            className="flex items-center p-2 cursor-pointer hover:bg-gray-100 border-b border-gray-300 font-medium text-[15px] mx-1"
            onClick={handleEditClick}
          >
            <Image src="/edit.svg" alt={`Edit ${type}`} width={16} height={16} />
            <span className="pl-2">Edit</span>
          </div>
        )}
        <div
          className="flex items-center p-2 cursor-pointer hover:rounded-b-md hover:bg-gray-100 font-medium text-[15px] w-full"
          onClick={openModal}
        >
          <Image src="/delete.svg" alt={`Delete ${type}`} width={16} height={16} />
          <span className="pl-2">Delete</span>
        </div>
      </div>
      <DeleteModal
        isOpen={isModalOpen}
        onClose={closeModal}
        entityId={entityId}
        entityType={type}
      />
      {editDesignationModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <EditDesignationForm
            isOpen={editDesignationModal}
            onClose={closeEditModal}
            designationId={entityId}
            designationName={entityName}
            onSave={(updatedDesignation) => console.log('Updated Designation:', updatedDesignation)}
          />
        </div>
      )}
      {editCategoryModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <EditCategoryForm
            isOpen={editCategoryModal}
            onClose={closeEditModal}
            entityId={entityId}
            entityName={entityName}
          />
        </div>
      )}
      {editCategoryFinanceModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <EditCategoryFinanceForm
            isOpen={editCategoryFinanceModal}
            onClose={closeEditModal}
            entityId={entityId}
            entityName={entityName}
          />
        </div>
      )}
      {editDepartmentModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <EditDepartmentForm
            isOpen={editDepartmentModal}
            onClose={closeEditModal}
            departmentId={entityId}
            departmentName={entityName}
          />
        </div>
      )}
      {editLinksModal && (
        <div className="fixed inset-0 flex items-center justify-end bg-black bg-opacity-50 z-50">
          <EditLinks
            isOpen={editLinksModal}
            onClose={closeEditModal}
            linkId={entityId}
            linkName={entityName}
            link={entityLink}
          />
        </div>
      )}
    </div>
  );
};

export default EditDeleteDropDown;
