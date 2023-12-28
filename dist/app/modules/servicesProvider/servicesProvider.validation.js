"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ServiceProviderValidation = void 0;
const zod_1 = require("zod");
const serviceAreaSchema = zod_1.z.object({
    areaName: zod_1.z.string({
        required_error: 'Area Name is required',
    }),
    cityName: zod_1.z.string({
        required_error: 'City Name is required',
    }),
    division: zod_1.z.string({
        required_error: 'Division is required',
    }),
});
const companyProfileImageSchema = zod_1.z.object({
    imageName: zod_1.z.string({
        required_error: 'Image Name is required',
    }),
    imageUrl: zod_1.z.string({
        required_error: 'Image URL is required',
    }),
});
const businessHoursSchema = zod_1.z.object({
    sunday: zod_1.z.string({
        required_error: 'Sunday hours are required',
    }),
    monday: zod_1.z.string({
        required_error: 'Monday hours are required',
    }),
    tuesday: zod_1.z.string({
        required_error: 'Tuesday hours are required',
    }),
    wednesday: zod_1.z.string({
        required_error: 'Wednesday hours are required',
    }),
    thursday: zod_1.z.string({
        required_error: 'Thursday hours are required',
    }),
    friday: zod_1.z.string({
        required_error: 'Friday hours are required',
    }),
    saturday: zod_1.z.string({
        required_error: 'Saturday hours are required',
    }),
});
const createServiceProviderSchema = zod_1.z.object({
    body: zod_1.z.object({
        user: zod_1.z.string({
            required_error: 'User ID is required',
        }),
        companyName: zod_1.z.string({
            required_error: 'Company Name is required',
        }),
        serviceCategory: zod_1.z.string({
            required_error: 'Service Category is required',
        }),
        serviceType: zod_1.z.string({
            required_error: 'Service Type is required',
        }),
        description: zod_1.z.string({
            required_error: 'Description is required',
        }),
        serviceAreas: zod_1.z.array(serviceAreaSchema),
        servicesOffered: zod_1.z.array(zod_1.z.string({
            required_error: 'Service is required',
        })),
        isVerified: zod_1.z.boolean().optional(),
        isAvailable: zod_1.z.boolean().optional(),
        averageRating: zod_1.z.number().optional(),
        totalRatings: zod_1.z.number().optional(),
        companyProfileImages: zod_1.z.array(companyProfileImageSchema),
        insurance: zod_1.z.boolean().optional(),
        licenses: zod_1.z.array(zod_1.z.string()).optional(),
        certifications: zod_1.z.array(zod_1.z.string()).optional(),
        serviceTags: zod_1.z.array(zod_1.z.string()).optional(),
        businessHours: businessHoursSchema.optional(),
    }),
});
exports.ServiceProviderValidation = { createServiceProviderSchema };
