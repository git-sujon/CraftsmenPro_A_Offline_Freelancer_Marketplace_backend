"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ServiceProvider = void 0;
const mongoose_1 = require("mongoose");
const serviceAreaSchema = new mongoose_1.Schema({
    areaName: [{ type: String, required: true }],
    cityName: { type: String, required: true },
    division: { type: String, required: true },
});
const ServiceProviderSchema = new mongoose_1.Schema({
    user: { type: mongoose_1.Schema.Types.ObjectId, required: true, ref: 'User', unique: true },
    providerName: { type: String, required: true },
    serviceCategory: { type: String, required: true },
    serviceTypes: [{ type: String }],
    description: { type: String, required: true },
    serviceAreas: {
        type: [serviceAreaSchema],
        required: true,
    },
    servicesOffered: [{ type: String }],
    isVerified: { type: Boolean, default: false },
    isAvailable: { type: Boolean, default: true },
    providerProfileImage: { type: String, required: true },
    experience: { type: Number, required: true },
    averageRating: { type: Number, default: 0 },
    totalRatings: { type: Number, default: 0 },
    companyProfileImages: {
        type: [
            {
                imageName: { type: String },
                imageUrl: { type: String },
            },
        ],
    },
    insurance: { type: Boolean },
    licenses: [{ type: String }],
    certifications: [{ type: String }],
    serviceTags: [{ type: String }],
    businessHours: {
        sunday: { type: String },
        monday: { type: String },
        tuesday: { type: String },
        wednesday: { type: String },
        thursday: { type: String },
        friday: { type: String, default: 'Off' },
        saturday: { type: String },
    },
});
exports.ServiceProvider = (0, mongoose_1.model)('ServiceProvider', ServiceProviderSchema);
