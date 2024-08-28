"use strict";
exports.__esModule = true;
var react_1 = require("react");
var UsersFilter = function () {
    var _a = react_1.useState('All'), selected = _a[0], setSelected = _a[1];
    var options = [
        { label: 'All', color: '#F9781D' },
        { label: 'Employee', color: '#FFC700' },
        { label: 'Clients', color: '#57A4FF' },
        { label: 'Partner', color: '#BB6CF9' },
    ];
    return (react_1["default"].createElement("div", { className: 'hidden xl:flex lg:flex space-x-4 col-span-2 mx-10' }, options.map(function (option) { return (react_1["default"].createElement("div", { key: option.label, className: "w-[370px] h-[60px] rounded-md flex justify-center items-center text-center\n             px-[30px] py-[10px] cursor-pointer hover:shadow-md\n          " + (selected === option.label ? 'border border-[#606060]' : '') + "\n          ", style: {
            backgroundColor: option.color + "26",
            color: option.color
        }, onClick: function () { return setSelected(option.label); } }, option.label)); })));
};
exports["default"] = UsersFilter;
