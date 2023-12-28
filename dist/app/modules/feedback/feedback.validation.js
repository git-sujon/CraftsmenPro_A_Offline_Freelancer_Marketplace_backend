"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FeedbackValidation = void 0;
const zod_1 = require("zod");
const feedbackSchema = zod_1.z.object({
    user: zod_1.z.string({
        required_error: 'User ID is required',
    }),
    message: zod_1.z.string({
        required_error: 'Feedback message is required',
    }),
    // Add validation for any other necessary fields
});
exports.FeedbackValidation = { createFeedbackSchema: feedbackSchema };
