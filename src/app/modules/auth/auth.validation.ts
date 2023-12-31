import { z } from 'zod';
const genderConstants = [
  'male',
  'female',
  'other',
  'prefer-not-to-say',
] as const;

const signUpSchema = z.object({
  body: z.object({
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
    password: z
      .string({
        required_error: 'Password is required',
      })
      .min(8, 'Password must be at least 8 characters long'),
    phoneNumber: z.string({
      required_error: 'Phone Number is required',
    }),
    gender: z.enum(genderConstants, {
      required_error: 'Booking status is required',
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
  }),
});

const loginSchema = z.object({
  body: z.object({
    email: z.string({
      required_error: 'Email is required',
    }),

    password: z
      .string({
        required_error: 'Password is required',
      })
      .min(8, 'Password must be at least 8 characters long'),
  }),
});
export const AuthValidation = {
  signUpSchema,
  loginSchema,
};
