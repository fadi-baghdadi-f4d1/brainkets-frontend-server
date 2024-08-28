"use strict";
exports.__esModule = true;
exports.store = void 0;
// src/redux/store.ts
var toolkit_1 = require("@reduxjs/toolkit");
var userSlice_1 = require("./slices/userSlice");
var projectsSlice_1 = require("./slices/projectsSlice");
exports.store = toolkit_1.configureStore({
    reducer: {
        user: userSlice_1["default"],
        projects: projectsSlice_1["default"]
    },
    devTools: process.env.NODE_ENV !== 'production'
});
