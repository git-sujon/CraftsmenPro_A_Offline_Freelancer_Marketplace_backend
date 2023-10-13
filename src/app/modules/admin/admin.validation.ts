import { z } from 'zod';

const adminSchema = z.object({
  username: z.string({
    required_error: 'Username is required',
  }),
  password: z.string({
    required_error: 'Password is required',
  }),
  // Add validation for any other necessary fields
});

export const AdminValidation = { createAdminSchema: adminSchema };
