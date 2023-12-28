"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BookingValidation = void 0;
const zod_1 = require("zod");
const bookingStatusOptions = ['pending', 'confirmed', 'cancelled'];
// ...
const bookingSchema = zod_1.z.object({
    body: zod_1.z.object({
        user: zod_1.z.string({
            required_error: 'User ID is required',
        }),
        service: zod_1.z.string({
            required_error: 'Service ID is required',
        }),
        bookingDate: zod_1.z.date({
            required_error: 'Booking date is required',
        }),
        duration: zod_1.z.number({
            required_error: 'Booking duration is required',
        }),
        status: zod_1.z.enum(bookingStatusOptions, {
            required_error: 'Booking status is required',
        }),
        payment: zod_1.z.object({
            amount: zod_1.z.number({
                required_error: 'Payment amount is required',
            }),
            method: zod_1.z.string({
                required_error: 'Payment method is required',
            }),
        }),
        additionalInfo: zod_1.z.string().optional(),
    }),
});
exports.BookingValidation = { createBookingSchema: bookingSchema };
