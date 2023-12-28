"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Faq = void 0;
const mongoose_1 = require("mongoose");
const FaqSchema = new mongoose_1.Schema({
    question: { type: String, required: true },
    answer: { type: String, required: true },
    // Add any other fields you need here
});
exports.Faq = (0, mongoose_1.model)('Faq', FaqSchema);
