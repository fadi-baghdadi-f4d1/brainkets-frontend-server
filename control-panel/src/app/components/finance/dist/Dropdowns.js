"use strict";
exports.__esModule = true;
var react_1 = require("react");
var Dropdowns = function (_a) {
    var options = _a.options, placeholder = _a.placeholder;
    return (react_1["default"].createElement("select", { className: "w-full p-2 border border-[#C4C4C4] rounded-md bg-white" },
        react_1["default"].createElement("option", { value: "", disabled: true, selected: true }, placeholder),
        options.map(function (option, index) { return (react_1["default"].createElement("option", { key: index, value: option }, option)); })));
};
exports["default"] = Dropdowns;
