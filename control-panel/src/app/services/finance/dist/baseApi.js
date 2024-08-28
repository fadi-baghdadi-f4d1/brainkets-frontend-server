"use strict";
exports.__esModule = true;
var axios_1 = require("axios");
var API_BASE_URL = 'https://erp.smcare.net/v0_0_3-finance';
var baseApi = axios_1["default"].create({
    baseURL: API_BASE_URL,
    headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'X-Client-Type': 'web'
    }
});
exports["default"] = baseApi;
