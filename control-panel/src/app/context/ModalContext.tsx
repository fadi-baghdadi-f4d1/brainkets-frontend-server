"use client";
import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import ProjectDetails from "@/components/projects/forms/ProjectDetails";
import UsefulLinks from "@/components/projects/forms/UsefulLinks";
import CreateLinks from "@/components/projects/forms/CreateLinks";
import CreateTaskModal from "@/components/taskboard/modals/CreateTaskModal";
import SortModal from "@/components/taskboard/modals/SortModal";
import SelectUserModal from "@/components/modals/SelectClientModal";
import SelectCategoryForm from "@/components/projects/forms/SelectCategoryForm";
import AddFinanceForm from "@/components/finance/forms/AddFinanceForm";
import CreateUser from "@/components/projects/forms/CreateUserForm";
import CreateProjectForm from '@/components/projects/forms/CreateProjectForm';
import CreateTicketModal from '@/components/tickets/modals/CreateTicketModal';
import EditTaskModal from '@/components/taskboard/modals/EditTaskModal';
import EditTicketModal from '@/components/tickets/modals/EditTicketModal';
// import EditProfilePhotoForm from '@/components/profile/EditProfilePhotoForm';
import EditProjectForm from '@/components/projects/forms/EditProjectForm';
import AddStatusColumn from '@/components/taskboard/modals/AddStatusColumn';
import MoveTaskModal from '@/components/taskboard/modals/MoveTaskModal';
import SelectProjectModal from '@/components/taskboard/modals/SelectProjectModal';
import AddTicketStatusColumn from '@/components/tickets/modals/AddTicketStatusColumn';
import SortTicketsModal from '@/components/tickets/modals/SortTicketStatusModal';
import EditModal from '@/components/users/modals/EditUserModal';
import ViewTicketModal from '@/components/tickets/modals/ViewTicket';
import EditDesignationForm from '@/components/users/forms/EditDesignationForm';
import {Ticket} from '@/components/tickets/modals/ViewTicket';
import { Column } from '@/components/taskboard/Tasks';
import DeleteModal from '@/components/common/DeleteModal';
import EditCategoryForm from '@/components/projects/forms/EditCategoryForm';
import HighlightTask from '@/components/taskboard/modals/HighlightTask';
// import AddAnnouncementForm from '@/components/announcements/form/AddAnnouncementForm';
import SelectDepartmentForm from '@/components/projects/forms/SelectDepartmentForm';
import EditDepartmentForm from '@/components/projects/forms/EditDepartmentForm';
import SelectCountryForm from '@/components/users/forms/SelectCountryForm';
import SelectDesignationForm from '@/components/users/forms/SelectDesignationForm';
import CreateDesignationForm from '@/components/users/forms/CreateDesignationForm';




