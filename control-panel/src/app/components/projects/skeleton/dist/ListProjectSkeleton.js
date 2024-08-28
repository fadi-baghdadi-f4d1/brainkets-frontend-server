"use strict";
var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
exports.__esModule = true;
var react_1 = require("react");
var SkeletonLoader = function () {
    return (react_1["default"].createElement("div", { className: "mt-6 xl:mx-10 lg:mx-10" },
        react_1["default"].createElement("div", { className: "border rounded-md border-[#E4E4E4] overflow-hidden" },
            react_1["default"].createElement("div", { className: "overflow-x-auto" },
                react_1["default"].createElement("table", { className: "min-w-full divide-y h-auto divide-gray-200 border rounded-md border-[#E4E4E4]" },
                    react_1["default"].createElement("thead", null,
                        react_1["default"].createElement("tr", null,
                            react_1["default"].createElement("th", { className: "px-6 py-3 text-left text-[15px] font-semibold tracking-wider bg-gray-200" },
                                react_1["default"].createElement("div", { className: "h-4 bg-gray-300 rounded-md" })),
                            react_1["default"].createElement("th", { className: "px-6 py-3 text-left text-[15px] font-semibold tracking-wider bg-gray-200" },
                                react_1["default"].createElement("div", { className: "h-4 bg-gray-300 rounded-md" })),
                            react_1["default"].createElement("th", { className: "px-6 py-3 text-left text-[15px] font-semibold tracking-wider bg-gray-200" },
                                react_1["default"].createElement("div", { className: "h-4 bg-gray-300 rounded-md" })),
                            react_1["default"].createElement("th", { className: "px-6 py-3 text-left text-[15px] font-semibold tracking-wider bg-gray-200" },
                                react_1["default"].createElement("div", { className: "h-4 bg-gray-300 rounded-md" })),
                            react_1["default"].createElement("th", { className: "px-6 py-3 text-left text-[15px] font-semibold tracking-wider bg-gray-200" }))),
                    react_1["default"].createElement("tbody", { className: "bg-white divide-y divide-gray-200" }, __spreadArrays(Array(8)).map(function (_, index) { return (react_1["default"].createElement("tr", { key: index },
                        react_1["default"].createElement("td", { className: "px-6 py-2 whitespace-nowrap" },
                            react_1["default"].createElement("div", { className: "flex items-center" },
                                react_1["default"].createElement("div", { className: "h-6 bg-gray-300 rounded-md w-1/2" }))),
                        react_1["default"].createElement("td", { className: "px-6 py-2 whitespace-nowrap" },
                            react_1["default"].createElement("div", { className: "h-6 bg-gray-300 rounded-md w-1/2" })),
                        react_1["default"].createElement("td", { className: "px-6 py-2 whitespace-nowrap" },
                            react_1["default"].createElement("div", { className: "flex items-center" }, __spreadArrays(Array(3)).map(function (_, i) { return (react_1["default"].createElement("div", { key: i, className: "h-[30px] w-[30px] rounded-full bg-gray-300 mr-2" })); }))),
                        react_1["default"].createElement("td", { className: "px-6 py-2 whitespace-nowrap" },
                            react_1["default"].createElement("div", { className: "w-5 h-5 inline-block rounded-full bg-gray-300" })),
                        react_1["default"].createElement("td", { className: "px-6 py-2 whitespace-nowrap" },
                            react_1["default"].createElement("div", { className: "h-6 bg-gray-300 rounded-md w-1/2" })))); })))))));
};
exports["default"] = SkeletonLoader;
