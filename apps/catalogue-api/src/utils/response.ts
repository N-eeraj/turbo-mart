import {
  type Response,
} from "express"

interface BaseResponse {
  status?: number
  message?: string
}

export interface SuccessResponse extends BaseResponse {
  data?: any
}

export interface ErrorResponse extends BaseResponse {
  errors: any
}

/**
 * Sends a standardized success response to the client.
 *
 * @param res - Express response object.
 * @param response - Configuration for the success response.
 *   - `status` (default: 200): HTTP status code.
 *   - `message` (default: "OK"): Message to send.
 *   - `data` (default: null): Payload to return.
 */
export function sendSuccessResponse(res: Response, { status = 200, message = "OK", data = null }: SuccessResponse) {
  res.statusCode = status
  res.send({
    success: true,
    data,
    message,
  })
}

/**
 * Sends a standardized error response to the client.
 *
 * @param res - Express response object.
 * @param response - Configuration for the error response.
 *   - `status` (default: 500): HTTP status code.
 *   - `message` (default: "Oops! Something went wrong"): Error message.
 *   - `errors` (default: null): Error details or metadata.
 */
export function sendErrorResponse(res: Response, { status = 500, message = "Oops! Something went wrong", errors = null }: ErrorResponse) {
  res.statusCode = status
  res.send({
    success: false,
    errors,
    message,
  })
}
