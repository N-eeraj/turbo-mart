import {
  type Request,
  type Response,
} from "express"

import BaseController from "#controllers/BaseController"
import CategoryService from "#services/admin/catalogue/CategoryService"

/**
 * Controller for all category related APIs routes.
 */
export default class CategoryController extends BaseController {
  /**
   * @route GET /api/admin/catalogue/category
   * 
   * Fetches the list of categories.
   */
  static async list({  }: Request, res: Response) {
    try {
      const data = await CategoryService.list()

      super.sendSuccess(res, {
        message: "Fetched Categories",
        data,
      })
    } catch (error) {
      super.sendError(res, error)
    }
  }
}

