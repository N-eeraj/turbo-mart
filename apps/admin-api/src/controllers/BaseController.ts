import {
  type Request,
  type Response,
} from "express"
import mongoose from "mongoose"

import {
  sendResponse,
  type SuccessResponse,
} from "#src/utils/response.ts"
import {
  withPublicPath,
} from "#utils/pathUtils"
import validateData, {
  type SchemaShape,
} from "#utils/validateData"
import {
  formatError,
} from "#utils/formatter"
import BaseService from "#services/BaseService"

interface ParsedObjectId {
  validIds: Array<mongoose.Types.ObjectId>
  invalidIds: Array<string>
}

export type PaginationQueries = Partial<{
  limit: number
  skip: number
  order: mongoose.SortOrder
  search: string
}>

/**
 * BaseController class provides static utility methods for handling common
 * operations in controllers like sending responses, validating requests, and sending files.
 */
export default class BaseController {
  /**
   * Logs a message with the specified log level.
   * 
   * @static
   * 
   * @param message - The message to log.
   * @param level (default: "info") - The log level.
   */
  static log(...params: Parameters<typeof BaseService.log>): ReturnType<typeof BaseService.log> {
    BaseService.log(...params)
  }

  /**
   * Sends a success response with the provided data.
   * 
   * @static
   * 
   * @param res - The Express response object.
   * @param response - The success response data.
   */
  static sendSuccess(res: Response, {
    status = 200,
    message = "OK",
    data,
  }: SuccessResponse): void {
    sendResponse(res, true, { status, message }, data)
  }

  /**
   * Sends an error response with the provided error details.
   * 
   * @static
   * 
   * @param res - The Express response object.
   * @param error - The error response details.
   */
  static sendError(res: Response, error: unknown = {}): void {
    const {
      status,
      message,
      errors,
    } = formatError(error)

    BaseController.log(message, "error")
    sendResponse(res, false, { status, message }, errors)
  }

  /**
   * Sends a public file to the client from the public folder.
   * 
   * @static
   * 
   * @param res - The Express response object.
   * @param filePath - The file path relative to the public directory.
   */
  static sendPublicFile(res: Response, filePath: string): void {
    res.sendFile(withPublicPath(filePath))
  }

  /**
   * Validates incoming data against a Zod schema.
   * 
   * Wraps `validateData` to standardize validation error responses.
   * 
   * @static
   * 
   * @param schema - A Zod object schema to validate against.
   * @param data - The input data to validate (e.g., req.body).
   * 
   * @returns The parsed and validated data.
   * 
   * @throws An object with status 422 and validation field errors if validation fails.
   * 
   * @example
   * const data = BaseController.validateRequest(schema, req.body)
   */
  static validateRequest<T extends SchemaShape>(
    ...params: Parameters<typeof validateData<T>>
  ): ReturnType<typeof validateData<T>> {
    try {
      return validateData(...params)
    } catch (error) {
      throw {
        status: 422,
        message: "Validation Error",
        ...(error ?? {}),
      }
    }
  }

  /**
   * Parses and validates a given value as a Mongoose ObjectId.
   * 
   * @static
   *
   * @param id - The value to validate and convert.
   *
   * @returns The transformed `ObjectId` if valid; otherwise, `null`.
   */
  static parseObjectId(id: string | mongoose.Types.ObjectId): mongoose.Types.ObjectId | null {
    if (!mongoose.Types.ObjectId.isValid(id)) return null
    return new mongoose.Types.ObjectId(id)
  }

  /**
   * Parses and validates an array of given value as a Mongoose ObjectIds.
   * 
   * @static
   * 
   * @param idList - The list of values to validate and convert.
   *  
   * @returns The a map of of valid and invalid ids
   */
  static parseObjectIdBulk(idList: Array<string>): ParsedObjectId {
    const idMap = idList.reduce((map: { validIds: Array<mongoose.Types.ObjectId>, invalidIds: Array<string> }, id) => {
      const parsedId = BaseController.parseObjectId(id)
      parsedId ?
        map.validIds.push(parsedId) :
        map.invalidIds.push(id)
      return map
    }, {
      validIds: [],
      invalidIds: [],
    })

    return idMap
  }

