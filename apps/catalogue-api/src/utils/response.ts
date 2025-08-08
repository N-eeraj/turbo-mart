import {
  type Response,
} from "express"

interface BaseResponse {
  status?: number
  message: string
}

interface SuccessResponse extends BaseResponse {
  data: any
}
interface ErrorResponse extends BaseResponse {
  errors: any
}

export function sendSuccessResponse(res: Response, { status = 200, message, data = null }: SuccessResponse) {
  res.statusCode = status
  res.send({
    success: true,
    data,
    message,
  })
}

export function sendErrorResponse(res: Response, { status = 500, message, errors = null }: ErrorResponse) {
  res.statusCode = status
  res.send({
    success: false,
    errors,
    message,
  })
}
