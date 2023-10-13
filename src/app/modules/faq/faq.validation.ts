import { z } from 'zod';

const faqSchema = z.object({
  question: z.string({
    required_error: 'Frequently Asked Question is required',
  }),
  answer: z.string({
    required_error: 'Answer is required',
  }),
  // Add validation for any other necessary fields
});

export const FaqValidation = { createFaqSchema: faqSchema };
