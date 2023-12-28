"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AdminValidation = void 0;
const zod_1 = require("zod");
const adminSchema = zod_1.z.object({
    username: zod_1.z.string({
        required_error: 'Username is required',
    }),
    password: zod_1.z.string({
        required_error: 'Password is required',
    }),
    // Add validation for any other necessary fields
});
exports.AdminValidation = { createAdminSchema: adminSchema };
