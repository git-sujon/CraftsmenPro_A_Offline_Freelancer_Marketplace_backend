import httpStatus from 'http-status';
import { Request, Response } from 'express';
import { IFeedback } from './feedback.interface';
import { FeedbackServices } from './feedback.services';
import sendResponse from '../../../shared/sendResponse';
import catchAsync from '../../../shared/catchAsync';

const createFeedback = catchAsync(async (req: Request, res: Response) => {
  const { ...feedbackData } = req.body;

  const result = await FeedbackServices.createFeedback(feedbackData);

  sendResponse<IFeedback>(res, {
    statusCode: httpStatus.CREATED,
    success: true,
    message: 'Feedback created successfully',
    data: result,
  });
});

const getAllFeedback = catchAsync(async (req: Request, res: Response) => {
  const feedback = await FeedbackServices.getAllFeedback();

  sendResponse<IFeedback[]>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'All feedback retrieved successfully',
    data: feedback,
  });
});

export const FeedbackController = {
  createFeedback,
  getAllFeedback,
};
