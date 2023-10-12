import httpStatus from 'http-status';
import sendResponse from '../../../shared/sendResponse';

import catchAsync from '../../../shared/catchAsync';
import { Request, Response } from 'express';
import pick from '../../../shared/pick';

import { paginationFieldsConstant } from '../../../constant.ts/paginationFieldsConstant';
import { ServiceProviderServices } from './servicesProvider.services';
import { IServiceProvider } from './servicesProvider.interface';
import { serviceProviderFilterAbleFields } from './servicesProvider.constents';
import { IDeletedResponse } from '../../../interfaces/common';

const createIntoDatabase = catchAsync(async (req: Request, res: Response) => {
  const { ...userData } = req.body;
  const result = await ServiceProviderServices.createIntoDatabase(userData);

  sendResponse<IServiceProvider>(res, {
    statusCode: 200,
    success: true,
    message: 'Data Created successfully !',
    data: result,
  });
});

const getSingleData = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await ServiceProviderServices.getSingleData(id);

  sendResponse<IServiceProvider>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Data fetched successfully',
    data: result,
  });
});

const getAllFromDatabase = catchAsync(async (req: Request, res: Response) => {
  const filters = pick(req.query, serviceProviderFilterAbleFields);
  const paginationOptions = pick(req.query, paginationFieldsConstant);

  const result = await ServiceProviderServices.getAllFromDatabase(
    filters,
    paginationOptions,
  );

  sendResponse<IServiceProvider[]>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'all Data fetched successfully',
    meta: result.meta,
    data: result.data,
  });
});

const updateSingleData = catchAsync(
  catchAsync(async (req: Request, res: Response) => {
    const { id } = req.params;
    const updatedData = req.body;
    const result = await ServiceProviderServices.updateSingleData(
      id,
      updatedData,
    );

    sendResponse<IServiceProvider>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Data updated successfully',
      data: result,
    });
  }),
);

const deleteSingleData = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await ServiceProviderServices.deleteSingleData(id);

  sendResponse<IDeletedResponse>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'User deleted successfully',
    data: result,
  });
});

export const ServiceProviderController = {
  createIntoDatabase,
  getSingleData,
  getAllFromDatabase,
  updateSingleData,
  deleteSingleData,
};
