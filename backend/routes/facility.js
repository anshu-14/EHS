import express from 'express';
import {getFacilities,createFacility,updateFacility,deleteFacility} from '../controllers/facilityController.js';
import auth from '../middleware/auth.js';
import roleMiddleware from '../middleware/role.js';

const router = express.Router();

// router.get('/', auth, roleMiddleware(['Admin', 'SuperAdmin']), getFacilities);
// router.post('/', auth, roleMiddleware(['Admin', 'SuperAdmin']), createFacility);
// router.put('/:id', auth, roleMiddleware(['Admin', 'SuperAdmin']), updateFacility);
// router.delete('/:id', auth, roleMiddleware(['Admin', 'SuperAdmin']), deleteFacility);

export default router;