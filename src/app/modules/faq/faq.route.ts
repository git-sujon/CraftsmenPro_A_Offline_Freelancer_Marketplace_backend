import express from 'express';
import { FaqController } from './faq.controller';

const router = express.Router();

router.post('/', FaqController.createFaq);
router.get('/', FaqController.getAllFaqs);

export const FaqRoutes = router;
