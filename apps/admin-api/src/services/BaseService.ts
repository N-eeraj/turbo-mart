import fs from "fs/promises"
import path from "path"

import {
  APP_URL,
  STORAGE_DIR_NAME,
  PUBLIC_FILE_STORAGE_DIR_NAME,
} from "#src/config/server"
import logger from "#utils/logger"
import {
  multerToFile,
  getFileExtension,
} from "#utils/files"
import {
  withPrivateFileStoragePath,
  withPublicFileStoragePath,
  withStoragePath,
} from "#utils/pathUtils"

export type LogLevel = "info" | "warn" | "error" | "fatal"

export interface FilePath<IsPublic> {
  fullPath: string
  relativePath: string
  publicPath: IsPublic extends true ? string : null
}

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

  /**
   * Saves a native `File` object to the local storage directory.
   * 
   * @static
   * @param file - The `File` object to save (browser or polyfilled).
   * @param fileName - The name to use for the saved file (including extension).
   * @param fileLocation - Relative subdirectory under `storage/files/public` or `storage/files/private` where the file should be stored.
   * @param isPublic - If `true`, saves the file to the `public` directory; if `false`, saves to the `private` directory. Defaults to `true`.
   * 
   * @returns An object with:
   * - `fullPath`: Absolute path to the saved file.
   * - `relativePath`: Path relative to the `storage/` directory.
   * - `publicPath`: Public URL path if `isPublic = true`, else `null`.
   */
  static async storeFileToStorage<IsPublic extends boolean>(
    file: File,
    fileName: string,
    fileLocation: string,
    isPublic = false as IsPublic
  ): Promise<FilePath<IsPublic>> {
    const destinationDir = isPublic ? 
      withPublicFileStoragePath(fileLocation) :
      withPrivateFileStoragePath(fileLocation)

    // make sure the destination directory exists
    await fs.mkdir(destinationDir, { recursive: true })

    // read the file as an ArrayBuffer and convert to Buffer
    const arrayBuffer = await file.arrayBuffer()
    const buffer = Buffer.from(arrayBuffer)

    // create the file path
    const filePath = path.join(destinationDir, fileName)

    // write to disk
    await fs.writeFile(filePath, buffer)

    // different file paths
    const relativePath = filePath.substring(filePath.indexOf(STORAGE_DIR_NAME) + STORAGE_DIR_NAME.length)
    const publicPath = (
      isPublic ?
        APP_URL + filePath.slice(
          filePath.indexOf(PUBLIC_FILE_STORAGE_DIR_NAME) + PUBLIC_FILE_STORAGE_DIR_NAME.length
        ) :
        null
    ) as FilePath<IsPublic>["publicPath"]

    return {
      fullPath: filePath,
      relativePath,
      publicPath,
    }
  }

  /**
   * Retrieves the file extension from the given File object.
   *
   * @static
   * @param file - The file object.
   * @returns The file extension (e.g., "pdf", "png").
   */
  static getFileExtension(file: File): string {
    return getFileExtension(file)
  }

  /**
   * Remove the file from the local storage directory.
   * 
   * @static
   * @param path - The relative file path from `storage` directory to delete the file.
   */
  static async removeFileFromStorage(path: string) {
    await fs.rm(withStoragePath(path))
  }
}
