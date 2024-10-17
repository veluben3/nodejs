import tasks from '../models/tasks';
import project from '../models/project';
import mongoose from 'mongoose';

export abstract class TaskService {
	static async createTask(taskDetails: any) {
		try {
			return await tasks.create(taskDetails);
		} catch (e) {
			return e;
		}
	}

	static async updateTask(project_id: string, taskDetails: any): Promise<boolean> {
		const update = await project.updateOne({ _id: new mongoose.Types.ObjectId(project_id) }, { $set: taskDetails });
		return !!update;
	}
}
