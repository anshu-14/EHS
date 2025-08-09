import express from 'express';
import {getEnterprises,createEnterprise,updateEnterprise,deleteEnterprise,disableEnterprise} from '../controllers/enterpriseController.js';
import auth from '../middleware/auth.js';
import roleMiddleware from '../middleware/role.js';

const router = express.Router();

// router.get('/', auth, roleMiddleware(['Admin', 'SuperAdmin']), getEnterprises);
// router.post('/', auth, roleMiddleware(['Admin', 'SuperAdmin']), createEnterprise);
// router.put('/:id', auth, roleMiddleware(['Admin', 'SuperAdmin']), updateEnterprise);
// router.delete('/:id', auth, roleMiddleware(['Admin', 'SuperAdmin']), deleteEnterprise);
// router.patch('/:id/disable', auth, roleMiddleware(['Admin', 'SuperAdmin']), disableEnterprise);

export default router;