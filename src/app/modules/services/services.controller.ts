import httpStatus from 'http-status';
import sendResponse from '../../../shared/sendResponse';
import catchAsync from '../../../shared/catchAsync';
import { Request, Response } from 'express';
import pick from '../../../shared/pick';
import { paginationFieldsConstant } from '../../../constant.ts/paginationFieldsConstant';
import { ServiceServices } from './services.services';
import { IService } from './services.interface';
import { serviceFilterAbleFields } from './services.constants';
import { IDeletedResponse } from '../../../interfaces/common';

const createIntoDatabase = catchAsync(async (req: Request, res: Response) => {
  const { ...data } = req.body;
  const result = await ServiceServices.createIntoDatabase(data);

  sendResponse<IService>(res, {
    statusCode: 200,
    success: true,
    message: 'Data Created successfully!',
    data: result,
  });
});

const getSingleData = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await ServiceServices.getSingleData(id);

  sendResponse<IService>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Data fetched successfully',
    data: result,
  });
});

const getAllFromDatabase = catchAsync(async (req: Request, res: Response) => {
  const filters = pick(req.query, serviceFilterAbleFields);
  const paginationOptions = pick(req.query, paginationFieldsConstant);

  const result = await ServiceServices.getAllFromDatabase(
    filters,
    paginationOptions,
  );

  sendResponse<IService[]>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'All Data fetched successfully',
    meta: result.meta,
    data: result.data,
  });
});

const updateSingleData = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const updatedData = req.body;
  const result = await ServiceServices.updateSingleData(id, updatedData);

  sendResponse<IService>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Data updated successfully',
    data: result,
  });
});

const deleteSingleData = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await ServiceServices.deleteSingleData(id);

  sendResponse<IDeletedResponse>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Data deleted successfully',
    data: result,
  });
});

export const ServiceController = {
  createIntoDatabase,
  getSingleData,
  getAllFromDatabase,
  updateSingleData,
  deleteSingleData,
};