  /**
   * Parses and validates a given value as a Mongoose SortOrder.
   * 
   * @static
   * 
   * @param value - The value to validate and convert.
   * 
   * @returns The transformed `SortOrder` if valid; otherwise, `null`.
   */
  static parseSortValue(value: unknown): mongoose.SortOrder | null {
    const VALID_SORT_VALUES: Array<mongoose.SortOrder> = [
      "asc",
      "ascending",
      "desc",
      "descending",
      1,
      -1,
    ] as const

    let normalizedValue = value

    if (typeof normalizedValue === "string") {
      normalizedValue = normalizedValue.toLowerCase()
    }

    const isValidSortOrder = VALID_SORT_VALUES.includes(normalizedValue as mongoose.SortOrder)

    return isValidSortOrder ? normalizedValue as mongoose.SortOrder : null
  }

  /**
   * Parses the request query to get the common pagination queries.
   * 
   * @static
   * 
   * @param query - The Express `Request` query object.
   * 
   * @returns pagination queries.
   */
  static parseBooleanQuery(queryValue: Request["query"]["key"]): boolean | undefined {
    if (!queryValue || typeof queryValue !== "string") return undefined
    if (queryValue === "true" || Number(queryValue) === 1) return true
    if (queryValue === "false" || Number(queryValue) === 0) return false
    return undefined
  }

  /**
   * Parses the request query to get the common pagination queries.
   * 
   * @static
   * 
   * @param query - The Express `Request` query object.
   * 
   * @returns pagination queries.
   */
  static parsePaginationQueries(query: Request["query"]): PaginationQueries {
    const paginationQueries: PaginationQueries = {}

    // sorting order
    const parsedSortOrder = BaseController.parseSortValue(query.order)
    if (parsedSortOrder) {
      paginationQueries.order = parsedSortOrder
    }

    // pagination
    if (Number(query.limit) > 0) {
      paginationQueries.limit = Number(query.limit)
    }
    if (Number(query.skip) > 0) {
      paginationQueries.skip = Number(query.skip)
    }

    // search query
    if (typeof query.search === "string") {
      paginationQueries.search = query.search
    }

    return paginationQueries
  }

  /**
   * Parses the request query and validate an array of given value as a Mongoose ObjectIds.
   * 
   * @static
   * 
   * @param query - The Express `Request` query object
   * @param queryKey - The query key name of the list of ids.
   * @param errorMessage - The error message to be shown in case of  invalid ids.
   * 
   * @returns an array of parsed Mongoose ObjectIds.
   * 
   * @throws 400 error if the id list contains invalid ids.
   */
  static parseResourceIdQueries(
    query: Request["query"],
    queryKey: string,
    errorMessage = `Invalid ${queryKey} Ids`
  ): Array<mongoose.Types.ObjectId> {
    let resourceIds: Array<mongoose.Types.ObjectId> = []

    const resources = query[queryKey]

    if (Array.isArray(resources)) {
      const {
        validIds,
        invalidIds,
      } = BaseController.parseObjectIdBulk(resources as Array<string>)

      if (invalidIds.length) {
        throw {
          status: 400,
          message: errorMessage,
          invalidIds,
        }
      }

      resourceIds = validIds
    } else if (typeof resources === "string") {
      const parsedId = BaseController.parseObjectId(resources)
      if (parsedId === null) {
        throw {
          status: 400,
          message: errorMessage,
          invalidIds: [
            resources,
          ],
        }
      }
      resourceIds = [parsedId]
    }

    return resourceIds
  }

  /**
   * Convert multer file to native file.
   * 
   * @static
   * 
   * @param file - Multer file object to be converted to file.
   * 
   * @returns File or null.
   */
  static multerToFile(...file: Parameters<typeof BaseService.multerToFile>): ReturnType<typeof BaseService.multerToFile> {
    return BaseService.multerToFile(...file)
  }
}
