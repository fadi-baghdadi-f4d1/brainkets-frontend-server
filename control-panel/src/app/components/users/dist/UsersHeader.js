"use client";
"use strict";
exports.__esModule = true;
var react_1 = require("react");
var image_1 = require("next/image");
var users_svg_1 = require("../../../public/users.svg");
var lu_1 = require("react-icons/lu");
var ModalContext_1 = require("@/context/ModalContext");
var ViewToggleButtons_1 = require("../common/ViewToggleButtons");
var UsersHeader = function (_a) {
    var setViewMode = _a.setViewMode, viewMode = _a.viewMode;
    var toggleCreateUserModal = ModalContext_1.useModalContext().toggleCreateUserModal;
    return (react_1["default"].createElement("div", null,
        react_1["default"].createElement("div", { className: 'flex justify-center xl:justify-start lg:justify-start my-[20px] border-b-[1px] border-[#C4C4C4] pb-[5px]' },
            react_1["default"].createElement(image_1["default"], { src: users_svg_1["default"], alt: "users", width: 50, height: 50, className: "ml-1 xl:ml-7 lg:ml-7 -mt-1" }),
            react_1["default"].createElement("span", { className: 'font-semibold text-[20px]' }, "Users")),
        react_1["default"].createElement("div", { className: 'hidden xl:flex lg:flex justify-between mt-5 mx-10' },
            react_1["default"].createElement("div", { className: 'flex justify-between' },
                react_1["default"].createElement("div", { className: 'flex justify-center items-center w-[120px] h-[40px] bg-[#FDC90E] rounded-md px-3\r\n            cursor-pointer hover:bg-black hover:text-[#FDC90E]', onClick: toggleCreateUserModal },
                    react_1["default"].createElement(lu_1.LuPlus, { className: '-ml-1 hover:text-[#FDC90E] font-semibold text-[20px]' }),
                    react_1["default"].createElement("span", { className: 'font-semibold text-[15px]' }, "Add User"))),
            react_1["default"].createElement(ViewToggleButtons_1["default"], { viewMode: viewMode, setViewMode: setViewMode }))));
};
exports["default"] = UsersHeader;
