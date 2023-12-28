"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReviewValidation = void 0;
const zod_1 = require("zod");
const reviewSchema = zod_1.z.object({
    user: zod_1.z.string({
        required_error: 'User ID is required',
    }),
    service: zod_1.z.string({
        required_error: 'Service ID is required',
    }),
    rating: zod_1.z.number({
        required_error: 'Rating is required',
    }),
    comment: zod_1.z.string({
        required_error: 'Comment is required',
    }),
    date: zod_1.z.date({
        required_error: 'Date is required',
    }),
    // Add validation for any other necessary fields
});
exports.ReviewValidation = { createReviewSchema: zod_1.z.object({ body: reviewSchema }) };
