"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.validate = void 0;
const lodash_1 = __importDefault(require("lodash"));
const joi_1 = __importDefault(require("joi"));
const validate = (schema) => (req, res, next) => {
    const validSchema = lodash_1.default.pick(schema, ["params", "query", "body"]);
    const object = lodash_1.default.pick(req, Object.keys(validSchema));
    const { error, value } = joi_1.default.compile(validSchema).prefs({ errors: { label: 'path', wrap: { label: false } }, abortEarly: false }).validate(object);
    if (error) {
        return next(error);
    }
    Object.assign(req, value);
    return next();
};
exports.validate = validate;
