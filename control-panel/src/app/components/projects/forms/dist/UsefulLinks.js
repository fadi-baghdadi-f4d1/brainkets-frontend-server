"use strict";
exports.__esModule = true;
var react_1 = require("react");
var fa_1 = require("react-icons/fa");
var fa6_1 = require("react-icons/fa6");
var GetAllLinks_1 = require("../../../services/projects/GetAllLinks");
var EditDeleteDropdown_1 = require("@/components/common/EditDeleteDropdown");
var UsefullLinksSkeleton_1 = require("../skeleton/UsefullLinksSkeleton"); // Import the SkeletonLoader
var UsefulLinks = function (_a) {
    var projectId = _a.projectId, toggleModal = _a.toggleModal, toggleCreateLinks = _a.toggleCreateLinks;
    var _b = react_1.useState([]), links = _b[0], setLinks = _b[1];
    var _c = react_1.useState(true), loading = _c[0], setLoading = _c[1];
    var _d = react_1.useState(null), error = _d[0], setError = _d[1];
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
    if (loading) {
        return react_1["default"].createElement(UsefullLinksSkeleton_1["default"], null); // Show SkeletonLoader while loading
    }
    if (error) {
        return react_1["default"].createElement("div", null,
            "Error: ",
            error);
    }
    return (react_1["default"].createElement("div", { className: "bg-[#F4F4F4] h-screen shadow-lg w-full max-w-md flex flex-col" },
        react_1["default"].createElement("div", { className: 'bg-white px-6 flex items-center h-16 p-2 w-full' },
            react_1["default"].createElement(fa_1.FaWindowClose, { className: "text-3xl cursor-pointer", onClick: toggleModal }),
            react_1["default"].createElement("h2", { className: "flex-grow text-center text-xl font-bold" }, "Useful Links"),
            react_1["default"].createElement("button", { className: "bg-[#FFC700] text-black p-2 hover:bg-black hover:text-[#FFC700] rounded", onClick: function () { return toggleCreateLinks(projectId); } },
                react_1["default"].createElement(fa6_1.FaPlus, null))),
        react_1["default"].createElement("div", { className: "w-full max-w-md space-y-4 p-4" }, links.length > 0 ? (links.map(function (link) { return (react_1["default"].createElement("div", { key: link.id, className: "bg-white mx-4 mt-2 p-2 border border-[#C4C4C4] rounded-xl flex justify-between" },
            react_1["default"].createElement("div", null,
                react_1["default"].createElement("p", { className: "font-semibold text-[#300b0b]" },
                    "Title: ",
                    react_1["default"].createElement("span", { className: "text-black font-semibold" }, link.title)),
                react_1["default"].createElement("p", { className: "font-semibold text-[#606060]" },
                    "URL: ",
                    react_1["default"].createElement("a", { href: "https://" + link.link, target: "_blank", rel: "noopener noreferrer", className: "text-black" }, link.link))),
            react_1["default"].createElement("div", null,
                react_1["default"].createElement(EditDeleteDropdown_1["default"], { type: "links", entityId: link.id, entityName: link.title, entityLink: link.link, onclick: function () { return console.log("Link ID: " + link.id + " clicked"); } })))); })) : (react_1["default"].createElement("div", { className: "text-center text-gray-500" }, "No links available.")))));
};
exports["default"] = UsefulLinks;
