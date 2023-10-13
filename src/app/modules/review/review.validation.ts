import { z } from 'zod';

const reviewSchema = z.object({
  user: z.string({
    required_error: 'User ID is required',
  }),
  service: z.string({
    required_error: 'Service ID is required',
  }),
  rating: z.number({
    required_error: 'Rating is required',
  }),
  comment: z.string({
    required_error: 'Comment is required',
  }),
  date: z.date({
    required_error: 'Date is required',
  }),
  // Add validation for any other necessary fields
});

export const ReviewValidation = { createReviewSchema: z.object({ body: reviewSchema }) };
