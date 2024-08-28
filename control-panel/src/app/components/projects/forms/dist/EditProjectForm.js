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
var hi_1 = require("react-icons/hi");
var image_1 = require("next/image");
var CategoryForm_1 = require("../forms/CategoryForm");
var DepartmentForm_1 = require("../forms/DepartmentForm");
var CreateUserForm_1 = require("./CreateUserForm");
var image_svg_1 = require("../../../../public/image.svg");
var io_1 = require("react-icons/io");
var fa_1 = require("react-icons/fa");
var GetCurrency_1 = require("../../../services/finance/GetCurrency");
var EditProject_1 = require("../../../services/projects/EditProject");
var SelectCategoryForm_1 = require("./SelectCategoryForm");
var SelectDepartmentForm_1 = require("./SelectDepartmentForm");
var SelectClientModal_1 = require("../../modals/SelectClientModal");
var SelectMembers_1 = require("../../modals/SelectMembers");
var react_toastify_1 = require("react-toastify");
require("react-toastify/dist/ReactToastify.css");
var GetSingleProject_1 = require("@/services/projects/GetSingleProject");
var EditProjectForm = function (_a) {
    var onClose = _a.onClose, projectId = _a.projectId;
    var _b = react_1.useState(''), name = _b[0], setName = _b[1];
    var _c = react_1.useState(''), status = _c[0], setStatus = _c[1];
    var _d = react_1.useState(false), isSelectCategoryModalOpen = _d[0], setIsSelectCategoryModalOpen = _d[1];
    var _e = react_1.useState(false), showCategoryForm = _e[0], setShowCategoryForm = _e[1];
    var _f = react_1.useState(''), selectedCategory = _f[0], setSelectedCategory = _f[1];
    var _g = react_1.useState(null), selectedCategoryId = _g[0], setSelectedCategoryId = _g[1];
    var _h = react_1.useState(false), showDepartmentForm = _h[0], setShowDepartmentForm = _h[1];
    var _j = react_1.useState(false), isSelectDepartmentModalOpen = _j[0], setIsSelectDepartmentModalOpen = _j[1];
    var _k = react_1.useState(''), selectedDepartment = _k[0], setSelectedDepartment = _k[1];
    var _l = react_1.useState(null), selectedDepartmentId = _l[0], setSelectedDepartmentId = _l[1];
    var _m = react_1.useState(''), startDate = _m[0], setStartDate = _m[1];
    var _o = react_1.useState(''), dueDate = _o[0], setDueDate = _o[1];
    var _p = react_1.useState(false), isSelectClientModalOpen = _p[0], setIsSelectClientModalOpen = _p[1];
    var _q = react_1.useState(''), selectedClient = _q[0], setSelectedClient = _q[1];
    var _r = react_1.useState(false), showAddClientForm = _r[0], setShowAddClientForm = _r[1];
    var _s = react_1.useState(0), budget = _s[0], setBudget = _s[1];
    var _t = react_1.useState(''), description = _t[0], setDescription = _t[1];
    var _u = react_1.useState(''), selectedCurrency = _u[0], setSelectedCurrency = _u[1];
    var _v = react_1.useState([]), currencies = _v[0], setCurrencies = _v[1];
    var _w = react_1.useState(null), selectedCurrencyId = _w[0], setSelectedCurrencyId = _w[1];
    var _x = react_1.useState([]), selectedClients = _x[0], setSelectedClients = _x[1];
    var _y = react_1.useState([]), clientsIds = _y[0], setClientsIds = _y[1];
    var _z = react_1.useState(false), isSelectMemberModalOpen = _z[0], setIsSelectMemberModalOpen = _z[1];
    var _0 = react_1.useState([]), selectedMembers = _0[0], setSelectedMembers = _0[1]; // Assuming members have the same structure as clients
    var _1 = react_1.useState([]), membersIds = _1[0], setMembersIds = _1[1];
    var _2 = react_1.useState(false), isPersonal = _2[0], setIsPersonal = _2[1];
    var _3 = react_1.useState(null), project = _3[0], setProject = _3[1]; // State for project details
    var _4 = react_1.useState(false), loading = _4[0], setLoading = _4[1]; // State for loading status
    var _5 = react_1.useState(null), error = _5[0], setError = _5[1]; // State for error message
    var _6 = react_1.useState(0), id = _6[0], setId = _6[1];
    react_1.useEffect(function () {
        var fetchCurrencies = function () { return __awaiter(void 0, void 0, void 0, function () {
            var currenciesData, formattedCurrencies, error_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, GetCurrency_1.getCurrencies()];
                    case 1:
                        currenciesData = _a.sent();
                        formattedCurrencies = currenciesData.map(function (currency) { return ({
                            id: currency.id,
                            value: currency.code,
                            label: currency.name
                        }); });
                        setCurrencies(formattedCurrencies);
                        return [3 /*break*/, 3];
                    case 2:
                        error_1 = _a.sent();
                        console.error("Failed to fetch currencies", error_1);
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        }); };
        fetchCurrencies();
    }, []);
    react_1.useEffect(function () {
        if (projectId) {
            setLoading(true);
            GetSingleProject_1.getProjectDetails(projectId)
                .then(function (data) {
                setProject(data);
                // Populate form fields with existing data
                setName(data.name || '');
                setStatus(data.status || '');
                setSelectedCategory(data.categoryName || '');
                setSelectedCategoryId(data.categoryId || null);
                setSelectedDepartment(data.departmentName || '');
                setSelectedDepartmentId(data.departmentId || null);
                setStartDate(data.startDate || '');
                setDueDate(data.dueDate || '');
                setBudget(data.budget || 0);
                setDescription(data.description || '');
                setSelectedCurrencyId(data.currency);
                setSelectedClients(data.clients || []);
                setSelectedMembers(data.members || []);
                setIsPersonal(data.isPersonal);
                setId(projectId);
                setLoading(false);
            })["catch"](function (err) {
                setError(err.message);
                setLoading(false);
            });
        }
    }, [projectId]);
    var handleCurrencyChange = function (event) {
        var selectedValue = event.target.value;
        var selectedCurrency = currencies.find(function (currency) { return currency.value === selectedValue; });
        setSelectedCurrency(selectedValue);
        setSelectedCurrencyId(selectedCurrency ? selectedCurrency.id : null);
    };
    var handleStatusChange = function (event) {
        var selectedStatus = event.target.value;
        setStatus(selectedStatus);
    };
    var handleCategorySelect = function (categoryId, categoryName) {
        setSelectedCategory(categoryName);
        setSelectedCategoryId(categoryId);
        setIsSelectCategoryModalOpen(false);
    };
    var handleCategoryModalToggle = function () {
        setIsSelectCategoryModalOpen(!isSelectCategoryModalOpen);
    };
    var handleDepartmentSelect = function (departmentId, departmentName) {
        setSelectedDepartment(departmentName);
        setSelectedDepartmentId(departmentId);
        setIsSelectDepartmentModalOpen(false);
    };
    var handleDepartmentModalToggle = function () {
        setIsSelectDepartmentModalOpen(!isSelectDepartmentModalOpen);
    };
    var handleClientModalToggle = function () {
        setIsSelectClientModalOpen(!isSelectClientModalOpen);
    };
    var handleClientSelection = function (clients) {
        // Update state with selected clients
        setSelectedClients(clients);
        // Extract only the ids from the selected clients and convert them to numbers
        var clientIds = clients.map(function (client) { return Number(client.id); });
        setClientsIds(clientIds);
    };
    var handleMemberModalToggle = function () {
        setIsSelectMemberModalOpen(!isSelectMemberModalOpen);
    };
    var handleMemberSelection = function (members) {
        setSelectedMembers(members);
        var memberIds = members.map(function (member) { return Number(member.id); });
        setMembersIds(memberIds);
    };
    var handleIsPersonalChange = function (event) {
        setIsPersonal(event.target.checked);
    };
    var handleSave = function () { return __awaiter(void 0, void 0, void 0, function () {
        var payload, error_2;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    if (selectedCategoryId === null) {
                        react_toastify_1.toast.error('Please select a category.');
                        return [2 /*return*/];
                    }
                    if (selectedDepartmentId === null) {
                        react_toastify_1.toast.error('Please select a department.');
                        return [2 /*return*/];
                    }
                    if (selectedCurrencyId === null) {
                        react_toastify_1.toast.error('Please select a currency.');
                        return [2 /*return*/];
                    }
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 3, , 4]);
                    payload = {
                        id: id,
                        name: name,
                        budget: budget,
                        description: description,
                        categoryId: selectedCategoryId,
                        currencyId: selectedCurrencyId,
                        departmentId: selectedDepartmentId,
                        startDate: startDate,
                        dueDate: dueDate,
                        status: status.toLowerCase() || 'not started',
                        clients: JSON.stringify(clientsIds),
                        members: JSON.stringify(membersIds),
                        isPersonal: JSON.stringify(isPersonal)
                    };
                    console.log(payload);
                    // Call your API or service to save the project data
                    return [4 /*yield*/, EditProject_1.editProject(payload)];
                case 2:
                    // Call your API or service to save the project data
                    _a.sent();
                    react_toastify_1.toast.success('Project was edited successfully!');
                    onClose(); // Close the form/modal
                    return [3 /*break*/, 4];
                case 3:
                    error_2 = _a.sent();
                    console.error('Failed to edit project', error_2);
                    react_toastify_1.toast.error('Failed to edit project.');
                    return [3 /*break*/, 4];
                case 4: return [2 /*return*/];
            }
        });
    }); };
    return (react_1["default"].createElement("section", null,
        react_1["default"].createElement("div", { className: "fixed inset-0 flex items-end justify-end" },
            react_1["default"].createElement("div", { className: "w-[750px] h-screen bg-white shadow-md overflow-y-auto relative custom-scrollbar" },
                react_1["default"].createElement("div", { className: "flex justify-between items-center h-[70px] px-2 md:px-[30px]" },
                    react_1["default"].createElement("button", { className: "text-2xl", onClick: onClose },
                        react_1["default"].createElement(fa_1.FaWindowClose, { className: "text-3xl cursor-pointer" })),
                    react_1["default"].createElement("h1", { className: "text-[20px] font-bold" }, "Edit Project"),
                    react_1["default"].createElement("button", { className: "bg-[#FDC90E] px-10 py-2 rounded-md flex justify-center items-center font-semibold text-[15px] h-[35px] hover:bg-black hover:text-[#FDC90E]", onClick: handleSave }, "Save")),
                react_1["default"].createElement("div", { className: "bg-[#F4F4F4] px-2 md:px-[30px] py-[15px] w-full h-full" },
                    react_1["default"].createElement("form", { className: "grid grid-cols-2 gap-4" },
                        react_1["default"].createElement("div", null,
                            react_1["default"].createElement("label", { className: "block text-black font-bold mb-1" }, "Project Name"),
                            react_1["default"].createElement("input", { type: "text", className: "w-full p-2 border rounded-md", placeholder: "Project Name", value: name, onChange: function (e) { return setName(e.target.value); } })),
                        react_1["default"].createElement("div", null,
                            react_1["default"].createElement("label", { className: "block text-black font-bold mb-1" }, "Status"),
                            react_1["default"].createElement("select", { className: "w-full p-2 border rounded-md", value: status, onChange: handleStatusChange },
                                react_1["default"].createElement("option", { value: "", disabled: true }, "Select Status"),
                                react_1["default"].createElement("option", { value: "completed" }, "Completed"),
                                react_1["default"].createElement("option", { value: "in progress" }, "In Progress"),
                                react_1["default"].createElement("option", { value: "not started" }, "Not Started"),
                                react_1["default"].createElement("option", { value: "on hold" }, "On Hold"),
                                react_1["default"].createElement("option", { value: "canceled" }, "Canceled"))),
                        react_1["default"].createElement("div", null,
                            react_1["default"].createElement("label", { className: "block text-black font-bold mb-1" }, "Category"),
                            react_1["default"].createElement("div", { className: "flex" },
                                react_1["default"].createElement("div", { className: "w-full flex flex-row justify-between px-2 bg-white py-2 border rounded-md cursor-pointer", onClick: handleCategoryModalToggle },
                                    selectedCategory || 'Select Category',
                                    react_1["default"].createElement(io_1.IoIosArrowDown, { size: 20, className: "text-black mt-1" })),
                                react_1["default"].createElement("button", { type: "button", className: "flex justify-center items-center ml-2 p-1 mt-2 w-[30px] h-[30px] bg-black rounded-md text-white", onClick: function () { return setShowCategoryForm(true); } },
                                    react_1["default"].createElement(hi_1.HiPlus, { size: 30, className: "font-bold" })))),
                        react_1["default"].createElement("div", null,
                            react_1["default"].createElement("label", { className: "block text-black font-bold mb-1" }, "Clients"),
                            react_1["default"].createElement("div", { className: "flex cursor-pointer" },
                                react_1["default"].createElement("div", { className: "w-full flex flex-row justify-between px-2 bg-white py-2 border rounded-md", onClick: handleClientModalToggle },
                                    selectedClients.length > 0 ? selectedClients.map(function (client) { return client.firstName; }).join(', ') : 'Select Client',
                                    react_1["default"].createElement(io_1.IoIosArrowDown, { size: 20, className: "text-black mt-1" })),
                                react_1["default"].createElement("button", { type: "button", className: "flex justify-center items-center p-1 ml-2 mt-2 w-[30px] h-[30px] bg-black rounded-md text-white", onClick: function () { return setShowAddClientForm(true); } },
                                    react_1["default"].createElement(hi_1.HiPlus, { size: 30, className: "font-bold" })))),
                        react_1["default"].createElement("div", null,
                            react_1["default"].createElement("label", { className: "block text-black font-bold mb-1" }, "Departments"),
                            react_1["default"].createElement("div", { className: "flex cursor-pointer" },
                                react_1["default"].createElement("div", { className: "w-full flex flex-row justify-between px-2 bg-white py-2 border rounded-md", onClick: handleDepartmentModalToggle },
                                    selectedDepartment || 'Select Department',
                                    react_1["default"].createElement(io_1.IoIosArrowDown, { size: 20, className: "text-black mt-1" })),
                                react_1["default"].createElement("button", { type: "button", className: "flex justify-center items-center ml-2 p-1 mt-2 w-[30px] h-[30px] bg-black rounded-md text-white", onClick: function () { return setShowDepartmentForm(true); } },
                                    react_1["default"].createElement(hi_1.HiPlus, { size: 30, className: "font-bold" })))),
                        react_1["default"].createElement("div", null,
                            react_1["default"].createElement("label", { className: "block text-black font-bold mb-1" }, "Members"),
                            react_1["default"].createElement("div", { className: "flex cursor-pointer" },
                                react_1["default"].createElement("div", { className: "w-full flex flex-row justify-between px-2 bg-white py-2 border rounded-md", onClick: handleMemberModalToggle },
                                    selectedMembers.length > 0 ? selectedMembers.map(function (member) { return member.firstName; }).join(', ') : 'Select Members',
                                    react_1["default"].createElement(io_1.IoIosArrowDown, { size: 20, className: "text-black mt-1" })),
                                react_1["default"].createElement("button", { type: "button", className: "flex justify-center items-center p-1 ml-2 mt-2 w-[30px] h-[30px] bg-black rounded-md text-white", onClick: function () { return setShowAddClientForm(true); } },
                                    react_1["default"].createElement(hi_1.HiPlus, { size: 30, className: "font-bold" })))),
                        react_1["default"].createElement("div", { className: "col-span-2 flex my-1" },
                            react_1["default"].createElement("label", { className: "block text-black font-bold" }, "Is Personal?"),
                            react_1["default"].createElement("label", { className: "switch ml-3 cursor-pointer mt-1" },
                                react_1["default"].createElement("input", { type: "checkbox", checked: isPersonal, onChange: handleIsPersonalChange }),
                                react_1["default"].createElement("span", { className: "slider" }))),
                        react_1["default"].createElement("div", null,
                            react_1["default"].createElement("label", { className: "block text-black font-bold mb-1" }, "Start Date"),
                            react_1["default"].createElement("div", { className: "flex items-center" },
                                react_1["default"].createElement("input", { type: "date", className: "w-full px-2 py-2 border rounded-md", value: startDate, onChange: function (e) { return setStartDate(e.target.value); } }))),
                        react_1["default"].createElement("div", null,
                            react_1["default"].createElement("label", { className: "block text-black font-bold mb-1" }, "Due Date"),
                            react_1["default"].createElement("div", { className: "flex items-center" },
                                react_1["default"].createElement("input", { type: "date", className: "w-full px-2 py-2 border rounded-md", value: dueDate, onChange: function (e) { return setDueDate(e.target.value); } }))),
                        react_1["default"].createElement("div", null,
                            react_1["default"].createElement("label", { className: "block text-black font-bold mb-1" }, "Currency"),
                            react_1["default"].createElement("select", { value: selectedCurrency, onChange: handleCurrencyChange, className: "w-full p-2 border rounded-md" },
                                react_1["default"].createElement("option", { value: "", disabled: true }, "Select Currency"),
                                currencies.map(function (currency) { return (react_1["default"].createElement("option", { key: currency.id, value: currency.value }, currency.label)); }))),
                        react_1["default"].createElement("div", null,
                            react_1["default"].createElement("label", { className: "block text-black font-bold mb-1" }, "Project Budget"),
                            react_1["default"].createElement("input", { type: "text", className: "w-full px-2 py-2 border rounded-md bg-white", placeholder: "Project Budget", value: budget, onChange: function (e) { return setBudget(Number(e.target.value)); } })),
                        react_1["default"].createElement("div", { className: "col-span-2" },
                            react_1["default"].createElement("label", { className: "block text-black font-bold mb-1" }, "Project Description"),
                            react_1["default"].createElement("textarea", { placeholder: 'Project Description', className: "w-full px-4 py-2 border rounded-md bg-white", value: description, onChange: function (e) { return setDescription(e.target.value); } })),
                        react_1["default"].createElement("div", null,
                            react_1["default"].createElement("label", { className: "block text-black font-bold mb-1" }, "Project Logo"),
                            react_1["default"].createElement("div", { className: "flex items-center" },
                                react_1["default"].createElement("input", { type: "file", className: "hidden", id: "project-logo-upload" }),
                                react_1["default"].createElement("label", { htmlFor: "project-logo-upload", className: "w-10 h-10 border rounded-full bg-[#19B600] \r\n                  bg-opacity-20 flex justify-center items-center cursor-pointer" },
                                    react_1["default"].createElement(image_1["default"], { src: image_svg_1["default"], alt: "image", width: 20, height: 20 }))))),
                    isSelectCategoryModalOpen && (react_1["default"].createElement("div", { className: "fixed inset-0 flex items-center justify-end bg-black bg-opacity-50 z-50" },
                        react_1["default"].createElement(SelectCategoryForm_1["default"], { toggleModal: function () { return setIsSelectCategoryModalOpen(false); }, onSelect: handleCategorySelect }))),
                    showCategoryForm && (react_1["default"].createElement("div", { className: "fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50" },
                        react_1["default"].createElement("div", { className: "bg-white p-8 rounded-lg shadow-lg relative" },
                            react_1["default"].createElement(CategoryForm_1["default"], { onClose: function () { return setShowCategoryForm(false); }, onCategoryAdded: function () {
                                    handleCategoryModalToggle();
                                } })))),
                    isSelectDepartmentModalOpen && (react_1["default"].createElement("div", { className: "fixed inset-0 flex items-end justify-end bg-black bg-opacity-50 z-40" },
                        react_1["default"].createElement(SelectDepartmentForm_1["default"], { toggleModal: function () { return setIsSelectDepartmentModalOpen(false); }, onSelect: handleDepartmentSelect }))),
                    showDepartmentForm && (react_1["default"].createElement("div", { className: "fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50" },
                        react_1["default"].createElement("div", { className: "bg-white p-8 rounded-lg shadow-lg relative" },
                            react_1["default"].createElement(DepartmentForm_1["default"], { onClose: function () { return setShowDepartmentForm(false); } })))),
                    showAddClientForm && (react_1["default"].createElement("div", { className: "fixed inset-0 flex items-center justify-end bg-black bg-opacity-50 z-80" },
                        react_1["default"].createElement("div", { className: "bg-white shadow-lg relative w-[650px] rounded-lg" },
                            react_1["default"].createElement(CreateUserForm_1["default"], { onClose: function () { return setShowAddClientForm(false); } })))),
                    isSelectClientModalOpen && (react_1["default"].createElement("div", { className: "fixed inset-0 flex items-center justify-end bg-black bg-opacity-50 z-50" },
                        react_1["default"].createElement(SelectClientModal_1["default"], { toggleModal: handleClientModalToggle, onSelectUsers: handleClientSelection, selectedClients: new Set(selectedClients.map(function (client) { return client.id; })) }))),
                    isSelectMemberModalOpen && (react_1["default"].createElement("div", { className: "fixed inset-0 flex items-center justify-end bg-black bg-opacity-50 z-50" },
                        react_1["default"].createElement(SelectMembers_1["default"], { toggleModal: handleMemberModalToggle, onSelectUsers: handleMemberSelection, selectedMembers: new Set(selectedMembers.map(function (member) { return member.id; })) }))))))));
};
exports["default"] = EditProjectForm;
