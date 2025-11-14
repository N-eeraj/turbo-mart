import {
  type Request,
  type Response,
  type NextFunction,
} from "express"

import {
  formatError,
} from "#utils/formatter"
import {
  sendResponse,
} from "#utils/response"

export default function errorHandler(
  error: Error,
  _req: Request,
  res: Response,
  _next: NextFunction
) {
  const {
    status,
    message,
    errors,
  } = formatError(error)
  sendResponse(res, false, { status, message }, errors)
}
