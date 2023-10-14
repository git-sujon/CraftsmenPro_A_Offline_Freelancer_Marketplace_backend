import { SortOrder } from 'mongoose';
import { paginationHelpers } from '../../../helpers/paginationHelper';
import { IDeletedResponse, IGenericResponse } from '../../../interfaces/common';
import { IPaginationOptions } from '../../../interfaces/pagination';
import { userSearchAbleFields } from './user.constants';
import { IUser } from './user.interface';
import { IUserFilters } from './user.interface';
import { User } from './user.model';
import APIError from '../../../errors/ApiErrors';
import httpStatus from 'http-status';
import { jwtHelpers } from '../../../helpers/jwtHelpers';
import { Secret } from 'jsonwebtoken';
import config from '../../../config';
import bcrypt from 'bcrypt'


const getSingleUser = async (id: string): Promise<IUser | null> => {
  const result = await User.findOne({ _id: id })
  // .populate('Review');
  return result;
};

const getMyProfile = async (token: string | undefined): Promise<IUser | null> => {
  if (!token) {
    throw new APIError(httpStatus.UNAUTHORIZED, 'Unauthorized access')
  }

  const verifyToken = jwtHelpers.verifiedToken(
    token as string,
    config.jwt.secret as Secret
  )

  console.log("verifyToken:", verifyToken)


  const { email } = verifyToken

  const result = await User.findOne({email})

  return result
};

const getAllUsers = async (
  filters: IUserFilters,
  paginationOptions: IPaginationOptions,
): Promise<IGenericResponse<IUser[]>> => {
  // Extract searchTerm to implement search query
  const { searchTerm, ...filtersData } = filters;
  const { page, limit, skip, sortBy, sortOrder } =
    paginationHelpers.calculatePagination(paginationOptions);

  const andConditions = [];

  // Search needs $or for searching in specified fields
  if (searchTerm) {
    andConditions.push({
      $or: userSearchAbleFields.map(field => ({
        [field]: {
          $regex: searchTerm,
          $options: 'i',
        },
      })),
    });
  }
  // Filters needs $and to fullfill all the conditions
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

  const result = await User.find(whereConditions)
    // .populate('Review')
    .sort(sortConditions)
    .skip(skip)
    .limit(limit);

  const total = await User.countDocuments(whereConditions);

  return {
    meta: {
      page,
      limit,
      total,
    },
    data: result,
  };
};

const userUpdate = async (
  id: string,
  payload: Partial<IUser>,
): Promise<IUser | null> => {
  const result = await User.findOneAndUpdate({ _id: id }, payload, {
    new: true,
  });
  return result;
};

const deleteUser = async (id: string):Promise<IDeletedResponse> => {
  const result = await User.deleteOne({ _id: id });

  console.log("result:", result)

  return result
};

const updateMyProfile = async (
  token: string | undefined,
  payload: Partial<IUser>
) => {
  if (!token) {
    throw new APIError(httpStatus.UNAUTHORIZED, 'Unauthorized access')
  }

  const verifyToken = jwtHelpers.verifiedToken(
    token as string,
    config.jwt.secret as Secret
  )

  if (payload.password) {
    payload.password = await bcrypt.hash(
      payload.password,
      Number(config.bycrypt_salt_rounds)
    )
  }

  const { email } = verifyToken

  const result = await User.updateOne({email}, payload, { new: true })

  return result
}



export const UserServices = {
  getSingleUser,
  getMyProfile,
  getAllUsers,
  userUpdate,
  deleteUser,
  updateMyProfile,
  
};