interface ModalContextType {
    viewMode: 'grid' | 'list';
    setViewMode: (viewMode: 'grid' | 'list') => void;
    isCreateTaskModalOpen: boolean;
    isCreateTicketModalOpen: boolean;
    isCreateDesignationModalOpen: boolean;
    isEditTicketModalOpen: boolean;
    isAnnouncementModalOpen: boolean;
    isSelectDesignationModalOpen: boolean;
    isEditTaskModalOpen: boolean;
    isDeleteModalOpen: boolean;
    isSelectDepartmentModalOpen: boolean;
    isEditDesignationModalOpen: boolean;
    isEditDepartmentFormOpen: boolean;
    isViewTicketModalOpen: boolean;
    isSelectCountryModalOpen: boolean;
    isHighlightTaskModalOpen: boolean;
    isEditCategoryModalOpen: boolean;
    isEditModalOpen: boolean;
    isSortModalOpen: boolean;
    isAddStatusColumnModalOpen: boolean;
    isMoveTaskModalOpen: boolean;
    isSelectProjectModalOpen: boolean;
    isAddTicketStatusColumnModalOpen: boolean;
    isSortTicketsModalOpen: boolean;
    isSelectUserModalOpen: boolean;
    isCreateUserModalOpen: boolean;
    isCreateProjectModalOpen: boolean;
    isEditProjectModalOpen: boolean;
    isProjectDetailsModalOpen: boolean;
    isUsefulLinksOpen: boolean;
    isCreateLinksOpen: boolean;
    isSelectCategoryModalOpen: boolean;
    isAddFinanceModalOpen: boolean;
    isEditProfilePhotoModalOpen: boolean;
    setIsCreateTaskModalOpen: (open: boolean) => void;
    setIsEditDepartmentFormOpen: (open: boolean) => void;
    setIsViewTicketModalOpen: (open: boolean) => void;
    setIsHighlightTaskModalOpen: (open: boolean) => void;
    setIsEditTicketModalOpen: (open: boolean) => void;
    setIsSelectDepartmentModalOpen: (open: boolean) => void;
    setIsEditModalOpen: (open: boolean) => void;
    setIsAnnouncementModalOpen: (open: boolean) => void;
    setIsSelectDesignationModalOpen: (open: boolean) => void;
    setIsCreateDesignationModalOpen: (open: boolean) => void;
    setIsDeleteModalOpen: (open: boolean) => void;
    setIsCreateTicketModalOpen: (open: boolean) => void;
    setIsEditTaskModalOpen: (open: boolean) => void;
    setIsSelectCountryModalOpen: (open: boolean) => void;
    setIsAddTicketStatusColumnModalOpen: (open: boolean) => void;
    setSortTicketsModalOpen: (open: boolean) => void;
    setIsSortModalOpen: (open: boolean) => void;
    setIsEditDesignationModalOpen: (open: boolean) => void;
    setIsAddStatusColumnModalOpen: (open: boolean) => void;
    setIsMoveTaskModalOpen: (open: boolean) => void;
    setIsSelectProjectModalOpen: (open: boolean) => void;
    setIsEditCategoryModalOpen: (open: boolean) => void;
    setColumns: (columns: Column[]) => void;
    setIsSelectUserModalOpen: (open: boolean) => void;
    setIsCreateUserModalOpen: (open: boolean) => void;
    setIsCreateProjectModalOpen: (open: boolean) => void;
    setIsEditProjectModalOpen: (open: boolean) => void;
    setIsProjectDetailsModalOpen: (open: boolean) => void;
    setIsUsefulLinksOpen: (open: boolean) => void;
    setIsCreateLinksOpen: (open: boolean) => void;
    setIsSelectCategoryModalOpen: (open: boolean) => void;
    setIsAddFinanceModalOpen: (open: boolean) => void;
    toggleCreateTaskModal: () => void;
    toggleCreateTicketModal: () => void;
    toggleEditTaskModal: () => void;
    toggleSortModal: () => void;
    toggleDeleteModal: () => void;
    toggleHighlightTaskModal: () => void;
    toggleMoveTaskModal: () => void;
    toggleAddStatusColumnModal: () => void;
    toggleAddTicketStatusColumnModal: () => void;
    toggleEditModal: () => void;
    toggleSortTicketsModal: () => void;
    toggleSelectDesignationModal: () => void;
    toggleSelectProjectModal: () => void;
    columns: Column[];
    handleSortSubmit: (sortedColumns: Column[]) => void;
    toggleSelectUserModal: () => void;
    toggleSelectCountryModal: () => void;
    toggleEditTicketModal: () => void;
    toggleCreateUserModal: () => void;
    toggleCreateDesignationModal: () => void;
    toggleCreateProjectModal: () => void;
    toggleEditProjectModal: () => void;
    toggleEditDesignationModal: () => void;
    toggleEditCategoryModal: () => void;
    toggleViewTicketModal: () => void;
    toggleSelectDepartmentModal: () => void;
    toggleEditDepartmentForm: () => void;
    toggleProjectDetailsModal: () => void;
    toggleUsefulLinks: () => void;
    toggleCreateLinks: () => void;
    toggleAnnouncementModal: () => void;
    toggleAddFinanceModal: () => void;
    toggleSelectCategoryModal: () => void;
    toggleEditProfilePhotoModal: () => void;
    renderModals: () => JSX.Element;
}

const ModalContext = createContext<ModalContextType | undefined>(undefined);

