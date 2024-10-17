import express from 'express';
import { ProjectService } from '../services/projectService';
import { User } from '../@types/UserInterface';
import project from '../models/project';
import _ from 'lodash';
import mongoose from 'mongoose';

export abstract class Projects {
	static async create(req: express.Request, res: express.Response) {
		const body = req.body;
		const user = req.user as User;
		const createStatus = await ProjectService.createProject(body, user);
		if (createStatus) {
			res.status(200).json({
				status: 'success',
				message: 'Project created successfully'
			});
		} else {
			res.status(200).json({});
		}
	}

	static async list(req: express.Request, res: express.Response) {
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
			if (_.get(params, 'project_id')) {
				filter['project_id'] = _.get(params, 'project_id');
			}
			if (_.get(params, 'assigned_to')) {
				filter['assigned_to'] = _.get(params, 'assigned_to');
			}
			const projectList = await project.paginate(filter, paginateOptions);
			res.status(200).send(projectList);
		} catch (e) {
			res.status(400).send({ error: e });
		}
	}

	static async get(req: express.Request, res: express.Response) {
		try {
			const params = req.params;
			if (params.id) {
				const projectData = await project.findOne({ _id: new mongoose.Types.ObjectId(params.id) });
				if (projectData) {
					res.status(200).json({ error: false, data: projectData });
				} else {
					res.status(404).send({
						status: 'error',
						error: true,
						message: 'Project not found'
					});
				}
			} else {
				res.status(404).send({
					status: 'error',
					error: true,
					message: 'Project not found'
				});
			}
		} catch (e) {
			res.status(400).send({ error: true, message: 'Unable to fetch the details' });
		}
	}
}
