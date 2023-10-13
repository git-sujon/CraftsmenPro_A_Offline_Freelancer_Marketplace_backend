import httpStatus from 'http-status';


import { Request, Response } from 'express';
import { BookingServices } from './booking.services';
import { IBooking } from './booking.interface';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';

const createBooking = catchAsync(async (req: Request, res: Response) => {
  const bookingData = req.body;
  const result = await BookingServices.createBooking(bookingData);
  sendResponse<IBooking>(res, {
    statusCode: httpStatus.CREATED,
    success: true,
    message: 'Booking created successfully',
    data: result,
  });
});

const getBookingById = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await BookingServices.getBookingById(id);
  if (result) {
    sendResponse<IBooking>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Booking retrieved successfully',
      data: result,
    });
  } else {
    sendResponse<IBooking>(res, {
      statusCode: httpStatus.NOT_FOUND,
      success: false,
      message: 'Booking not found',
    });
  }
});

// Implement other booking controllers as needed

export const BookingController = {
  createBooking,
  getBookingById,
  // Add more controllers here
};
