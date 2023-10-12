import { Model, Schema } from 'mongoose';

export interface IUser {
  name: {
    firstName: string;
    lastName: string;
  };
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

export type UserModel = {
  isUserExist(_id: string): Promise<Pick<IUser, 'email' | 'password' | 'role'>>;
  isPasswordMatched(
    givenPassword: string,
    savedPassword: string,
  ): Promise<boolean>;
} & Model<IUser>;

export interface IUserFilters {
  searchTerm?: string;
}
