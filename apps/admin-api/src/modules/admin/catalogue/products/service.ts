import type mongoose from "mongoose"

import {
  type ProductObject,
} from "@app/database/mongoose/models/Catalogue/Product.ts"
import Subcategory, {
  SubcategoryObject,
  transformSubcategory,
} from "@app/database/mongoose/models/Catalogue/Subcategory.ts"
import Brand from "@app/database/mongoose/models/Catalogue/Brand.ts"
import type {
  ProductCreationData,
} from "@app/schemas/admin/catalogue/product"
import {
  AttributeObject,
  AttributeType
} from "@app/database/mongoose/models/Catalogue/Attributes.ts"
import {
  PRODUCT,
} from "@app/schemas/adminConstants/validationMessages"

import BaseService from "#services/BaseService"
export interface ListOptions {
  limit?: number
  skip?: number
  search?: string
  order?: mongoose.SortOrder
}

export type ParsedProductCreationData = Omit<ProductCreationData, "brand" | "subcategory"> & {
  subcategory: ProductObject["subcategory"]
  brand: ProductObject["brand"]
}

type AttributeRecord = NonNullable<ParsedProductCreationData["attributes"]>

const DEFAULT_LIST_OPTIONS: Required<ListOptions> = {
  limit: 10,
  skip: 0,
  order: "descending",
  search: "",
}

export default class ProductService extends BaseService {
  /**
   * Ensures that a subcategory with the given id exists.
   * 
   * @param subcategoryId - id of the subcategory to check.
   * 
   * @returns the subcategory found
   * 
   * @throws 404 error if subcategory is not found.
   */
  private static async ensureSubcategory(subcategoryId: ProductObject["subcategory"]) {
    const subcategory = await Subcategory.findById(subcategoryId)
    if (subcategory) return transformSubcategory(subcategory)

    // throw error if subcategory is not found
    throw {
      status: 404,
      message: "Subcategory not found",
    }
  }

  /**
   * Ensures that a brand with the given id exists.
   * 
   * @param brandId - id of the brand to check.
   * 
   * @throws 404 error if brand is not found.
   */
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

  private static validateAttributeMetadata<T extends AttributeType>(
    type: T,
    metadata: AttributeObject<T>["metadata"],
    attribute: unknown,
  ): void {
    if (!metadata) return
    if (type === AttributeType.TEXT) {
      const meta = (metadata as AttributeObject<AttributeType.TEXT>["metadata"])
      if (meta?.maxLength) {
        if (typeof attribute !== "string") {
          throw {
            message: ["Invalid attribute value, attribute requires string value"]
          }
        }
        if (attribute.length > meta.maxLength) {
          throw {
            message: [`Please enter a shorter attribute value in ${meta.maxLength} characters`]
          }
        }
      }
      return
    }
    if (type === AttributeType.NUMBER) {
      const meta = (metadata as AttributeObject<AttributeType.NUMBER>["metadata"])
      if (meta) {
        if (typeof attribute !== "number") {
          throw {
            message: ["Invalid attribute value, attribute requires number value"]
          }
        }
        if (typeof meta.max === "number" && meta.max < attribute) {
          throw {
            message: [`Please enter a number within ${meta.max}, as the the attribute value`]
          }
        }
        if (typeof meta.min === "number" && meta.min > attribute) {
          throw {
            message: [`Please enter a number at least ${meta.min}, as the the attribute value`]
          }
        }
        // if (meta.max < attribute || meta.min > atr) {
        //   throw {
        //     message: `Please enter a shorter attribute value in ${meta.maxLength} characters`
        //   }
        // }
      }
      return
    }
    if (type === AttributeType.BOOLEAN) {
      const meta = (metadata as AttributeObject<AttributeType.BOOLEAN>["metadata"]) ?? {}
      return
    }
    if (type === AttributeType.SELECT) {
      const meta = (metadata as AttributeObject<AttributeType.SELECT>["metadata"]) ?? {}
      return
    }
    if (type === AttributeType.MULTI_SELECT) {
      const meta = (metadata as AttributeObject<AttributeType.MULTI_SELECT>["metadata"]) ?? {}
      return
    }
    if (type === AttributeType.COLOR) {
      const meta = (metadata as AttributeObject<AttributeType.COLOR>["metadata"]) ?? {}
      return
    }
    if (type === AttributeType.DATE) {
      const meta = (metadata as AttributeObject<AttributeType.DATE>["metadata"]) ?? {}
      return
    }
    if (type === AttributeType.JSON) {
      const meta = (metadata as AttributeObject<AttributeType.JSON>["metadata"]) ?? {}
      return
    }
  }

  /**
   * Validate the subcategory level attributes for a given product attribute.
   * 
   * @param attributes - The attributes in the subcategory.
   * @param productAttributes - The product attributes to validate.
   */
  private static validateProductAttributes(
    attributes: SubcategoryObject["attributes"],
    productAttributes: ParsedProductCreationData["attributes"],
  ): ParsedProductCreationData["attributes"] | undefined {
    const attributeValidationErrors: Record<
      string,
      Array<string> | Partial<Record<
        keyof AttributeRecord[keyof AttributeRecord],
        Array<string>
      >>
    > = {}

    if (!attributes) return undefined

    if (productAttributes) {
      attributes.forEach(({ id, name, required, type, variant, metadata }) => {
        const productAttribute = productAttributes[id as unknown as string]

        // ensure the required attribute is provided
        if (required && !productAttribute) {
          attributeValidationErrors[id.toString()] = [
            PRODUCT.attributes.attribute.subcategoryRequired,
          ]
        }

        if (productAttribute) {
          if (variant) { // handle variant attribute
            if (!productAttribute.variants) { // handle missing variant
              attributeValidationErrors[id.toString()] = {
                variants: [
                  PRODUCT.attributes.variants.attributeRequired,
                ]
              }
            } else {
              productAttribute.variants.forEach((value) => {
                this.validateAttributeMetadata(
                  type,
                  metadata,
                  value,
                )
              })
            }
          } else { // handle value attribute
            if (!productAttribute.value) { // handle missing value
              attributeValidationErrors[id.toString()] = {
                value: [
                  PRODUCT.attributes.value.attributeRequired
                ]
              }
            } else {
              this.validateAttributeMetadata(
                type,
                metadata,
                productAttribute.value,
              )
            }
          }
        }
      })
    }

    if (Object.keys(attributeValidationErrors).length) {
      throw {
        status: 422,
        message: "Product attributes don’t match the subcategory requirements",
        attributes: attributeValidationErrors,
      }
    }

    return productAttributes
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

    product.attributes = this.validateProductAttributes(attributes, product.attributes)
  }
}
