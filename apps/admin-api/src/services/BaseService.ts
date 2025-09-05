import logger from "#utils/logger"

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
}
