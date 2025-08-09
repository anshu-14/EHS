import express from 'express';
import { body } from 'express-validator';
import authController from '../../controllers/Admin/authController.js';

const router = express.Router();

router.post(
  '/login',
  [
    body('username').notEmpty().withMessage('Username is required'),
    body('password').notEmpty().withMessage('Password is required'),
  ],
  authController
);

export default router;