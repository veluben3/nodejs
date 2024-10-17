import { Router } from 'express';
import tasks from '../models/tasks';
import { Task } from '../controller/tasks';
import { authenticate, validateAssignedUser, validateProject } from '../auth/authenticate';
import { validate } from '../auth/validate';
import { taskCreate, userRegistration } from '../auth/validation';

const routes = Router();
routes.post('/', validate(taskCreate), authenticate('tasks:create'), validateProject, validateAssignedUser, Task.createTask);
routes.get('/', authenticate('tasks:read'), Task.getTasks);
routes.put('/:id', authenticate('tasks:edit'), Task.updateTask);
export default routes;
