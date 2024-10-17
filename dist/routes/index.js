"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const profile_1 = __importDefault(require("./profile"));
const users_1 = __importDefault(require("./users"));
const projects_1 = __importDefault(require("./projects"));
const routes = (0, express_1.Router)();
routes.use('/profiles', profile_1.default);
routes.use('/users', users_1.default);
routes.use('/projects', projects_1.default);
exports.default = routes;
