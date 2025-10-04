import {
  type Request,
  type Response,
} from "express"

import BaseController from "#controllers/BaseController"
import CategoryService, {
  type ListOptions,
} from "#services/admin/catalogue/CategoryService"
import {
  categorySchema,
} from "#schemas/admin/catalogue/category"

/**
 * Controller for all category related APIs routes.
 */
export default class CategoryController extends BaseController {
  /**
   * @route GET /api/admin/catalogue/category
   * 
   * Fetches the list of categories.
   */
  static async list({ query }: Request, res: Response) {
    try {
      const paginationQueries: ListOptions = super.parsePaginationQueries(query)

      const data = await CategoryService.list(paginationQueries)

      super.sendSuccess(res, {
        message: "Fetched Categories",
        data,
      })
    } catch (error) {
      super.sendError(res, error)
    }
  }
  /**
   * @route POST /api/admin/catalogue/category
   * 
   * Create new category.
   */
  static async create({ body }: Request, res: Response) {
    try {
      const category = super.validateRequest(categorySchema, body)

      const data = await CategoryService.create(category)

      super.sendSuccess(res, {
        message: "Created Category",
        data,
      })
    } catch (error) {
      super.sendError(res, error)
    }
  }
}

