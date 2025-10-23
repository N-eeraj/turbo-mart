import {
  type Request,
  type Response,
} from "express"

import BaseController from "#controllers/BaseController"
import BrandService from "#catalogue/brands/service.ts"

/**
 * Controller for all brand related APIs routes.
 */
export default class BrandController extends BaseController {
  /**
   * @route POST /api/admin/catalogue/brands
   * 
   * Create new brand.
   */
  static async create({ body }: Request, res: Response) {
    try {
      const brand = super.validateRequest(brandCreationSchema, body)

      const data = await BrandService.create(brand)

      super.sendSuccess(res, {
        message: "Created Category",
        data,
      })
    } catch (error) {
      super.sendError(res, error)
    }
  }
}
