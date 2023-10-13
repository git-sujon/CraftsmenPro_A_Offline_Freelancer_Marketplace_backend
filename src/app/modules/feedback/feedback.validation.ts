import { z } from 'zod';

const feedbackSchema = z.object({
  user: z.string({
    required_error: 'User ID is required',
  }),
  message: z.string({
    required_error: 'Feedback message is required',
  }),
  // Add validation for any other necessary fields
});

export const FeedbackValidation = { createFeedbackSchema: feedbackSchema };
