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
var AddOptionsApi_1 = require("../../../services/lists/AddOptionsApi"); // Import your API function
var react_toastify_1 = require("react-toastify");
require("react-toastify/dist/ReactToastify.css");
var CategoryFormModal = function (_a) {
    var onClose = _a.onClose, _b = _a.onCategoryAdded, onCategoryAdded = _b === void 0 ? function () { } : _b;
    var _c = react_1.useState(''), categoryName = _c[0], setCategoryName = _c[1];
    var categoryInputRef = react_1.useRef(null);
    var _d = react_1.useState(false), isLoading = _d[0], setIsLoading = _d[1];
    react_1.useEffect(function () {
        if (categoryInputRef.current) {
            categoryInputRef.current.focus();
        }
    }, []);
    var handleAddCategory = function () { return __awaiter(void 0, void 0, void 0, function () {
        var error_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    if (!categoryName.trim()) {
                        react_toastify_1.toast.error('Category name is required', {
                            autoClose: 3000
                        });
                        return [2 /*return*/];
                    }
                    setIsLoading(true);
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 3, 4, 5]);
                    return [4 /*yield*/, AddOptionsApi_1.addOption({ name: categoryName, type: 'project_categories' })];
                case 2:
                    _a.sent(); // Use the correct type
                    react_toastify_1.toast.success('Category added successfully', {
                        autoClose: 3000
                    });
                    onCategoryAdded(); // Call the provided or default function
                    onClose(); // Close the modal after adding the category
                    return [3 /*break*/, 5];
                case 3:
                    error_1 = _a.sent();
                    react_toastify_1.toast.error(error_1.message || 'Failed to add category', {
                        autoClose: 3000
                    });
                    return [3 /*break*/, 5];
                case 4:
                    setIsLoading(false);
                    return [7 /*endfinally*/];
                case 5: return [2 /*return*/];
            }
        });
    }); };
    return (react_1["default"].createElement("div", { className: "category-form w-[300px] md:w-[500px] h-[220px] flex flex-col items-center" },
        react_1["default"].createElement("div", { className: 'text-[25px] font-semibold' }, "Category"),
        react_1["default"].createElement("input", { className: 'mt-[30px] border-2 border-[#E4E4E4] rounded-md px-4 py-2 w-full h-[50px]', type: "text", placeholder: "Enter Category Name", value: categoryName, ref: categoryInputRef, onChange: function (e) { return setCategoryName(e.target.value); } }),
        react_1["default"].createElement("div", { className: 'flex justify-center space-x-5 w-full' },
            react_1["default"].createElement("button", { className: 'mt-[30px] border-2 border-black rounded-md px-4 py-2 w-[50%] h-[40px] font-semibold text-[15px]\r\n          hover:bg-black hover:text-[#FDC90E]', onClick: onClose }, "Cancel"),
            react_1["default"].createElement("button", { className: 'mt-[30px] border-2 border-[#FDC90E] rounded-md px-4 py-2 w-[50%] h-[40px] font-semibold text-[15px]\r\n          bg-[#FDC90E] hover:bg-black hover:text-[#FDC90E] hover:border-black', onClick: handleAddCategory, disabled: isLoading }, isLoading ? 'Adding...' : 'Add'))));
};
exports["default"] = CategoryFormModal;
