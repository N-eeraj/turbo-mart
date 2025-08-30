import {
  type Response,
} from "express"

import {
  sendResponse,
  type SuccessResponse,
} from "#src/utils/response"
import {
  withPublicPath,
} from "#utils/pathUtils"
import validateData, {
  type SchemaShape,
} from "#utils/validateData"
import logger from "#utils/logger"
import {
  formatError,
} from "#utils/formatter"

export type LogLevel = "info" | "warn" | "error" | "fatal"

/**
 * BaseController class provides static utility methods for handling common 
 * operations in controllers like sending responses, validating requests, logging, and sending files.
 */
export default class BaseController {
  /**
   * Sends a success response with the provided data.
   * 
   * @static
   * @param res - The Express response object.
   * @param response - The success response data.
   */
  static sendSuccess(res: Response, {
    status = 200,
    message = "OK",
    data,
  }: SuccessResponse) {
    sendResponse(res, true, { status, message }, data)
  }

  /**
   * Sends an error response with the provided error details.
   * 
   * @static
   * @param res - The Express response object.
   * @param error - The error response details.
   */
  static sendError(res: Response, error: unknown = {}) {
    const {
      status,
      message,
      errors,
    } = formatError(error)
    
    sendResponse(res, false, { status, message }, errors)
  }

  /**
   * Sends a public file to the client from the public folder.
   * 
   * @static
   * @param res - The Express response object.
   * @param filePath - The file path relative to the public directory.
   */
  static sendPublicFile(res: Response, filePath: string) {
    res.sendFile(withPublicPath(filePath))
  }

  /**
   * Validates incoming data against a Zod schema.
   * 
   * Wraps `validateData` to standardize validation error responses.
   * 
   * @static
   * @param schema - A Zod object schema to validate against.
   * @param data - The input data to validate (e.g., req.body).
   * @returns The parsed and validated data.
   * @throws An object with status 422 and validation field errors if validation fails.
   * 
   * @example
   * const data = BaseController.validateRequest(schema, req.body)
   */
  static validateRequest<T extends SchemaShape>(...args: Parameters<typeof validateData<T>>) {
    try {
      return validateData(...args)
    } catch (error) {
      throw {
        status: 422,
        message: "Validation Error",
        ...(error ?? {}),
      }
    }
  }

  /**
   * Logs a message with the specified log level.
   * 
   * @static
   * @param message - The message to log.
   * @param level (default: "info") - The log level.
   */
  static log(message: unknown, level: LogLevel = "info") {
    logger[level](message)
  }
}
