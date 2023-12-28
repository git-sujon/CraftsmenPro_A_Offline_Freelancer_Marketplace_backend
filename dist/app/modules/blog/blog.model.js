"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Blog = void 0;
const mongoose_1 = require("mongoose");
const BlogSchema = new mongoose_1.Schema({
    title: { type: String, required: true },
    content: { type: String, required: true },
    author: { type: mongoose_1.Schema.Types.ObjectId, required: true, ref: 'Admin' },
    createdAt: { type: Date, required: true },
    // Add any other fields you need here
});
exports.Blog = (0, mongoose_1.model)('Blog', BlogSchema);
