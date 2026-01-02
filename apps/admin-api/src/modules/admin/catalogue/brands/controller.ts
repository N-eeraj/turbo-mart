import {
  type Request,
  type Response,
} from "express"

import BaseController from "#controllers/BaseController"
import BrandService, {
  type ListOptions,
} from "#catalogue/brands/service.ts"
import {
  brandCreationSchema,
  brandUpdateSchema,
} from "@app/schemas/admin/catalogue/brand"

/**
 * Controller for all brand related APIs routes.
 */
export default class BrandController extends BaseController {
  /**
   * @route GET /api/admin/catalogue/brands
   * 
   * Fetches the list of brands.
   */
  static async list({ query }: Request, res: Response) {
    const paginationQueries: ListOptions = super.parsePaginationQueries(query)

    const data = await BrandService.list(paginationQueries)

    super.sendSuccess(res, {
      message: "Fetched Brands",
      data,
    })
  }

  /**
   * @route POST /api/admin/catalogue/brands
   * 
   * Create new brand.
   */
  static async create({ body }: Request, res: Response) {
    const brand = super.validateRequest(brandCreationSchema, body)

    const data = await BrandService.create(brand)

    super.sendSuccess(res, {
      message: "Created Brand",
      data,
      status: 201,
    })
  }

  /**
   * @route GET /api/admin/catalogue/brands/:brandId
   * 
   * Get one brand by Id.
   */
  static async getById({ params }: Request, res: Response) {
    const brandId = super.parseObjectId(params.brandId)
    if (!brandId) {
      throw {
        status: 400,
        message: "Invalid brand id",
      }
    }

    const data = await BrandService.getById(brandId)

    super.sendSuccess(res, {
      message: "Fetched Brand",
      data,
    })
  }
  
  /**
   * @route GET /api/admin/catalogue/brands/slug/:slug
   * 
   * Get one brand by slug.
   */
  static async getBySlug({ params }: Request, res: Response) {
    const brandSlug = params.slug
    const data = await BrandService.getBySlug(brandSlug)

    super.sendSuccess(res, {
      message: "Fetched Brand",
      data,
    })
  }

  /**
   * @route PATCH /api/admin/catalogue/brands/:brandId
   * 
   * Update brand.
   */
  static async update({ params, body }: Request, res: Response) {
    const brandId = super.parseObjectId(params.brandId)
    if (!brandId) {
      throw {
        status: 400,
        message: "Invalid brand id",
      }
    }

    const brand = super.validateRequest(brandUpdateSchema, body)

    const data = await BrandService.update(brandId, brand)

    super.sendSuccess(res, {
      message: "Updated Brand",
      data,
    })
  }

  /**
   * @route DELETE /api/admin/catalogue/brands/:brandId
   * 
   * Delete brand.
   */
  static async delete({ params }: Request, res: Response) {
    const brandId = super.parseObjectId(params.brandId)
    if (!brandId) {
      throw {
        status: 400,
        message: "Invalid brand id",
      }
    }

    const data = await BrandService.delete(brandId)

    super.sendSuccess(res, {
      message: "Deleted Brand",
      data,
    })
  }
}
