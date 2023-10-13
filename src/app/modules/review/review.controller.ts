import httpStatus from 'http-status';


import { Request, Response } from 'express';

import { ReviewServices } from './review.services';
import { IReview } from './review.interface';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';

const createReview = catchAsync(async (req: Request, res: Response) => {
  const { ...data } = req.body;
  const result = await ReviewServices.createReview(data);
  sendResponse<IReview>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Review created successfully',
    data: result,
  });
});

const getReviewById = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await ReviewServices.getReviewById(id);
  sendResponse<IReview>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Review fetched successfully',
    data: result,
  });
});

const getReviewsForService = catchAsync(async (req: Request, res: Response) => {
  const { serviceId } = req.params;
  const result = await ReviewServices.getReviewsForService(serviceId);
  sendResponse<IReview[]>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Reviews fetched successfully',
    data: result,
  });
});

const updateReview = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const updatedData = req.body;
  const result = await ReviewServices.updateReview(id, updatedData);
  sendResponse<IReview>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Review updated successfully',
    data: result,
  });
});

const deleteReview = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  await ReviewServices.deleteReview(id);
  sendResponse<void>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Review deleted successfully',
  });
});

export const ReviewController = {
  createReview,
  getReviewById,
  getReviewsForService,
  updateReview,
  deleteReview,
};
