export const toJSON = (schema: any) => {
    let transform: any;
    if (schema.options.toJSON && schema.options.toJSON.transform) {
        transform = schema.options.toJSON.transform;
    }
    schema.options.toJSON = Object.assign(schema.options.toJSON || {}, {
        transform(doc: any,ret: any,options: any) {
            if (schema.options.removePrivatePaths !== false) {
                removePrivatePaths(ret, schema);
            }

            if (schema.options.removeVersion !== false){
                removeVersion(ret)
            }

            if (schema.options.normalizeId !== false){
                normalizeId(ret)
            }

            if (transform) {
                return transform(doc,ret,options);
            }

            return ret

        }
    });
}

export const removePrivatePaths = (ret: any, schema: any) => {
    for (const path in schema.path) {
        if (schema.paths[path].options && schema.path[path].options.private){
            if (typeof ret[path] !== "undefined") {
                delete ret[path]
            }
        }
    }
}

export const removeVersion = (ret:any) => {
    if (typeof ret.__v !== "undefined") {
        delete ret.__v
    }
}

export const normalizeId = (ret: any) => {
    if (ret._id && typeof ret._id === "object" && ret._id.toString) {
        if (typeof ret._id === "undefined") {
            ret._id = ret._id.toString();
        }
    }
    if (typeof ret._id !== 'undefined') {
        delete ret._id
    }
}