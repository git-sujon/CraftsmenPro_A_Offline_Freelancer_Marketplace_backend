"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ServiceValidation = void 0;
const zod_1 = require("zod");
const locationSchema = zod_1.z.object({
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
const contactSchema = zod_1.z.object({
    name: zod_1.z.string({
        required_error: 'Name is required',
    }),
    email: zod_1.z.string({
        required_error: 'Email is required',
    }),
    phone: zod_1.z.string({
        required_error: 'Phone is required',
    }),
    role: zod_1.z.string({
        required_error: 'Role is required',
    }),
});
const timeSlotSchema = zod_1.z.object({
    date: zod_1.z.date({
        required_error: 'Date is required',
    }),
    time: zod_1.z.string({
        required_error: 'Time is required',
    }),
});
const serviceSchema = zod_1.z.object({
    title: zod_1.z.string({
        required_error: 'Title is required',
    }),
    description: zod_1.z.string({
        required_error: 'Description is required',
    }),
    category: zod_1.z.string({
        required_error: 'Category is required',
    }),
    subcategory: zod_1.z.string({
        required_error: 'Subcategory is required',
    }),
    price: zod_1.z.number({
        required_error: 'Price is required',
    }),
    location: locationSchema,
    contact: contactSchema,
    servicesProvider: zod_1.z.string({
        required_error: 'Services Provider Id is required',
    }),
    averageRating: zod_1.z.number().optional(),
    reviews: zod_1.z.array(zod_1.z.string()).optional(),
    availableTimeSlots: zod_1.z.array(timeSlotSchema),
    bookedTimeSlots: zod_1.z.array(timeSlotSchema).optional(),
    duration: zod_1.z.number({
        required_error: 'Duration is required',
    }),
    searchEngineOptimizationTags: zod_1.z.array(zod_1.z.string()).optional(),
    features: zod_1.z.array(zod_1.z.string()).optional(),
    faqs: zod_1.z.array(zod_1.z.string()).optional(),
});
exports.ServiceValidation = { serviceSchema };
