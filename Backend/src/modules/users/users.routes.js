// src/modules/users/users.routes.js

import { Router } from 'express';
import * as usersController from './users.controller.js';
import { validateBody } from '../middleware/validate.js';
import { createUserSchema } from './users.schema.js';
import { updateUserSchema } from './users.schema.js';

const router = Router();

// GET /users
router.get('/', usersController.getAll);

router.get('/search', usersController.search);

// POST /users
router.post('/', validateBody(createUserSchema), usersController.create);

// PUT /users/:id
router.put('/:id', validateBody(updateUserSchema),  usersController.update);

// DELETE /users/:id
router.delete('/:id', usersController.remove);

// GET /users/:id
router.get('/:id', usersController.getById);


export default router;
