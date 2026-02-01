import {
  type Request,
  type Response,
} from "express"

import BaseController from "#controllers/BaseController"
import ProductService, {
  ProductDataFieldQuery,
} from "#catalogue/products/service.ts"
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
    const product = super.validateRequest(productCreationSchema, body)

    const subcategory = super.parseObjectId(product.subcategory)
    const brand = super.parseObjectId(product.brand)

    if (!subcategory || !brand) {
      throw {
        status: 400,
        message: "Invalid ids",
        ...(!subcategory && { brand: product.brand }),
        ...(!brand && { subcategory: product.subcategory }),
      }
    }

    const data = await ProductService.create({
      ...product,
      subcategory,
      brand,
    })

    super.sendSuccess(res, {
      message: "Created Product",
      data,
      status: 201,
    })
  }

  /**
   * @route GET /api/admin/catalogue/products/:productId
   * 
   * Get one product by Id.
   */
  static async getById({ params, query }: Request, res: Response) {
    const productId = super.parseObjectId(params.productId)
    if (!productId) {
      throw {
        status: 400,
        message: "Invalid product id",
      }
    }

    const fields = Array.isArray(query.fields) ? query.fields : [query.fields ?? ProductDataFieldQuery.BASIC]
    const parsedFields = fields
      .filter((field) => {
        return Object.values(ProductDataFieldQuery)
          .includes(field as ProductDataFieldQuery)
      }) as Array<ProductDataFieldQuery>

    const data = await ProductService.getById(productId, parsedFields)

    super.sendSuccess(res, {
      message: "Fetched Product Details",
      data,
      status: 200,
    })
  }
}
