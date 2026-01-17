import {
  type Request,
  type Response,
} from "express"

import BaseController from "#controllers/BaseController"
import SubcategoryService, {
  type ListOptions,
  type ParsedSubcategoryAttributeUpdateData,
} from "#catalogue/subcategories/service.ts"
import {
  subcategoryCreationSchema,
  subcategoryUpdateSchema,
  subcategoryAttributeUpdateSchema,
} from "@app/schemas/admin/catalogue/subcategory"

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
  }

  /**
   * @route POST /api/admin/catalogue/subcategories
   * 
   * Create new subcategory.
   */
  static async create({ body }: Request, res: Response) {
    const {
      category,
      ...subcategory
    } = super.validateRequest(subcategoryCreationSchema, body)
    const categoryId = super.parseObjectId(category)
    if (!categoryId) {
      throw {
        status: 422,
        message: "Invalid category id",
        errors: {
          category: [
            "Invalid category id"
          ],
        }
      }
    }

    const data = await SubcategoryService.create({
      ...subcategory,
      category: categoryId,
    })

    super.sendSuccess(res, {
      message: "Created Subcategory",
      data,
      status: 201,
    })
  }

  /**
   * @route GET /api/admin/catalogue/subcategories/attribute-types
   * 
   * Fetch attribute type list.
   */
  static async listAttributeTypes(_req: Request, res: Response) {
    const data = await SubcategoryService.listAttributeTypes()

    super.sendSuccess(res, {
      data,
      message: "Fetched Attribute Types",
    })
  }

  /**
   * @route GET /api/admin/catalogue/subcategories/:subcategoryId
   * 
   * Get one subcategory by Id.
   */
  static async getById({ params }: Request, res: Response) {
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
  }
  
  /**
   * @route GET /api/admin/catalogue/subcategories/slug/:slug
   * 
   * Get one subcategory by slug.
   */
  static async getBySlug({ params }: Request, res: Response) {
    const subcategorySlug = params.slug
    const data = await SubcategoryService.getBySlug(subcategorySlug)

    super.sendSuccess(res, {
      message: "Fetched Subcategory",
      data,
    })
  }

  /**
   * @route PATCH /api/admin/catalogue/subcategories/:subcategoryId
   * 
   * Update subcategory.
   */
  static async update({ params, body }: Request, res: Response) {
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
  }

  /**
   * @route DELETE /api/admin/catalogue/subcategories/:subcategoryId
   * 
   * Delete subcategory.
   */
  static async delete({ params }: Request, res: Response) {
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
  }

  /**
   * @route GET /api/admin/catalogue/subcategories/:subcategoryId/attributes
   * 
   * Get subcategory attributes.
   */
  static async getAttributes({ params }: Request, res: Response) {
    const subcategoryId = super.parseObjectId(params.subcategoryId)
    if (!subcategoryId) {
      throw {
        status: 400,
        message: "Invalid subcategory id",
      }
    }

    const data = await SubcategoryService.getAttributes(subcategoryId)

    super.sendSuccess(res, {
      message: "Fetched Subcategory Attributes",
      data,
    })
  }


  /**
   * @route PATCH /api/admin/catalogue/subcategories/:subcategoryId/attributes
   * 
   * Set subcategory attributes.
   */
  static async setAttributes({ params, body }: Request, res: Response) {
    const subcategoryId = super.parseObjectId(params.subcategoryId)
    if (!subcategoryId) {
      throw {
        status: 400,
        message: "Invalid subcategory id",
      }
    }

    const attributeData = super.validateRequest(subcategoryAttributeUpdateSchema, body)

    const {
      validIds: validUpdateIds,
      invalidIds: invalidUpdateIds,
    } = super.parseObjectIdBulk((attributeData.update ?? []).map(({ id }) => id))

    const {
      validIds: validDeleteIds,
      invalidIds: invalidDeleteIds,
    } = super.parseObjectIdBulk(attributeData.delete ?? [])

    if (invalidUpdateIds.length || invalidDeleteIds.length) {
      throw {
        status: 400,
        message: "Invalid attribute ids",
        ...(invalidUpdateIds.length && { update: invalidUpdateIds }),
        ...(invalidDeleteIds.length && { delete: invalidDeleteIds }),
      }
    }

    const parsedAttributeData: ParsedSubcategoryAttributeUpdateData = {
      create: attributeData.create ?? [],
      update: (attributeData.update ?? []).map((attribute, index) => ({ ...attribute, id: validUpdateIds[index] })),
      delete: validDeleteIds,
    }

    const data = await SubcategoryService.setAttributes(subcategoryId, parsedAttributeData)

    super.sendSuccess(res, {
      message: "Updated Subcategory Attributes",
      data,
    })
  }
}
