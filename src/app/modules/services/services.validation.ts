import { z } from 'zod';

const locationSchema = z.object({
  areaName: z.string({
    required_error: 'Area Name is required',
  }),
  cityName: z.string({
    required_error: 'City Name is required',
  }),
  division: z.string({
    required_error: 'Division is required',
  }),
});

const contactSchema = z.object({
  name: z.string({
    required_error: 'Name is required',
  }),
  email: z.string({
    required_error: 'Email is required',
  }),
  phone: z.string({
    required_error: 'Phone is required',
  }),
  role: z.string({
    required_error: 'Role is required',
  }),
});

const serviceSchema = z.object({
  body: z.object({
    title: z.string({
      required_error: 'Title is required',
    }),
    description: z.string({
      required_error: 'Description is required',
    }),
    category: z.string({
      required_error: 'Category is required',
    }),
    subcategory: z.string({
      required_error: 'Subcategory is required',
    }),
    price: z.number({
      required_error: 'Price is required',
    }),
    location: locationSchema,
    contact: contactSchema,
    averageRating: z.number().optional(),
    reviews: z.array(z.string()).optional(),
    availableTimeSlots: z.array(
      z.string({
        required_error: 'Available Time Slot is required',
      }),
    ),
    bookedTimeSlots: z.array(z.string()).optional(),
    duration: z.number({
      required_error: 'Duration is required',
    }),
    searchEngineOptimizationTags: z.array(z.string()).optional(),
    features: z.array(z.string()).optional(),
    faqs: z.array(z.string()).optional(),
  }),
});

export const ServiceValidation = { createServiceSchema: serviceSchema };
