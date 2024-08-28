"use strict";
exports.__esModule = true;
var react_1 = require("react");
var image_1 = require("next/image");
var ProjectDropdownMenu_1 = require("./ProjectDropdownMenu");
var useLocale_1 = require("../../hooks/useLocale");
var defaultprof_png_1 = require("../../../../../public/Frame 8520.png");
var defaultBee_png_1 = require("../../../public/defaultBee.png");
var navigation_1 = require("next/navigation");
var GridProjectSkeleton_1 = require("./skeleton/GridProjectSkeleton"); // Import your skeleton loader
// Status to color mapping
var statusColors = {
    "in progress": "#57A4FF",
    "to do": "#CC0000",
    "on hold": "#CC0000",
    completed: "#19B600",
    QA: "#FDC90E",
    "not started": "#999999"
};
var GridProjects = function (_a) {
    var handleProjectDetailsClick = _a.handleProjectDetailsClick, toggleUsefulLinks = _a.toggleUsefulLinks, page = _a.page, status = _a.status, projects = _a.projects, loading = _a.loading;
    var _b = react_1.useState(false), isDropdownOpen = _b[0], setIsDropdownOpen = _b[1];
    var dropdownRef = react_1.useRef(null);
    var locale = useLocale_1["default"]();
    var router = navigation_1.useRouter();
    var handleProjectClick = function (projectId) {
        sessionStorage.setItem('projectId', projectId.toString());
        router.push("/" + locale + "/taskboard?id=" + projectId);
    };
    var handleDropdownToggle = function () {
        setIsDropdownOpen(!isDropdownOpen);
    };
    var handleClickOutside = function (event) {
        if (dropdownRef.current &&
            !dropdownRef.current.contains(event.target)) {
            setIsDropdownOpen(false);
        }
    };
    react_1.useEffect(function () {
        document.addEventListener("mousedown", handleClickOutside);
        return function () {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);
    var handleMenuClick = function (event) {
        event.stopPropagation();
    };
    if (loading)
        return react_1["default"].createElement(GridProjectSkeleton_1["default"], null);
    return (react_1["default"].createElement("section", { className: "mx-4 md:mx-10 pb-10 mt-10 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-5 xl:gap-8 lg:gap-6" }, projects.map(function (project) {
        var _a;
        return (react_1["default"].createElement("div", { key: project.id, className: "bg-[#F4F4F4] rounded-md flex flex-col justify-start items-center shadow-sm border-2 border-[#999999] relative" },
            react_1["default"].createElement("div", { className: "relative w-full" },
                react_1["default"].createElement("div", { onClick: function () { return handleProjectClick(project.id); } },
                    react_1["default"].createElement(image_1["default"], { src: ((_a = project.image) === null || _a === void 0 ? void 0 : _a.path) || defaultBee_png_1["default"], alt: project.name, width: 230, height: 180, className: "w-full rounded-t-md h-[200px]" })),
                react_1["default"].createElement("div", { onClick: handleMenuClick, className: "absolute top-2 right-2 cursor-pointer" },
                    react_1["default"].createElement(ProjectDropdownMenu_1["default"], { handleProjectDetailsClick: handleProjectDetailsClick, projectId: project.id }))),
            react_1["default"].createElement("div", { className: "flex flex-row justify-between items-center w-full mt-3 px-5" },
                react_1["default"].createElement("div", { className: "font-semibold text-[20px]" }, project.name),
                react_1["default"].createElement("div", { className: "w-[20px] h-[20px] rounded-full", style: { backgroundColor: statusColors[project.status] } })),
            react_1["default"].createElement("div", { className: "flex justify-start items-center w-full mt-3 px-5" }, project.members.length > 0 ? (project.members.map(function (member) { return (react_1["default"].createElement("div", { key: member.id, className: "relative -ml-2" },
                react_1["default"].createElement(image_1["default"], { src: member.image || defaultprof_png_1["default"], alt: member.firstName + " " + member.lastName, width: 30, height: 30, className: "rounded-full object-cover w-[30px] h-[30px]" // Add object-cover to maintain aspect ratio
                    , quality: 100 }))); })) : (react_1["default"].createElement("div", null, "No members available"))),
            react_1["default"].createElement("div", { className: "flex justify-start items-center w-full mt-5 px-5" },
                react_1["default"].createElement("div", { className: "flex justify-start items-center bg-white space-x-2 w-[120px] rounded-full mb-3 px-3" },
                    react_1["default"].createElement("div", null,
                        react_1["default"].createElement(image_1["default"], { src: "/task-square-2 1.svg", alt: "projects", width: 20, height: 20 })),
                    react_1["default"].createElement("span", { className: "text-[#606060] font-medium whitespace-nowrap" },
                        project.tasksCount,
                        " Tasks")))));
    })));
};
exports["default"] = GridProjects;
