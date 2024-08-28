"use strict";
exports.__esModule = true;
var react_1 = require("react");
var SkeletonLoader = function () {
    return (react_1["default"].createElement("div", { className: "p-6 space-y-4" },
        react_1["default"].createElement("div", { className: "h-6 bg-gray-300 rounded w-1/3" }),
        react_1["default"].createElement("div", { className: "space-y-2" },
            react_1["default"].createElement("div", { className: "h-4 bg-gray-300 rounded w-full" }),
            react_1["default"].createElement("div", { className: "h-4 bg-gray-300 rounded w-full" })),
        react_1["default"].createElement("div", { className: "space-y-4" },
            react_1["default"].createElement("div", { className: "h-12 bg-gray-300 rounded w-full" }),
            react_1["default"].createElement("div", { className: "h-12 bg-gray-300 rounded w-full" })),
        react_1["default"].createElement("div", { className: "space-y-2" },
            react_1["default"].createElement("div", { className: "h-4 bg-gray-300 rounded w-full" }),
            react_1["default"].createElement("div", { className: "h-4 bg-gray-300 rounded w-full" })),
        react_1["default"].createElement("div", { className: "h-12 bg-gray-300 rounded w-full" })));
};
exports["default"] = SkeletonLoader;
