import { z } from 'zod';

const serviceAreaSchema = z.object({
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

const companyProfileImageSchema = z.object({
  imageName: z.string({
    required_error: 'Image Name is required',
  }),
  imageUrl: z.string({
    required_error: 'Image URL is required',
  }),
});

const businessHoursSchema = z.object({
  sunday: z.string({
    required_error: 'Sunday hours are required',
  }),
  monday: z.string({
    required_error: 'Monday hours are required',
  }),
  tuesday: z.string({
    required_error: 'Tuesday hours are required',
  }),
  wednesday: z.string({
    required_error: 'Wednesday hours are required',
  }),
  thursday: z.string({
    required_error: 'Thursday hours are required',
  }),
  friday: z.string({
    required_error: 'Friday hours are required',
  }),
  saturday: z.string({
    required_error: 'Saturday hours are required',
  }),
});

const createServiceProviderSchema = z.object({
  body: z.object({
    user: z.string({
      required_error: 'User ID is required',
    }),
    companyName: z.string({
      required_error: 'Company Name is required',
    }),
    serviceCategory: z.string({
      required_error: 'Service Category is required',
    }),
    serviceType: z.string({
      required_error: 'Service Type is required',
    }),
    description: z.string({
      required_error: 'Description is required',
    }),
    serviceAreas: z.array(serviceAreaSchema),
    servicesOffered: z.array(
      z.string({
        required_error: 'Service is required',
      }),
    ),
    isVerified: z.boolean().optional(),
    isAvailable: z.boolean().optional(),
    averageRating: z.number().optional(),
    totalRatings: z.number().optional(),
    companyProfileImages: z.array(companyProfileImageSchema),
    insurance: z.boolean().optional(),
    licenses: z.array(z.string()).optional(),
    certifications: z.array(z.string()).optional(),
    serviceTags: z.array(z.string()).optional(),
    businessHours: businessHoursSchema.optional(),
  }),
});

export const ServiceProviderValidation = { createServiceProviderSchema };
