import mongoose, { SortOrder } from 'mongoose';
import { paginationHelpers } from '../../../helpers/paginationHelper';
import { IDeletedResponse, IGenericResponse } from '../../../interfaces/common';
import { IPaginationOptions } from '../../../interfaces/pagination';
import { serviceProviderSearchAbleFields } from './servicesProvider.constants';
import {
  IServiceProvider,
  IServiceProviderFilters,
} from './servicesProvider.interface';
import { ServiceProvider } from './servicesProvider.model';
import { User } from '../user/user.model';
import { ENUM_USER_ROLE } from '../../../enums/user';
import APIError from '../../../errors/ApiErrors';
import httpStatus from 'http-status';

const createIntoDatabase = async (payload: IServiceProvider) => {
  const _id = payload.user;

  const isExist = await User.findById(_id);

  if (!isExist) throw new APIError(httpStatus.NOT_FOUND, 'User not found !');

  if (isExist && isExist.role === ENUM_USER_ROLE.SERVICES_PROVIDER)
    throw new APIError(
      httpStatus.BAD_REQUEST,
      'User already exist as Service Provider !',
    );

  if (isExist && isExist.role === ENUM_USER_ROLE.ADMIN)
    throw new APIError(httpStatus.BAD_REQUEST, 'User already exist as Admin !');

  if (isExist && isExist.role === ENUM_USER_ROLE.SUPER_ADMIN)
    throw new APIError(
      httpStatus.BAD_REQUEST,
      'User already exist as Super Admin !',
    );

  const session = await mongoose.startSession();

  try {
    session.startTransaction();

    const userUpdate = await User.findByIdAndUpdate(
      { _id: isExist._id },
      {
        role: ENUM_USER_ROLE.SERVICES_PROVIDER,
        isServiceProvider: true,
      },
    );

    const result = await ServiceProvider.create(payload);

    session.commitTransaction();
    session.endSession();
    return result;
  } catch (error) {
    session.abortTransaction();
    throw error;
  }
};

const getSingleData = async (id: string): Promise<IServiceProvider | null> => {
  const result = await ServiceProvider.findOne({ _id: id }).populate('user');
  return result;
};

const getAllFromDatabase = async (
  filters: IServiceProviderFilters,
  paginationOptions: IPaginationOptions,
): Promise<IGenericResponse<IServiceProvider[]>> => {
  // Extract searchTerm to implement search query
  const { searchTerm, ...filtersData } = filters;
  const { page, limit, skip, sortBy, sortOrder } =
    paginationHelpers.calculatePagination(paginationOptions);

  const andConditions = [];

  // Search needs $or for searching in specified fields
  if (searchTerm) {
    andConditions.push({
      $or: serviceProviderSearchAbleFields.map(field => ({
        [field]: {
          $regex: searchTerm,
          $options: 'i',
        },
      })),
    });
  }
  // Filters needs $and to full-fill all the conditions
  if (Object.keys(filtersData).length) {
    andConditions.push({
      $and: Object.entries(filtersData).map(([field, value]) => ({
        [field]: value,
      })),
    });
  }
  // Dynamic  Sort needs  field to  do sorting
  const sortConditions: { [key: string]: SortOrder } = {};
  if (sortBy && sortOrder) {
    sortConditions[sortBy] = sortOrder;
  }
  const whereConditions =
    andConditions.length > 0 ? { $and: andConditions } : {};

  const result = await ServiceProvider.find(whereConditions)
    .populate('user')
    .sort(sortConditions)
    .skip(skip)
    .limit(limit);

  const total = await ServiceProvider.countDocuments(whereConditions);

  return {
    meta: {
      page,
      limit,
      total,
    },
    data: result,
  };
};

const updateSingleData = async (
  id: string,
  payload: Partial<IServiceProvider>,
): Promise<IServiceProvider | null> => {
  const result = await ServiceProvider.findOneAndUpdate({ _id: id }, payload, {
    new: true,
  });
  return result;
};

const deleteSingleData = async (id: string): Promise<IDeletedResponse> => {
  const result = await ServiceProvider.deleteOne({ _id: id });
  return result;
};

export const ServiceProviderServices = {
  createIntoDatabase,
  getSingleData,
  getAllFromDatabase,
  updateSingleData,
  deleteSingleData,
};
