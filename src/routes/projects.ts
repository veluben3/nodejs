import {Router} from "express";
import {validate} from "../auth/validate";
import {projectRegister} from "../auth/validation";
import { authenticate } from '../auth/authenticate';
import { Projects } from '../controller/projects';

const router = Router();
router.post('/', authenticate('projects:create'), validate(projectRegister), Projects.create)
router.get('/', authenticate('projects:read'), Projects.list)
router.get('/:id', authenticate('projects:read'), Projects.get)
export default router;