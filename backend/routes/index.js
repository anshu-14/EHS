import express from 'express';
import authRoutes from './auth.js';
import enterpriseRoutes from './enterprise.js';
import facilityRoutes from './facility.js';
import employeeRoutes from './employee.js';
import userRoutes from './user.js';

const router = express.Router();



router.use('/auth', authRoutes);
router.use('/enterprises', enterpriseRoutes);
router.use('/facilities', facilityRoutes);
router.use('/employees', employeeRoutes);
router.use('/users', userRoutes);


export default router;