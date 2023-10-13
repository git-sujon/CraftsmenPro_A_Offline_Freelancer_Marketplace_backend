import { Model, Schema } from 'mongoose';

export interface IBooking {
  user: Schema.Types.ObjectId; // The user making the booking
  service: Schema.Types.ObjectId; // The service being booked
  bookingDate: Date; // Date and time of the booking
  duration: number; // Duration of the booking in minutes
  status: 'pending' | 'confirmed' | 'cancelled'; // Booking status
  payment: {
    amount: number; // Total payment amount
    method: string; // Payment method (e.g., credit card, cash)
  };
  additionalInfo?: string; 
}

export type BookingModel = Model<IBooking, Record<string, unknown>>;
