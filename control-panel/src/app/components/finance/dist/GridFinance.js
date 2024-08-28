"use strict";
exports.__esModule = true;
var react_1 = require("react");
var image_1 = require("next/image");
var user1_png_1 = require("../../../public/user1.png");
var FinanceDropdown_1 = require("./dropdown/FinanceDropdown");
var transactions = [
    { amount: '1,000$', description: 'Lorem ipsum dolor sit amet consectetur. Senectus cum nulla est sit nibh et lacus. Maecenas a fringilla egestas quis blandit.', date: 'Mar 25, 2024', time: '04:00PM', user: 'M.Zayat', type: 'Income', status: 'Received' },
    { amount: '500$', description: 'Lorem ipsum dolor sit amet consectetur. Senectus cum nulla est sit nibh et lacus. Maecenas a fringilla egestas quis blandit.', date: 'Mar 25, 2024', time: '12:10PM', user: 'M.Zayat', type: 'Expenses', status: 'Paid' },
    { amount: '1,000$', description: 'Lorem ipsum dolor sit amet consectetur. Senectus cum nulla est sit nibh et lacus. Maecenas a fringilla egestas quis blandit.', date: 'Mar 20, 2024', time: '04:30PM', user: 'M.Zayat', type: 'Income', status: 'Received' },
    { amount: '1,000$', description: 'Lorem ipsum dolor sit amet consectetur. Senectus cum nulla est sit nibh et lacus. Maecenas a fringilla egestas quis blandit.', date: 'Mar 18, 2024', time: '03:00PM', user: 'M.Zayat', type: 'Income', status: 'Received' },
    { amount: '2,500$', description: 'Lorem ipsum dolor sit amet consectetur. Senectus cum nulla est sit nibh et lacus. Maecenas a fringilla egestas quis blandit.', date: 'Mar 15, 2024', time: '12:10PM', user: 'M.Zayat', type: 'Expenses', status: 'Paid' },
    { amount: '500$', description: 'Lorem ipsum dolor sit amet consectetur. Senectus cum nulla est sit nibh et lacus. Maecenas a fringilla egestas quis blandit.', date: 'Mar 15, 2024', time: '04:30PM', user: 'M.Zayat', type: 'Income', status: 'Received' },
    { amount: '1,000$', description: 'Lorem ipsum dolor sit amet consectetur. Senectus cum nulla est sit nibh et lacus. Maecenas a fringilla egestas quis blandit.', date: 'Mar 22, 2024', time: '09:00AM', user: 'M.Zayat', type: 'Income', status: 'Received' },
    { amount: '1,000$', description: 'Lorem ipsum dolor sit amet consectetur. Senectus cum nulla est sit nibh et lacus. Maecenas a fringilla egestas quis blandit.', date: 'Mar 18, 2024', time: '10:00AM', user: 'M.Zayat', type: 'Income', status: 'Received' },
    { amount: '500$', description: 'Lorem ipsum dolor sit amet consectetur. Senectus cum nulla est sit nibh et lacus. Maecenas a fringilla egestas quis blandit.', date: 'Mar 10, 2024', time: '02:00PM', user: 'M.Zayat', type: 'Income', status: 'Received' },
];
var GridFinance = function () {
    return (react_1["default"].createElement("section", { className: 'mx-4 md:mx-10 my-5 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4' }, transactions.map(function (transaction, index) { return (react_1["default"].createElement("div", { key: index, className: "border bg-white h-auto rounded-lg p-4 shadow-md relative" },
        react_1["default"].createElement("div", { className: "flex justify-between" },
            react_1["default"].createElement("div", null,
                "Amount : ",
                react_1["default"].createElement("span", { className: 'font-bold' }, transaction.amount)),
            react_1["default"].createElement("div", { className: 'flex space-x-2' },
                react_1["default"].createElement(image_1["default"], { src: user1_png_1["default"], width: 30, height: 20, alt: 'user', className: 'rounded-full' }),
                react_1["default"].createElement("span", { className: "font-medium" }, transaction.user)),
            react_1["default"].createElement("div", null,
                react_1["default"].createElement(FinanceDropdown_1["default"], { entityId: "123", entityType: "finance" }))),
        react_1["default"].createElement("p", { className: "mt-2 text-sm" },
            "Description :",
            react_1["default"].createElement("span", { className: 'font-medium ml-1' }, transaction.description)),
        react_1["default"].createElement("div", { className: "flex justify-between mt-4" },
            react_1["default"].createElement("div", { className: 'flex space-x-2' },
                react_1["default"].createElement("span", { className: "flex justify-center items-center px-2 rounded font-medium text-[12px] " + (transaction.type === 'Income' ? 'bg-[#19B600] bg-opacity-15 text-[#19B600]' :
                        'bg-[#CC0000] bg-opacity-15 text-[#CC0000]') }, transaction.type),
                react_1["default"].createElement("span", { className: "flex justify-center items-center px-2 rounded font-medium text-[12px] " + (transaction.status === 'Received' ? 'bg-yellow-500' : 'bg-yellow-500') }, transaction.status)),
            react_1["default"].createElement("div", { className: 'text-[#404040] text-sm' },
                transaction.date,
                " ",
                transaction.time)))); })));
};
exports["default"] = GridFinance;
