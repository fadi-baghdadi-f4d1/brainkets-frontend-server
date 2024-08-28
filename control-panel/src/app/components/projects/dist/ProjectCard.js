"use strict";
exports.__esModule = true;
var react_1 = require("react");
var image_1 = require("next/image");
var link_1 = require("next/link");
var statusColors = {
    'in progress': '#57A4FF',
    'to do': '#CC0000',
    completed: '#19B600',
    QA: '#FDC90E'
};
var ProjectCard = function (_a) {
    var id = _a.id, image = _a.image, title = _a.title, status = _a.status, _b = _a.profiles, profiles = _b === void 0 ? [] : _b, customer = _a.customer, onDetailsClick = _a.onDetailsClick, onToggleLinks = _a.onToggleLinks;
    return (react_1["default"].createElement("div", { className: "relative bg-[#F4F4F4] rounded-md flex flex-col justify-start items-center shadow-sm border-2 border-[#999999]" },
        react_1["default"].createElement("div", { className: "relative w-full" },
            react_1["default"].createElement(link_1["default"], { href: "/" + locale + "/taskboard", passHref: true },
                react_1["default"].createElement(image_1["default"], { src: image || defaultProject, alt: title, width: 230, height: 180, className: "w-full rounded-t-md h-[200px]" })),
            react_1["default"].createElement("div", { className: "absolute top-2 right-2 cursor-pointer" },
                react_1["default"].createElement(DropdownMenu, { handleProjectDetailsClick: onDetailsClick, toggleUsefulLinks: onToggleLinks }))),
        react_1["default"].createElement("div", { className: "flex flex-row justify-between items-center w-full mt-3 px-5" },
            react_1["default"].createElement("div", { className: "font-semibold text-[20px]" }, title),
            react_1["default"].createElement("div", { className: "w-[20px] h-[20px] rounded-full", style: { backgroundColor: statusColors[status] } })),
        react_1["default"].createElement("div", { className: "flex justify-start items-center w-full mt-3 px-5" }, profiles.length > 0 ? (profiles.map(function (profile, idx) { return (react_1["default"].createElement("div", { key: idx, className: "relative -ml-2" },
            react_1["default"].createElement(image_1["default"], { src: profile || defaultProfile, alt: "Project Member", width: 30, height: 30, className: "rounded-full object-cover w-[30px] h-[30px]", quality: 100 }))); })) : (react_1["default"].createElement("div", null, "No members available"))),
        react_1["default"].createElement("div", { className: "flex justify-start items-center w-full mt-5 px-5" },
            react_1["default"].createElement("div", { className: "flex justify-start items-center bg-white space-x-2 w-[120px] rounded-full mb-3 px-3" },
                react_1["default"].createElement("div", null,
                    react_1["default"].createElement(image_1["default"], { src: "/task-square-2 1.svg", alt: "projects", width: 20, height: 20 })),
                react_1["default"].createElement("span", { className: "text-[#606060] font-medium whitespace-nowrap" },
                    tasksCount,
                    " Tasks")))));
};
exports["default"] = ProjectCard;
