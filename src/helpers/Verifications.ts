import httpStatus from "http-status"
import APIError from "../errors/ApiErrors"
import { jwtHelpers } from "./jwtHelpers"
import config from "../config"
import { Secret } from "jsonwebtoken"

const verifiedUser = (token:string) => {
    if (!token) {
        throw new APIError(httpStatus.UNAUTHORIZED, 'Unauthorized access')
      }
    
      const verifyToken = jwtHelpers.verifiedToken(
        token as string,
        config.jwt.secret as Secret
      )
  return verifyToken
}

export const Verifications = {
    verifiedUser
}