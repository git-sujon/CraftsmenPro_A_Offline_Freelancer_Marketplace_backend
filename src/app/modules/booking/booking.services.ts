import { IBooking, BookingModel } from './booking.interface';
import { Booking } from './booking.model';

const createBooking = async (bookingData: IBooking): Promise<IBooking> => {
  const result = await Booking.create(bookingData);
  return result;
};

const getBookingById = async (id: string): Promise<IBooking | null> => {
  const result = await Booking.findOne({ _id: id });
  return result;
};

// Implement other booking services as needed

export const BookingServices = {
  createBooking,
  getBookingById,
  // Add more services here
};
