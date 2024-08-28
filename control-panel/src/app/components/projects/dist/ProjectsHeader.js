"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
var react_1 = require("react");
var image_1 = require("next/image");
var projects_svg_1 = require("../../../public/projects.svg");
var left_arrow_svg_1 = require("../../../public/left arrow.svg");
var right_arrow_svg_1 = require("../../../public/right arrow.svg");
var ViewToggleButtons_1 = require("@/components/common/ViewToggleButtons");
var lu_1 = require("react-icons/lu");
var next_intl_1 = require("next-intl");
var GetAllProjectsAPI_1 = require("../../services/projects/GetAllProjectsAPI"); // Adjust import path as needed
var ProjectsHeader = function (_a) {
    var viewMode = _a.viewMode, setViewMode = _a.setViewMode, handleCreateProjectClick = _a.handleCreateProjectClick, currentPage = _a.currentPage, onPageChange = _a.onPageChange, status = _a.status;
    var t = next_intl_1.useTranslations('project');
    var _b = react_1.useState(0), totalProjects = _b[0], setTotalProjects = _b[1];
    var _c = react_1.useState(0), totalPages = _c[0], setTotalPages = _c[1];
    // Function to fetch projects and calculate total pages
    var fetchTotalProjects = function () { return __awaiter(void 0, void 0, void 0, function () {
        var response, totalProjects_1, error_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    return [4 /*yield*/, GetAllProjectsAPI_1.getProjects(currentPage, status)];
                case 1:
                    response = _a.sent();
                    totalProjects_1 = response.total;
                    console.log('Total Projects:', totalProjects_1);
                    setTotalProjects(totalProjects_1);
                    setTotalPages(Math.ceil(totalProjects_1 / 12)); // Assuming 12 projects per page
                    return [3 /*break*/, 3];
                case 2:
                    error_1 = _a.sent();
                    console.error('Failed to fetch projects:', error_1);
                    return [3 /*break*/, 3];
                case 3: return [2 /*return*/];
            }
        });
    }); };
    react_1.useEffect(function () {
        fetchTotalProjects();
    }, [currentPage, status]); // Fetch projects when currentPage or status changes
    react_1.useEffect(function () {
        if (currentPage !== 1) {
            onPageChange(1); // Reset page number to 1 when status changes
        }
    }, [status]); // Trigger page reset on status change
    var handlePrevPage = function () {
        if (currentPage > 1) {
            onPageChange(currentPage - 1);
        }
    };
    var handleNextPage = function () {
        if (currentPage < totalPages) {
            onPageChange(currentPage + 1);
        }
    };
    return (react_1["default"].createElement("div", null,
        react_1["default"].createElement("div", { className: 'flex justify-center lg:justify-start mt-[20px] border-b-[1px] border-[#C4C4C4] pb-[5px]' },
            react_1["default"].createElement(image_1["default"], { src: projects_svg_1["default"], alt: "projects", width: 50, height: 50, className: "ml-1 lg:ml-7 -mt-1" }),
            react_1["default"].createElement("span", { className: 'font-semibold text-[20px]' }, t('project'))),
        react_1["default"].createElement("div", { className: 'flex justify-between mt-5 mx-4 md:mx-10 mb-5' },
            react_1["default"].createElement("div", { className: 'hidden sm:flex justify-center items-center bg-[#FDC90E] rounded-md px-3 cursor-pointer hover:bg-black hover:text-[#FDC90E]', onClick: handleCreateProjectClick },
                react_1["default"].createElement(lu_1.LuPlus, { className: '-ml-1 hover:text-[#FDC90E] font-semibold text-[20px]' }),
                react_1["default"].createElement("span", { className: 'font-semibold text-[15px]' }, "Create Project")),
            react_1["default"].createElement("div", { className: 'sm:hidden flex justify-center items-center w-[40px] h-[40px] bg-[#FDC90E] rounded-full cursor-pointer hover:bg-black hover:text-[#FDC90E]', onClick: handleCreateProjectClick },
                react_1["default"].createElement(lu_1.LuPlus, { className: 'text-[24px]' })),
            react_1["default"].createElement("div", { className: 'flex items-center space-x-3' },
                react_1["default"].createElement("div", { className: 'font-semibold text-[15px] mr-2' }, "Page " + currentPage + " of " + totalPages),
                react_1["default"].createElement("div", { className: 'flex items-center space-x-1' },
                    react_1["default"].createElement("button", { className: 'bg-[#E4E4E4] rounded-l-md p-3', onClick: handlePrevPage, disabled: currentPage === 1 },
                        react_1["default"].createElement(image_1["default"], { src: left_arrow_svg_1["default"], alt: "Previous", width: 10, height: 10 })),
                    react_1["default"].createElement("button", { className: 'bg-[#E4E4E4] rounded-r-md p-3', onClick: handleNextPage, disabled: currentPage === totalPages },
                        react_1["default"].createElement(image_1["default"], { src: right_arrow_svg_1["default"], alt: "Next", width: 10, height: 10 })),
                    react_1["default"].createElement("div", { className: 'pl-3' },
                        react_1["default"].createElement(ViewToggleButtons_1["default"], { viewMode: viewMode, setViewMode: setViewMode })))))));
};
exports["default"] = ProjectsHeader;
