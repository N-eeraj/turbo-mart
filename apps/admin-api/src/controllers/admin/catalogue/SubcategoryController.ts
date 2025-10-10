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
  subcategoryAttributeUpdateSchema,
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
      const categoryIds = super.parseResourceIdQueries(
        query,
        "categories",
        "Invalid category id"
      )

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

  /**
   * @route PATCH /api/admin/catalogue/subcategories/:subcategoryId/attributes
   * 
   * Set subcategory attributes.
   */
  static async setAttributes({ params, body }: Request, res: Response) {
    try {
      const subcategoryId = super.parseObjectId(params.subcategoryId)
      if (!subcategoryId) {
        throw {
          status: 400,
          message: "Invalid subcategory id",
        }
      }

      const attributeData = super.validateRequest(subcategoryAttributeUpdateSchema, body)

      const data = await SubcategoryService.setAttributes(subcategoryId, attributeData)

      super.sendSuccess(res, {
        message: "Updated Subcategory Attributes",
        data,
      })
    } catch (error) {
      super.sendError(res, error)
    }
  }
}
