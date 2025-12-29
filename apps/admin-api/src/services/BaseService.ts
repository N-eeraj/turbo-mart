import fs from "fs/promises"
import path from "path"
import ejs from "ejs"

import {
  APP_URL,
  STORAGE_DIR_NAME,
  PUBLIC_FILE_STORAGE_DIR_NAME,
} from "#src/config/server.ts"
import logger from "#utils/logger"
import {
  multerToFile,
  getFileExtension,
} from "#utils/files"
import {
  withPrivateFileStoragePath,
  withPublicFileStoragePath,
  withStoragePath,
  withTemplatePath,
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
   * 
   * @param message - The message to log.
   * @param level (default: "info") - The log level.
   */
  static log(message: unknown, level: LogLevel = "info"): void {
    logger[level](message)
  }

  /**
   * Converts a list of field names and a search query in to a regex search array.
   * 
   * @static
   * 
   * @param searchQuery - Search query value.
   * @param fieldNames - List of names of the mongoose model fields to search the query in.
   * 
   * @returns a regex search array.
   * 
   * @example
   * const regexSearchArray = BaseService.getRegexSearchList(
   *  "searchQuery", [
   *    "field1",
   *    "field2",
   * ])
   * MongooseModel.find({
   *  $or: regexSearchArray,
   * })
   */
  static getRegexSearchList(
    searchQuery: string,
    fieldNames: Array<string>
  ): Array<{ [fieldName: string]: { $regex: RegExp } }> {
    const searchRegex = {
      $regex: new RegExp(searchQuery.trim(), "i"),
    }

    return fieldNames
      .map((fieldName) => ({
        [fieldName]: searchRegex,
      }))
  }

  /**
   * Checks if the given error is a MongoDB duplicate key error (codeName: "DuplicateKey").
   * 
   * @static
   * 
   * @param error - The error object to check.
   * 
   * @returns `true` if the error is a duplicate key error, otherwise `false`.
   */
  static checkDuplicateKeyError(error: unknown): [true, Record<string, string>] | [false] {
    const isDuplicateKeyError = Boolean(
      error &&
      typeof error === "object" &&
      "code" in error &&
      error.code === 11000
    )

    if (!isDuplicateKeyError) {
      return [
        false
      ]
    }

    let errorKeys: Record<string, string> = {}
    if (
      error &&
      typeof error === "object" &&
      "keyPattern" in error &&
      error.keyPattern &&
      typeof error.keyPattern === "object"
    ) {
      Object.keys(error.keyPattern)
        .forEach(key => errorKeys[key] = `${key} already in use`)
    }

    return [
      isDuplicateKeyError,
      errorKeys,
    ]
  }

  /**
   * Converts the multer file object to native file (if file exists).
   * 
   * @static
   * 
   * @param file - Multer file object to be converted to file.
   * 
   * @returns File or null.
   */
  static multerToFile(file: Parameters<typeof multerToFile>[0]): ReturnType<typeof multerToFile> {
    return multerToFile(file)
  }

  /**
   * Saves a native `File` object to the local storage directory.
   * 
   * @static
   * 
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
   * 
   * @param file - The file object.
   * 
   * @returns The file extension (e.g., "pdf", "png").
   */
  static getFileExtension(file: File): string {
    return getFileExtension(file)
  }

  /**
   * Remove the file from the local storage directory.
   * 
   * @static
   * 
   * @param path - The relative file path from `storage` directory to delete the file.
   */
  static async removeFileFromStorage(path: string): Promise<void> {
    await fs.rm(withStoragePath(path))
  }

  /**
   * Render the ejs template file with passed values.
   * 
   * @param relativePath - Relative path from the template directory.
   * @param data - Data to be passed to the ejs template.
   * 
   * @returns the rendered HTML string.
   */
  static async renderTemplate(relativePath: string, data: any): Promise<string> {
    const templatePath = withTemplatePath(relativePath)
    const html = await ejs.renderFile(templatePath, data)
    return html as string
  }
}
