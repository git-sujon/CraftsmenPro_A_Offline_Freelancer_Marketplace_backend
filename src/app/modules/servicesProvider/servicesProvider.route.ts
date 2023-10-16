import express from 'express';
import { ServiceProviderController } from './servicesProvider.controller';
import validationRequest from '../../middleware/validationRequest';
import { ServiceProviderValidation } from './servicesProvider.validation';

const router = express.Router();

router.post(
  '/',
  // validationRequest(ServiceProviderValidation.createServiceProviderSchema),
  ServiceProviderController.createIntoDatabase,
);
router.get('/', ServiceProviderController.getAllFromDatabase);
router.get('/:id', ServiceProviderController.getSingleData);
router.patch('/:id', ServiceProviderController.updateSingleData);
router.delete('/:id', ServiceProviderController.deleteSingleData);

export const ServiceProviderRoutes = router;
