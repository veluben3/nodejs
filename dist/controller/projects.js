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
exports.Projects = void 0;
const projectService_1 = require('../services/projectService');
const project_1 = __importDefault(require('../models/project'));
const lodash_1 = __importDefault(require('lodash'));
const mongoose_1 = __importDefault(require('mongoose'));
class Projects {
	static create(req, res) {
		return __awaiter(this, void 0, void 0, function* () {
			const body = req.body;
			const user = req.user;
			const createStatus = yield projectService_1.ProjectService.createProject(body, user);
			if (createStatus) {
				res.status(200).json({
					status: 'success',
					message: 'Project created successfully'
				});
			} else {
				res.status(200).json({});
			}
		});
	}
	static list(req, res) {
		return __awaiter(this, void 0, void 0, function* () {
			try {
				const params = req.query;
				const paginateOptions = {
					page: Number(params.page),
					limit: Number(params.limit),
					collation: {
						locale: 'en'
					}
				};
				const filter = {};
				if (lodash_1.default.get(params, 'status')) {
					filter['status'] = lodash_1.default.get(params, 'status');
				}
				const projectList = yield project_1.default.paginate(filter, paginateOptions);
				res.status(200).send(projectList);
			} catch (e) {
				res.status(400).send({ error: e });
			}
		});
	}
	static get(req, res) {
		return __awaiter(this, void 0, void 0, function* () {
			try {
				const params = req.params;
				if (params.id) {
					const projectData = yield project_1.default.findOne({ _id: new mongoose_1.default.Types.ObjectId(params.id) });
					res.status(200).json(projectData);
				} else {
					res.status(200).send({});
				}
			} catch (e) {
				res.status(400).send({ error: e });
			}
		});
	}
}
exports.Projects = Projects;
