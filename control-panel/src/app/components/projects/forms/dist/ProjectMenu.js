"use strict";
exports.__esModule = true;
var react_1 = require("react");
var image_1 = require("next/image");
var ProjectSettings_1 = require("./ProjectSettings");
var link_1 = require("next/link");
var useLocale_1 = require("@/hooks/useLocale");
var ModalContext_1 = require("@/context/ModalContext");
var ProjectMenu = function () {
    var _a = react_1.useState(false), isMenuOpen = _a[0], setIsMenuOpen = _a[1];
    var _b = react_1.useState(false), isOverlayOpen = _b[0], setIsOverlayOpen = _b[1];
    var menuRef = react_1.useRef(null);
    var locale = useLocale_1["default"]();
    var _c = ModalContext_1.useModalContext(), toggleEditProjectModal = _c.toggleEditProjectModal, toggleProjectDetailsModal = _c.toggleProjectDetailsModal, toggleUsefulLinks = _c.toggleUsefulLinks;
    var toggleMenu = function () {
        setIsMenuOpen(function (prevState) { return !prevState; });
    };
    var handleEditProjectClick = function () {
        toggleEditProjectModal();
        toggleMenu();
    };
    var handleProjectDetailsClick = function () {
        toggleProjectDetailsModal();
        toggleMenu();
    };
    var handleUsefulLinksClick = function () {
        toggleUsefulLinks();
        toggleMenu();
    };
    var handleClickOutside = function (event) {
        if (menuRef.current && !menuRef.current.contains(event.target)) {
            setIsMenuOpen(false);
        }
    };
    react_1.useEffect(function () {
        document.addEventListener('mousedown', handleClickOutside);
        return function () {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);
    var handleSettingsClick = function () {
        setIsOverlayOpen(true);
    };
    var closeOverlay = function () {
        setIsOverlayOpen(false);
    };
    return (react_1["default"].createElement("div", { className: "relative", ref: menuRef },
        react_1["default"].createElement("button", { onClick: toggleMenu },
            react_1["default"].createElement(image_1["default"], { className: "beeflexSquare rounded-md", src: "/beeflexSquare.png", alt: "Menu", width: 50, height: 50 })),
        react_1["default"].createElement("div", { className: "absolute z-50 right-0 top-12 bg-white border border-gray-300 rounded-md shadow-lg transition-transform duration-300 ease-in-out " + (isMenuOpen ? 'opacity-100 transform scale-100' : 'opacity-0 transform scale-95 pointer-events-none') },
            react_1["default"].createElement("ul", { className: "py-1" },
                react_1["default"].createElement("li", { className: "flex items-center py-2 pr-6 hover:bg-gray-100 cursor-pointer" },
                    react_1["default"].createElement(image_1["default"], { src: "/yellowSearch.svg", alt: "Search Icon", width: 16, height: 16, className: "mx-3" }),
                    "Search"),
                react_1["default"].createElement(link_1["default"], { href: "/" + locale + "/tickets", passHref: true },
                    react_1["default"].createElement("li", { className: "flex items-center pr-6 py-2 hover:bg-gray-100 cursor-pointer" },
                        react_1["default"].createElement(image_1["default"], { src: "/tickets.svg", alt: "Tickets Icon", width: 16, height: 16, className: "mx-3" }),
                        "Tickets")),
                react_1["default"].createElement("li", { className: "flex items-center pr-6 py-2 hover:bg-gray-100 cursor-pointer", onClick: handleProjectDetailsClick },
                    react_1["default"].createElement(image_1["default"], { src: "/details.svg", alt: "Details Icon", width: 16, height: 16, className: "mx-3" }),
                    "Details"),
                react_1["default"].createElement("li", { className: "flex items-center pr-6 py-2 hover:bg-gray-100 cursor-pointer", onClick: handleUsefulLinksClick },
                    react_1["default"].createElement(image_1["default"], { src: "/links.svg", alt: "Links Icon", width: 16, height: 16, className: "mx-3" }),
                    "Links"),
                react_1["default"].createElement("li", { onClick: handleEditProjectClick, className: "flex items-center pr-6 py-2 hover:bg-gray-100 cursor-pointer" },
                    react_1["default"].createElement(image_1["default"], { src: "/edit.svg", alt: "Edit Icon", width: 16, height: 16, className: "mx-3" }),
                    "Edit"),
                react_1["default"].createElement(link_1["default"], { href: "/" + locale + "/projectDashboard", passHref: true },
                    react_1["default"].createElement("li", { className: "flex items-center pr-6 py-2 hover:bg-gray-100 cursor-pointer" },
                        react_1["default"].createElement(image_1["default"], { src: "/orangeDash.svg", alt: "Dashboard Icon", width: 16, height: 16, className: "mx-3" }),
                        "Dashboard")),
                react_1["default"].createElement("li", { className: "flex items-center pr-6 py-2 hover:bg-gray-100 cursor-pointer", onClick: function () {
                        handleSettingsClick();
                        toggleMenu();
                    } },
                    react_1["default"].createElement(image_1["default"], { src: "/blackSetting.svg", alt: "Settings Icon", width: 16, height: 16, className: "mx-3" }),
                    "Settings"))),
        isOverlayOpen && (react_1["default"].createElement("div", { className: "fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50" },
            react_1["default"].createElement(ProjectSettings_1["default"], { onClose: closeOverlay })))));
};
exports["default"] = ProjectMenu;
