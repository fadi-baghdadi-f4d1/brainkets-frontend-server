"use client";
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
var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
exports.__esModule = true;
var react_1 = require("react");
var fa_1 = require("react-icons/fa");
var io5_1 = require("react-icons/io5");
var useOnClickOutside_1 = require("@/hooks/useOnClickOutside");
var EditDeleteDropdown_1 = require("../../common/EditDeleteDropdown");
var GetOptionsApi_1 = require("@/services/lists/GetOptionsApi"); // Import the API function
var SelectDepartmentForm = function (_a) {
    var toggleModal = _a.toggleModal;
    var departmentInputRef = react_1.useRef(null);
    var dropdownRefs = react_1.useRef([]);
    var _b = react_1.useState(null), dropdownIndex = _b[0], setDropdownIndex = _b[1];
    var _c = react_1.useState([]), departments = _c[0], setDepartments = _c[1];
    var _d = react_1.useState(''), searchQuery = _d[0], setSearchQuery = _d[1];
    react_1.useEffect(function () {
        // Fetch departments when the component mounts
        var fetchDepartments = function () { return __awaiter(void 0, void 0, void 0, function () {
            var data, error_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, GetOptionsApi_1.getOptions('project_departments', 1, searchQuery)];
                    case 1:
                        data = _a.sent();
                        setDepartments(data.options); // Assuming 'options' is the key that contains an array of department objects
                        return [3 /*break*/, 3];
                    case 2:
                        error_1 = _a.sent();
                        console.error('Failed to fetch departments:', error_1);
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        }); };
        fetchDepartments();
    }, [searchQuery]); // Re-fetch departments when searchQuery changes
    react_1.useEffect(function () {
        if (departmentInputRef.current) {
            departmentInputRef.current.focus();
        }
    }, []);
    var handleDropdownToggle = function (index) {
        setDropdownIndex(function (prevIndex) { return (prevIndex === index ? null : index); });
    };
    var validDropdownRefs = dropdownRefs.current.filter(function (ref) { return ref !== null; });
    useOnClickOutside_1["default"](__spreadArrays([departmentInputRef], validDropdownRefs), function () { return setDropdownIndex(null); });
    return (react_1["default"].createElement("div", { className: "bg-[#F4F4F4] h-screen shadow-lg w-full max-w-md flex flex-col" },
        react_1["default"].createElement("div", { className: "flex bg-white p-4 items-center mb-4" },
            react_1["default"].createElement(fa_1.FaWindowClose, { className: "text-3xl cursor-pointer", onClick: toggleModal }),
            react_1["default"].createElement("h2", { className: "flex-grow text-center text-xl font-bold" }, "Select Department")),
        react_1["default"].createElement("div", { className: "relative mx-4 m-2 mb-4" },
            react_1["default"].createElement(io5_1.IoSearchOutline, { className: "text-3xl text-[#606060] absolute left-3 top-3 w-5 h-5" }),
            react_1["default"].createElement("input", { type: "text", placeholder: "Start typing to search", ref: departmentInputRef, value: searchQuery, onChange: function (e) { return setSearchQuery(e.target.value); }, className: "w-full text-[#606060] border border-[#C4C4C4] rounded-lg p-2 pl-10" })),
        react_1["default"].createElement("div", { className: "flex-grow overflow-y-auto p-4 custom-scrollbar" }, departments.map(function (department) { return (react_1["default"].createElement("div", { key: department.id, className: "relative flex items-center border-b-[#C4C4C4] border-b-2 justify-between mb-2 px-2" },
            react_1["default"].createElement("div", { className: "flex items-center w-full py-2" },
                react_1["default"].createElement("span", { className: 'font-medium' }, department.name),
                " "),
            react_1["default"].createElement("div", { className: "relative" },
                react_1["default"].createElement(EditDeleteDropdown_1["default"], { type: "department", entityId: department.id, entityName: department.name, onclick: function () {
                        // Optionally handle onclick here
                    } })))); }))));
};
exports["default"] = SelectDepartmentForm;
