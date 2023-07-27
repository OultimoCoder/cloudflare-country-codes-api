import type { ErrorHandler } from 'hono'
import { StatusCode } from 'hono/utils/http-status'
import httpStatus from 'http-status'
import { getConfig } from '../config/config'
import { ApiError } from '../utils/ApiError'

export const errorConverter = (err: unknown): ApiError => {
  let error = err
  if (!(error instanceof ApiError)) {
    const castedErr = (typeof error === 'object' ? error : {}) as Record<string, unknown>
    const statusCode: number =
      typeof castedErr.statusCode === 'number'
        ? castedErr.statusCode
        : httpStatus.INTERNAL_SERVER_ERROR
    const message = (castedErr.description || castedErr.message || httpStatus[statusCode]) as string
    error = new ApiError(statusCode, message, false)
  }
  return error as ApiError
}

export const errorHandler: ErrorHandler<Environment> = (err, c) => {
  const config = getConfig(c.env)
  const error = errorConverter(err)
  if (config.env === 'production' && !error.isOperational) {
    error.statusCode = httpStatus.INTERNAL_SERVER_ERROR
    error.message = httpStatus[httpStatus.INTERNAL_SERVER_ERROR].toString()
  }

  const response = {
    code: error.statusCode,
    message: error.message,
    ...(config.env === 'development' && { stack: err.stack })
  }
  return c.json(response, error.statusCode as StatusCode)
}
