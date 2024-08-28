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
var fa_1 = require("react-icons/fa");
var AddLink_1 = require("../../../services/projects/AddLink");
var react_toastify_1 = require("react-toastify");
var EditLinks = function (_a) {
    var projectId = _a.projectId, toggleModal = _a.toggleModal, onSave = _a.onSave;
    var _b = react_1.useState(''), title = _b[0], setTitle = _b[1];
    var _c = react_1.useState(''), url = _c[0], setUrl = _c[1];
    var _d = react_1.useState({}), errors = _d[0], setErrors = _d[1];
    var linkInputRef = react_1.useRef(null);
    react_1.useEffect(function () {
        if (linkInputRef.current) {
            linkInputRef.current.focus();
        }
    }, [projectId]);
    var validateFields = function () {
        var newErrors = {};
        if (!title.trim()) {
            newErrors.title = 'Title cannot be empty';
        }
        if (!url.trim()) {
            newErrors.url = 'URL cannot be empty';
        }
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };
    var handleSave = function () { return __awaiter(void 0, void 0, void 0, function () {
        var error_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    if (!validateFields()) return [3 /*break*/, 4];
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 3, , 4]);
                    return [4 /*yield*/, AddLink_1.addLink({ projectId: projectId !== null && projectId !== void 0 ? projectId : 0, title: title, url: url })];
                case 2:
                    _a.sent();
                    react_toastify_1.toast.success('Link added successfully!');
                    onSave(title, url);
                    toggleModal();
                    return [3 /*break*/, 4];
                case 3:
                    error_1 = _a.sent();
                    react_toastify_1.toast.error('Failed to add link.');
                    console.error('Failed to save link:', error_1);
                    return [3 /*break*/, 4];
                case 4: return [2 /*return*/];
            }
        });
    }); };
    return (react_1["default"].createElement("div", { className: "bg-gray-100 h-screen shadow-lg w-full max-w-md flex flex-col" },
        react_1["default"].createElement("div", { className: "bg-white px-6 flex items-center h-16 p-2 w-full" },
            react_1["default"].createElement(fa_1.FaWindowClose, { className: "text-3xl cursor-pointer", onClick: toggleModal }),
            react_1["default"].createElement("h2", { className: "flex-grow text-center ml-8 text-xl font-bold" }, "Edit Links"),
            react_1["default"].createElement("button", { className: "bg-[#FFC700] text-black font-semibold w-20 py-1 px-2 rounded hover:bg-black hover:text-[#FFC700]", onClick: handleSave }, "Save")),
        react_1["default"].createElement("div", { className: "w-full max-w-md space-y-4 p-4" },
            react_1["default"].createElement("div", { className: "mb-4 mx-4" },
                react_1["default"].createElement("label", { className: "block text-black font-semibold mb-2", htmlFor: "title" }, "Title"),
                react_1["default"].createElement("input", { className: "w-full border " + (errors.title ? 'border-red-500' : 'border-gray-300') + " rounded-lg p-2", type: "text", id: "title", placeholder: "Title", value: title, onChange: function (e) { return setTitle(e.target.value); } }),
                errors.title && react_1["default"].createElement("p", { className: "text-red-500 text-sm" }, errors.title)),
            react_1["default"].createElement("div", { className: "mb-4 mx-4" },
                react_1["default"].createElement("label", { className: "block text-black font-semibold mb-2", htmlFor: "url" }, "URL"),
                react_1["default"].createElement("input", { ref: linkInputRef, className: "w-full border " + (errors.url ? 'border-red-500' : 'border-gray-300') + " rounded-lg p-2", type: "url", id: "url", placeholder: "URL", value: url, onChange: function (e) { return setUrl(e.target.value); } }),
                errors.url && react_1["default"].createElement("p", { className: "text-red-500 text-sm" }, errors.url)))));
};
exports["default"] = EditLinks;
