import express from 'express';
import { ServiceController } from './services.controller';
import validationRequest from '../../middleware/validationRequest';
import { ServiceValidation } from './services.validation';
import auth from '../../middleware/auth';
import { ENUM_USER_ROLE } from '../../../enums/user';

const router = express.Router();

router.post(
  '/',
  // validationRequest(ServiceValidation.serviceSchema),
  auth(ENUM_USER_ROLE.SERVICES_PROVIDER),
  ServiceController.createIntoDatabase,
);
router.get('/', ServiceController.getAllFromDatabase);
router.get('/:id', ServiceController.getSingleData);
router.patch('/:id', ServiceController.updateSingleData);
router.delete('/:id', ServiceController.deleteSingleData);

export const ServiceRoutes = router;
