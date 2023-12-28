"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FaqValidation = void 0;
const zod_1 = require("zod");
const faqSchema = zod_1.z.object({
    question: zod_1.z.string({
        required_error: 'Frequently Asked Question is required',
    }),
    answer: zod_1.z.string({
        required_error: 'Answer is required',
    }),
    // Add validation for any other necessary fields
});
exports.FaqValidation = { createFaqSchema: faqSchema };
