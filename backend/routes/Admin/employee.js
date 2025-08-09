import express from 'express';
import { getEmployees, createEmployee, updateEmployee, deleteEmployee, importEmployees,downloadSampleExcel } from '../../controllers/Admin/employeeController.js';
import auth from '../../middleware/auth.js';
import roleMiddleware from '../../middleware/role.js';
//import enterpriseRestriction from '../middleware/enterpriseRestriction.js';
import multer from 'multer';

const upload = multer({ storage: multer.memoryStorage() });
const router = express.Router();

router.get('/', auth, getEmployees);
router.post('/', auth, roleMiddleware(['Admin', 'SuperAdmin']),  createEmployee);
router.put('/:id', auth, roleMiddleware(['Admin', 'SuperAdmin']),  updateEmployee);
router.delete('/:id', auth, roleMiddleware(['Admin', 'SuperAdmin']), deleteEmployee);
router.post('/import', auth, roleMiddleware(['Admin', 'SuperAdmin']), upload.single('file'), importEmployees);
router.get('/sample-excel', downloadSampleExcel);

export default router;