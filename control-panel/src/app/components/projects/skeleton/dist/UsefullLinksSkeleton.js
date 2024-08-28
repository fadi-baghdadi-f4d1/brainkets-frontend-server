"use strict";
var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
exports.__esModule = true;
// components/SkeletonLoader.tsx
var react_1 = require("react");
var SkeletonLoader = function () {
    return (react_1["default"].createElement("div", { className: "bg-[#F4F4F4] h-screen shadow-lg w-full max-w-md flex flex-col" },
        react_1["default"].createElement("div", { className: 'bg-white px-6 flex items-center h-16 p-2 w-full' },
            react_1["default"].createElement("div", { className: "flex-grow text-center text-xl font-bold bg-gray-200 w-24 h-6 mx-auto mt-1 rounded" }),
            react_1["default"].createElement("div", { className: "w-8 h-8 rounded-md mx-2 bg-gray-200" })),
        react_1["default"].createElement("div", { className: "w-full max-w-md space-y-4 p-4" }, __spreadArrays(Array(8)).map(function (_, index) { return (react_1["default"].createElement("div", { key: index, className: "bg-white mx-4 mt-2 p-2 border border-[#C4C4C4] rounded-xl flex justify-between" },
            react_1["default"].createElement("div", { className: "w-3/4" },
                react_1["default"].createElement("div", { className: "bg-gray-200 h-4 mb-2 rounded" }),
                react_1["default"].createElement("div", { className: "bg-gray-200 h-4 rounded" })))); }))));
};
exports["default"] = SkeletonLoader;
