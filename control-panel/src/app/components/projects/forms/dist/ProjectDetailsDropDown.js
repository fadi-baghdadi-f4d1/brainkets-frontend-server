"use strict";
exports.__esModule = true;
var react_1 = require("react");
var image_1 = require("next/image");
var bee_svg_1 = require("../../../../public/bee.svg");
var DropdownMenu = function (_a) {
    var dropdownRef = _a.dropdownRef, isDropdownOpen = _a.isDropdownOpen, setIsDropdownOpen = _a.setIsDropdownOpen, handleNavigation = _a.handleNavigation, handleProjectClick = _a.handleProjectClick, handleUsefulLinksClick = _a.handleUsefulLinksClick;
    var dropdownContainerRef = react_1.useRef(null);
    var toggleDropdown = function () {
        setIsDropdownOpen(function (prevState) { return !prevState; });
    };
    var handleClickOutside = function (event) {
        if (dropdownContainerRef.current && !dropdownContainerRef.current.contains(event.target)) {
            setIsDropdownOpen(false);
        }
    };
    react_1.useEffect(function () {
        document.addEventListener('mousedown', handleClickOutside);
        return function () {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [handleClickOutside]);
    return (react_1["default"].createElement("div", { className: "relative", ref: dropdownContainerRef },
        react_1["default"].createElement(image_1["default"], { src: bee_svg_1["default"], alt: "Project Logo", width: 45, height: 45, className: "object-cover h-10 w-10 rounded-lg cursor-pointer", onClick: toggleDropdown }),
        react_1["default"].createElement("div", { ref: dropdownRef, className: "absolute right-0 top-12 bg-white border border-gray-300 rounded-md shadow-lg z-10 w-[120px] transition-all duration-300 ease-out transform " + (isDropdownOpen ? "scale-y-100 opacity-100" : "scale-y-0 opacity-0") + " origin-top" },
            react_1["default"].createElement("div", { onClick: function () { handleNavigation('taskboard'); setIsDropdownOpen(false); }, className: "flex border-b border-b-[#E4E4E4] items-center py-1 cursor-pointer hover:bg-gray-100 hover:rounded-t-md" },
                react_1["default"].createElement(image_1["default"], { src: "/task.svg", alt: "Tasks", width: 15, height: 15, className: "ml-2" }),
                react_1["default"].createElement("span", { className: "text-black text-sm mx-2" }, "Tasks")),
            react_1["default"].createElement("div", { onClick: function () { handleNavigation('tickets'); setIsDropdownOpen(false); }, className: "flex border-b border-b-[#E4E4E4] items-center py-1 cursor-pointer hover:bg-gray-100" },
                react_1["default"].createElement(image_1["default"], { src: "/ticket.svg", alt: "Tickets", width: 15, height: 15, className: "ml-2" }),
                react_1["default"].createElement("span", { className: "text-black text-sm mx-2" }, "Tickets")),
            react_1["default"].createElement("div", { onClick: function () { handleUsefulLinksClick(); setIsDropdownOpen(false); }, className: "flex items-center border-b border-b-[#E4E4E4] py-1 cursor-pointer hover:bg-gray-100" },
                react_1["default"].createElement(image_1["default"], { src: "/links.svg", alt: "Links", width: 15, height: 15, className: "ml-2" }),
                react_1["default"].createElement("span", { className: "text-black text-sm mx-2" }, "Links")),
            react_1["default"].createElement("div", { onClick: function () { handleProjectClick(); setIsDropdownOpen(false); }, className: "flex items-center py-1 cursor-pointer hover:bg-gray-100 hover:rounded-b-md" },
                react_1["default"].createElement(image_1["default"], { src: "/edit.svg", alt: "Edit", width: 15, height: 15, className: "ml-2" }),
                react_1["default"].createElement("span", { className: "text-black text-sm mx-2" }, "Edit")))));
};
exports["default"] = DropdownMenu;
