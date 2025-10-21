import {
  type Request,
  type Response,
} from "express"

import BaseController from "#controllers/BaseController"
import CategoryService, {
  type ListOptions,
} from "#catalogue/categories/service.ts"
import {
  categoryCreationSchema,
  categoryUpdateSchema,
} from "#schemas/admin/catalogue/category"

/**
 * Controller for all category related APIs routes.
 */
export default class CategoryController extends BaseController {
  /**
   * @route GET /api/admin/catalogue/categories
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
   * @route POST /api/admin/catalogue/categories
   * 
   * Create new category.
   */
  static async create({ body }: Request, res: Response) {
    try {
      const category = super.validateRequest(categoryCreationSchema, body)

      const data = await CategoryService.create(category)

      super.sendSuccess(res, {
        message: "Created Category",
        data,
      })
    } catch (error) {
      super.sendError(res, error)
    }
  }

  /**
   * @route GET /api/admin/catalogue/categories/:categoryId
   * 
   * Get one category by Id.
   */
  static async getById({ params }: Request, res: Response) {
    try {
      const categoryId = super.parseObjectId(params.categoryId)
      if (!categoryId) {
        throw {
          status: 400,
          message: "Invalid category id",
        }
      }

      const data = await CategoryService.getById(categoryId)

      super.sendSuccess(res, {
        message: "Fetched Category",
        data,
      })
    } catch (error) {
      super.sendError(res, error)
    }
  }

  /**
   * @route PATCH /api/admin/catalogue/categories/:categoryId
   * 
   * Update category.
   */
  static async update({ params, body }: Request, res: Response) {
    try {
      const categoryId = super.parseObjectId(params.categoryId)
      if (!categoryId) {
        throw {
          status: 400,
          message: "Invalid category id",
        }
      }

      const category = super.validateRequest(categoryUpdateSchema, body)

      const data = await CategoryService.update(categoryId, category)

      super.sendSuccess(res, {
        message: "Updated Category",
        data,
      })
    } catch (error) {
      super.sendError(res, error)
    }
  }

  /**
   * @route DELETE /api/admin/catalogue/categories/:categoryId
   * 
   * Delete category.
   */
  static async delete({ params }: Request, res: Response) {
    try {
      const categoryId = super.parseObjectId(params.categoryId)
      if (!categoryId) {
        throw {
          status: 400,
          message: "Invalid category id",
        }
      }

      const data = await CategoryService.delete(categoryId)

      super.sendSuccess(res, {
        message: "Deleted Category",
        data,
      })
    } catch (error) {
      super.sendError(res, error)
    }
  }

  /**
   * @route GET /api/admin/catalogue/categories/:categoryId/subcategories
   * 
   * Fetches the list of subcategories of the given category.
   */
  static async listSubcategories({ params, query }: Request, res: Response) {
    try {
      const categoryId = super.parseObjectId(params.categoryId)
      if (!categoryId) {
        throw {
          status: 400,
          message: "Invalid category id",
        }
      }
      const paginationQueries: ListOptions = super.parsePaginationQueries(query)

      const data = await CategoryService.listSubcategories(categoryId, paginationQueries)

      super.sendSuccess(res, {
        message: "Fetched Subcategories",
        data,
      })
    } catch (error) {
      super.sendError(res, error)
    }
  }
}
