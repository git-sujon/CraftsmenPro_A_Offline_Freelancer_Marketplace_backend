import express from 'express';
import { ReviewController } from './review.controller';
import validationRequest from '../../middleware/validationRequest';
import { ReviewValidation } from './review.validation';

const router = express.Router();

router.post(
  '/',
  validationRequest(ReviewValidation.createReviewSchema),
  ReviewController.createReview,
);

router.get('/:id', ReviewController.getReviewById);

router.get('/service/:serviceId', ReviewController.getReviewsForService);

router.patch('/:id', ReviewController.updateReview);

router.delete('/:id', ReviewController.deleteReview);

export const ReviewRoutes = router;
