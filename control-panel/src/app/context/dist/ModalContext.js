"use client";
"use strict";
exports.__esModule = true;
exports.useModalContext = exports.ModalProvider = void 0;
var react_1 = require("react");
var UsefulLinks_1 = require("@/components/projects/forms/UsefulLinks");
var CreateTaskModal_1 = require("@/components/taskboard/modals/CreateTaskModal");
var SortModal_1 = require("@/components/taskboard/modals/SortModal");
var AddFinanceForm_1 = require("@/components/finance/forms/AddFinanceForm");
var CreateUserForm_1 = require("@/components/projects/forms/CreateUserForm");
var CreateProjectForm_1 = require("@/components/projects/forms/CreateProjectForm");
var CreateTicketModal_1 = require("@/components/tickets/modals/CreateTicketModal");
var EditTaskModal_1 = require("@/components/taskboard/modals/EditTaskModal");
var EditTicketModal_1 = require("@/components/tickets/modals/EditTicketModal");
var EditProfilePhotoForm_1 = require("@/components/profile/EditProfilePhotoForm");
var AddStatusColumn_1 = require("@/components/taskboard/modals/AddStatusColumn");
var MoveTaskModal_1 = require("@/components/taskboard/modals/MoveTaskModal");
var SelectProjectModal_1 = require("@/components/taskboard/modals/SelectProjectModal");
var AddTicketStatusColumn_1 = require("@/components/tickets/modals/AddTicketStatusColumn");
var SortTicketStatusModal_1 = require("@/components/tickets/modals/SortTicketStatusModal");
var ViewTicket_1 = require("@/components/tickets/modals/ViewTicket");
var AddAnnouncementForm_1 = require("@/components/announcements/form/AddAnnouncementForm");
var CreateDesignationForm_1 = require("@/components/users/forms/CreateDesignationForm");
var ModalContext = react_1.createContext(undefined);
exports.ModalProvider = function (_a) {
    var children = _a.children;
    var _b = react_1.useState('grid'), viewMode = _b[0], setViewMode = _b[1];
    var _c = react_1.useState(false), isCreateTaskModalOpen = _c[0], setIsCreateTaskModalOpen = _c[1];
    var _d = react_1.useState(false), isHighlightTaskModalOpen = _d[0], setIsHighlightTaskModalOpen = _d[1];
    var _e = react_1.useState(false), isCreateTicketModalOpen = _e[0], setIsCreateTicketModalOpen = _e[1];
    var _f = react_1.useState(false), isEditTicketModalOpen = _f[0], setIsEditTicketModalOpen = _f[1];
    var _g = react_1.useState(false), isViewTicketModalOpen = _g[0], setIsViewTicketModalOpen = _g[1];
    var _h = react_1.useState(false), isEditTaskModalOpen = _h[0], setIsEditTaskModalOpen = _h[1];
    var _j = react_1.useState(false), isEditModalOpen = _j[0], setIsEditModalOpen = _j[1];
    var _k = react_1.useState(false), isEditDesignationModalOpen = _k[0], setIsEditDesignationModalOpen = _k[1];
    var _l = react_1.useState(false), isSortModalOpen = _l[0], setIsSortModalOpen = _l[1];
    var _m = react_1.useState(false), isSelectCountryModalOpen = _m[0], setIsSelectCountryModalOpen = _m[1];
    var _o = react_1.useState(false), isEditCategoryModalOpen = _o[0], setIsEditCategoryModalOpen = _o[1];
    var _p = react_1.useState(false), isDeleteModalOpen = _p[0], setIsDeleteModalOpen = _p[1];
    var _q = react_1.useState(false), isMoveTaskModalOpen = _q[0], setIsMoveTaskModalOpen = _q[1];
    var _r = react_1.useState(false), isSelectDesignationModalOpen = _r[0], setIsSelectDesignationModalOpen = _r[1];
    var _s = react_1.useState(false), isSelectProjectModalOpen = _s[0], setIsSelectProjectModalOpen = _s[1];
    var _t = react_1.useState(false), isCreateDesignationModalOpen = _t[0], setIsCreateDesignationModalOpen = _t[1];
    var _u = react_1.useState(false), isEditDepartmentFormOpen = _u[0], setIsEditDepartmentFormOpen = _u[1];
    var _v = react_1.useState(false), isAddTicketStatusColumnModalOpen = _v[0], setIsAddTicketStatusColumnModalOpen = _v[1];
    var _w = react_1.useState(false), isSortTicketsModalOpen = _w[0], setSortTicketsModalOpen = _w[1];
    var _x = react_1.useState(false), isAddStatusColumnModalOpen = _x[0], setIsAddStatusColumnModalOpen = _x[1];
    var _y = react_1.useState([]), columns = _y[0], setColumns = _y[1];
    var _z = react_1.useState(false), isSelectDepartmentModalOpen = _z[0], setIsSelectDepartmentModalOpen = _z[1];
    var _0 = react_1.useState(false), isAnnouncementModalOpen = _0[0], setIsAnnouncementModalOpen = _0[1];
    var _1 = react_1.useState(false), isSelectUserModalOpen = _1[0], setIsSelectUserModalOpen = _1[1];
    var _2 = react_1.useState(false), isCreateUserModalOpen = _2[0], setIsCreateUserModalOpen = _2[1];
    var _3 = react_1.useState(false), isCreateProjectModalOpen = _3[0], setIsCreateProjectModalOpen = _3[1];
    var _4 = react_1.useState(false), isEditProjectModalOpen = _4[0], setIsEditProjectModalOpen = _4[1];
    var _5 = react_1.useState(false), isProjectDetailsModalOpen = _5[0], setIsProjectDetailsModalOpen = _5[1];
    var _6 = react_1.useState(false), isUsefulLinksOpen = _6[0], setIsUsefulLinksOpen = _6[1];
    var _7 = react_1.useState(false), isCreateLinksOpen = _7[0], setIsCreateLinksOpen = _7[1];
    var _8 = react_1.useState(false), isSelectCategoryModalOpen = _8[0], setIsSelectCategoryModalOpen = _8[1];
    var _9 = react_1.useState(false), isAddFinanceModalOpen = _9[0], setIsAddFinanceModalOpen = _9[1];
    var _10 = react_1.useState(false), isEditProfilePhotoModalOpen = _10[0], setIsEditProfilePhotoModalOpen = _10[1];
    react_1.useEffect(function () {
        // Check if any modal is open
        var isAnyModalOpen = [
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
        ].some(function (open) { return open; });
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
    var handleSortSubmit = function (sortedColumns) {
        setColumns(sortedColumns);
        setIsSortModalOpen(false); // Close the modal after sorting
    };
    var _11 = react_1.useState(null), selectedTicket = _11[0], setSelectedTicket = _11[1];
    var _12 = react_1.useState(null), entityId = _12[0], setEntityId = _12[1];
    var _13 = react_1.useState(null), entityType = _13[0], setEntityType = _13[1];
    var _14 = react_1.useState(''), selectedDesignation = _14[0], setSelectedDesignation = _14[1];
    var toggleCreateUserModal = function () { return setIsCreateUserModalOpen(function (prev) { return !prev; }); };
    var toggleSelectDesignationModal = function () { return setIsSelectDesignationModalOpen(function (prev) { return !prev; }); };
    var handleSelectDesignation = function (designation) {
        setSelectedDesignation(designation);
        setIsSelectDesignationModalOpen(false);
        setIsCreateUserModalOpen(true); // Automatically open CreateUser modal after selection
    };
    var renderModals = function () { return (react_1["default"].createElement(react_1["default"].Fragment, null,
        isCreateUserModalOpen && (react_1["default"].createElement("div", { className: "fixed inset-0 flex items-center justify-end bg-black bg-opacity-50 z-50" },
            react_1["default"].createElement(CreateUserForm_1["default"], { onClose: function () { return setIsCreateUserModalOpen(false); } }))),
        isCreateTaskModalOpen && (react_1["default"].createElement("div", { className: "fixed inset-0 flex items-end justify-end bg-black bg-opacity-50 z-40" },
            react_1["default"].createElement(CreateTaskModal_1["default"], { toggleModal: function () { return setIsCreateTaskModalOpen(false); } }))),
        isEditTaskModalOpen && (react_1["default"].createElement("div", { className: "fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-40" },
            react_1["default"].createElement(EditTaskModal_1["default"], { toggleModal: function () { return setIsEditTaskModalOpen(false); }, toggleSelectUserModal: function () { return setIsSelectUserModalOpen(true); } }))),
        isCreateProjectModalOpen && (react_1["default"].createElement("div", { className: "fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-40" },
            react_1["default"].createElement(CreateProjectForm_1["default"], { onClose: function () { return setIsCreateProjectModalOpen(false); } }))),
        isCreateDesignationModalOpen && (react_1["default"].createElement("div", { className: "fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50" },
            react_1["default"].createElement(CreateDesignationForm_1["default"], { onClose: function () { return setIsCreateDesignationModalOpen(false); } }))),
        isCreateTicketModalOpen && (react_1["default"].createElement("div", { className: "fixed inset-0 flex items-center justify-end bg-black bg-opacity-50 z-40" },
            react_1["default"].createElement(CreateTicketModal_1["default"], { toggleModal: function () { return setIsCreateTicketModalOpen(false); }, toggleSelectUserModal: function () { return setIsSelectUserModalOpen(true); } }))),
        isEditTicketModalOpen && (react_1["default"].createElement("div", { className: "fixed inset-0 flex items-center justify-end bg-black bg-opacity-50 z-40" },
            react_1["default"].createElement(EditTicketModal_1["default"], { toggleModal: function () { return setIsEditTicketModalOpen(false); }, toggleSelectUserModal: function () { return setIsSelectUserModalOpen(true); } }))),
        isSortModalOpen && (react_1["default"].createElement("div", { className: "fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50" },
            react_1["default"].createElement(SortModal_1["default"], { onClose: function () { return setIsSortModalOpen(function (prev) { return !prev; }); } }))),
        isViewTicketModalOpen && selectedTicket && (react_1["default"].createElement("div", { className: "fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-40" },
            react_1["default"].createElement(ViewTicket_1["default"], { ticket: selectedTicket, onClose: function () { return setIsViewTicketModalOpen(false); } }))),
        isAddStatusColumnModalOpen && (react_1["default"].createElement("div", { className: "fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-40" },
            react_1["default"].createElement(AddStatusColumn_1["default"], { onClose: function () { return setIsAddStatusColumnModalOpen(false); } }))),
        isMoveTaskModalOpen && (react_1["default"].createElement("div", { className: "fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-40" },
            react_1["default"].createElement(MoveTaskModal_1["default"], { onClose: function () { return setIsMoveTaskModalOpen(false); } }))),
        isAddTicketStatusColumnModalOpen && (react_1["default"].createElement("div", { className: "fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-40" },
            react_1["default"].createElement(AddTicketStatusColumn_1["default"], { onClose: function () { return setIsAddTicketStatusColumnModalOpen(false); } }))),
        isSortTicketsModalOpen && (react_1["default"].createElement("div", { className: "fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-40" },
            react_1["default"].createElement(SortTicketStatusModal_1["default"], { onClose: function () { return setSortTicketsModalOpen(false); } }))),
        isSelectProjectModalOpen && (react_1["default"].createElement("div", { className: "fixed inset-0 flex items-end justify-end bg-black bg-opacity-50 z-40" },
            react_1["default"].createElement(SelectProjectModal_1["default"], { onClose: function () { return setIsSelectProjectModalOpen(false); } }))),
        isUsefulLinksOpen && (react_1["default"].createElement("div", { className: "fixed inset-0 flex items-end justify-end bg-black bg-opacity-50 z-50" },
            react_1["default"].createElement(UsefulLinks_1["default"], { toggleModal: function () { return setIsUsefulLinksOpen(false); }, toggleCreateLinks: function () { return setIsCreateLinksOpen(true); } }))),
        isAddFinanceModalOpen && (react_1["default"].createElement("div", { className: "fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-40" },
            react_1["default"].createElement(AddFinanceForm_1["default"], { onClose: function () { return setIsAddFinanceModalOpen(false); } }))),
        isEditProfilePhotoModalOpen && (react_1["default"].createElement("div", { className: "fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50 z-50" },
            react_1["default"].createElement(EditProfilePhotoForm_1["default"], { isOpen: isEditProfilePhotoModalOpen, onClose: function () { return setIsEditProfilePhotoModalOpen(false); } }))),
        isAnnouncementModalOpen && (react_1["default"].createElement("div", { className: "fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50 z-50" },
            react_1["default"].createElement(AddAnnouncementForm_1["default"], { onClose: function () { return setIsAnnouncementModalOpen(false); } }))))); };
    var value = {
        viewMode: viewMode,
        setViewMode: setViewMode,
        isCreateTaskModalOpen: isCreateTaskModalOpen,
        isCreateTicketModalOpen: isCreateTicketModalOpen,
        isEditTicketModalOpen: isEditTicketModalOpen,
        isViewTicketModalOpen: isViewTicketModalOpen,
        isEditTaskModalOpen: isEditTaskModalOpen,
        isSortModalOpen: isSortModalOpen,
        isAddStatusColumnModalOpen: isAddStatusColumnModalOpen,
        isSelectDepartmentModalOpen: isSelectDepartmentModalOpen,
        isCreateDesignationModalOpen: isCreateDesignationModalOpen,
        isHighlightTaskModalOpen: isHighlightTaskModalOpen,
        isEditDepartmentFormOpen: isEditDepartmentFormOpen,
        isMoveTaskModalOpen: isMoveTaskModalOpen,
        isAddTicketStatusColumnModalOpen: isAddTicketStatusColumnModalOpen,
        isSelectCountryModalOpen: isSelectCountryModalOpen,
        isAnnouncementModalOpen: isAnnouncementModalOpen,
        isSortTicketsModalOpen: isSortTicketsModalOpen,
        isDeleteModalOpen: isDeleteModalOpen,
        isEditModalOpen: isEditModalOpen,
        isSelectProjectModalOpen: isSelectProjectModalOpen,
        isSelectDesignationModalOpen: isSelectDesignationModalOpen,
        isSelectUserModalOpen: isSelectUserModalOpen,
        isCreateUserModalOpen: isCreateUserModalOpen,
        isEditDesignationModalOpen: isEditDesignationModalOpen,
        isCreateProjectModalOpen: isCreateProjectModalOpen,
        isEditCategoryModalOpen: isEditCategoryModalOpen,
        isEditProjectModalOpen: isEditProjectModalOpen,
        isProjectDetailsModalOpen: isProjectDetailsModalOpen,
        isUsefulLinksOpen: isUsefulLinksOpen,
        isCreateLinksOpen: isCreateLinksOpen,
        isSelectCategoryModalOpen: isSelectCategoryModalOpen,
        isAddFinanceModalOpen: isAddFinanceModalOpen,
        isEditProfilePhotoModalOpen: isEditProfilePhotoModalOpen,
        setIsCreateTaskModalOpen: setIsCreateTaskModalOpen,
        setIsHighlightTaskModalOpen: setIsHighlightTaskModalOpen,
        setIsCreateTicketModalOpen: setIsCreateTicketModalOpen,
        setIsEditTicketModalOpen: setIsEditTicketModalOpen,
        setIsEditTaskModalOpen: setIsEditTaskModalOpen,
        setIsEditCategoryModalOpen: setIsEditCategoryModalOpen,
        setIsSortModalOpen: setIsSortModalOpen,
        setIsCreateDesignationModalOpen: setIsCreateDesignationModalOpen,
        setIsEditDepartmentFormOpen: setIsEditDepartmentFormOpen,
        setIsMoveTaskModalOpen: setIsMoveTaskModalOpen,
        setIsAddTicketStatusColumnModalOpen: setIsAddTicketStatusColumnModalOpen,
        setSortTicketsModalOpen: setSortTicketsModalOpen,
        setIsAddStatusColumnModalOpen: setIsAddStatusColumnModalOpen,
        setIsDeleteModalOpen: setIsDeleteModalOpen,
        setIsAnnouncementModalOpen: setIsAnnouncementModalOpen,
        setIsSelectCountryModalOpen: setIsSelectCountryModalOpen,
        setIsViewTicketModalOpen: setIsViewTicketModalOpen,
        setIsSelectProjectModalOpen: setIsSelectProjectModalOpen,
        setColumns: setColumns,
        setIsEditModalOpen: setIsEditModalOpen,
        setIsEditDesignationModalOpen: setIsEditDesignationModalOpen,
        setIsSelectUserModalOpen: setIsSelectUserModalOpen,
        setIsCreateUserModalOpen: setIsCreateUserModalOpen,
        setIsCreateProjectModalOpen: setIsCreateProjectModalOpen,
        setIsSelectDesignationModalOpen: setIsSelectDesignationModalOpen,
        setIsEditProjectModalOpen: setIsEditProjectModalOpen,
        setIsProjectDetailsModalOpen: setIsProjectDetailsModalOpen,
        setIsSelectDepartmentModalOpen: setIsSelectDepartmentModalOpen,
        setIsUsefulLinksOpen: setIsUsefulLinksOpen,
        setIsCreateLinksOpen: setIsCreateLinksOpen,
        setIsSelectCategoryModalOpen: setIsSelectCategoryModalOpen,
        setIsAddFinanceModalOpen: setIsAddFinanceModalOpen,
        toggleCreateTaskModal: function () { return setIsCreateTaskModalOpen(function (prev) { return !prev; }); },
        toggleCreateTicketModal: function () { return setIsCreateTicketModalOpen(function (prev) { return !prev; }); },
        toggleEditTicketModal: function () { return setIsEditTicketModalOpen(function (prev) { return !prev; }); },
        toggleEditCategoryModal: function () { return setIsEditCategoryModalOpen(function (prev) { return !prev; }); },
        toggleEditProjectModal: function () { return setIsEditProjectModalOpen(function (prev) { return !prev; }); },
        toggleEditModal: function () { return setIsEditModalOpen(function (prev) { return !prev; }); },
        toggleHighlightTaskModal: function () { return setIsHighlightTaskModalOpen(function (prev) { return !prev; }); },
        toggleEditTaskModal: function () { return setIsEditTaskModalOpen(function (prev) { return !prev; }); },
        toggleAddTicketStatusColumnModal: function () { return setIsAddTicketStatusColumnModalOpen(function (prev) { return !prev; }); },
        toggleSortTicketsModal: function () { return setSortTicketsModalOpen(function (prev) { return !prev; }); },
        toggleSortModal: function () { return setIsSortModalOpen(function (prev) { return !prev; }); },
        toggleAddStatusColumnModal: function () { return setIsAddStatusColumnModalOpen(function (prev) { return !prev; }); },
        toggleSelectCountryModal: function () { return setIsSelectCountryModalOpen(function (prev) { return !prev; }); },
        toggleSelectUserModal: function () { return setIsSelectUserModalOpen(function (prev) { return !prev; }); },
        toggleViewTicketModal: function () { return setIsViewTicketModalOpen(function (prev) { return !prev; }); },
        toggleSelectDesignationModal: function () { return setIsSelectDesignationModalOpen(function (prev) { return !prev; }); },
        toggleDeleteModal: function () { return setIsDeleteModalOpen(function (prev) { return !prev; }); },
        toggleAnnouncementModal: function () { return setIsAnnouncementModalOpen(function (prev) { return !prev; }); },
        toggleMoveTaskModal: function () { return setIsMoveTaskModalOpen(function (prev) { return !prev; }); },
        toggleSelectProjectModal: function () { return setIsSelectProjectModalOpen(function (prev) { return !prev; }); },
        toggleCreateUserModal: function () { return setIsCreateUserModalOpen(function (prev) { return !prev; }); },
        toggleEditDesignationModal: function () { return setIsEditDesignationModalOpen(function (prev) { return !prev; }); },
        toggleCreateProjectModal: function () { return setIsCreateProjectModalOpen(function (prev) { return !prev; }); },
        toggleProjectDetailsModal: function () { return setIsProjectDetailsModalOpen(function (prev) { return !prev; }); },
        toggleUsefulLinks: function () { return setIsUsefulLinksOpen(function (prev) { return !prev; }); },
        toggleCreateLinks: function () { return setIsCreateLinksOpen(function (prev) { return !prev; }); },
        toggleAddFinanceModal: function () { return setIsAddFinanceModalOpen(function (prev) { return !prev; }); },
        toggleSelectCategoryModal: function () { return setIsSelectCategoryModalOpen(function (prev) { return !prev; }); },
        toggleEditProfilePhotoModal: function () { return setIsEditProfilePhotoModalOpen(function (prev) { return !prev; }); },
        toggleSelectDepartmentModal: function () { return setIsSelectDepartmentModalOpen(function (prev) { return !prev; }); },
        toggleCreateDesignationModal: function () { return setIsCreateDesignationModalOpen(function (prev) { return !prev; }); },
        toggleEditDepartmentForm: function () { return setIsEditDepartmentFormOpen(function (prev) { return !prev; }); },
        renderModals: renderModals,
        columns: columns,
        handleSortSubmit: handleSortSubmit
    };
    return react_1["default"].createElement(ModalContext.Provider, { value: value }, children);
};
exports.useModalContext = function () {
    var context = react_1.useContext(ModalContext);
    if (context === undefined) {
        throw new Error('useModalContext must be used within a ModalProvider');
    }
    return context;
};
