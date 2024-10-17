import mongoose, { Schema } from 'mongoose';
import { uniq } from 'lodash';

const permissionsSchema = new Schema({
	controller: {
		type: String,
		required: true,
	},
	action: {
		type: String,
		required: true,
	},
	enabled: {
		type: Boolean,
		default: true
	}
}, {
	timestamps: true
})

permissionsSchema.index({controller: 1, action: 1}, {unique: true})
const permission = mongoose.model('permission', permissionsSchema)
export default permission