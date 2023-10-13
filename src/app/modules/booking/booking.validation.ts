import { z } from 'zod';

const bookingStatusOptions = ['pending', 'confirmed', 'cancelled'] as const;

// ...

const bookingSchema = z.object({
  body: z.object({
    user: z.string({
      required_error: 'User ID is required',
    }),
    service: z.string({
      required_error: 'Service ID is required',
    }),
    bookingDate: z.date({
      required_error: 'Booking date is required',
    }),
    duration: z.number({
      required_error: 'Booking duration is required',
    }),
    status: z.enum(bookingStatusOptions, {
      required_error: 'Booking status is required',
    }),
    payment: z.object({
      amount: z.number({
        required_error: 'Payment amount is required',
      }),
      method: z.string({
        required_error: 'Payment method is required',
      }),
    }),
    additionalInfo: z.string().optional(),
  }),
});

export const BookingValidation = { createBookingSchema: bookingSchema };
