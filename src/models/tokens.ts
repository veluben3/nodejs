import mongoose, {Schema} from "mongoose";
import {toJSON} from "./plugins/toJsonPlugin";
import {TOKEN_TYPES} from "../constants/token";

const tokenSchema = new Schema({
    user: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'users',
        required: true
    },
    token: {
        type: String,
        required: true,
        index: true
    },
    type: {
        type: String,
        enum: [TOKEN_TYPES.REFRESH, TOKEN_TYPES.VERIFY_EMAIL, TOKEN_TYPES.REFRESH],
        required: true
    },
    blacklisted: {
        type: Boolean,
        default: false
    },
    expiresAt: {
        type: Date,
        required: true,
    }
}, {
    timestamps: true
})

tokenSchema.plugin(toJSON)
const Token = mongoose.model('tokens', tokenSchema)
export default Token