import httpStatus from 'http-status';

import { Request, Response } from 'express';
import { IFaq } from './faq.interface';
import { FaqServices } from './faq.services';
import sendResponse from '../../../shared/sendResponse';
import catchAsync from '../../../shared/catchAsync';

const createFaq = catchAsync(async (req: Request, res: Response) => {
  const { ...faqData } = req.body;

  const result = await FaqServices.createFaq(faqData);

  sendResponse<IFaq>(res, {
    statusCode: httpStatus.CREATED,
    success: true,
    message: 'FAQ created successfully',
    data: result,
  });
});

const getAllFaqs = catchAsync(async (req: Request, res: Response) => {
  const faqs = await FaqServices.getAllFaqs();

  sendResponse<IFaq[]>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'All FAQs retrieved successfully',
    data: faqs,
  });
});

export const FaqController = {
  createFaq,
  getAllFaqs,
};
