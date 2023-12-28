"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BlogValidation = void 0;
const zod_1 = require("zod");
const blogSchema = zod_1.z.object({
    title: zod_1.z.string({
        required_error: 'Blog title is required',
    }),
    content: zod_1.z.string({
        required_error: 'Blog content is required',
    }),
    author: zod_1.z.string({
        required_error: 'Author is required',
    }),
    // Add validation for any other necessary fields
});
exports.BlogValidation = { createBlogSchema: blogSchema };
