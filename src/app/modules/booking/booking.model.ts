import { Schema, model } from 'mongoose';
import { IBooking, BookingModel } from './booking.interface';

const BookingSchema = new Schema<IBooking>(
  {
    user: { type: Schema.Types.ObjectId, required: true, ref: 'User' },
    service: { type: Schema.Types.ObjectId, required: true, ref: 'Service' },
    bookingDate: { type: Date, required: true },
    duration: { type: Number, required: true },
    status: { type: String, required: true, enum: ['pending', 'confirmed', 'cancelled'] },
    payment: {
      amount: { type: Number, required: true },
      method: { type: String, required: true },
    },
    additionalInfo: { type: String },
    // Add any other fields you need for bookings
  },
  // Additional schema options if necessary
);

export const Booking = model<IBooking, BookingModel>('Booking', BookingSchema);
