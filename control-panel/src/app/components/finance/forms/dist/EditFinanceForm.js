"use strict";
exports.__esModule = true;
var react_1 = require("react");
var fa_1 = require("react-icons/fa");
var io_1 = require("react-icons/io");
var hi_1 = require("react-icons/hi");
var CategoryForm_1 = require("../../projects/forms/CategoryForm"); // Ensure this path is correct
var ModalContext_1 = require("@/context/ModalContext"); // Import useModalContext
var EditFinanceForm = function (_a) {
    var onClose = _a.onClose;
    var _b = react_1.useState([]), selectedFiles = _b[0], setSelectedFiles = _b[1];
    var _c = react_1.useState(''), amount = _c[0], setAmount = _c[1];
    var _d = react_1.useState(''), description = _d[0], setDescription = _d[1];
    var _e = react_1.useState(''), category = _e[0], setCategory = _e[1];
    var _f = react_1.useState(''), date = _f[0], setDate = _f[1];
    var _g = react_1.useState(false), isReceivedOrPaid = _g[0], setIsReceivedOrPaid = _g[1];
    var _h = react_1.useState('Income'), transactionType = _h[0], setTransactionType = _h[1];
    var _j = react_1.useState('USD'), currency = _j[0], setCurrency = _j[1];
    var _k = react_1.useState(false), isCurrencyDropdownOpen = _k[0], setCurrencyDropdownOpen = _k[1];
    var _l = react_1.useState(false), showCategoryForm = _l[0], setShowCategoryForm = _l[1];
    var amountInputRef = react_1.useRef(null);
    react_1.useEffect(function () {
        if (amountInputRef.current) {
            amountInputRef.current.focus();
        }
    }, []);
    var toggleSelectCategoryModal = ModalContext_1.useModalContext().toggleSelectCategoryModal; // Use context here
    var handleCurrencySelect = function (selectedCurrency) {
        setCurrency(selectedCurrency);
        setCurrencyDropdownOpen(false);
    };
    return (react_1["default"].createElement("div", null,
        react_1["default"].createElement("div", { className: "fixed inset-0 top-0 left-0 min-h-screen flex items-end justify-end z-50" },
            react_1["default"].createElement("div", { className: "bg-[#F4F4F4] w-[650px] max-w-lg min-h-screen relative" },
                react_1["default"].createElement("div", { className: 'flex p-4 bg-white border-b border-b-[#E4E4E4] justify-between items-center' },
                    react_1["default"].createElement(fa_1.FaWindowClose, { onClick: onClose, className: 'text-3xl cursor-pointer' }),
                    react_1["default"].createElement("h2", { className: "text-center text-[20px] font-bold mt-1" }, "Edit Finance"),
                    react_1["default"].createElement("button", { className: "bg-[#FDC90E] hover:bg-black hover:text-[#FDC90E] text-black font-semibold rounded-lg py-1 px-6" }, "Save")),
                react_1["default"].createElement("div", { className: "bg-[#F4F4F4] px-[30px] py-[30px] w-full h-[calc(100vh-70px)] overflow-y-auto" },
                    react_1["default"].createElement("form", { className: "space-y-4" },
                        react_1["default"].createElement("div", { className: "flex justify-between space-x-7" },
                            react_1["default"].createElement("div", { className: "flex justify-center items-center w-[280px] h-[50px] rounded-md bg-[#19B600] bg-opacity-15 text-[#19B600]\n                  " + (transactionType === 'Income' ? "border-2 border-[#606060]" : 'border border-transparent') + " font-semibold text-[20px]\n                  cursor-pointer", onClick: function () { return setTransactionType('Income'); } },
                                react_1["default"].createElement("input", { type: "radio", name: "transactionType", value: "Income", checked: transactionType === 'Income', onChange: function () { return setTransactionType('Income'); }, className: "hidden" }),
                                "Income"),
                            react_1["default"].createElement("div", { className: "flex justify-center items-center w-[280px] h-[50px] rounded-md bg-[#CC0000] bg-opacity-15 text-[#CC0000]\n                  " + (transactionType === 'Expenses' ? "border-2 border-[#606060]" : 'border border-transparent') + " font-semibold text-[20px] cursor-pointer", onClick: function () { return setTransactionType('Expenses'); } },
                                react_1["default"].createElement("input", { type: "radio", name: "transactionType", value: "Expenses", checked: transactionType === 'Expenses', onChange: function () { return setTransactionType('Expenses'); }, className: "hidden" }),
                                "Expenses")),
                        react_1["default"].createElement("div", { className: "flex flex-col space-y-7" },
                            react_1["default"].createElement("div", null,
                                react_1["default"].createElement("div", { className: "flex flex-row justify-between" },
                                    react_1["default"].createElement("label", { className: "block font-bold mb-1" }, "Amount"),
                                    react_1["default"].createElement("div", { className: "relative" },
                                        react_1["default"].createElement("button", { type: "button", className: "flex flex-row justify-between items-center my-2 px-4 bg-white shadow-md rounded-md", onClick: function () { return setCurrencyDropdownOpen(!isCurrencyDropdownOpen); } },
                                            currency,
                                            isCurrencyDropdownOpen ? react_1["default"].createElement(io_1.IoIosArrowUp, { className: "ml-2" }) : react_1["default"].createElement(io_1.IoIosArrowDown, { className: "ml-2" })),
                                        isCurrencyDropdownOpen && (react_1["default"].createElement("div", { className: "absolute right-0 w-full bg-white border rounded-md shadow-lg z-10" },
                                            react_1["default"].createElement("ul", null,
                                                react_1["default"].createElement("li", { className: "px-4 py-2 cursor-pointer hover:bg-gray-200", onClick: function () { return handleCurrencySelect('USD'); } }, "USD"),
                                                react_1["default"].createElement("li", { className: "px-4 py-2 cursor-pointer hover:bg-gray-200", onClick: function () { return handleCurrencySelect('EUR'); } }, "EUR"),
                                                react_1["default"].createElement("li", { className: "px-4 py-2 cursor-pointer hover:bg-gray-200", onClick: function () { return handleCurrencySelect('LBP'); } }, "LBP")))))),
                                react_1["default"].createElement("div", { className: "relative" },
                                    react_1["default"].createElement("input", { type: "text", className: "w-full p-2 border rounded-md", placeholder: "Enter amount", value: amount, onChange: function (e) { return setAmount(e.target.value); }, ref: amountInputRef }))),
                            react_1["default"].createElement("div", null,
                                react_1["default"].createElement("label", { className: "block font-bold mb-1" }, "Description"),
                                react_1["default"].createElement("input", { type: "text", className: "w-full p-2 border rounded-md", placeholder: "Description", value: description, onChange: function (e) { return setDescription(e.target.value); } })),
                            react_1["default"].createElement("div", null,
                                react_1["default"].createElement("label", { className: "block text-gray-700 font-bold mb-1" }, "Category"),
                                react_1["default"].createElement("div", { className: "flex" },
                                    react_1["default"].createElement("div", { onClick: toggleSelectCategoryModal, className: "w-full flex flex-row justify-between px-2 bg-white py-2 border rounded-md cursor-pointer" },
                                        category || 'Select Category',
                                        react_1["default"].createElement(io_1.IoIosArrowDown, { size: 20, className: "text-black mt-1" })),
                                    react_1["default"].createElement("button", { type: "button", className: "flex justify-center items-center ml-2 p-1 mt-2 w-[30px] h-[30px] bg-black rounded-md text-white", onClick: function () { return setShowCategoryForm(true); } },
                                        react_1["default"].createElement(hi_1.HiPlus, { size: 30, className: "font-bold" })))),
                            react_1["default"].createElement("div", null,
                                react_1["default"].createElement("label", { className: "block text-black font-bold mb-1" }, "Date"),
                                react_1["default"].createElement("div", { className: "flex items-center" },
                                    react_1["default"].createElement("input", { type: "date", className: "w-full px-2 py-2 border rounded-md bg-white", value: date, onChange: function (e) { return setDate(e.target.value); } }))),
                            react_1["default"].createElement("div", { className: "flex items-start" },
                                react_1["default"].createElement("input", { type: "checkbox", className: "mt-1 mr-2 w-5 h-5 border border-[#999999] rounded-sm", checked: isReceivedOrPaid, onChange: function () { return setIsReceivedOrPaid(!isReceivedOrPaid); } }),
                                react_1["default"].createElement("label", { className: "flex flex-row justify-start place-items-start font-bold" }, transactionType === 'Income' ? 'Is Received?' : 'Is Paid?'))))),
                showCategoryForm && (react_1["default"].createElement("div", { className: "fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50" },
                    react_1["default"].createElement("div", { className: "bg-white p-8 rounded-lg shadow-lg relative" },
                        react_1["default"].createElement(CategoryForm_1["default"], { onClose: function () { return setShowCategoryForm(false); } }))))))));
};
exports["default"] = EditFinanceForm;
