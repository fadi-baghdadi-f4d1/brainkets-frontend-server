// "use client";
// "use strict";
// var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
//     function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
//     return new (P || (P = Promise))(function (resolve, reject) {
//         function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
//         function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
//         function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
//         step((generator = generator.apply(thisArg, _arguments || [])).next());
//     });
// };
// var __generator = (this && this.__generator) || function (thisArg, body) {
//     var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
//     return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
//     function verb(n) { return function (v) { return step([n, v]); }; }
//     function step(op) {
//         if (f) throw new TypeError("Generator is already executing.");
//         while (_) try {
//             if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
//             if (y = 0, t) op = [op[0] & 2, t.value];
//             switch (op[0]) {
//                 case 0: case 1: t = op; break;
//                 case 4: _.label++; return { value: op[1], done: false };
//                 case 5: _.label++; y = op[1]; op = [0]; continue;
//                 case 7: op = _.ops.pop(); _.trys.pop(); continue;
//                 default:
//                     if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
//                     if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
//                     if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
//                     if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
//                     if (t[2]) _.ops.pop();
//                     _.trys.pop(); continue;
//             }
//             op = body.call(thisArg, _);
//         } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
//         if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
//     }
// };
// var __spreadArrays = (this && this.__spreadArrays) || function () {
//     for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
//     for (var r = Array(s), k = 0, i = 0; i < il; i++)
//         for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
//             r[k] = a[j];
//     return r;
// };
// exports.__esModule = true;
// var react_1 = require("react");
// var image_1 = require("next/image");
// var fa_1 = require("react-icons/fa");
// var io5_1 = require("react-icons/io5");
// var GetAllClients_1 = require("../../services/projects/GetAllClients");
// // var defaultprof_png_1 = require("../../../../../public/Frame 8520.png");
// var react_loading_skeleton_1 = require("react-loading-skeleton");
// require("react-loading-skeleton/dist/skeleton.css");
// var SelectUserModal = function (_a) {
//     var toggleModal = _a.toggleModal;
//     var _b = react_1.useState([]), clients = _b[0], setClients = _b[1];
//     var _c = react_1.useState(true), loading = _c[0], setLoading = _c[1];
//     var _d = react_1.useState(1), page = _d[0], setPage = _d[1];
//     var _e = react_1.useState(true), hasMore = _e[0], setHasMore = _e[1];
//     var _f = react_1.useState(''), searchTerm = _f[0], setSearchTerm = _f[1];
//     var searchInputRef = react_1.useRef(null);
//     var loaderRef = react_1.useRef(null);
//     react_1.useEffect(function () {
//         var fetchClients = function () { return __awaiter(void 0, void 0, void 0, function () {
//             var newClients_1, error_1;
//             return __generator(this, function (_a) {
//                 switch (_a.label) {
//                     case 0:
//                         _a.trys.push([0, 2, 3, 4]);
//                         setLoading(true);
//                         return [4 /*yield*/, GetAllClients_1.getClients(page, searchTerm)];
//                     case 1:
//                         newClients_1 = _a.sent();
//                         setClients(function (prevClients) { return page === 1 ? newClients_1 : __spreadArrays(prevClients, newClients_1); });
//                         setHasMore(newClients_1.length > 0); // Adjust based on your API's response
//                         return [3 /*break*/, 4];
//                     case 2:
//                         error_1 = _a.sent();
//                         console.error('Failed to fetch clients:', error_1);
//                         return [3 /*break*/, 4];
//                     case 3:
//                         setLoading(false);
//                         return [7 /*endfinally*/];
//                     case 4: return [2 /*return*/];
//                 }
//             });
//         }); };
//         fetchClients();
//     }, [page, searchTerm]);
//     react_1.useEffect(function () {
//         setPage(1);
//         setClients([]);
//     }, [searchTerm]);
//     react_1.useEffect(function () {
//         var observer = new IntersectionObserver(function (entries) {
//             if (entries[0].isIntersecting && hasMore && !loading) {
//                 setPage(function (prevPage) { return prevPage + 1; });
//             }
//         }, { threshold: 0.1 });
//         if (loaderRef.current) {
//             observer.observe(loaderRef.current);
//         }
//         return function () {
//             if (loaderRef.current) {
//                 observer.unobserve(loaderRef.current);
//             }
//         };
//     }, [loading, hasMore]);
//     var handleSearchChange = function (event) {
//         setSearchTerm(event.target.value);
//     };
//     return (react_1["default"].createElement("div", { className: "bg-[#F4F4F4] z-80 h-screen shadow-lg w-[400px] flex flex-col" },
//         react_1["default"].createElement("div", { className: 'bg-white px-6 flex items-center h-16 p-2 w-full' },
//             react_1["default"].createElement(fa_1.FaWindowClose, { className: "text-3xl cursor-pointer", onClick: toggleModal }),
//             react_1["default"].createElement("h2", { className: "flex-grow text-center text-xl font-bold" }, "Select User")),
//         react_1["default"].createElement("div", { className: "relative m-5 mb-4" },
//             react_1["default"].createElement(io5_1.IoSearchOutline, { className: "text-3xl text-[#606060] absolute left-3 top-3 w-5 h-5" }),
//             react_1["default"].createElement("input", { type: "text", placeholder: "Start typing to search", ref: searchInputRef, value: searchTerm, onChange: handleSearchChange, className: "w-full text-[#606060] border border-[#C4C4C4] rounded-lg p-2 pl-10" })),
//         react_1["default"].createElement("div", { className: "flex-grow mx-4 overflow-y-auto custom-scrollbar" }, loading && clients.length === 0 ? (Array.from({ length: 10 }).map(function (_, index) { return (react_1["default"].createElement("div", { key: index, className: "mb-2" },
//             react_1["default"].createElement(react_loading_skeleton_1["default"], { height: 30 }))); })) : (react_1["default"].createElement(react_1["default"].Fragment, null,
//             clients.length === 0 ? (react_1["default"].createElement("p", null, "No clients available")) : (clients.map(function (client) { return (react_1["default"].createElement("div", { key: client.id, className: "flex items-center justify-between mb-2 px-2" },
//                 react_1["default"].createElement("div", { className: "flex items-center w-full py-2" },
//                     react_1["default"].createElement(image_1["default"], { src: client.image || defaultprof_png_1["default"], alt: client.userName, width: 40, height: 40, className: "rounded-full mr-2 w-[40px] h-[40px]" }),
//                     react_1["default"].createElement("span", { className: 'font-medium' },
//                         client.firstName,
//                         " ",
//                         client.lastName)),
//                 react_1["default"].createElement("input", { type: "checkbox", className: "w-5 h-5 cursor-pointer" }))); })),
//             react_1["default"].createElement("div", { ref: loaderRef, className: "flex justify-center items-center h-12" }, loading && hasMore && (react_1["default"].createElement("div", { className: "animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-gray-900" }))))))));
// };
// exports["default"] = SelectUserModal;
