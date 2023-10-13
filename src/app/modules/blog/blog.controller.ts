import httpStatus from 'http-status';

import { Request, Response } from 'express';
import { IBlog } from './blog.interface';
import { BlogServices } from './blog.services';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';

const createBlog = catchAsync(async (req: Request, res: Response) => {
  const { ...blogData } = req.body;
  
  const result = await BlogServices.createBlog(blogData);

  sendResponse<IBlog>(res, {
    statusCode: httpStatus.CREATED,
    success: true,
    message: 'Blog created successfully',
    data: result,
  });
});

const getAllBlogs = catchAsync(async (req: Request, res: Response) => {
  const blogs = await BlogServices.getAllBlogs();

  sendResponse<IBlog[]>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'All blogs retrieved successfully',
    data: blogs,
  });
});

export const BlogController = {
  createBlog,
  getAllBlogs,
};
