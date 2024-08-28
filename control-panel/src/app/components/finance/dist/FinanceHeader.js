"use strict";
exports.__esModule = true;
var react_1 = require("react");
var image_1 = require("next/image");
var finance_svg_1 = require("../../../public/finance.svg");
var lu_1 = require("react-icons/lu");
var calendar2_svg_1 = require("../../../public/calendar2.svg");
var squares_svg_1 = require("../../../public/squares.svg");
var list_svg_1 = require("../../../public/list.svg");
var DropdownCategory_1 = require("./dropdown/DropdownCategory");
var FinanceHeader = function (_a) {
    var viewMode = _a.viewMode, setViewMode = _a.setViewMode, toggleAddFinanceModal = _a.toggleAddFinanceModal;
    return (react_1["default"].createElement("div", null,
        react_1["default"].createElement("div", { className: "flex justify-center lg:justify-start mt-[20px] border-b-[1px] border-[#C4C4C4] pb-[5px]" },
            react_1["default"].createElement(image_1["default"], { src: finance_svg_1["default"], alt: "Finance", width: 50, height: 50, className: "lg:ml-7 -mt-1" }),
            react_1["default"].createElement("span", { className: "font-semibold text-[20px]" }, "Finance")),
        react_1["default"].createElement("div", { className: "flex flex-row justify-between mt-5 mx-4 md:mx-10 items-center" },
            react_1["default"].createElement("div", { className: "md:hidden flex items-center justify-center w-[50px] h-[50px] bg-[#FDC90E] rounded-full cursor-pointer", onClick: toggleAddFinanceModal },
                react_1["default"].createElement(lu_1.LuPlus, { className: "text-[24px]" })),
            react_1["default"].createElement("div", { className: "hidden md:flex items-center justify-center w-[145px] h-[40px] bg-[#FDC90E] rounded-md px-3 cursor-pointer hover:bg-black hover:text-[#FDC90E]", onClick: toggleAddFinanceModal },
                react_1["default"].createElement(lu_1.LuPlus, { className: "-ml-1 hover:text-[#FDC90E] font-semibold text-[20px]" }),
                react_1["default"].createElement("span", { className: "font-semibold text-[15px]" }, "Add Finance")),
            react_1["default"].createElement("div", { className: "flex space-x-5 mt-4 lg:mt-0" },
                react_1["default"].createElement("div", { className: "hidden lg:flex space-x-5" },
                    react_1["default"].createElement(DropdownCategory_1["default"], null),
                    react_1["default"].createElement("div", null,
                        react_1["default"].createElement("select", { className: "w-full p-2 border border-[#C4C4C4] rounded-md bg-white" },
                            react_1["default"].createElement("option", { value: "", disabled: true, selected: true }, "All (currency)"))),
                    react_1["default"].createElement("div", null,
                        react_1["default"].createElement("select", { className: "w-full p-2 border border-[#C4C4C4] rounded-md bg-white" },
                            react_1["default"].createElement("option", { value: "", disabled: true, selected: true }, "Category"))),
                    react_1["default"].createElement("div", null,
                        react_1["default"].createElement("select", { className: "w-full p-2 border border-[#C4C4C4] rounded-md bg-white" },
                            react_1["default"].createElement("option", { value: "", disabled: true, selected: true }, "Mar 2024")))),
                react_1["default"].createElement("div", { className: "w-10 h-10 bg-[#E4E4E4] rounded-md flex justify-center items-center" },
                    react_1["default"].createElement(image_1["default"], { src: calendar2_svg_1["default"], alt: "Calendar", width: 20, height: 20 })),
                react_1["default"].createElement("div", { className: "flex items-center space-x-1" },
                    react_1["default"].createElement("button", { className: "rounded-l-md p-3 border " + (viewMode === 'grid' ? 'bg-[#FDC90E] bg-opacity-30 border-[#FDC90E]' : 'bg-[#E4E4E4]'), onClick: function () { return setViewMode('grid'); } },
                        react_1["default"].createElement(image_1["default"], { src: squares_svg_1["default"], alt: "Grid View", width: 20, height: 16 })),
                    react_1["default"].createElement("button", { className: "rounded-r-md p-2 border " + (viewMode === 'list' ? 'bg-[#FDC90E] bg-opacity-30 border-[#FDC90E]' : 'bg-[#E4E4E4]'), onClick: function () { return setViewMode('list'); } },
                        react_1["default"].createElement(image_1["default"], { src: list_svg_1["default"], alt: "List View", width: 24, height: 24 }))))),
        react_1["default"].createElement("div", { className: "flex mx-4 md:mx-10 lg:hidden space-x-5 mt-4 overflow-x-auto" },
            react_1["default"].createElement("div", { className: "z-40" },
                react_1["default"].createElement(DropdownCategory_1["default"], null)),
            react_1["default"].createElement("div", { className: "min-w-40" },
                react_1["default"].createElement("select", { className: "w-full p-2 border border-[#C4C4C4] rounded-md bg-white" },
                    react_1["default"].createElement("option", { value: "", disabled: true, selected: true }, "All (currency)"))),
            react_1["default"].createElement("div", { className: "min-w-40" },
                react_1["default"].createElement("select", { className: "w-full p-2 border border-[#C4C4C4] rounded-md bg-white" },
                    react_1["default"].createElement("option", { value: "", disabled: true, selected: true }, "Category"))),
            react_1["default"].createElement("div", { className: "min-w-40" },
                react_1["default"].createElement("select", { className: "w-full p-2 border border-[#C4C4C4] rounded-md bg-white" },
                    react_1["default"].createElement("option", { value: "", disabled: true, selected: true }, "Mar 2024"))))));
};
exports["default"] = FinanceHeader;
