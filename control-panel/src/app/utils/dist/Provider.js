"use client";
"use strict";
exports.__esModule = true;
var react_query_1 = require("@tanstack/react-query");
var react_query_devtools_1 = require("@tanstack/react-query-devtools");
var react_1 = require("react");
function Provider(_a) {
    var children = _a.children;
    var queryClient = react_1.useState(function () { return new react_query_1.QueryClient(); })[0];
    return (React.createElement(react_query_1.QueryClientProvider, { client: queryClient },
        React.createElement(react_query_devtools_1.ReactQueryDevtools, { initialIsOpen: false }),
        children));
}
exports["default"] = Provider;
