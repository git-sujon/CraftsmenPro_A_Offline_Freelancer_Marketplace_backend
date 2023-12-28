import httpStatus from 'http-status';
import APIError from '../../../errors/ApiErrors';
import { IUser } from '../user/user.interface';
import { User } from '../user/user.model';
import bcrypt from 'bcrypt';
import config from '../../../config';
import { jwtHelpers } from '../../../helpers/jwtHelpers';
import { Secret } from 'jsonwebtoken';
import { ILogin, ILoginUserResponse } from './auth.interface';

const signUp = async (payload: IUser) => {
  const isUserExist = await User.isUserExist(payload.email);
  const isUserPhoneNumber = await User.findOne({
  phoneNumber: payload.phoneNumber,
  });

  if (isUserExist) {
    throw new APIError(httpStatus.BAD_REQUEST, 'This Email is Already Use');
  }
  if (isUserPhoneNumber) {
    throw new APIError(
      httpStatus.BAD_REQUEST,
      'This Phone Number is Already Use',
    );
  }

  const result = await User.create(payload);

  const email = result.email;
  const role = result.role;

  const accessToken = jwtHelpers.createToken(
    { email, role },
    config.jwt.secret as Secret,
    config.jwt.expires_in as string,
  );

  return {
    accessToken,
  };
};

const login = async (payload: ILogin): Promise<ILoginUserResponse> => {
  const { email, password } = payload;

  const isUserExist = await User.isUserExist(email);

  if (!isUserExist) {
    throw new APIError(httpStatus.NOT_FOUND, 'User does not exist');
  }

  if (
    isUserExist.password &&
    !(await User.isPasswordMatched(password, isUserExist.password))
  ) {
    throw new APIError(httpStatus.UNAUTHORIZED, 'Password is incorrect');
  }

  //create access token & refresh token

  const { email: userEmail, role } = isUserExist;
  const accessToken = jwtHelpers.createToken(
    { email: userEmail, role },
    config.jwt.secret as Secret,
    config.jwt.expires_in as string,
  );

  return {
    accessToken,
  };
};

export const AuthServices = {
  signUp,
  login,
};
