"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Booking = void 0;
const mongoose_1 = require("mongoose");
const BookingSchema = new mongoose_1.Schema({
    user: { type: mongoose_1.Schema.Types.ObjectId, required: true, ref: 'User' },
    service: { type: mongoose_1.Schema.Types.ObjectId, required: true, ref: 'Service' },
    bookingDate: { type: Date, required: true },
    duration: { type: Number, required: true },
    status: { type: String, required: true, enum: ['pending', 'confirmed', 'cancelled'] },
    payment: {
        amount: { type: Number, required: true },
        method: { type: String, required: true },
    },
    additionalInfo: { type: String },
    // Add any other fields you need for bookings
});
exports.Booking = (0, mongoose_1.model)('Booking', BookingSchema);
