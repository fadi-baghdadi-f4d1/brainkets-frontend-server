"use strict";
exports.__esModule = true;
var react_1 = require("react");
var image_1 = require("next/image");
var user1_png_1 = require("../../../public/user1.png");
var FinanceDropdown_1 = require("./dropdown/FinanceDropdown");
var transactions = [
    {
        amount: "1,000$",
        description: "Lorem ipsum dolor sit amet consectetur. Senectus cum nulla est sit nibh et lacus. Maecenas a fringilla egestas quis blandit.",
        date: "Mar 25, 2024",
        time: "04:00PM",
        user: "M.Zayat",
        type: "Income",
        status: "Received"
    },
    {
        amount: "500$",
        description: "Lorem ipsum dolor sit amet consectetur. Senectus cum nulla est sit nibh et lacus. Maecenas a fringilla egestas quis blandit.",
        date: "Mar 25, 2024",
        time: "12:10PM",
        user: "M.Zayat",
        type: "Expenses",
        status: "Paid"
    },
    {
        amount: "1,000$",
        description: "Lorem ipsum dolor sit amet consectetur. Senectus cum nulla est sit nibh et lacus. Maecenas a fringilla egestas quis blandit.",
        date: "Mar 20, 2024",
        time: "04:30PM",
        user: "M.Zayat",
        type: "Income",
        status: "Received"
    },
    {
        amount: "1,000$",
        description: "Lorem ipsum dolor sit amet consectetur. Senectus cum nulla est sit nibh et lacus. Maecenas a fringilla egestas quis blandit.",
        date: "Mar 18, 2024",
        time: "03:00PM",
        user: "M.Zayat",
        type: "Income",
        status: "Received"
    },
    {
        amount: "2,500$",
        description: "Lorem ipsum dolor sit amet consectetur. Senectus cum nulla est sit nibh et lacus. Maecenas a fringilla egestas quis blandit.",
        date: "Mar 15, 2024",
        time: "12:10PM",
        user: "M.Zayat",
        type: "Expenses",
        status: "Paid"
    },
    {
        amount: "500$",
        description: "Lorem ipsum dolor sit amet consectetur. Senectus cum nulla est sit nibh et lacus. Maecenas a fringilla egestas quis blandit.",
        date: "Mar 15, 2024",
        time: "04:30PM",
        user: "M.Zayat",
        type: "Income",
        status: "Received"
    },
    {
        amount: "1,000$",
        description: "Lorem ipsum dolor sit amet consectetur. Senectus cum nulla est sit nibh et lacus. Maecenas a fringilla egestas quis blandit.",
        date: "Mar 22, 2024",
        time: "09:00AM",
        user: "M.Zayat",
        type: "Income",
        status: "Received"
    },
    {
        amount: "1,000$",
        description: "Lorem ipsum dolor sit amet consectetur. Senectus cum nulla est sit nibh et lacus. Maecenas a fringilla egestas quis blandit.",
        date: "Mar 18, 2024",
        time: "10:00AM",
        user: "M.Zayat",
        type: "Income",
        status: "Received"
    },
    {
        amount: "500$",
        description: "Lorem ipsum dolor sit amet consectetur. Senectus cum nulla est sit nibh et lacus. Maecenas a fringilla egestas quis blandit.",
        date: "Mar 10, 2024",
        time: "02:00PM",
        user: "M.Zayat",
        type: "Income",
        status: "Received"
    },
];
var ListFinance = function () {
    // Function to get the first 5 words of the description
    var getShortDescription = function (description) {
        var words = description.split(" ").slice(0, 5).join(" ");
        return "" + words + (words.length < description.length ? "..." : "");
    };
    return (react_1["default"].createElement("section", { className: "pb-10 lg:mx-10 my-5" },
        react_1["default"].createElement("div", { className: "border rounded-md border-[#E4E4E4] overflow-x-auto" },
            react_1["default"].createElement("table", { className: "min-w-full divide-y divide-gray-200 border rounded-md border-[#E4E4E4]" },
                react_1["default"].createElement("thead", null,
                    react_1["default"].createElement("tr", null,
                        react_1["default"].createElement("th", { className: "py-2 px-4 border-b text-left" }, "Amount"),
                        react_1["default"].createElement("th", { className: "py-2 px-4 border-b text-left" }, "Description"),
                        react_1["default"].createElement("th", { className: "py-2 px-4 border-b text-left" }, "User"),
                        react_1["default"].createElement("th", { className: "py-2 px-4 border-b text-left" }, "Type"),
                        react_1["default"].createElement("th", { className: "py-2 px-4 border-b text-left" }, "Status"),
                        react_1["default"].createElement("th", { className: "py-2 px-4 border-b text-left" }, "Date"))),
                react_1["default"].createElement("tbody", { className: "bg-white" }, transactions.map(function (transaction, index) { return (react_1["default"].createElement("tr", { key: index },
                    react_1["default"].createElement("td", { className: "py-2 px-4 border-b font-bold text-[15px]" }, transaction.amount),
                    react_1["default"].createElement("td", { className: "py-2 px-4 border-b font-medium text-[15px]" }, getShortDescription(transaction.description)),
                    react_1["default"].createElement("td", { className: "py-2 px-4 border-b" },
                        react_1["default"].createElement(image_1["default"], { src: user1_png_1["default"], width: 25, height: 20, alt: "user", className: "rounded-full" })),
                    react_1["default"].createElement("td", { className: "py-2 px-2 border-b" },
                        react_1["default"].createElement("span", { className: "inline-block w-24 px-1 py-1 rounded text-xs font-medium text-center " + (transaction.type === "Income"
                                ? "bg-[#19B600] bg-opacity-15 text-[#19B600]"
                                : "bg-[#CC0000] bg-opacity-15 text-[#CC0000]") }, transaction.type)),
                    react_1["default"].createElement("td", { className: "py-2 px-4 border-b" },
                        react_1["default"].createElement("span", { className: "inline-block w-24 px-2 py-1 rounded text-xs font-medium text-center " + (transaction.status === "Received"
                                ? "bg-[#FDC90E] text-black"
                                : "bg-[#FDC90E] text-black") }, transaction.status)),
                    react_1["default"].createElement("td", { className: "py-2 px-4 border-b text-[#404040] text-[12px]" },
                        transaction.date,
                        " ",
                        transaction.time),
                    react_1["default"].createElement("td", null,
                        react_1["default"].createElement(FinanceDropdown_1["default"], { entityType: "finance", entityId: "123" })))); }))))));
};
exports["default"] = ListFinance;
