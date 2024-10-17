"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProjectService = void 0;
const project_1 = __importDefault(require("../models/project"));
class ProjectService {
    static createProject(projectData, user) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const projectInsert = {
                    project_name: projectData.project_name,
                    project_description: projectData.project_description,
                    user_id: user._id,
                    status: 'active'
                };
                return project_1.default.create(projectInsert);
            }
            catch (error) {
                return error;
            }
        });
    }
}
exports.ProjectService = ProjectService;
