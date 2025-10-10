import {
  type Request,
  type Response,
} from "express"

import BaseController from "#controllers/BaseController"
import SubcategoryService, {
  type ListOptions,
} from "#services/admin/catalogue/SubcategoryService"
import {
  subcategoryCreationSchema,
  subcategoryUpdateSchema,
} from "#schemas/admin/catalogue/subcategory"

/**
 * Controller for all subcategory related APIs routes.
 */
export default class SubcategoryController extends BaseController {
  /**
   * @route GET /api/admin/catalogue/subcategories
   * 
   * Fetches the list of subcategories.
   */
  static async list({ query }: Request, res: Response) {
    try {
      const paginationQueries: ListOptions = super.parsePaginationQueries(query)
      const categories = query.categories

      let categoryIds

      if (Array.isArray(categories)) {
        const {
          validIds,
          invalidIds,
        } = super.parseObjectIdBulk(categories as Array<string>)

        if (invalidIds.length) {
          throw {
            status: 400,
            message: "Invalid category id",
            invalidIds,
          }
        }

        categoryIds = validIds
      } else if (typeof categories === "string") {
        const parsedId = super.parseObjectId(categories)
        if (parsedId === null) {
          throw {
            status: 400,
            message: "Invalid category id",
            invalidIds: [
              categories,
            ],
          }
        }
        categoryIds = [parsedId]
      }

      const data = await SubcategoryService.list({
        ...paginationQueries,
        categories: categoryIds,
      })

      super.sendSuccess(res, {
        message: "Fetched Subcategories",
        data,
      })
    } catch (error) {
      super.sendError(res, error)
    }
  }

  /**
   * @route POST /api/admin/catalogue/subcategories
   * 
   * Create new subcategory.
   */
  static async create({ body }: Request, res: Response) {
    try {
      const subcategory = super.validateRequest(subcategoryCreationSchema, body)

      const data = await SubcategoryService.create(subcategory)

      super.sendSuccess(res, {
        message: "Created Subcategory",
        data,
      })
    } catch (error) {
      super.sendError(res, error)
    }
  }

  /**
   * @route GET /api/admin/catalogue/subcategories/:subcategoryId
   * 
   * Get one subcategory by Id.
   */
  static async getById({ params }: Request, res: Response) {
    try {
      const subcategoryId = super.parseObjectId(params.subcategoryId)
      if (!subcategoryId) {
        throw {
          status: 400,
          message: "Invalid subcategory id",
        }
      }

      const data = await SubcategoryService.getById(subcategoryId)

      super.sendSuccess(res, {
        message: "Fetched Subcategory",
        data,
      })
    } catch (error) {
      super.sendError(res, error)
    }
  }

  /**
   * @route PATCH /api/admin/catalogue/subcategories/:subcategoryId
   * 
   * Update subcategory.
   */
  static async update({ params, body }: Request, res: Response) {
    try {
      const subcategoryId = super.parseObjectId(params.subcategoryId)
      if (!subcategoryId) {
        throw {
          status: 400,
          message: "Invalid subcategory id",
        }
      }

      const subcategory = super.validateRequest(subcategoryUpdateSchema, body)

      const data = await SubcategoryService.update(subcategoryId, subcategory)

      super.sendSuccess(res, {
        message: "Updated Subcategory",
        data,
      })
    } catch (error) {
      super.sendError(res, error)
    }
  }

  /**
   * @route DELETE /api/admin/catalogue/subcategories/:subcategoryId
   * 
   * Delete subcategory.
   */
  static async delete({ params }: Request, res: Response) {
    try {
      const subcategoryId = super.parseObjectId(params.subcategoryId)
      if (!subcategoryId) {
        throw {
          status: 400,
          message: "Invalid subcategory id",
        }
      }

      const data = await SubcategoryService.delete(subcategoryId)

      super.sendSuccess(res, {
        message: "Deleted Subcategory",
        data,
      })
    } catch (error) {
      super.sendError(res, error)
    }
  }
}
