import joi from 'joi';
import mongoose from 'mongoose';

export const userRegistration = {
	body: joi.object().keys({
		email: joi.string().email().required(),
		password: joi.string().min(6).required(),
		first_name: joi.string().required(),
		last_name: joi.string()
	})
};

export const loginUser = {
	body: joi.object().keys({
		email: joi.string().email().required(),
		password: joi.string().min(6).required()
	})
};

export const projectRegister = {
	body: joi.object().keys({
		project_name: joi.string().required(),
		project_description: joi.string().required()
	})
};

export const taskCreate = {
	body: joi.object().keys({
		task_name: joi.string().required(),
		task_description: joi.string().required(),
		assigned_to: joi.string().required(),
		project_id: joi.string().required(),
		status: joi.string().required()
	})
};
