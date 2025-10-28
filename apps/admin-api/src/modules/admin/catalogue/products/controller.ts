import {
  type Request,
  type Response,
} from "express"

import BaseController from "#controllers/BaseController"
import ProductService from "#catalogue/products/service.ts"
import {
  productCreationSchema,
} from "@app/schemas/admin/catalogue/product"

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

      const subcategory = super.parseObjectId(product.subcategory)
      const brand = super.parseObjectId(product.brand)
      const {
        validIds: validAttributeIds,
        invalidIds: invalidAttributeIds,
      } = super.parseObjectIdBulk(Object.keys(product.attributes ?? {}))

      if (!subcategory || !brand || invalidAttributeIds.length) {
        throw {
          status: 400,
          message: "Invalid ids",
          ...(!subcategory && { brand: product.brand }),
          ...(!brand && { subcategory: product.subcategory }),
          ...(invalidAttributeIds.length && {
            attributes: invalidAttributeIds,
          })
        }
      }

      const attributes = Object.fromEntries(
        validAttributeIds.map((attributeId) => ([
          attributeId as unknown as string,
          product.attributes?.[attributeId as unknown as string]
        ]))
      ) as Parameters<typeof ProductService.create>[0]["attributes"]

      const data = await ProductService.create({
        ...product,
        subcategory,
        brand,
        attributes,
      })

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
