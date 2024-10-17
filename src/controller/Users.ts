import express from 'express';
import { UserService } from '../services';
import { UserLogin, UserRegistration } from '../@types/UserInterface';

export abstract class Users {
	static async register(req: express.Request, res: express.Response) {
		const body = req.body as UserRegistration;
		const validateUserExists = await UserService.checkUserExists(body?.email);
		if (!validateUserExists) {
			res.status(400).send({
				error: 'User already exists'
			});
		} else {
			await UserService.createUser(req.body);
			res.status(200).send({
				status: 'Success',
				message: 'User Created Successfully'
			});
		}
	}

	static async login(req: express.Request, res: express.Response) {
		const body = req.body as UserLogin;
		const email = body.email;
		const password = body.password;
		const userExists = await UserService.getUsersByEmail(email);
		if (!userExists || !(await UserService.isPasswordMatch(password, userExists.password))) {
			res.status(400).send({
				error: 'User Not Exists'
			});
		} else {
			const tokens = await UserService.generateAuthTokens(userExists);
			res.status(200).send({
				user: userExists,
				tokens: tokens
			});
		}
	}
}
