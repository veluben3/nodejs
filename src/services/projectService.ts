import project from '../models/project';
import { Project, User } from '../@types/UserInterface';

export abstract class ProjectService {
	static async createProject(projectData: Project, user: User) {
		try {
			const projectInsert = {
				project_name: projectData.project_name,
				project_description: projectData.project_description,
				user_id: user._id,
				status: 'active'
			} as Project
			return project.create(projectInsert)
		} catch (error) {
			return error
		}
	}
}