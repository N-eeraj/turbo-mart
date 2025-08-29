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
  errors?: any
}

type ApiResponse =
  | SuccessResponse
  | ErrorResponse
  | {
    success: boolean
  }

/**
 * Sends a standardized JSON response.
 *
 * @param res - Express response object.
 * @param success - Whether the response is a success (`true`) or an error (`false`).
 * @param status - HTTP status code.
 * @param message - Description of the response.
 * @param info - Optional data (on success) or errors (on failure).
 *
 * @example
 * sendResponse(res, true, { status: 200, message: "OK" }, { id: 1 })
 * sendResponse(res, false, { status: 400, message: "Bad Request" }, { field: "Invalid" })
 */
export function sendResponse(res: Response, success: boolean, { status, message }: Required<BaseResponse>, info: any = null) {
  const response: ApiResponse = {
    success,
    message,
  }

  Object.assign(
    response,
    { [success ? "data" : "errors"]: info }
  )

  res.statusCode = status
  res.send(response)
}
