import { SortOrder } from 'mongoose';
import { paginationHelpers } from '../../../helpers/paginationHelper';
import { IDeletedResponse, IGenericResponse } from '../../../interfaces/common';
import { IPaginationOptions } from '../../../interfaces/pagination';
import { serviceSearchAbleFields } from './services.constants';
import { IService, IServiceFilters } from './services.interface';
import { Service } from './services.model';

const createIntoDatabase = async (payload: IService): Promise<IService> => {
  const result = await Service.create(payload);
  return result;
};

const getSingleData = async (id: string): Promise<IService | null> => {
  const result = await Service.findOne({ _id: id });
  return result;
};

const getAllFromDatabase = async (
  filters: IServiceFilters,
  paginationOptions: IPaginationOptions,
): Promise<IGenericResponse<IService[]>> => {
  const { searchTerm, ...filtersData } = filters;
  const { page, limit, skip, sortBy, sortOrder } =
    paginationHelpers.calculatePagination(paginationOptions);

  const andConditions = [];

  if (searchTerm) {
    andConditions.push({
      $or: serviceSearchAbleFields.map((field) => ({
        [field]: {
          $regex: searchTerm,
          $options: 'i',
        },
      })),
    });
  }

  if (Object.keys(filtersData).length) {
    andConditions.push({
      $and: Object.entries(filtersData).map(([field, value]) => ({
        [field]: value,
      })),
    });
  }

  const sortConditions: { [key: string]: SortOrder } = {};
  if (sortBy && sortOrder) {
    sortConditions[sortBy] = sortOrder;
  }

  const whereConditions =
    andConditions.length > 0 ? { $and: andConditions } : {};

  const result = await Service.find(whereConditions)
    .sort(sortConditions)
    .skip(skip)
    .limit(limit);

  const total = await Service.countDocuments(whereConditions);

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
  payload: Partial<IService>,
): Promise<IService | null> => {
  const result = await Service.findOneAndUpdate({ _id: id }, payload, {
    new: true,
  });
  return result;
};

const deleteSingleData = async (id: string): Promise<IDeletedResponse> => {
  const result = await Service.deleteOne({ _id: id });
  return result;
};

export const ServiceServices = {
  createIntoDatabase,
  getSingleData,
  getAllFromDatabase,
  updateSingleData,
  deleteSingleData,
};
