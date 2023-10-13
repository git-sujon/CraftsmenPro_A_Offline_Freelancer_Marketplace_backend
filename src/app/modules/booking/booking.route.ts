import express from 'express';
import { BookingController } from './booking.controller';
import validationRequest from '../../middleware/validationRequest';
import { BookingValidation } from './booking.validation';

const router = express.Router();

router.post(
  '/',
  validationRequest(BookingValidation.createBookingSchema),
  BookingController.createBooking
);
router.get('/:id', BookingController.getBookingById);

// Add more routes as needed

export const BookingRoutes = router;
