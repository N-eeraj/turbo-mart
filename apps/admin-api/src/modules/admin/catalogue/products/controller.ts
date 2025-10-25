import {
  type Request,
  type Response,
} from "express"

import BaseController from "#controllers/BaseController"
import ProductService from "#catalogue/products/service.ts"
import {
  productCreationSchema,
} from "#schemas/admin/catalogue/product"

/**
 * Controller for all product related APIs routes.
 */
export default class ProductController extends BaseController {
  /**
   * @route POST /api/admin/catalogue/products
   * 
   * Create new product.
   */
  static async create({ body }: Request, res: Response) {
    try {
      const product = super.validateRequest(productCreationSchema, body)

      const data = await ProductService.create(product)

      super.sendSuccess(res, {
        message: "Created Product",
        data,
        status: 201,
      })
    } catch (error) {
      super.sendError(res, error)
    }
  }
}
