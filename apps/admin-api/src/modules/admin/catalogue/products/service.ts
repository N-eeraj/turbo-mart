import type mongoose from "mongoose"

import {
  type ProductObject,
} from "@app/database/mongoose/models/Catalogue/Product.ts"
import Subcategory, {
  transformSubcategory,
} from "@app/database/mongoose/models/Catalogue/SubCategory.ts"
import Brand from "@app/database/mongoose/models/Catalogue/Brand.ts"
import {
  type AttributeObject,
  type AttributeType,
} from "@app/database/mongoose/models/Catalogue/Attributes.js"
import type {
  ProductCreationData,
} from "@app/schemas/admin/catalogue/product"

import BaseService from "#services/BaseService"
export interface ListOptions {
  limit?: number
  skip?: number
  search?: string
  order?: mongoose.SortOrder
}

const DEFAULT_LIST_OPTIONS: Required<ListOptions> = {
  limit: 10,
  skip: 0,
  order: "descending",
  search: "",
}

export type ParsedProductCreationData = Omit<ProductCreationData, "brand" | "subcategory"> & {
  subcategory: ProductObject["subcategory"]
  brand: ProductObject["brand"]
}

export default class ProductService extends BaseService {
  private static async ensureSubcategory(subcategoryId: ProductObject["subcategory"]) {
    const subcategory = await Subcategory.findById(subcategoryId)
    if (subcategory) return transformSubcategory(subcategory)

    // throw error if subcategory is not found
    throw {
      status: 404,
      message: "Subcategory not found",
    }
  }

  private static async ensureBrand(brandId: ProductObject["brand"]) {
    const brand = await Brand.findById(brandId)
      .select({ _id: 1 })
    // throw error if brand is not found
    if (!brand) {
      throw {
        status: 404,
        message: "Brand not found",
      }
    }
  }

  private static validateProductAttributes(
    attributes: Array<AttributeObject<AttributeType>>,
    productAttributes: ParsedProductCreationData["attributes"],
  ) {
    const missingRequiredAttributes: Array<{
      id: mongoose.Types.ObjectId
      name: AttributeObject<AttributeType>["name"]
    }> = []
    const invalidAttributeData: Array<{
      id: mongoose.Types.ObjectId
      name: AttributeObject<AttributeType>["name"]
      required: keyof NonNullable<typeof productAttributes>[string]
    }> = []

    if (productAttributes) {
      attributes.forEach(({ id, name, required, type, variant, metadata }) => {
        const productAttribute = productAttributes![id as unknown as string]

        // ensure the required attribute is provided
        if (required && !productAttribute) {
          missingRequiredAttributes.push({
            id,
            name,
          })
        }

        if (productAttribute) {
          // ensure the attribute data matches the variant structure
          if (variant && !productAttribute.variants) {
            invalidAttributeData.push({
              id,
              name,
              required: "variants",
            })
          } else if (!variant && !productAttribute.value) {
            invalidAttributeData.push({
              id,
              name,
              required: "value",
            })
          }
        }
      })
    }

    if (missingRequiredAttributes.length) {
      console.log("Missing required attributes", missingRequiredAttributes)
    }
    if (invalidAttributeData.length) {
      console.log("Invalid attribute data", invalidAttributeData)
    }
  }

  /**
   * Creates a new product.
   * 
   * @param productData - The data for new the product.
   * 
   * @returns the newly created product.
   * 
   * @throws If product creation fails.
   */
  static async create(product: ParsedProductCreationData): Promise<ProductObject> {
    await this.ensureBrand(product.brand)
    const { attributes } = await this.ensureSubcategory(product.subcategory)

    this.validateProductAttributes(attributes, product.attributes)
  }
}
