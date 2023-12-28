"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Service = void 0;
const mongoose_1 = require("mongoose");
const locationSchema = new mongoose_1.Schema({
    areaName: [{ type: String, required: true }],
    cityName: { type: String, required: true },
    division: { type: String, required: true },
});
const contactSchema = new mongoose_1.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String, required: true },
    role: { type: String, required: true },
});
const ServiceSchema = new mongoose_1.Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    category: { type: String, required: true },
    subcategory: { type: String, required: true },
    price: { type: Number, required: true },
    serviceBanner: { type: String, required: true },
    servicesImages: [{ type: String }],
    location: { type: locationSchema, required: true },
    contact: { type: contactSchema, required: true },
    averageRating: { type: Number },
    totalRatings: { type: Number },
    availableTimeSlots: [
        {
            date: { type: Date, required: true },
            time: { type: String, required: true },
        },
    ],
    bookedTimeSlots: [
        {
            date: { type: Date, required: true },
            time: { type: String, required: true },
        },
    ],
    duration: { type: Number, required: true },
    servicesProvider: {
        type: mongoose_1.Schema.Types.ObjectId,
        required: true,
        ref: 'ServiceProvider',
    },
    searchEngineOptimizationTags: [{ type: String }],
    features: [{ type: String }],
    faqs: [
        {
            key: { type: String },
            label: { type: String },
            children: { type: String },
        },
    ],
    isPopular: { type: Boolean, default: false },
});
exports.Service = (0, mongoose_1.model)('Service', ServiceSchema);
