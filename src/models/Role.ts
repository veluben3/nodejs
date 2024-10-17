import mongoose, { mongo, Schema } from 'mongoose';
import { toJSON } from './plugins/toJsonPlugin';

const roleSchema = new Schema({
	name : {
		type: String,
		required: true,
		unique: true
	},
	description: {
		type: String,
		default: ''
	},
	permissions: [{
		type: mongoose.SchemaTypes.ObjectId,
		ref: "permission"
	}]
}, {
	timestamps: true,
})

roleSchema.plugin(toJSON)

const role = mongoose.model('role', roleSchema)

export default role