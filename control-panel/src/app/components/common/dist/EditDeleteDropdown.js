"use client";
"use strict";
exports.__esModule = true;
var react_1 = require("react");
var image_1 = require("next/image");
var bs_1 = require("react-icons/bs");
var DeleteModal_1 = require("./DeleteModal");
var EditDesignationForm_1 = require("../users/forms/EditDesignationForm");
var EditCategoryForm_1 = require("../../components/projects/forms/EditCategoryForm");
var EditDepartmentForm_1 = require("../../components/projects/forms/EditDepartmentForm");
var EditLinks_1 = require("../projects/forms/EditLinks");
var EditFinanceCategoryForm_1 = require("../../components/finance/forms/EditFinanceCategoryForm");
var EditDeleteDropDown = function (_a) {
    var type = _a.type, entityId = _a.entityId, entityName = _a.entityName, entityLink = _a.entityLink, onclick = _a.onclick;
    var _b = react_1.useState(false), isOpen = _b[0], setIsOpen = _b[1];
    var _c = react_1.useState(false), isModalOpen = _c[0], setIsModalOpen = _c[1];
    var dropdownRef = react_1.useRef(null);
    var _d = react_1.useState(false), editDesignationModal = _d[0], setEditDesignationModal = _d[1];
    var _e = react_1.useState(false), editCategoryModal = _e[0], setEditCategoryModal = _e[1];
    var _f = react_1.useState(false), editCategoryFinanceModal = _f[0], setEditCategoryFinanceModal = _f[1];
    var _g = react_1.useState(false), editDepartmentModal = _g[0], setEditDepartmentModal = _g[1];
    var _h = react_1.useState(false), editLinksModal = _h[0], setEditLinksModal = _h[1];
    var toggleDropdown = function () { return setIsOpen(!isOpen); };
    var handleClickOutside = function (event) {
        if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
            setIsOpen(false);
        }
    };
    react_1.useEffect(function () {
        document.addEventListener('mousedown', handleClickOutside);
        return function () { return document.removeEventListener('mousedown', handleClickOutside); };
    }, []);
    var openModal = function () {
        setIsModalOpen(true);
        setIsOpen(false);
    };
    var closeModal = function () { return setIsModalOpen(false); };
    var handleEditClick = function () {
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
    var closeEditModal = function () {
        setEditDesignationModal(false);
        setEditCategoryModal(false);
        setEditDepartmentModal(false);
        setEditLinksModal(false);
        setEditCategoryFinanceModal(false); // Ensure this is included
    };
    return (react_1["default"].createElement("div", { className: "relative", ref: dropdownRef },
        react_1["default"].createElement("button", { onClick: toggleDropdown, className: "flex items-center px-2 py-1 rounded-full hover:bg-gray-100 focus:outline-none z-30", "aria-expanded": isOpen, "aria-haspopup": "true" },
            react_1["default"].createElement(bs_1.BsThreeDotsVertical, null)),
        react_1["default"].createElement("div", { className: "transition-all duration-300 ease-out absolute right-3 w-32 bg-white rounded-lg shadow-lg z-40\n          " + (isOpen ? 'scale-y-100 opacity-100' : 'scale-y-0 opacity-0'), style: { transformOrigin: 'top' } },
            ['designations', 'project_categories', 'project_departments', 'links', 'finance_categories'].includes(type) && (react_1["default"].createElement("div", { className: "flex items-center p-2 cursor-pointer hover:bg-gray-100 border-b border-gray-300 font-medium text-[15px] mx-1", onClick: handleEditClick },
                react_1["default"].createElement(image_1["default"], { src: "/edit.svg", alt: "Edit " + type, width: 16, height: 16 }),
                react_1["default"].createElement("span", { className: "pl-2" }, "Edit"))),
            react_1["default"].createElement("div", { className: "flex items-center p-2 cursor-pointer hover:rounded-b-md hover:bg-gray-100 font-medium text-[15px] w-full", onClick: openModal },
                react_1["default"].createElement(image_1["default"], { src: "/delete.svg", alt: "Delete " + type, width: 16, height: 16 }),
                react_1["default"].createElement("span", { className: "pl-2" }, "Delete"))),
        react_1["default"].createElement(DeleteModal_1["default"], { isOpen: isModalOpen, onClose: closeModal, entityId: entityId, entityType: type }),
        editDesignationModal && (react_1["default"].createElement("div", { className: "fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50" },
            react_1["default"].createElement(EditDesignationForm_1["default"], { isOpen: editDesignationModal, onClose: closeEditModal, designationId: entityId, designationName: entityName, onSave: function (updatedDesignation) { return console.log('Updated Designation:', updatedDesignation); } }))),
        editCategoryModal && (react_1["default"].createElement("div", { className: "fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50" },
            react_1["default"].createElement(EditCategoryForm_1["default"], { isOpen: editCategoryModal, onClose: closeEditModal, entityId: entityId, entityName: entityName }))),
        editCategoryFinanceModal && (react_1["default"].createElement("div", { className: "fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50" },
            react_1["default"].createElement(EditFinanceCategoryForm_1["default"], { isOpen: editCategoryFinanceModal, onClose: closeEditModal, entityId: entityId, entityName: entityName }))),
        editDepartmentModal && (react_1["default"].createElement("div", { className: "fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50" },
            react_1["default"].createElement(EditDepartmentForm_1["default"], { isOpen: editDepartmentModal, onClose: closeEditModal, departmentId: entityId, departmentName: entityName }))),
        editLinksModal && (react_1["default"].createElement("div", { className: "fixed inset-0 flex items-center justify-end bg-black bg-opacity-50 z-50" },
            react_1["default"].createElement(EditLinks_1["default"], { isOpen: editLinksModal, onClose: closeEditModal, linkId: entityId, linkName: entityName, link: entityLink })))));
};
exports["default"] = EditDeleteDropDown;
