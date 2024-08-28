"use strict";
exports.__esModule = true;
var react_1 = require("react");
var hi_1 = require("react-icons/hi");
var image_1 = require("next/image");
var edit_svg_1 = require("../../../../public/edit.svg");
var delete_svg_1 = require("../../../../public/delete.svg");
var received_svg_1 = require("../../../../public/received.svg");
var eye_svg_1 = require("../../../../public/eye.svg");
var DeleteModal_1 = require("@/components/common/DeleteModal");
var EditFinanceForm_1 = require("../forms/EditFinanceForm");
var ViewFinanceForm_1 = require("../forms/ViewFinanceForm");
var FinanceDropdown = function (_a) {
    var entityId = _a.entityId, entityType = _a.entityType;
    var _b = react_1.useState(false), isOpen = _b[0], setIsOpen = _b[1];
    var _c = react_1.useState(false), showDeleteModal = _c[0], setShowDeleteModal = _c[1];
    var _d = react_1.useState(false), showEditModal = _d[0], setShowEditModal = _d[1];
    var _e = react_1.useState(false), showViewModal = _e[0], setShowViewModal = _e[1];
    // Example initial data; replace with actual data fetching logic
    var initialData = {
        amount: "100",
        description: "Sample Description",
        category: "Sample Category",
        date: "2024-08-01",
        isReceivedOrPaid: true,
        transactionType: 'Income',
        currency: 'USD'
    };
    var toggleDropdown = function () { return setIsOpen(!isOpen); };
    var handleDelete = function (event) {
        event.stopPropagation(); // Prevent event bubbling
        setShowDeleteModal(true);
        setIsOpen(false); // Close dropdown when delete is clicked
    };
    var handleEdit = function (event) {
        event.stopPropagation(); // Prevent event bubbling
        setShowEditModal(true);
        setIsOpen(false); // Close dropdown when edit is clicked
    };
    var handleView = function (event) {
        event.stopPropagation(); // Prevent event bubbling
        setShowViewModal(true);
        setIsOpen(false); // Close dropdown when edit is clicked
    };
    var closeDeleteModal = function () { return setShowDeleteModal(false); };
    var closeEditModal = function () { return setShowEditModal(false); };
    var closeViewModal = function () { return setShowViewModal(false); };
    return (react_1["default"].createElement("div", { className: "relative" },
        react_1["default"].createElement("button", { onClick: toggleDropdown, className: "p-2" },
            react_1["default"].createElement(hi_1.HiOutlineDotsVertical, null)),
        react_1["default"].createElement("div", { className: "transition-all duration-300 ease-out transform origin-top\n          " + (isOpen ? "scale-y-100 opacity-100 shadow-lg" : "scale-y-0 opacity-0") + "\n          absolute right-3 bg-white rounded-md overflow-hidden z-10" },
            react_1["default"].createElement("button", { className: "w-full flex items-center pr-6 py-2 hover:bg-gray-100 cursor-pointer border-b border-gray-200 font-medium" },
                react_1["default"].createElement(image_1["default"], { src: received_svg_1["default"], alt: "Received Icon", width: 20, height: 20, className: "mx-3" }),
                "Rec./Paid"),
            react_1["default"].createElement("button", { onClick: handleView, className: "w-full flex items-center pr-6 py-2 hover:bg-gray-100 cursor-pointer border-b border-gray-200 font-medium" },
                react_1["default"].createElement(image_1["default"], { src: eye_svg_1["default"], alt: "View Icon", width: 20, height: 20, className: "mx-3" }),
                "View"),
            react_1["default"].createElement("button", { onClick: handleEdit, className: "w-full flex items-center pr-6 py-2 hover:bg-gray-100 cursor-pointer border-b border-gray-200 font-medium" },
                react_1["default"].createElement(image_1["default"], { src: edit_svg_1["default"], alt: "Edit Icon", width: 16, height: 16, className: "mx-3" }),
                "Edit"),
            react_1["default"].createElement("button", { onClick: handleDelete, className: "w-full flex items-center pr-6 py-2 hover:bg-gray-100 cursor-pointer font-medium" },
                react_1["default"].createElement(image_1["default"], { src: delete_svg_1["default"], alt: "Delete Icon", width: 16, height: 16, className: "mx-3" }),
                "Delete")),
        react_1["default"].createElement(DeleteModal_1["default"], { isOpen: showDeleteModal, onClose: closeDeleteModal, entityId: entityId, entityType: entityType }),
        showEditModal && (react_1["default"].createElement("div", { className: "fixed inset-0 bg-black bg-opacity-50 z-40" },
            react_1["default"].createElement(EditFinanceForm_1["default"], { onClose: closeEditModal }))),
        showViewModal && (react_1["default"].createElement("div", { className: "fixed inset-0 bg-black bg-opacity-50 z-40" },
            react_1["default"].createElement(ViewFinanceForm_1["default"], { onClose: closeViewModal })))));
};
exports["default"] = FinanceDropdown;
