"use strict";
exports.__esModule = true;
var react_1 = require("react");
var SkeletonLoader = function () {
    return (react_1["default"].createElement("section", { className: "mx-4 md:mx-10 pb-10 mt-10 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-5 xl:gap-8 lg:gap-6" }, Array.from({ length: 10 }).map(function (_, index) { return (react_1["default"].createElement("div", { key: index, className: "bg-[#F4F4F4] rounded-md flex flex-col justify-start items-center shadow-sm border-2 border-[#999999] relative animate-pulse" },
        react_1["default"].createElement("div", { className: "relative w-full" },
            react_1["default"].createElement("div", { className: "w-full h-[200px] bg-gray-300 rounded-t-md" }),
            react_1["default"].createElement("div", { className: "absolute top-2 right-2 w-6 h-6 bg-gray-300 rounded-full" })),
        react_1["default"].createElement("div", { className: "flex flex-row justify-between items-center w-full mt-3 px-5" },
            react_1["default"].createElement("div", { className: "w-1/2 h-6 bg-gray-300 rounded" }),
            react_1["default"].createElement("div", { className: "w-[20px] h-[20px] rounded-full bg-gray-300" })),
        react_1["default"].createElement("div", { className: "flex justify-start items-center w-full mt-3 px-5" },
            react_1["default"].createElement("div", { className: "flex space-x-1" }, Array.from({ length: 3 }).map(function (_, i) { return (react_1["default"].createElement("div", { key: i, className: "w-8 h-8 bg-gray-300 rounded-full" })); }))),
        react_1["default"].createElement("div", { className: "flex justify-start items-center w-full mt-5 px-5" },
            react_1["default"].createElement("div", { className: "flex justify-start items-center bg-white space-x-2 w-[120px] rounded-full mb-3 px-3" },
                react_1["default"].createElement("div", { className: "w-5 h-5 bg-gray-300 rounded" }),
                react_1["default"].createElement("div", { className: "w-1/2 h-4 bg-gray-300 rounded" }))))); })));
};
exports["default"] = SkeletonLoader;
