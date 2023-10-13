import express from 'express';
import { AdminController } from './admin.controller';
import { AdminValidation } from './admin.validation';
import validationRequest from '../../middleware/validationRequest';

const router = express.Router();

router.post('/', validationRequest(AdminValidation.createAdminSchema), AdminController.createAdmin);
router.get('/:username', AdminController.getAdmin);

export const AdminRoutes = router;
