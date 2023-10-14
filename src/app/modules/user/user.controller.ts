import httpStatus from 'http-status';
import sendResponse from '../../../shared/sendResponse';
import { IUser } from './user.interface';
import catchAsync from '../../../shared/catchAsync';
import { Request, Response } from 'express';
import { UserServices } from './user.services';
import pick from '../../../shared/pick';

import { paginationFieldsConstant } from '../../../constant.ts/paginationFieldsConstant';
import { userFilterAbleFields } from './user.constants';
import { IDeletedResponse } from '../../../interfaces/common';

const getSingleUser = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await UserServices.getSingleUser(id);

  sendResponse<IUser>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'User fetched successfully',
    data: result,
  });
});

const getMyProfile = catchAsync(async (req: Request, res: Response) => {

  const authToken = req.headers.authorization!



  const result = await UserServices.getMyProfile(authToken);

  sendResponse<IUser>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'User fetched successfully',
    data: result,
  });
});

const getAllUser = catchAsync(async (req: Request, res: Response) => {
  const filters = pick(req.query, userFilterAbleFields);
  const paginationOptions = pick(req.query, paginationFieldsConstant);

  const result = await UserServices.getAllUsers(filters, paginationOptions);

  sendResponse<IUser[]>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Users fetched successfully',
    meta: result.meta,
    data: result.data,
  });
});

const userUpdate = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const updatedData = req.body;
  const result = await UserServices.userUpdate(id, updatedData);

  sendResponse<IUser>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'User updated successfully',
    data: result,
  });
});

const updateMyProfile = catchAsync(
  async (req: Request, res: Response) => {
    const authToken = req.headers.authorization
    const updatedInfo = req.body

    const result = await UserServices.updateMyProfile(authToken, updatedInfo)
    sendResponse(res, {
      success: true,
      statusCode: httpStatus.OK,
      message: "User's information Update successfully",
      data: result,
    })
  }
)

const deleteUser = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await UserServices.deleteUser(id);

  sendResponse<IDeletedResponse>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'User deleted successfully',
    data: result,
  });
});

export const UserController = {
  getSingleUser,
  getMyProfile,
  getAllUser,
  userUpdate,
  updateMyProfile,
  deleteUser,
};
