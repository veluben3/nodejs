import mongoose, { mongo, Schema } from 'mongoose';
import { toJSON } from './plugins/toJsonPlugin';
import mongoosePaginate from "mongoose-paginate-v2"

const projectSchema = new Schema({
	user_id: {
		type: mongoose.Schema.ObjectId,
		ref: 'User',
		required: true
	},
	project_name: {
		type: String,
		required: true,
	},
	project_description: {
		type: String,
		required: true,
	},
	assigned: {
		type: mongoose.Schema.ObjectId,
		ref: 'User',
	},
	status: {
		type: String,
		enum: ['active', 'inactive'],
		default: 'active'
	}
}, {
	timestamps: true,
})
projectSchema.plugin(toJSON)
projectSchema.plugin(mongoosePaginate)

interface projectInterface extends mongoose.Document {}

const project = mongoose.model<projectInterface, mongoose.PaginateModel<projectInterface>>('project', projectSchema)
export default project