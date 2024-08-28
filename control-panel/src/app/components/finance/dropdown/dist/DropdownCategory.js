"use strict";
exports.__esModule = true;
// components/Dropdown.tsx
var react_1 = require("react");
var io_1 = require("react-icons/io");
var io5_1 = require("react-icons/io5");
var Dropdown = function () {
    var _a = react_1.useState(false), isOpen = _a[0], setIsOpen = _a[1];
    var _b = react_1.useState(''), searchTerm = _b[0], setSearchTerm = _b[1];
    var categories = [
        'General',
        'Nasif eshterakat',
        'Accounting system',
        'Projects',
        'Menu Mind',
        'Office Stationery',
        'Salaries',
        'Renting'
    ];
    var filteredCategories = categories.filter(function (category) {
        return category.toLowerCase().includes(searchTerm.toLowerCase());
    });
    var toggleDropdown = function () {
        setIsOpen(!isOpen);
    };
    return (react_1["default"].createElement("div", { className: "relative w-64" },
        react_1["default"].createElement("div", { className: "bg-white border border-gray-300 rounded-md shadow-sm cursor-pointer p-2 flex justify-between items-center \n          " + (isOpen ? 'border-b-0 rounded-b-none' : ''), onClick: toggleDropdown },
            react_1["default"].createElement("span", { className: 'font-medium text-[15px]' }, "Category"),
            react_1["default"].createElement("span", null, isOpen ? react_1["default"].createElement(io_1.IoIosArrowUp, null) : react_1["default"].createElement(io_1.IoIosArrowDown, null))),
        react_1["default"].createElement("div", { className: "transition-all duration-300 ease-out transform origin-top \n          " + (isOpen ? 'scale-y-100 opacity-100 shadow-lg' : 'scale-y-0 opacity-0') + " \n          absolute right-0 w-full bg-white rounded-md rounded-t-none overflow-hidden z-10 border border-gray-300 border-t-0" },
            react_1["default"].createElement("div", { className: "p-2 relative" },
                react_1["default"].createElement("input", { type: "text", placeholder: "Search", className: "w-full pl-10 pr-4 py-2 bg-[#F4F4F4] rounded-xl", value: searchTerm, onChange: function (e) { return setSearchTerm(e.target.value); } }),
                react_1["default"].createElement("div", { className: 'absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400' },
                    react_1["default"].createElement(io5_1.IoSearchOutline, null))),
            react_1["default"].createElement("ul", { className: "" }, filteredCategories.map(function (category, index) { return (react_1["default"].createElement("li", { key: index, className: "mx-2 px-4 py-2 hover:bg-gray-100 cursor-pointer font-medium text-[15px] border-b border-[#C4C4C4] last:border-0", onClick: function () {
                    setIsOpen(false);
                } }, category)); })))));
};
exports["default"] = Dropdown;
