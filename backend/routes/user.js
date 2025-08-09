import express from 'express';
import { getUsers, createUser, updateUser, deleteUser } from '../controllers/userController.js';
import auth from '../middleware/auth.js';
import roleMiddleware from '../middleware/role.js';

const router = express.Router();

router.get('/', auth, roleMiddleware(['Admin', 'SuperAdmin']), getUsers);
router.post('/', auth, roleMiddleware(['Admin', 'SuperAdmin']), createUser);
router.put('/:id', auth, roleMiddleware(['Admin', 'SuperAdmin']), updateUser);
router.delete('/:id', auth, roleMiddleware(['Admin', 'SuperAdmin']), deleteUser);

export default router;