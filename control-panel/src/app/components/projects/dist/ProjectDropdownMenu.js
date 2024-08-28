"use strict";
exports.__esModule = true;
var react_1 = require("react");
var image_1 = require("next/image");
var hi_1 = require("react-icons/hi");
var tickets_svg_1 = require("../../../public/tickets.svg");
var details_svg_1 = require("../../../public/details.svg");
var links_svg_1 = require("../../../public/links.svg");
var edit_svg_1 = require("../../../public/edit.svg");
var delete_svg_1 = require("../../../public/delete.svg");
var useLocale_1 = require("../../hooks/useLocale");
var link_1 = require("next/link");
var DeleteModal_1 = require("@/components/common/DeleteModal");
var UsefulLinks_1 = require("@/components/projects/forms/UsefulLinks");
var CreateLinks_1 = require("@/components/projects/forms/CreateLinks");
var EditProjectForm_1 = require("@/components/projects/forms/EditProjectForm");
var ProjectDetails_1 = require("@/components/projects/forms/ProjectDetails");
var DropdownMenu = function (_a) {
    var projectId = _a.projectId;
    var _b = react_1.useState(false), open = _b[0], setOpen = _b[1];
    var _c = react_1.useState(false), showDeleteModal = _c[0], setShowDeleteModal = _c[1];
    var _d = react_1.useState(false), isUsefulLinksOpen = _d[0], setIsUsefulLinksOpen = _d[1];
    var _e = react_1.useState(false), isCreateLinksOpen = _e[0], setIsCreateLinksOpen = _e[1];
    var _f = react_1.useState(false), isEditProjectFormOpen = _f[0], setIsEditProjectFormOpen = _f[1];
    var dropdownRef = react_1.useRef(null);
    var _g = react_1.useState(false), isProjectDetailsOpen = _g[0], setIsProjectDetailsOpen = _g[1];
    var locale = useLocale_1["default"]();
    var toggleDropdown = function () {
        setOpen(function (prev) { return !prev; });
    };
    var handleClickOutside = function (event) {
        if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
            setOpen(false);
            setIsUsefulLinksOpen(false);
            setIsCreateLinksOpen(false);
            setIsEditProjectFormOpen(false);
        }
    };
    react_1.useEffect(function () {
        document.addEventListener('mousedown', handleClickOutside);
        return function () {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);
    var handleMenuClick = function (event) {
        event.stopPropagation();
    };
    var openDeleteModal = function (event) {
        event.stopPropagation();
        setShowDeleteModal(true);
        setOpen(false);
    };
    var closeDeleteModal = function () { return setShowDeleteModal(false); };
    var handleUsefulLinksClick = function (event) {
        event.stopPropagation();
        setIsUsefulLinksOpen(true);
        setOpen(false);
    };
    var handleEditClick = function (event) {
        event.stopPropagation();
        setIsEditProjectFormOpen(true);
        setOpen(false);
    };
    var handleProjectDetailsClick = function (event) {
        event.stopPropagation();
        setIsProjectDetailsOpen(true);
        setOpen(false);
    };
    // Functions to handle opening and closing modals for user and category selection
    var toggleSelectUserModal = function () {
        // Your implementation for toggling user modal
    };
    var toggleSelectCategoryModal = function () {
        // Your implementation for toggling category modal
    };
    return (react_1["default"].createElement("div", { className: 'relative', ref: dropdownRef },
        react_1["default"].createElement("div", { className: 'cursor-pointer', onClick: toggleDropdown },
            react_1["default"].createElement(hi_1.HiOutlineDotsVertical, null)),
        react_1["default"].createElement("div", { className: "transition-all duration-300 ease-out\n          absolute right-2 top-6 w-32 bg-white rounded-lg shadow-lg z-40\n          " + (open ? 'scale-y-100 opacity-100' : 'scale-y-0 opacity-0') + " ", style: { transformOrigin: 'top' } },
            react_1["default"].createElement("div", { className: 'flex flex-col space-y-2 w-full p-3' },
                react_1["default"].createElement(link_1["default"], { href: "/" + locale + "/tickets", passHref: true },
                    react_1["default"].createElement("div", { className: 'flex space-x-2 border-b border-[#E4E4E4] pb-1 cursor-pointer', onClick: function (e) { handleMenuClick(e); setOpen(false); } },
                        react_1["default"].createElement(image_1["default"], { src: tickets_svg_1["default"], alt: 'ticket', width: 20, height: 20 }),
                        react_1["default"].createElement("span", { className: 'font-medium' }, "Tickets"))),
                react_1["default"].createElement("div", { className: 'flex space-x-2 border-b border-[#E4E4E4] pb-1 cursor-pointer', onClick: handleProjectDetailsClick },
                    react_1["default"].createElement(image_1["default"], { src: details_svg_1["default"], alt: 'details', width: 20, height: 20 }),
                    react_1["default"].createElement("span", { className: 'font-medium' }, "Details")),
                react_1["default"].createElement("div", { className: 'flex space-x-2 border-b border-[#E4E4E4] pb-1 cursor-pointer', onClick: handleUsefulLinksClick },
                    react_1["default"].createElement(image_1["default"], { src: links_svg_1["default"], alt: 'link', width: 18, height: 18 }),
                    react_1["default"].createElement("span", { className: 'font-medium' }, "Links")),
                react_1["default"].createElement("div", { className: 'flex space-x-2 border-b border-[#E4E4E4] pb-1 cursor-pointer', onClick: handleEditClick },
                    react_1["default"].createElement(image_1["default"], { src: edit_svg_1["default"], alt: 'edit', width: 18, height: 18 }),
                    react_1["default"].createElement("span", { className: 'font-medium' }, "Edit")),
                react_1["default"].createElement("div", { className: 'flex space-x-2 pb-1 cursor-pointer', onClick: function (e) { return openDeleteModal(e); } },
                    react_1["default"].createElement(image_1["default"], { src: delete_svg_1["default"], alt: 'delete', width: 18, height: 18 }),
                    react_1["default"].createElement("span", { className: 'font-medium' }, "Delete")))),
        isUsefulLinksOpen && (react_1["default"].createElement("div", { className: "fixed inset-0 flex items-center justify-end bg-black bg-opacity-50 z-50" },
            react_1["default"].createElement(UsefulLinks_1["default"], { projectId: projectId, toggleModal: function () { return setIsUsefulLinksOpen(false); }, toggleCreateLinks: function () { return setIsCreateLinksOpen(true); } }))),
        isProjectDetailsOpen && (react_1["default"].createElement("div", { className: "fixed inset-0 flex items-center justify-end bg-black bg-opacity-50 z-50" },
            react_1["default"].createElement(ProjectDetails_1["default"], { projectId: projectId, onClose: function () { return setIsProjectDetailsOpen(false); } }))),
        isCreateLinksOpen && (react_1["default"].createElement("div", { className: "fixed inset-0 flex items-center justify-end bg-black bg-opacity-50 z-50" },
            react_1["default"].createElement(CreateLinks_1["default"], { projectId: projectId, toggleModal: function () { return setIsCreateLinksOpen(false); }, onSave: function (title, url) {
                    // Handle the save action (e.g., update state or fetch data again)
                } }))),
        isEditProjectFormOpen && (react_1["default"].createElement("div", { className: "fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50" },
            react_1["default"].createElement(EditProjectForm_1["default"], { projectId: projectId, onClose: function () { return setIsEditProjectFormOpen(false); } }))),
        react_1["default"].createElement(DeleteModal_1["default"], { isOpen: showDeleteModal, onClose: closeDeleteModal, entityId: projectId !== null && projectId !== void 0 ? projectId : 0, entityType: "project" })));
};
exports["default"] = DropdownMenu;
