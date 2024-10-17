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
var __importDefault =
	(this && this.__importDefault) ||
	function (mod) {
		return mod && mod.__esModule ? mod : { default: mod };
	};
Object.defineProperty(exports, '__esModule', { value: true });
exports.verifyCallBack = exports.authenticate = void 0;
const Role_1 = __importDefault(require('../models/Role'));
const jsonwebtoken_1 = __importDefault(require('jsonwebtoken'));
const Users_1 = __importDefault(require('../models/Users'));
const mongoose_1 = __importDefault(require('mongoose'));
const permissions_1 = __importDefault(require('../models/permissions'));
const lodash_1 = __importDefault(require('lodash'));
const authenticate =
	(...requiredRights) =>
	(req, res, next) =>
		__awaiter(void 0, void 0, void 0, function* () {
			try {
				if (req.headers.authorization) {
					const token = req.headers.authorization.split(' ')[1];
					jsonwebtoken_1.default.verify(token, 'stringusage', (err, data) =>
						__awaiter(void 0, void 0, void 0, function* () {
							if (lodash_1.default.get(data, 'user_id')) {
								const user = yield Users_1.default.findOne({ _id: new mongoose_1.default.Types.ObjectId(data.user_id) });
								yield (0, exports.verifyCallBack)(req, res, next, requiredRights)(null, user, null);
							} else {
								res.status(400).send('Invalid Authentication');
							}
						})
					);
				}
			} catch (e) {
				next(e);
			}
		});
exports.authenticate = authenticate;
const verifyCallBack = (req, res, next, requiredRights) => (err, user, info) =>
	__awaiter(void 0, void 0, void 0, function* () {
		if (err || info || !user) {
			res.status(400).send('Invalid Authentication');
		} else {
			req.user = user;
			if (requiredRights.length) {
				const userRights = [];
				const roles = yield Role_1.default
					.find({ _id: { $in: user.roles } })
					.populate({ path: 'permissions', model: permissions_1.default });
				if (roles.length) {
					for (let role of roles) {
						for (let perm of role.permissions) {
							userRights.push(`${perm.controller}:${perm.action}`);
						}
					}
					const hasRequiredRights = requiredRights.every((data) => userRights.includes(data));
					if (!hasRequiredRights) {
						return res.status(403).send('Invalid Access');
					}
				} else {
					return res.status(403).send('Invalid Access');
				}
			}
		}
		next();
	});
exports.verifyCallBack = verifyCallBack;
