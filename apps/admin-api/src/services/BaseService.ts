import logger from "#utils/logger"
import {
  multerToFile,
} from "#utils/files"

export type LogLevel = "info" | "warn" | "error" | "fatal"

/**
 * BaseService class provides static utility methods for handling common
 * operations in services and to be used in the BaseController.
 */
export default class BaseService {
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

  /**
   * Checks if the given error is a MongoDB duplicate key error (codeName: "DuplicateKey").
   * 
   * @static
   * @param error - The error object to check.
   * @returns `true` if the error is a duplicate key error, otherwise `false`.
   */
  static checkDuplicateKeyError(error: unknown) {
    return Boolean(
      error &&
      typeof error === "object" &&
      "codeName" in error &&
      error.codeName === "DuplicateKey"
    )
  }

  /**
   * Converts the multer file object to native file (if file exists).
   * 
   * @static
   * @param file - Multer file object to be converted to file.
   * @returns File or null.
   */
  static multerToFile(file: Parameters<typeof multerToFile>[0]) {
    return multerToFile(file)
  }
}
