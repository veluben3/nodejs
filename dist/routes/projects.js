"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const validate_1 = require("../auth/validate");
const validation_1 = require("../auth/validation");
const authenticate_1 = require("../auth/authenticate");
const projects_1 = require("../controller/projects");
const router = (0, express_1.Router)();
router.post('/', (0, authenticate_1.authenticate)('projects:create'), (0, validate_1.validate)(validation_1.projectRegister), projects_1.Projects.create);
router.get('/', (0, authenticate_1.authenticate)('projects:read'), projects_1.Projects.list);
router.get('/:id', (0, authenticate_1.authenticate)('projects:read'), projects_1.Projects.get);
exports.default = router;
