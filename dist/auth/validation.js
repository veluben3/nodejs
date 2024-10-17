"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.projectRegister = exports.loginUser = exports.userRegistration = void 0;
const joi_1 = __importDefault(require("joi"));
exports.userRegistration = {
    body: joi_1.default.object().keys({
        email: joi_1.default.string().email().required(),
        password: joi_1.default.string().min(6).required(),
        first_name: joi_1.default.string().required(),
        last_name: joi_1.default.string()
    })
};
exports.loginUser = {
    body: joi_1.default.object().keys({
        email: joi_1.default.string().email().required(),
        password: joi_1.default.string().min(6).required(),
    })
};
exports.projectRegister = {
    body: joi_1.default.object().keys({
        project_name: joi_1.default.string().required(),
        project_description: joi_1.default.string().required(),
    })
};
