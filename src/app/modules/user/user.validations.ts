import { z } from 'zod';

const createUserSchema = z.object({
  name: z.object({
    firstName: z.string({
      required_error: 'First name is required',
    }),

    lastName: z.string({
      required_error: 'Last name is required',
    }),
  }),
  email: z
    .string({
      required_error: 'Email is required',
    })
    .email('Invalid email address'),
  password: z.string().min(8, 'Password must be at least 8 characters long'),
  phoneNumber: z.string({
    required_error: 'Phone Number is required',
  }),
  location: z.object({
    city: z.string({
      required_error: 'City is required',
    }),
    division: z.string({
      required_error: 'Division is required',
    }),
  }),
  role: z.string(),
});

export const UserValidation = {
  createUserSchema,
};
