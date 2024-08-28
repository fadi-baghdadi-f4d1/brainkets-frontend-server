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
exports.__esModule = true;
var react_1 = require("react");
var react_lottie_1 = require("react-lottie");
var Alert_Animation_json_1 = require("../../../public/Alert-Animation.json");
var sweetalert2_1 = require("sweetalert2");
var loader_1 = require("../../../src/components/common/loader/loader");
var RemoveAnnouncementApi_1 = require("@/services/home/announcement/RemoveAnnouncementApi");
var DeleteProject_1 = require("@/services/projects/DeleteProject");
var DeleteOptionApi_1 = require("../../../src/services/lists/DeleteOptionApi");
var DeleteLink_1 = require("../../../src/services/projects/DeleteLink");
var DeleteModal = function (_a) {
    var isOpen = _a.isOpen, onClose = _a.onClose, entityId = _a.entityId, entityType = _a.entityType;
    var _b = react_1.useState(false), loading = _b[0], setLoading = _b[1];
    // Return null early if the modal is not open
    if (!isOpen)
        return null;
    var defaultOptions = {
        loop: true,
        autoplay: true,
        animationData: Alert_Animation_json_1["default"],
        rendererSettings: {
            preserveAspectRatio: 'xMidYMid slice'
        }
    };
    var handleDelete = function () { return __awaiter(void 0, void 0, void 0, function () {
        var error_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 9, 10, 11]);
                    setLoading(true);
                    if (!(entityType === 'announcement')) return [3 /*break*/, 2];
                    return [4 /*yield*/, RemoveAnnouncementApi_1.removeAnnouncement(entityId)];
                case 1:
                    _a.sent();
                    return [3 /*break*/, 8];
                case 2:
                    if (!(entityType === 'project')) return [3 /*break*/, 4];
                    return [4 /*yield*/, DeleteProject_1.deleteProject({ id: entityId })];
                case 3:
                    _a.sent();
                    return [3 /*break*/, 8];
                case 4:
                    if (!(entityType === 'links')) return [3 /*break*/, 6];
                    return [4 /*yield*/, DeleteLink_1.deleteLink({ id: entityId })];
                case 5:
                    _a.sent();
                    return [3 /*break*/, 8];
                case 6: 
                // Handle other types with deleteOption or any other specific logic
                return [4 /*yield*/, DeleteOptionApi_1.deleteOption({ id: entityId, type: entityType })];
                case 7:
                    // Handle other types with deleteOption or any other specific logic
                    _a.sent();
                    _a.label = 8;
                case 8:
                    sweetalert2_1["default"].fire({
                        icon: 'success',
                        title: 'Deleted!',
                        text: "The " + entityType + " has been deleted successfully.",
                        confirmButtonText: 'OK',
                        customClass: {
                            confirmButton: 'custom-ok-button'
                        }
                    });
                    return [3 /*break*/, 11];
                case 9:
                    error_1 = _a.sent();
                    console.error('Deletion failed:', error_1);
                    sweetalert2_1["default"].fire({
                        icon: 'error',
                        title: 'Error!',
                        text: 'There was an issue deleting the item. Please try again.',
                        confirmButtonText: 'OK',
                        customClass: {
                            confirmButton: 'custom-ok-button'
                        }
                    });
                    return [3 /*break*/, 11];
                case 10:
                    onClose();
                    setLoading(false);
                    return [7 /*endfinally*/];
                case 11: return [2 /*return*/];
            }
        });
    }); };
    return (react_1["default"].createElement("div", { className: "fixed inset-0 flex justify-center items-center z-50 bg-black bg-opacity-50" },
        loading && (react_1["default"].createElement("div", { className: "absolute inset-0 flex justify-center items-center z-10" },
            react_1["default"].createElement(loader_1["default"], null))),
        react_1["default"].createElement("div", { className: "relative bg-white rounded-lg w-[90%] md:w-[500px] p-5 " + (loading ? 'opacity-50' : '') },
            react_1["default"].createElement(react_lottie_1["default"], { options: defaultOptions, height: 150, width: 150 }),
            react_1["default"].createElement("div", { className: 'text-center' },
                react_1["default"].createElement("h2", { className: 'text-[40px] font-bold' }, "Warning"),
                react_1["default"].createElement("p", { className: 'text-[20px] font-semibold' },
                    "Are you sure you want to delete this ",
                    entityType,
                    "?"),
                react_1["default"].createElement("div", { className: 'flex justify-end space-x-5 mt-5' },
                    react_1["default"].createElement("button", { onClick: onClose, className: 'w-[220px] h-[50px] border border-black bg-transparent rounded-md text-[20px] font-semibold hover:bg-black hover:text-[#FDC90E]' }, "No"),
                    react_1["default"].createElement("button", { onClick: handleDelete, className: 'w-[220px] h-[50px] border border-[#FDC90E] bg-[#FDC90E] rounded-md text-[20px] font-semibold hover:bg-black hover:text-[#FDC90E]' }, "Yes"))))));
};
exports["default"] = DeleteModal;
