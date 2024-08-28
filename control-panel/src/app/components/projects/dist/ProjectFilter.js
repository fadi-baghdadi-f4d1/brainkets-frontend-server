"use strict";
exports.__esModule = true;
var react_1 = require("react");
var ProjectFilter = function (_a) {
    var selectedFilter = _a.selectedFilter, onFilterChange = _a.onFilterChange;
    var filters = [
        { label: 'All', color: '' },
        { label: 'Completed', color: '#19B600' },
        { label: 'In Progress', color: '#57A4FF' },
        { label: 'Not Started', color: '#999999' },
        { label: 'On Hold', color: '#CC0000' },
    ];
    var handleFilterClick = function (filter) {
        var filterValue = filter === 'All' ? '' : filter.toLowerCase(); // Send empty string for "All"
        onFilterChange(filterValue);
    };
    return (react_1["default"].createElement("div", { className: 'mt-5 mx-4 md:mx-10 flex justify-between space-x-2 overflow-x-auto xl:overflow-hidden lg:overflow-hidden whitespace-nowrap' }, filters.map(function (filter) { return (react_1["default"].createElement("div", { key: filter.label, onClick: function () { return handleFilterClick(filter.label); }, className: "w-[150px] lg:w-[250px] h-[60px] flex-shrink-0 flex justify-center items-center\n             bg-white rounded-md font-bold cursor-pointer " + (selectedFilter === (filter.label === 'All' ? '' : filter.label.toLowerCase()) ? 'border-2 border-solid border-[#606060]' : '' // Handle empty string comparison
        ) },
        filter.color && (react_1["default"].createElement("div", { className: "w-[20px] h-[20px] rounded-full mr-[10px]", style: { backgroundColor: filter.color } })),
        react_1["default"].createElement("span", { className: 'font-bold' }, filter.label))); })));
};
exports["default"] = ProjectFilter;
