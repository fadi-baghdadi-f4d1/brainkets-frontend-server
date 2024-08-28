"use strict";
exports.__esModule = true;
var react_1 = require("react");
var image_1 = require("next/image");
var squares_svg_1 = require("../../../public/squares.svg");
var list_svg_1 = require("../../../public/list.svg");
var ViewToggleButtons = function (_a) {
    var viewMode = _a.viewMode, setViewMode = _a.setViewMode;
    return (react_1["default"].createElement("div", { className: "flex items-center space-x-1 mb-4" },
        react_1["default"].createElement("button", { className: "rounded-l-md p-3 border " + (viewMode === 'grid'
                ? "bg-[#FDC90E] bg-opacity-30 border-[#FDC90E]"
                : "bg-[#E4E4E4]"), onClick: function () { return setViewMode('grid'); } },
            react_1["default"].createElement(image_1["default"], { src: squares_svg_1["default"], alt: "Graph View", width: 20, height: 16 })),
        react_1["default"].createElement("button", { className: "rounded-r-md p-3 border " + (viewMode === 'list'
                ? "bg-[#FDC90E] bg-opacity-30 border-[#FDC90E]"
                : "bg-[#E4E4E4]"), onClick: function () { return setViewMode('list'); } },
            react_1["default"].createElement(image_1["default"], { src: list_svg_1["default"], alt: "List View", height: 16 }))));
};
exports["default"] = ViewToggleButtons;
