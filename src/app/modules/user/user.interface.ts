import { Model, Schema } from 'mongoose';

export interface IUser {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  phoneNumber: string;
  location: {
    city: string;
    division: string;
  };
  role: string;
  isServiceProvider: boolean;
  profilePicture?: string;
  lastLogin?: Date;
  servicesBooked?: Schema.Types.ObjectId[];
  reviews?: Schema.Types.ObjectId[];
  isVerified?: boolean;
  forgotPasswordToken?: String;
  forgotPasswordTokenExpiry?: Date;
  verifyToken?: String;
  verifyTokenExpiryDate?: Date;
}

export type UserModel = Model<IUser, Record<string, unknown>>;

export interface IUserFilters {
  searchTerm?: string;
  email?: string;
  phoneNumber: string;
}
