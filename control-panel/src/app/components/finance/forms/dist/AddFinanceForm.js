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
var io_1 = require("react-icons/io");
var hi_1 = require("react-icons/hi");
var SelectFinanceCategory_1 = require("./SelectFinanceCategory"); // Ensure this path is correct
var CreateFinanceCategoryForm_1 = require("./CreateFinanceCategoryForm"); // Ensure this path is correct
var GetCurrency_1 = require("../../../services/finance/GetCurrency"); // Update the path as needed
var CreateFinance_1 = require("../../../services/finance/CreateFinance"); // Update the path as needed
var react_toastify_1 = require("react-toastify"); // Assuming you're using react-toastify
var AddFinanceForm = function (_a) {
    var onClose = _a.onClose;
    var _b = react_1.useState([]), selectedFiles = _b[0], setSelectedFiles = _b[1];
    var _c = react_1.useState(null), selectedCategory = _c[0], setSelectedCategory = _c[1];
    var amountInputRef = react_1.useRef(null);
    var _d = react_1.useState(''), amount = _d[0], setAmount = _d[1];
    var _e = react_1.useState(''), description = _e[0], setDescription = _e[1];
    var _f = react_1.useState(''), date = _f[0], setDate = _f[1];
    var _g = react_1.useState(false), isReceived = _g[0], setIsReceived = _g[1];
    react_1.useEffect(function () {
        if (amountInputRef.current) {
            amountInputRef.current.focus();
        }
    }, []);
    var _h = react_1.useState(false), showCategoryForm = _h[0], setShowCategoryForm = _h[1];
    var _j = react_1.useState(false), showAddCategoryForm = _j[0], setShowAddCategoryForm = _j[1];
    var _k = react_1.useState(null), currency = _k[0], setCurrency = _k[1];
    var _l = react_1.useState(false), isCurrencyDropdownOpen = _l[0], setCurrencyDropdownOpen = _l[1];
    var _m = react_1.useState([]), currencies = _m[0], setCurrencies = _m[1];
    var _o = react_1.useState('Income'), transactionType = _o[0], setTransactionType = _o[1];
    react_1.useEffect(function () {
        var fetchCurrencies = function () { return __awaiter(void 0, void 0, void 0, function () {
            var data, error_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, GetCurrency_1.getCurrencies()];
                    case 1:
                        data = _a.sent();
                        setCurrencies(data); // Adjust based on API response structure
                        return [3 /*break*/, 3];
                    case 2:
                        error_1 = _a.sent();
                        console.error('Error fetching currencies:', error_1);
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        }); };
        fetchCurrencies();
    }, []);
    var handleCurrencySelect = function (selectedCurrency) {
        setCurrency(selectedCurrency);
        setCurrencyDropdownOpen(false);
    };
    var handleCategorySelect = function (categoryId, categoryName) {
        setSelectedCategory({ id: categoryId, name: categoryName });
    };
    var toggleSelectCategoryModal = function () {
        setShowCategoryForm(true);
    };
    var handleAddCategoryClick = function () {
        setShowAddCategoryForm(true);
    };
    var handleSubmit = function (event) { return __awaiter(void 0, void 0, void 0, function () {
        var payload, error_2;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    event.preventDefault();
                    if (!amount) {
                        react_toastify_1.toast.error("Please enter an amount.");
                        return [2 /*return*/];
                    }
                    if (!currency) {
                        react_toastify_1.toast.error("Please select a currency.");
                        return [2 /*return*/];
                    }
                    if (!description) {
                        react_toastify_1.toast.error("Please enter a description.");
                        return [2 /*return*/];
                    }
                    if (!selectedCategory) {
                        react_toastify_1.toast.error("Please select a category.");
                        return [2 /*return*/];
                    }
                    if (!date) {
                        react_toastify_1.toast.error("Please select a date.");
                        return [2 /*return*/];
                    }
                    payload = {
                        categoryId: selectedCategory.id,
                        type: transactionType,
                        amount: parseFloat(amount),
                        description: description,
                        currencyId: currency.id,
                        date: date,
                        definer: undefined,
                        isReceived: isReceived
                    };
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 3, , 4]);
                    return [4 /*yield*/, CreateFinance_1.createFinance(payload)];
                case 2:
                    _a.sent();
                    react_toastify_1.toast.success("Finance record created successfully");
                    onClose(); // Close the form on success
                    return [3 /*break*/, 4];
                case 3:
                    error_2 = _a.sent();
                    react_toastify_1.toast.error("Failed to create finance record");
                    return [3 /*break*/, 4];
                case 4: return [2 /*return*/];
            }
        });
    }); };
    return (react_1["default"].createElement("div", { className: "fixed inset-0 top-0 left-0 min-h-screen flex items-end justify-end z-50" },
        react_1["default"].createElement("div", { className: "bg-[#F4F4F4] w-[650px] max-w-lg min-h-screen relative" },
            react_1["default"].createElement("div", { className: 'flex px-2 py-4 md:px-[30px] bg-white border-b border-b-[#E4E4E4] justify-between items-center' },
                react_1["default"].createElement(fa_1.FaWindowClose, { onClick: onClose, className: 'text-3xl cursor-pointer' }),
                react_1["default"].createElement("h2", { className: "text-center text-[20px] font-bold mt-1" }, "Finance"),
                react_1["default"].createElement("button", { className: "bg-[#FDC90E] hover:bg-black hover:text-[#FDC90E] text-black font-semibold rounded-lg py-2 px-10", onClick: handleSubmit }, "Save")),
            react_1["default"].createElement("div", { className: "bg-[#F4F4F4] px-2 md:px-[30px] py-[15px] w-full h-[calc(100vh-70px)] overflow-y-auto" },
                react_1["default"].createElement("form", { className: "space-y-4" },
                    react_1["default"].createElement("div", { className: "flex justify-between space-x-7" },
                        react_1["default"].createElement("div", { className: "flex justify-center items-center w-[150px] md:w-[280px] h-[50px] rounded-md bg-[#19B600] bg-opacity-15\n                   text-[#19B600] \n              " + (transactionType === 'Income' ? "border-2 border-[#606060]" : 'border border-transparent') + " font-semibold text-[20px]\n                  cursor-pointer", onClick: function () { return setTransactionType('Income'); } },
                            react_1["default"].createElement("input", { type: "radio", name: "transactionType", value: "Income", checked: transactionType === 'Income', onChange: function () { return setTransactionType('Income'); }, className: "hidden" }),
                            "Income"),
                        react_1["default"].createElement("div", { className: "flex justify-center items-center w-[150px] md:w-[280px] h-[50px] rounded-md bg-[#CC0000] bg-opacity-15 text-[#CC0000]\n               " + (transactionType === 'Expenses' ? "border-2 border-[#606060]" : 'border border-transparent') + " font-semibold text-[20px] cursor-pointer", onClick: function () { return setTransactionType('Expenses'); } },
                            react_1["default"].createElement("input", { type: "radio", name: "transactionType", value: "Expenses", checked: transactionType === 'Expenses', onChange: function () { return setTransactionType('Expenses'); }, className: "hidden" }),
                            "Expenses")),
                    react_1["default"].createElement("div", { className: "flex flex-col space-y-7" },
                        react_1["default"].createElement("div", null,
                            react_1["default"].createElement("div", { className: "flex flex-row justify-between" },
                                react_1["default"].createElement("label", { className: "block font-bold" },
                                    "Amount ",
                                    react_1["default"].createElement("span", { className: 'text-[#FF0000]' }, "*")),
                                react_1["default"].createElement("div", { className: "relative" },
                                    react_1["default"].createElement("button", { type: "button", className: "flex flex-row justify-between items-center mb-4 px-4 py-1 bg-white shadow-md rounded-md border\r\n                       border-gray-300", onClick: function () { return setCurrencyDropdownOpen(!isCurrencyDropdownOpen); } },
                                        currency ? currency.code : 'Select Currency',
                                        isCurrencyDropdownOpen ? react_1["default"].createElement(io_1.IoIosArrowUp, { className: "ml-2" }) : react_1["default"].createElement(io_1.IoIosArrowDown, { className: "ml-2" })),
                                    react_1["default"].createElement("div", { className: "transition-all duration-300 ease-out transform origin-top \n                        " + (isCurrencyDropdownOpen ? 'scale-y-100 opacity-100 shadow-lg' : 'scale-y-0 opacity-0') + " \n                        absolute right-0 top-7 w-full bg-white rounded-b-md z-10 border border-gray-300 border-t-0 overflow-hidden" },
                                        react_1["default"].createElement("ul", null, currencies.map(function (currencyItem) { return (react_1["default"].createElement("li", { key: currencyItem.code, className: "px-4 py-2 cursor-pointer hover:bg-gray-200 border-b border-[#C4C4C4] last:border-0 mx-2", onClick: function () { return handleCurrencySelect(currencyItem); } }, currencyItem.code)); }))))),
                            react_1["default"].createElement("div", { className: "relative" },
                                react_1["default"].createElement("input", { type: "text", className: "w-full p-2 border rounded-md", placeholder: "Enter amount", value: amount, onChange: function (e) { return setAmount(e.target.value); }, ref: amountInputRef }))),
                        react_1["default"].createElement("div", null,
                            react_1["default"].createElement("label", { className: "block font-bold mb-1" },
                                "Description ",
                                react_1["default"].createElement("span", { className: 'text-[#FF0000]' }, "*")),
                            react_1["default"].createElement("input", { type: "text", className: "w-full p-2 border rounded-md", placeholder: "Description", value: description, onChange: function (e) { return setDescription(e.target.value); } })),
                        react_1["default"].createElement("div", null,
                            react_1["default"].createElement("label", { className: "block font-bold mb-1" },
                                "Category ",
                                react_1["default"].createElement("span", { className: 'text-[#FF0000]' }, "*")),
                            react_1["default"].createElement("div", { className: "flex" },
                                react_1["default"].createElement("div", { onClick: toggleSelectCategoryModal, className: "w-full flex flex-row justify-between px-2 bg-white py-2 border rounded-md cursor-pointer" },
                                    selectedCategory ? selectedCategory.name : 'Select Category',
                                    react_1["default"].createElement(io_1.IoIosArrowDown, { size: 20, className: "text-black mt-1" })),
                                react_1["default"].createElement("button", { type: "button", className: "flex justify-center items-center ml-2 p-1 mt-2 w-[30px] h-[30px] bg-black rounded-md text-white", onClick: handleAddCategoryClick },
                                    react_1["default"].createElement(hi_1.HiPlus, { size: 30, className: "font-bold" })))),
                        react_1["default"].createElement("div", null,
                            react_1["default"].createElement("label", { className: "block text-black font-bold mb-1" },
                                "Date ",
                                react_1["default"].createElement("span", { className: 'text-[#FF0000]' }, "*")),
                            react_1["default"].createElement("div", { className: "flex items-center" },
                                react_1["default"].createElement("input", { type: "date", className: "w-full px-2 py-2 border rounded-md bg-white", value: date, onChange: function (e) { return setDate(e.target.value); } }))),
                        react_1["default"].createElement("div", { className: "flex items-start" },
                            react_1["default"].createElement("input", { type: "checkbox", className: "mt-1 mr-2 w-5 h-5 border border-[#999999] rounded-sm", checked: isReceived, onChange: function (e) { return setIsReceived(e.target.checked); } }),
                            react_1["default"].createElement("label", { className: "flex flex-row justify-start place-items-start font-bold" }, transactionType === 'Income' ? 'Is Received?' : 'Is Paid?')),
                        react_1["default"].createElement("div", null)))),
            showCategoryForm && (react_1["default"].createElement("div", { className: "fixed inset-0 flex items-center justify-end bg-black bg-opacity-50 z-50" },
                react_1["default"].createElement(SelectFinanceCategory_1["default"], { toggleModal: function () { return setShowCategoryForm(false); }, onSelect: handleCategorySelect, selectedCategoryId: selectedCategory === null || selectedCategory === void 0 ? void 0 : selectedCategory.id }))),
            showAddCategoryForm && (react_1["default"].createElement("div", { className: "fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50" },
                react_1["default"].createElement("div", { className: "bg-white p-8 rounded-lg shadow-lg relative" },
                    react_1["default"].createElement(CreateFinanceCategoryForm_1["default"], { onClose: function () { return setShowAddCategoryForm(false); } })))))));
};
exports["default"] = AddFinanceForm;
