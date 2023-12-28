"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Review = void 0;
const mongoose_1 = require("mongoose");
const ReviewSchema = new mongoose_1.Schema({
    user: { type: mongoose_1.Schema.Types.ObjectId, required: true, ref: 'User' },
    service: { type: mongoose_1.Schema.Types.ObjectId, required: true, ref: 'Service' },
    rating: { type: Number, required: true, min: 1, max: 5 },
    comment: { type: String, required: true },
    date: { type: Date, required: true },
    // Add any other fields you need here
});
exports.Review = (0, mongoose_1.model)('Review', ReviewSchema);
