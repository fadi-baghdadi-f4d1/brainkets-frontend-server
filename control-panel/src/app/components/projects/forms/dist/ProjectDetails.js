"use strict";
exports.__esModule = true;
var react_1 = require("react");
var fa_1 = require("react-icons/fa");
var image_1 = require("next/image");
var useLocale_1 = require("@/hooks/useLocale");
var navigation_1 = require("next/navigation");
var ModalContext_1 = require("@/context/ModalContext");
var ProjectDetailsDropDown_1 = require("./ProjectDetailsDropDown");
var GetSingleProject_1 = require("@/services/projects/GetSingleProject"); // Import the function
var defaultBee_png_1 = require("../../../../public/defaultBee.png");
var defaultprof_png_1 = require("../../../../../../public/Frame 8520.png");
var GetAllLinks_1 = require("@/services/projects/GetAllLinks");
var ProjectDetailsSekelton_1 = require("../skeleton/ProjectDetailsSekelton");
var ProjectDetails = function (_a) {
    var _b, _c, _d, _e, _f, _g;
    var onClose = _a.onClose, projectId = _a.projectId;
    var _h = react_1.useState(false), isDropdownOpen = _h[0], setIsDropdownOpen = _h[1];
    var dropdownRef = react_1.useRef(null);
    var locale = useLocale_1["default"]();
    var router = navigation_1.useRouter(); // Use useRouter for navigation
    var _j = ModalContext_1.useModalContext(), toggleEditProjectModal = _j.toggleEditProjectModal, toggleUsefulLinks = _j.toggleUsefulLinks;
    var _k = react_1.useState(null), project = _k[0], setProject = _k[1]; // State for project details
    var _l = react_1.useState(false), loading = _l[0], setLoading = _l[1]; // State for loading status
    var _m = react_1.useState(null), error = _m[0], setError = _m[1]; // State for error message
    var _o = react_1.useState([]), links = _o[0], setLinks = _o[1];
    react_1.useEffect(function () {
        if (projectId) {
            setLoading(true);
            GetAllLinks_1.getLinks(projectId)
                .then(function (data) {
                setLinks(data);
                setLoading(false);
            })["catch"](function (err) {
                setError(err.message);
                setLoading(false);
            });
        }
    }, [projectId]);
    react_1.useEffect(function () {
        if (projectId) {
            setLoading(true);
            GetSingleProject_1.getProjectDetails(projectId)
                .then(function (data) {
                setProject(data);
                setLoading(false);
            })["catch"](function (err) {
                setError(err.message);
                setLoading(false);
            });
        }
    }, [projectId]);
    var handleNavigation = function (path) {
        onClose(); // Close the modal
        router.push("/" + locale + "/" + path); // Navigate to the new page
    };
    var handleProjectClick = function () {
        toggleEditProjectModal();
    };
    var handleUsefulLinksClick = function () {
        toggleUsefulLinks();
    };
    if (loading)
        return react_1["default"].createElement(ProjectDetailsSekelton_1["default"], null);
    if (error)
        return react_1["default"].createElement("p", null,
            "Error: ",
            error);
    return (react_1["default"].createElement("div", { className: "h-screen overflow-y-scroll custom-scrollbar pb-6 shadow-lg w-full max-w-md flex flex-col bg-[#F4F4F4]" },
        react_1["default"].createElement("div", { className: "flex bg-white p-4 h-14 items-center mb-4 relative" },
            react_1["default"].createElement(fa_1.FaWindowClose, { className: "text-2xl cursor-pointer", onClick: onClose }),
            react_1["default"].createElement("h2", { className: "flex-grow text-center text-lg font-bold" }, "Project Details"),
            react_1["default"].createElement(ProjectDetailsDropDown_1["default"], { dropdownRef: dropdownRef, isDropdownOpen: isDropdownOpen, setIsDropdownOpen: setIsDropdownOpen, handleNavigation: handleNavigation, handleProjectClick: handleProjectClick, handleUsefulLinksClick: handleUsefulLinksClick })),
        react_1["default"].createElement("div", { className: "mb-4 items-center flex flex-col bg-white mx-6 rounded-md" },
            react_1["default"].createElement(image_1["default"], { src: ((_b = project === null || project === void 0 ? void 0 : project.image) === null || _b === void 0 ? void 0 : _b.path) || defaultBee_png_1["default"], alt: "Project Logo", width: 112, height: 112, className: "h-28 w-28 object-cover" })),
        react_1["default"].createElement("div", { className: "mb-4 flex flex-col bg-white mx-6 rounded-md shadow-lg" },
            react_1["default"].createElement("div", { className: "mb-4 w-full py-1 bg-orange-500 rounded-t-lg" },
                react_1["default"].createElement("h3", { className: "text-white text-center text-xl font-bold" }, (project === null || project === void 0 ? void 0 : project.name) || "BeeFlex")),
            react_1["default"].createElement("div", { className: "mb-2 px-4" },
                react_1["default"].createElement("div", { className: "flex items-center mb-2" },
                    react_1["default"].createElement(image_1["default"], { src: "/blueBoy.svg", alt: "Assigned By", width: 15, height: 15, className: "mr-2" }),
                    react_1["default"].createElement("span", { className: "text-black font-medium w-1/2 text-xs mr-2" }, "Assigned By"),
                    react_1["default"].createElement(image_1["default"], { src: ((_c = project === null || project === void 0 ? void 0 : project.assignedBy) === null || _c === void 0 ? void 0 : _c.image) || defaultprof_png_1["default"], alt: "Profile", width: 20, height: 20, className: "mr-2 w-5 h-5 rounded-full" }),
                    react_1["default"].createElement("span", { className: "text-[#606060] font-medium text-xs" }, (_d = project === null || project === void 0 ? void 0 : project.assignedBy) === null || _d === void 0 ? void 0 :
                        _d.firstName,
                        " ", (_e = project === null || project === void 0 ? void 0 : project.assignedBy) === null || _e === void 0 ? void 0 :
                        _e.lastName)),
                react_1["default"].createElement("div", { className: "flex items-center mb-2" },
                    react_1["default"].createElement(image_1["default"], { src: "/yellowCalendar.svg", alt: "Start Date", width: 15, height: 15, className: "mr-2" }),
                    react_1["default"].createElement("span", { className: "text-black w-1/2 font-medium text-xs mr-2" }, "Start Date"),
                    react_1["default"].createElement("span", { className: "text-[#606060] font-medium text-xs" }, (project === null || project === void 0 ? void 0 : project.startDate) || "Jun 20, 2024")),
                react_1["default"].createElement("div", { className: "flex items-center mb-2" },
                    react_1["default"].createElement(image_1["default"], { src: "/orangeCalendar.svg", alt: "Due Date", width: 15, height: 15, className: "mr-2" }),
                    react_1["default"].createElement("span", { className: "text-black w-1/2 font-medium text-xs mr-2" }, "Due Date"),
                    react_1["default"].createElement("span", { className: "text-[#606060] font-medium text-xs" }, (project === null || project === void 0 ? void 0 : project.dueDate) || "July 20, 2024"))),
            react_1["default"].createElement("div", { className: "mb-2 px-4" },
                react_1["default"].createElement("div", { className: "flex items-center mb-2" },
                    react_1["default"].createElement(image_1["default"], { src: "/progress.svg", alt: "Progress", width: 15, height: 15, className: "mr-2" }),
                    react_1["default"].createElement("span", { className: "text-black w-1/2 font-medium text-xs mr-2" }, "Progress"),
                    react_1["default"].createElement("div", { className: "w-1/4 h-1 bg-gray-200 rounded-full" },
                        react_1["default"].createElement("div", { className: "h-full bg-green-500 rounded-full", style: { width: (project === null || project === void 0 ? void 0 : project.progress) + "%" } })),
                    react_1["default"].createElement("span", { className: "text-black font-medium text-xs ml-2" }, project === null || project === void 0 ? void 0 : project.progress))),
            react_1["default"].createElement("div", { className: "mb-2 px-4" },
                react_1["default"].createElement("div", { className: "flex items-start mb-2" },
                    react_1["default"].createElement(image_1["default"], { src: "/purplePeople.svg", alt: "Assigned to", width: 15, height: 15, className: "mr-2" }),
                    react_1["default"].createElement("span", { className: "text-black w-1/2 font-medium text-xs mr-2" }, "Assigned to"),
                    react_1["default"].createElement("div", { className: "flex flex-col" }, (_f = project === null || project === void 0 ? void 0 : project.members) === null || _f === void 0 ? void 0 : _f.map(function (member, index) { return (react_1["default"].createElement("div", { key: index, className: "flex items-center mb-2" },
                        react_1["default"].createElement(image_1["default"], { src: member.image || defaultprof_png_1["default"], alt: member.userName, width: 20, height: 20, className: "mr-2 w-5 h-5 rounded-full" }),
                        react_1["default"].createElement("span", { className: "text-[#606060] font-medium text-xs" },
                            member.firstName,
                            " ",
                            member.lastName))); })))),
            react_1["default"].createElement("div", { className: "mb-2 px-4" },
                react_1["default"].createElement("div", { className: "flex items-center mb-2" },
                    react_1["default"].createElement(image_1["default"], { src: "/redCategory.svg", alt: "Category", width: 15, height: 15, className: "mr-2" }),
                    react_1["default"].createElement("span", { className: "text-black w-1/2 font-medium text-xs mr-2" }, "Category"),
                    react_1["default"].createElement("span", { className: "text-[#606060] font-medium text-xs" }, project === null || project === void 0 ? void 0 : project.categoryName))),
            react_1["default"].createElement("div", { className: "mb-2 px-4" },
                react_1["default"].createElement("div", { className: "flex items-start mb-2" },
                    react_1["default"].createElement(image_1["default"], { src: "/clientHand.svg", alt: "Clients", width: 15, height: 15, className: "mr-2" }),
                    react_1["default"].createElement("span", { className: "text-black w-1/2 font-medium text-xs mr-2" }, "Clients"),
                    react_1["default"].createElement("div", { className: "flex flex-col" }, (_g = project === null || project === void 0 ? void 0 : project.clients) === null || _g === void 0 ? void 0 : _g.map(function (client, index) { return (react_1["default"].createElement("div", { key: index, className: "flex items-center mb-2" },
                        react_1["default"].createElement(image_1["default"], { src: client.image || defaultprof_png_1["default"], alt: client.userName, width: 20, height: 20, className: "rounded-full mr-2 w-5 h-5" }),
                        react_1["default"].createElement("span", { className: "text-[#606060] font-medium text-xs" },
                            client.firstName,
                            " ",
                            client.lastName))); }))))),
        react_1["default"].createElement("div", null,
            react_1["default"].createElement("h4", { className: "text-xs  mx-6 pb-2 font-semibold" }, "Project Description"),
            react_1["default"].createElement("textarea", { readOnly: true, value: (project === null || project === void 0 ? void 0 : project.description) || "no description", className: "mx-6 bg-white p-2 rounded-md w-[90%] text-xs border border-[#C4C4C4]", style: { resize: "none" } })),
        react_1["default"].createElement("div", null,
            react_1["default"].createElement("h4", { className: "text-xs mx-6 pb-2 font-semibold mt-2" }, "Useful Links"),
            react_1["default"].createElement("div", { className: "mx-6 border border-[#C4C4C4] text-xs bg-white p-2 rounded-md" }, links.length > 0 ? (react_1["default"].createElement("ul", { className: "text-xs text-[#57A4FF]" }, links.map(function (link) { return (react_1["default"].createElement("li", { key: link.id, className: "pb-1 border-b border-b-[#C4C4C4] last:border-none mt-1" },
                react_1["default"].createElement("a", { href: "https://" + link.link, target: "_blank", rel: "noopener noreferrer" }, link.link))); }))) : (react_1["default"].createElement("div", { className: "text-center text-gray-500" }, "No links available."))))));
};
exports["default"] = ProjectDetails;
