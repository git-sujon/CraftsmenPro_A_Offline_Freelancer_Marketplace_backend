"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthValidation = void 0;
const zod_1 = require("zod");
const genderConstants = [
    'male',
    'female',
    'other',
    'prefer-not-to-say',
];
const signUpSchema = zod_1.z.object({
    body: zod_1.z.object({
        name: zod_1.z.object({
            firstName: zod_1.z.string({
                required_error: 'First name is required',
            }),
            lastName: zod_1.z.string({
                required_error: 'Last name is required',
            }),
        }),
        email: zod_1.z
            .string({
            required_error: 'Email is required',
        })
            .email('Invalid email address'),
        password: zod_1.z
            .string({
            required_error: 'Password is required',
        })
            .min(8, 'Password must be at least 8 characters long'),
        phoneNumber: zod_1.z.string({
            required_error: 'Phone Number is required',
        }),
        gender: zod_1.z.enum(genderConstants, {
            required_error: 'Booking status is required',
        }),
        location: zod_1.z.object({
            city: zod_1.z.string({
                required_error: 'City is required',
            }),
            division: zod_1.z.string({
                required_error: 'Division is required',
            }),
        }),
        role: zod_1.z.string(),
    }),
});
const loginSchema = zod_1.z.object({
    body: zod_1.z.object({
        email: zod_1.z.string({
            required_error: 'Email is required',
        }),
        password: zod_1.z
            .string({
            required_error: 'Password is required',
        })
            .min(8, 'Password must be at least 8 characters long'),
    }),
});
exports.AuthValidation = {
    signUpSchema,
    loginSchema,
};
