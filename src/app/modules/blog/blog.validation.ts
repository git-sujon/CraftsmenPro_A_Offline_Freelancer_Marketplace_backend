import { z } from 'zod';

const blogSchema = z.object({
  title: z.string({
    required_error: 'Blog title is required',
  }),
  content: z.string({
    required_error: 'Blog content is required',
  }),
  author: z.string({
    required_error: 'Author is required',
  }),
  // Add validation for any other necessary fields
});

export const BlogValidation = { createBlogSchema: blogSchema };
