"use client";
"use strict";
exports.__esModule = true;
var react_1 = require("react");
var image_1 = require("next/image");
var ProjectDropdownMenu_1 = require("./ProjectDropdownMenu");
var link_1 = require("next/link");
var useLocale_1 = require("../../hooks/useLocale");
var defaultprof_png_1 = require("../../../../../public/Frame 8520.png"); // Default profile image
var ListProjectSkeleton_1 = require("./skeleton/ListProjectSkeleton"); // Import the SkeletonLoader
// Status to color mapping
var statusColors = {
    "in progress": "#57A4FF",
    "to do": "#CC0000",
    "on hold": "#CC0000",
    completed: "#19B600",
    QA: "#FDC90E",
    "not started": "#999999"
};
var ListProjects = function (_a) {
    var handleProjectDetailsClick = _a.handleProjectDetailsClick, toggleUsefulLinks = _a.toggleUsefulLinks, page = _a.page, status = _a.status, projects = _a.projects, loading = _a.loading;
    var locale = useLocale_1["default"]();
    if (loading) {
        return react_1["default"].createElement(ListProjectSkeleton_1["default"], null);
    }
    return (react_1["default"].createElement("div", { className: "mt-6 xl:mx-10 lg:mx-10" },
        react_1["default"].createElement("div", { className: "border rounded-md border-[#E4E4E4] overflow-hidden" },
            react_1["default"].createElement("div", { className: "overflow-x-auto" },
                react_1["default"].createElement("table", { className: "min-w-full divide-y h-auto divide-gray-200 border rounded-md border-[#E4E4E4]" },
                    react_1["default"].createElement("thead", null,
                        react_1["default"].createElement("tr", null,
                            react_1["default"].createElement("th", { className: "px-6 py-3 text-left text-[15px] font-semibold tracking-wider" }, "Name"),
                            react_1["default"].createElement("th", { className: "px-6 py-3 text-left text-[15px] font-semibold tracking-wider" }, "Customer"),
                            react_1["default"].createElement("th", { className: "px-6 py-3 text-left text-[15px] font-semibold tracking-wider" }, "Project Members"),
                            react_1["default"].createElement("th", { className: "px-6 py-3 text-left text-[15px] font-semibold tracking-wider" }, "Status"),
                            react_1["default"].createElement("th", { className: "px-6 py-3 text-left text-[15px] font-semibold tracking-wider" }))),
                    react_1["default"].createElement("tbody", { className: "bg-white divide-y divide-gray-200" }, projects.map(function (project) { return (react_1["default"].createElement("tr", { key: project.id },
                        react_1["default"].createElement("td", { className: "px-6 py-2 whitespace-nowrap" },
                            react_1["default"].createElement("div", { className: "flex items-center" },
                                react_1["default"].createElement("span", { className: "text-[15px] font-semibold" }, project.name))),
                        react_1["default"].createElement("td", { className: "px-6 py-2 whitespace-nowrap text-[15px] font-semibold" }, project.clients.length > 0
                            ? project.clients[0].firstName + " " + project.clients[0].lastName
                            : "No client"),
                        react_1["default"].createElement("td", { className: "px-6 py-2 whitespace-nowrap" },
                            react_1["default"].createElement("div", { className: "flex items-center" }, project.members.length > 0 ? (project.members.map(function (member) { return (react_1["default"].createElement(image_1["default"], { key: member.id, src: member.image || defaultprof_png_1["default"], alt: member.firstName + " " + member.lastName, width: 30, height: 30, className: "h-[30px] w-[30px] rounded-full" })); })) : (react_1["default"].createElement("div", null, "No members available")))),
                        react_1["default"].createElement("td", { className: "px-6 py-2 whitespace-nowrap" },
                            react_1["default"].createElement("div", { className: "w-5 h-5 inline-block rounded-full", style: { backgroundColor: statusColors[project.status] } })),
                        react_1["default"].createElement("td", { className: "px-6 py-2 whitespace-nowrap" },
                            react_1["default"].createElement(link_1["default"], { href: "/" + locale + "/taskboard", passHref: true },
                                react_1["default"].createElement("div", { className: "flex cursor-pointer items-center space-x-2 text-[#FDC90E] font-semibold text-[15px]" }, "View Tasks"))),
                        react_1["default"].createElement("td", { className: "px-6 py-2 whitespace-nowrap" },
                            react_1["default"].createElement("div", { className: "relative" },
                                react_1["default"].createElement(ProjectDropdownMenu_1["default"], { handleProjectDetailsClick: handleProjectDetailsClick, toggleUsefulLinks: toggleUsefulLinks, projectId: project.id }))))); })))))));
};
exports["default"] = ListProjects;
