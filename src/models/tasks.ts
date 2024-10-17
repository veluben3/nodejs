import mongoose, { Schema } from 'mongoose';
import { toJSON } from './plugins/toJsonPlugin';
import mongoosePaginate from 'mongoose-paginate-v2';

const tasksSchema = new Schema(
	{
		task_name: {
			type: String,
			required: true
		},
		task_description: {
			type: String,
			required: true
		},
		project_id: {
			type: mongoose.Types.ObjectId,
			ref: 'Projects'
		},
		assigned_to: {
			type: mongoose.Types.ObjectId,
			ref: 'users'
		},
		status: {
			type: String,
			required: true,
			enum: ['open', 'closed']
		}
	},
	{
		timestamps: true
	}
);

tasksSchema.plugin(toJSON);
tasksSchema.plugin(mongoosePaginate);

interface tasksInterface extends mongoose.Document {}

const tasks = mongoose.model<tasksInterface, mongoose.PaginateModel<tasksInterface>>('tasks', tasksSchema);
export default tasks;
