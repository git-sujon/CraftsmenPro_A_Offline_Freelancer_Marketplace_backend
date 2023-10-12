import express from 'express';
import { ServiceProviderController } from './servicesProvider.controller';

const router = express.Router();

router.post('/', ServiceProviderController.createIntoDatabase);
router.get('/', ServiceProviderController.getAllFromDatabase);
router.get('/:id', ServiceProviderController.getSingleData);
router.patch('/:id', ServiceProviderController.updateSingleData);
router.delete('/:id', ServiceProviderController.deleteSingleData);

export const UserRoutes = router;
