import React, { useState } from "react";
import { HiOutlineDotsVertical } from "react-icons/hi";
import Image from "next/image";
import editIcon from "../../../../public/edit.svg";
import deleteIcon from "../../../../public/delete.svg";
import receivedIcon from "../../../../public/received.svg";
import eyeIcon from "../../../../public/eye.svg";
import DeleteModal from "@/components/common/DeleteModal";
import EditFinanceForm from "../forms/EditFinanceForm";
import ViewFinanceForm from "../forms/ViewFinanceForm";

interface FinanceDropdownProps {
  entityId: number;
  entityType: 'user' | 'project' | 'task' | 'ticket' | 'finance' | 'project_categories' | 'project_departments' | 'designations' | 'announcement' | 'links' | null;
}

const FinanceDropdown: React.FC<FinanceDropdownProps> = ({ entityId, entityType }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showViewModal, setShowViewModal] = useState(false);

  // Example initial data; replace with actual data fetching logic
  const initialData = {
    amount: "100",
    description: "Sample Description",
    category: "Sample Category",
    date: "2024-08-01",
    isReceivedOrPaid: true,
    transactionType: 'Income',
    currency: 'USD'
  };

  const toggleDropdown = () => setIsOpen(!isOpen);

  const handleDelete = (event: React.MouseEvent) => {
    event.stopPropagation(); // Prevent event bubbling
    setShowDeleteModal(true);
    setIsOpen(false); // Close dropdown when delete is clicked
  };

  const handleEdit = (event: React.MouseEvent) => {
    event.stopPropagation(); // Prevent event bubbling
    setShowEditModal(true);
    setIsOpen(false); // Close dropdown when edit is clicked
  };

  const handleView = (event: React.MouseEvent) => {
    event.stopPropagation(); // Prevent event bubbling
    setShowViewModal(true);
    setIsOpen(false); // Close dropdown when edit is clicked
  };

  const closeDeleteModal = () => setShowDeleteModal(false);
  const closeEditModal = () => setShowEditModal(false);
  const closeViewModal = () => setShowViewModal(false);

  return (
    <div className="relative">
      <button onClick={toggleDropdown} className="p-2">
        <HiOutlineDotsVertical />
      </button>
      <div
        className={`transition-all duration-300 ease-out transform origin-top
          ${isOpen ? "scale-y-100 opacity-100 shadow-lg" : "scale-y-0 opacity-0"}
          absolute right-3 bg-white rounded-md overflow-hidden z-10`}
      >
        <button className="w-full flex items-center pr-6 py-2 hover:bg-gray-100 cursor-pointer border-b border-gray-200 font-medium">
          <Image src={receivedIcon} alt="Received Icon" width={20} height={20} className="mx-3" />
          Rec./Paid
        </button>
        <button onClick={handleView} className="w-full flex items-center pr-6 py-2 hover:bg-gray-100 cursor-pointer border-b border-gray-200 font-medium">
          <Image src={eyeIcon} alt="View Icon" width={20} height={20} className="mx-3" />
          View
        </button>
        <button onClick={handleEdit} className="w-full flex items-center pr-6 py-2 hover:bg-gray-100 cursor-pointer border-b border-gray-200 font-medium">
          <Image src={editIcon} alt="Edit Icon" width={16} height={16} className="mx-3" />
          Edit
        </button>
        <button onClick={handleDelete} className="w-full flex items-center pr-6 py-2 hover:bg-gray-100 cursor-pointer font-medium">
          <Image src={deleteIcon} alt="Delete Icon" width={16} height={16} className="mx-3" />
          Delete
        </button>
      </div>

      <DeleteModal
        isOpen={showDeleteModal}
        onClose={closeDeleteModal}
        entityId={entityId}
        entityType={entityType}
      />

      {showEditModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-40">
          <EditFinanceForm onClose={closeEditModal} />
        </div>
      )}

      {showViewModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-40">
          <ViewFinanceForm onClose={closeViewModal} />
            </div>
      )}
    </div>
  );
};

export default FinanceDropdown;
