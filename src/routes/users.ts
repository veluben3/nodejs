import express, {Router} from "express";
import {Users} from "../controller/Users";
import {validate} from "../auth/validate";
import {loginUser, userRegistration} from "../auth/validation";

const router = Router();

router.post('/login', validate(loginUser), Users.login)
router.post('/register', validate(userRegistration), Users.register)

export default router;