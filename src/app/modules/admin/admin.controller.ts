import httpStatus from 'http-status';

import { Request, Response } from 'express';

import { AdminServices } from './admin.services';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import { IAdmin } from './admin.interface';

const createAdmin = catchAsync(async (req: Request, res: Response) => {
  const { ...adminData } = req.body;
 
  const result = await AdminServices.createAdmin(adminData);

  sendResponse<IAdmin>(res, {
    statusCode: httpStatus.CREATED,
    success: true,
    message: 'Admin created successfully',
    data: result,
  });
});

const getAdmin = catchAsync(async (req: Request, res: Response) => {
  const { username } = req.params;
  const admin = await AdminServices.getAdminByUsername(username);

  if (!admin) {
    sendResponse<IAdmin>(res, {
      statusCode: httpStatus.NOT_FOUND,
      success: false,
      message: 'Admin not found',
      data: null,
    });
  } else {
    sendResponse<IAdmin>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Admin retrieved successfully',
      data: admin,
    });
  }
});

export const AdminController = {
  createAdmin,
  getAdmin,
};