export const ModalProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
    const [isCreateTaskModalOpen, setIsCreateTaskModalOpen] = useState(false);
    const [isHighlightTaskModalOpen, setIsHighlightTaskModalOpen] = useState(false);
    const [isCreateTicketModalOpen, setIsCreateTicketModalOpen] = useState(false);
    const [isEditTicketModalOpen, setIsEditTicketModalOpen] = useState(false);
    const [isViewTicketModalOpen, setIsViewTicketModalOpen] = useState(false);
    const [isEditTaskModalOpen, setIsEditTaskModalOpen] = useState(false);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [isEditDesignationModalOpen, setIsEditDesignationModalOpen] = useState(false);
    const [isSortModalOpen, setIsSortModalOpen] = useState(false);
    const [isSelectCountryModalOpen, setIsSelectCountryModalOpen] = useState(false);
    const [isEditCategoryModalOpen, setIsEditCategoryModalOpen] = useState(false);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [isMoveTaskModalOpen, setIsMoveTaskModalOpen] = useState(false);
    const [isSelectDesignationModalOpen, setIsSelectDesignationModalOpen] = useState(false);
    const [isSelectProjectModalOpen, setIsSelectProjectModalOpen] = useState(false);
    const [isCreateDesignationModalOpen, setIsCreateDesignationModalOpen] = useState(false);
    const [isEditDepartmentFormOpen, setIsEditDepartmentFormOpen] = useState(false);
    const [isAddTicketStatusColumnModalOpen, setIsAddTicketStatusColumnModalOpen] = useState(false);
    const [isSortTicketsModalOpen, setSortTicketsModalOpen] = useState(false);
    const [isAddStatusColumnModalOpen, setIsAddStatusColumnModalOpen] = useState(false);
    const [columns, setColumns] = useState<Column[]>([]);
    const [isSelectDepartmentModalOpen, setIsSelectDepartmentModalOpen] = useState(false);
    const [isAnnouncementModalOpen, setIsAnnouncementModalOpen] = useState(false);
    const [isSelectUserModalOpen, setIsSelectUserModalOpen] = useState(false);
    const [isCreateUserModalOpen, setIsCreateUserModalOpen] = useState(false);
    const [isCreateProjectModalOpen, setIsCreateProjectModalOpen] = useState(false);
    const [isEditProjectModalOpen, setIsEditProjectModalOpen] = useState(false);
    const [isProjectDetailsModalOpen, setIsProjectDetailsModalOpen] = useState(false);
    const [isUsefulLinksOpen, setIsUsefulLinksOpen] = useState(false);
    const [isCreateLinksOpen, setIsCreateLinksOpen] = useState(false);
    const [isSelectCategoryModalOpen, setIsSelectCategoryModalOpen] = useState(false);
    const [isAddFinanceModalOpen, setIsAddFinanceModalOpen] = useState(false);
    const [isEditProfilePhotoModalOpen, setIsEditProfilePhotoModalOpen] = useState(false);


    useEffect(() => {
        // Check if any modal is open
        const isAnyModalOpen = [
            isCreateTaskModalOpen,
            isCreateTicketModalOpen,
            isEditDesignationModalOpen,
            isEditTicketModalOpen,
            isDeleteModalOpen,
            isEditTaskModalOpen,
            isSelectCountryModalOpen,
            isEditCategoryModalOpen,
            isCreateDesignationModalOpen,
            isHighlightTaskModalOpen,
            isSelectDesignationModalOpen,
            isEditDepartmentFormOpen,
            isViewTicketModalOpen,
            isSortModalOpen,
            isSelectDepartmentModalOpen,
            isAnnouncementModalOpen,
            isMoveTaskModalOpen,
            isAddStatusColumnModalOpen,
            isSelectProjectModalOpen,
            isSelectUserModalOpen,
            isEditModalOpen,
            isProjectDetailsModalOpen,
            isUsefulLinksOpen,
            isSortTicketsModalOpen,
            isAddTicketStatusColumnModalOpen,
            isCreateLinksOpen,
            isSelectCategoryModalOpen,
            isAddFinanceModalOpen,
            isCreateUserModalOpen,
            isCreateProjectModalOpen,
            isEditProjectModalOpen,
            isEditProfilePhotoModalOpen,
        ].some(open => open);

        // Toggle the body scroll
        document.body.style.overflow = isAnyModalOpen ? 'hidden' : 'auto';
    }, [
        isCreateTaskModalOpen,
        isCreateTicketModalOpen,
        isEditTicketModalOpen,
        isEditTaskModalOpen,
        isDeleteModalOpen,
        isSortModalOpen,
        isEditDesignationModalOpen,
        isEditDepartmentFormOpen,
        isCreateDesignationModalOpen,
        isSelectCountryModalOpen,
        isAnnouncementModalOpen,
        isHighlightTaskModalOpen,
        isEditCategoryModalOpen,
        isSelectDesignationModalOpen,
        isSelectDepartmentModalOpen,
        isViewTicketModalOpen,
        isEditModalOpen,
        isMoveTaskModalOpen,
        isAddStatusColumnModalOpen,
        isAddTicketStatusColumnModalOpen,
        isSortTicketsModalOpen,
        isSelectUserModalOpen,
        isSelectProjectModalOpen,
        isProjectDetailsModalOpen,
        isUsefulLinksOpen,
        isCreateLinksOpen,
        isSelectCategoryModalOpen,
        isAddFinanceModalOpen,
        isCreateUserModalOpen,
        isCreateProjectModalOpen,
        isEditProjectModalOpen,
        isEditProfilePhotoModalOpen,
    ]);


    const handleSortSubmit = (sortedColumns: Column[]) => {
        setColumns(sortedColumns);
        setIsSortModalOpen(false); // Close the modal after sorting
    };


    const [selectedTicket, setSelectedTicket] = useState<Ticket | null>(null);

    const [entityId, setEntityId] = useState<string | null>(null);
    const [entityType, setEntityType] = useState<'user' | 'project' | 'task' | 'ticket' | 'finance' | 'category' | 'department' | 'designation' | null>(null);

    const [selectedDesignation, setSelectedDesignation] = useState<string>('');

    const toggleCreateUserModal = () => setIsCreateUserModalOpen(prev => !prev);
    const toggleSelectDesignationModal = () => setIsSelectDesignationModalOpen(prev => !prev);

    const handleSelectDesignation = (designation: string) => {
        setSelectedDesignation(designation);
        setIsSelectDesignationModalOpen(false);
        setIsCreateUserModalOpen(true); // Automatically open CreateUser modal after selection
    };


    const renderModals = () => (

        <>
            {isCreateUserModalOpen && (
                <div className="fixed inset-0 flex items-center justify-end bg-black bg-opacity-50 z-50">
                    <CreateUser onClose={() => setIsCreateUserModalOpen(false)} />
                </div>
            )}






            {isCreateTaskModalOpen && (
                <div className="fixed inset-0 flex items-end justify-end bg-black bg-opacity-50 z-40">
                    <CreateTaskModal toggleModal={() => setIsCreateTaskModalOpen(false)}  />
                </div>
            )}
            {isCreateProjectModalOpen && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-40">
                    <CreateProjectForm
                        onClose={() => setIsCreateProjectModalOpen(false)}
                    />
                </div>
            )}


            {isCreateDesignationModalOpen && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
                    <CreateDesignationForm onClose={() => setIsCreateDesignationModalOpen(false)} />
                </div>
            )}
            {isCreateTicketModalOpen && (
                <div className="fixed inset-0 flex items-center justify-end bg-black bg-opacity-50 z-40">
                    <CreateTicketModal toggleModal={() => setIsCreateTicketModalOpen(false)} toggleSelectUserModal={() => setIsSelectUserModalOpen(true)} />
                </div>
            )}
            {isEditTicketModalOpen && (
                <div className="fixed inset-0 flex items-center justify-end bg-black bg-opacity-50 z-40">
                    <EditTicketModal toggleModal={() => setIsEditTicketModalOpen(false)} toggleSelectUserModal={() => setIsSelectUserModalOpen(true)} />
                </div>
            )}


            {isViewTicketModalOpen && selectedTicket && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-40">
                    <ViewTicketModal ticket={selectedTicket} onClose={() => setIsViewTicketModalOpen(false)} />
                </div>
            )}


            {isAddStatusColumnModalOpen && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-40">
                    <AddStatusColumn onClose={() => setIsAddStatusColumnModalOpen(false)} />
                </div>
            )}

            {isAddTicketStatusColumnModalOpen && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-40">
                    <AddTicketStatusColumn onClose={() => setIsAddTicketStatusColumnModalOpen(false)} />
                </div>
            )}
            {isSortTicketsModalOpen && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-40">
                    <SortTicketsModal onClose={() => setSortTicketsModalOpen(false)} />
                </div>
            )}


            {/* {isProjectDetailsModalOpen && (
        <div className="fixed inset-0 flex items-end justify-end bg-black bg-opacity-50 z-40">
          <ProjectDetails toggleModal={() => setIsProjectDetailsModalOpen(false)} />
        </div>
      )}
       {isEditProjectModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50 z-40">
          <EditProjectForm  onClose={() => setIsEditProjectModalOpen(false)} isOpen={isEditProjectModalOpen}
            toggleSelectUserModal={() => setIsSelectUserModalOpen(prev => !prev)}
            toggleSelectCategoryModal={() => setIsSelectCategoryModalOpen(prev => !prev)} />
        </div>
      )}   */}
            {isUsefulLinksOpen && (
                <div className="fixed inset-0 flex items-end justify-end bg-black bg-opacity-50 z-50">
                    <UsefulLinks toggleModal={() => setIsUsefulLinksOpen(false)} toggleCreateLinks={() => setIsCreateLinksOpen(true)} />
                </div>
            )}

            {isAddFinanceModalOpen && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-40">
                    <AddFinanceForm onClose={() => setIsAddFinanceModalOpen(false)} />
                </div>
            )}


            {/*{isEditProfilePhotoModalOpen && (*/}
            {/*    <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50 z-50">*/}
            {/*        <EditProfilePhotoForm isOpen={isEditProfilePhotoModalOpen} onClose={() => setIsEditProfilePhotoModalOpen(false)} />*/}
            {/*    </div>*/}
            {/*)}*/}


            {/*{isAnnouncementModalOpen && (*/}
            {/*    <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50 z-50">*/}
            {/*        <AddAnnouncementForm onClose={() => setIsAnnouncementModalOpen(false)} />*/}
            {/*    </div>*/}
            {/*)}*/}

        </>
    );

    const value = {
        viewMode,
        setViewMode,
        isCreateTaskModalOpen,
        isCreateTicketModalOpen,
        isEditTicketModalOpen,
        isViewTicketModalOpen,
        isEditTaskModalOpen,
        isSortModalOpen,
        isAddStatusColumnModalOpen,
        isSelectDepartmentModalOpen,
        isCreateDesignationModalOpen,
        isHighlightTaskModalOpen,
        isEditDepartmentFormOpen,
        isMoveTaskModalOpen,
        isAddTicketStatusColumnModalOpen,
        isSelectCountryModalOpen,
        isAnnouncementModalOpen,
        isSortTicketsModalOpen,
        isDeleteModalOpen,
        isEditModalOpen,
        isSelectProjectModalOpen,
        isSelectDesignationModalOpen,
        isSelectUserModalOpen,
        isCreateUserModalOpen,
        isEditDesignationModalOpen,
        isCreateProjectModalOpen,
        isEditCategoryModalOpen,
        isEditProjectModalOpen,
        isProjectDetailsModalOpen,
        isUsefulLinksOpen,
        isCreateLinksOpen,
        isSelectCategoryModalOpen,
        isAddFinanceModalOpen,
        isEditProfilePhotoModalOpen,
        setIsCreateTaskModalOpen,
        setIsHighlightTaskModalOpen,
        setIsCreateTicketModalOpen,
        setIsEditTicketModalOpen,
        setIsEditTaskModalOpen,
        setIsEditCategoryModalOpen,
        setIsSortModalOpen,
        setIsCreateDesignationModalOpen,
        setIsEditDepartmentFormOpen,
        setIsMoveTaskModalOpen,
        setIsAddTicketStatusColumnModalOpen,
        setSortTicketsModalOpen,
        setIsAddStatusColumnModalOpen,
        setIsDeleteModalOpen,
        setIsAnnouncementModalOpen,
        setIsSelectCountryModalOpen,
        setIsViewTicketModalOpen,
        setIsSelectProjectModalOpen,
        setColumns,
        setIsEditModalOpen,
        setIsEditDesignationModalOpen,
        setIsSelectUserModalOpen,
        setIsCreateUserModalOpen,
        setIsCreateProjectModalOpen,
        setIsSelectDesignationModalOpen,
        setIsEditProjectModalOpen,
        setIsProjectDetailsModalOpen,
        setIsSelectDepartmentModalOpen,
        setIsUsefulLinksOpen,
        setIsCreateLinksOpen,
        setIsSelectCategoryModalOpen,
        setIsAddFinanceModalOpen,
        toggleCreateTaskModal: () => setIsCreateTaskModalOpen(prev => !prev),
        toggleCreateTicketModal: () => setIsCreateTicketModalOpen(prev => !prev),
        toggleEditTicketModal: () => setIsEditTicketModalOpen(prev => !prev),
        toggleEditCategoryModal: () => setIsEditCategoryModalOpen(prev => !prev),
        toggleEditProjectModal: () => setIsEditProjectModalOpen(prev => !prev),
        toggleEditModal: () => setIsEditModalOpen(prev => !prev),
        toggleHighlightTaskModal: () => setIsHighlightTaskModalOpen(prev => !prev),
        toggleEditTaskModal: () => setIsEditTaskModalOpen(prev => !prev),
        toggleAddTicketStatusColumnModal: () => setIsAddTicketStatusColumnModalOpen(prev => !prev),
        toggleSortTicketsModal: () => setSortTicketsModalOpen(prev => !prev),
        toggleSortModal: () => setIsSortModalOpen(prev => !prev),
        toggleAddStatusColumnModal: () => setIsAddStatusColumnModalOpen(prev => !prev),
        toggleSelectCountryModal: () => setIsSelectCountryModalOpen(prev => !prev),
        toggleSelectUserModal: () => setIsSelectUserModalOpen(prev => !prev),
        toggleViewTicketModal: () => setIsViewTicketModalOpen(prev => !prev),
        toggleSelectDesignationModal: () => setIsSelectDesignationModalOpen(prev => !prev),
        toggleDeleteModal: () => setIsDeleteModalOpen(prev => !prev),
        toggleAnnouncementModal: () => setIsAnnouncementModalOpen(prev => !prev),
        toggleMoveTaskModal: () => setIsMoveTaskModalOpen(prev => !prev),
        toggleSelectProjectModal: () => setIsSelectProjectModalOpen(prev => !prev),
        toggleCreateUserModal: () => setIsCreateUserModalOpen(prev => !prev),
        toggleEditDesignationModal: () => setIsEditDesignationModalOpen(prev => !prev),
        toggleCreateProjectModal: () => setIsCreateProjectModalOpen(prev => !prev),
        toggleProjectDetailsModal: () => setIsProjectDetailsModalOpen(prev => !prev),
        toggleUsefulLinks: () => setIsUsefulLinksOpen(prev => !prev),
        toggleCreateLinks: () => setIsCreateLinksOpen(prev => !prev),
        toggleAddFinanceModal: () => setIsAddFinanceModalOpen(prev => !prev),
        toggleSelectCategoryModal: () => setIsSelectCategoryModalOpen(prev => !prev),
        toggleEditProfilePhotoModal: () => setIsEditProfilePhotoModalOpen(prev => !prev),
        toggleSelectDepartmentModal: () => setIsSelectDepartmentModalOpen(prev => !prev),
        toggleCreateDesignationModal: () => setIsCreateDesignationModalOpen(prev => !prev),
        toggleEditDepartmentForm: () => setIsEditDepartmentFormOpen(prev => !prev),
        renderModals,
        columns,
        handleSortSubmit,
    };

    return <ModalContext.Provider value={value}>{children}</ModalContext.Provider>;
};

export const useModalContext = () => {
    const context = useContext(ModalContext);
    if (context === undefined) {
        throw new Error('useModalContext must be used within a ModalProvider');
    }
    return context;
};
