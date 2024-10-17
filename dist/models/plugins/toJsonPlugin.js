"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.normalizeId = exports.removeVersion = exports.removePrivatePaths = exports.toJSON = void 0;
const toJSON = (schema) => {
    let transform;
    if (schema.options.toJSON && schema.options.toJSON.transform) {
        transform = schema.options.toJSON.transform;
    }
    schema.options.toJSON = Object.assign(schema.options.toJSON || {}, {
        transform(doc, ret, options) {
            if (schema.options.removePrivatePaths !== false) {
                (0, exports.removePrivatePaths)(ret, schema);
            }
            if (schema.options.removeVersion !== false) {
                (0, exports.removeVersion)(ret);
            }
            if (schema.options.normalizeId !== false) {
                (0, exports.normalizeId)(ret);
            }
            if (transform) {
                return transform(doc, ret, options);
            }
            return ret;
        }
    });
};
exports.toJSON = toJSON;
const removePrivatePaths = (ret, schema) => {
    for (const path in schema.path) {
        if (schema.paths[path].options && schema.path[path].options.private) {
            if (typeof ret[path] !== "undefined") {
                delete ret[path];
            }
        }
    }
};
exports.removePrivatePaths = removePrivatePaths;
const removeVersion = (ret) => {
    if (typeof ret.__v !== "undefined") {
        delete ret.__v;
    }
};
exports.removeVersion = removeVersion;
const normalizeId = (ret) => {
    if (ret._id && typeof ret._id === "object" && ret._id.toString) {
        if (typeof ret._id === "undefined") {
            ret._id = ret._id.toString();
        }
    }
    if (typeof ret._id !== 'undefined') {
        delete ret._id;
    }
};
exports.normalizeId = normalizeId;
