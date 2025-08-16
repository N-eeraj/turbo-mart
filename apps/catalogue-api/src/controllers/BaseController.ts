import {
  type Response,
} from "express"

import {
  sendErrorResponse,
  sendSuccessResponse,
  type SuccessResponse,
  type ErrorResponse,
} from "#src/utils/response"
import {
  withPublicPath,
} from "#utils/pathUtils"
import logger from "#utils/logger"

export type LogLevel = "info" | "warn" | "error" | "fatal"

/**
 * BaseController class provides static utility methods for handling common 
 * operations in controllers like sending responses, logging, and sending files.
 */
export default class BaseController {
  /**
   * Sends a success response with the provided data.
   * 
   * @static
   * @param res - The Express response object.
   * @param response - The success response data.
   */
  static sendSuccess(res: Response, response: SuccessResponse) {
    sendSuccessResponse(res, response)
  }

  /**
   * Sends an error response with the provided error details.
   * 
   * @static
   * @param res - The Express response object.
   * @param response - The error response details.
   */
  static sendError(res: Response, response: ErrorResponse) {
    sendErrorResponse(res, response)
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
