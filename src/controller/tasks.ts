import express from 'express';
import { TaskService } from '../services/taskService';
import _ from 'lodash';
import project from '../models/project';
import tasks from '../models/tasks';

export abstract class Task {
	static async createTask(req: express.Request, res: express.Response) {
		const body = req.body;
		const createTask = (await TaskService.createTask(body)) as any;
		if (createTask) {
			res.status(200).send({
				error: false,
				message: 'Task has been created',
				task_id: createTask._id
			});
		} else {
			res.status(400).send({
				error: true,
				message: 'Unable to create task'
			});
		}
	}

	static async getTasks(req: express.Request, res: express.Response) {
		try {
			const params = req.query;
			const paginateOptions = {
				page: Number(params.page),
				limit: Number(params.limit),
				collation: {
					locale: 'en'
				}
			};
			const filter = {} as any;
			if (_.get(params, 'status')) {
				filter['status'] = _.get(params, 'status');
			}
			const taskList = await tasks.paginate(filter, paginateOptions);
			res.status(200).send(taskList);
		} catch (e) {
			res.status(400).send({ error: e });
		}
	}

	static async updateTask(req: express.Request, res: express.Response) {
		try {
			const params = req.query;
			const project_id = _.get(params, ['project_id'], '') as string;
			const body = req.body;
			if (project_id) {
				const updateTaskDetails = await TaskService.updateTask(project_id, body);
				if (updateTaskDetails) {
					res.status(200).send({});
				} else {
					res.status(500).send({
						error: true,
						message: 'Unable to update the tasks'
					});
				}
			}
		} catch (e) {
			res.status(400).send({ error: e });
		}
	}
}
