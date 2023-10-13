import { SortOrder } from 'mongoose';
import { paginationHelpers } from '../../../helpers/paginationHelper';
import { IDeletedResponse, IGenericResponse } from '../../../interfaces/common';
import { IPaginationOptions } from '../../../interfaces/pagination';
import { serviceProviderSearchAbleFields } from './servicesProvider.constants';
import {
  IServiceProvider,
  IServiceProviderFilters,
} from './servicesProvider.interface';
import { ServiceProvider } from './servicesProvider.model';

const createIntoDatabase = async (
  payload: IServiceProvider,
): Promise<IServiceProvider> => {
  const result = await ServiceProvider.create(payload);

  return result;
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
