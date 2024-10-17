import express from 'express';
import Role from '../models/Role';
import jwt from 'jsonwebtoken';
import users from '../models/Users';
import mongoose from 'mongoose';
import Permissions from '../models/permissions';
import _ from 'lodash';
import project from '../models/project';
import user from '../models/Users';

export const authenticate =
	(...requiredRights: any) =>
	async (req: express.Request, res: express.Response, next: express.NextFunction) => {
		try {
			if (req.headers.authorization) {
				const token = req.headers.authorization.split(' ')[1];
				jwt.verify(token, 'stringusage', async (err: any, data: any) => {
					if (_.get(data, 'user_id')) {
						const user = await users.findOne({ _id: new mongoose.Types.ObjectId(data.user_id) });
						await verifyCallBack(req, res, next, requiredRights)(null, user, null);
					} else {
						res.status(400).send('Invalid Authentication');
					}
				});
			}
		} catch (e) {
			next(e);
		}
	};

export const verifyCallBack =
	(req: express.Request, res: express.Response, next: any, requiredRights: any) => async (err: any, user: any, info: any) => {
		if (err || info || !user) {
			res.status(400).send('Invalid Authentication');
		} else {
			req.user = user;
			if (requiredRights.length) {
				const userRights: any[] = [];
				const roles = (await Role.find({ _id: { $in: user.roles } }).populate({
					path: 'permissions',
					model: Permissions
				})) as any;
				if (roles.length) {
					for (let role of roles) {
						for (let perm of role.permissions) {
							userRights.push(`${perm.controller}:${perm.action}`);
						}
					}
					const hasRequiredRights = requiredRights.every((data: any) => userRights.includes(data));
					if (!hasRequiredRights) {
						return res.status(403).send({
							error: true,
							message: 'Invalid Access'
						});
					}
				} else {
					return res.status(403).send({
						error: true,
						message: 'Invalid Access'
					});
				}
			}
		}
		next();
	};

export const validateProject = async (req: express.Request, res: express.Response, next: express.NextFunction) => {
	if (_.get(req.body, 'project_id') && mongoose.isObjectIdOrHexString(req.body.project_id)) {
		const project_id = _.get(req.body, 'project_id');
		const projectData = await project.findOne({ _id: new mongoose.Types.ObjectId(project_id) });
		if (projectData) {
			next();
		} else {
			res.status(400).send({
				error: true,
				message: 'Invalid Project ID'
			});
		}
	} else {
		res.status(400).send({
			error: true,
			message: 'Invalid Project ID'
		});
	}
};

export const validateAssignedUser = async (req: express.Request, res: express.Response, next: express.NextFunction) => {
	if (_.get(req.body, 'assigned_to') && mongoose.isObjectIdOrHexString(req.body.assigned_to)) {
		const assigned_to = _.get(req.body, 'assigned_to');
		const userData = await user.findOne({ _id: assigned_to });
		if (userData) {
			next();
		} else {
			res.status(400).send({
				error: true,
				message: 'Invalid Assigned User ID'
			});
		}
	} else {
		res.status(400).send({
			error: true,
			message: 'Invalid Assigned User ID'
		});
	}
};
