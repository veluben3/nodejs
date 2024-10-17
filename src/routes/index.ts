import { Router } from 'express';
import profile from './profile';
import users from './users';
import projects from './projects';
import tasks from './tasks';

const routes = Router();
routes.use('/profiles', profile);
routes.use('/users', users);
routes.use('/projects', projects);
routes.use('/tasks', tasks);
export default routes;
