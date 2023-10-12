import mongoose from 'mongoose'
import { IGenericErrorMessage } from '../interfaces/error'

const handleCastError = (error: mongoose.Error.CastError) => {
  const errors: IGenericErrorMessage[] = [
    {
      path: error.path,
      message: error.message,
    },
  ]

  const statusCode = 400
  return {
    statusCode,
    message: 'CastError',
    errorMessages: errors,
  }
}

export default handleCastError
