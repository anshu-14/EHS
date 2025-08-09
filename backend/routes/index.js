import express from 'express';
import authRoutes from './Admin/auth.js';
import enterpriseRoutes from './Admin/enterprise.js';
import facilityRoutes from './Admin/facility.js';
import employeeRoutes from './Admin/employee.js';
import userRoutes from './Admin/user.js';

const router = express.Router();



router.use('/auth', authRoutes);
router.use('/enterprises', enterpriseRoutes);
router.use('/facilities', facilityRoutes);
router.use('/employees', employeeRoutes);
router.use('/users', userRoutes);


export default router;