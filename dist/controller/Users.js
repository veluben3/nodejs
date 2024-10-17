'use strict';
var __awaiter =
	(this && this.__awaiter) ||
	function (thisArg, _arguments, P, generator) {
		function adopt(value) {
			return value instanceof P
				? value
				: new P(function (resolve) {
						resolve(value);
					});
		}
		return new (P || (P = Promise))(function (resolve, reject) {
			function fulfilled(value) {
				try {
					step(generator.next(value));
				} catch (e) {
					reject(e);
				}
			}
			function rejected(value) {
				try {
					step(generator['throw'](value));
				} catch (e) {
					reject(e);
				}
			}
			function step(result) {
				result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
			}
			step((generator = generator.apply(thisArg, _arguments || [])).next());
		});
	};
Object.defineProperty(exports, '__esModule', { value: true });
exports.Users = void 0;
const services_1 = require('../services');
class Users {
	static register(req, res) {
		return __awaiter(this, void 0, void 0, function* () {
			const body = req.body;
			const validateUserExists = yield services_1.UserService.checkUserExists(
				body === null || body === void 0 ? void 0 : body.email
			);
			if (!validateUserExists) {
				res.status(400).send({
					error: 'User already exists'
				});
			} else {
				yield services_1.UserService.createUser(req.body);
				res.status(200).send({
					status: 'Success',
					message: 'User Created Successfully'
				});
			}
		});
	}
	static login(req, res) {
		return __awaiter(this, void 0, void 0, function* () {
			const body = req.body;
			const email = body.email;
			const password = body.password;
			const userExists = yield services_1.UserService.getUsersByEmail(email);
			if (!userExists || !(yield services_1.UserService.isPasswordMatch(password, userExists.password))) {
				res.status(400).send({
					error: 'User Not Exists'
				});
			} else {
				const tokens = yield services_1.UserService.generateAuthTokens(userExists);
				res.status(200).send({
					user: userExists,
					tokens: tokens
				});
			}
		});
	}
}
exports.Users = Users;
