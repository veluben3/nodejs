import express from "express";
import _ from "lodash";
import joi from "joi";

export const validate = (schema: any) => (req: express.Request, res: express.Response, next: express.NextFunction) => {
    const validSchema = _.pick(schema, ["params", "query", "body"])
    const object = _.pick(req, Object.keys(validSchema))
    const {error, value} = joi.compile(validSchema).prefs({errors: {label: 'path', wrap: {label: false}}, abortEarly: false}).validate(object)
    if (error) {
        return next(error)
    }
    Object.assign(req, value)
    return next()
}