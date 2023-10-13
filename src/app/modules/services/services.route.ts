import express from 'express';
import { ServiceController } from './services.controller';
import validationRequest from '../../middleware/validationRequest';
import { ServiceValidation } from './services.validation';

const router = express.Router();

router.post(
  '/',
  validationRequest(ServiceValidation.createServiceSchema),
  ServiceController.createIntoDatabase,
);
router.get('/', ServiceController.getAllFromDatabase);
router.get('/:id', ServiceController.getSingleData);
router.patch('/:id', ServiceController.updateSingleData);
router.delete('/:id', ServiceController.deleteSingleData);

export const ServiceRoutes = router;
