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
    if (type === AttributeType.TEXT) {
      // ensure value is string
      if (typeof attribute !== "string") {
        throw {
          message: ["Invalid attribute value, attribute requires string value"]
        }
      }
      const meta = (metadata as AttributeObject<AttributeType.TEXT>["metadata"])
      if (meta?.maxLength) {
        // ensure value is within the max length if specified
        if (attribute.length > meta.maxLength) {
          throw {
            message: [`Please enter a shorter attribute value in ${meta.maxLength} characters`]
          }
        }
      }
      return
    }
    if (type === AttributeType.NUMBER) {
      // ensure value is number
      if (typeof attribute !== "number") {
        throw {
          message: ["Invalid attribute value, attribute requires number value"]
        }
      }
      const meta = (metadata as AttributeObject<AttributeType.NUMBER>["metadata"])
      if (meta) {
        // ensure value satisfies the max value if specified
        if (typeof meta.max === "number" && meta.max < attribute) {
          throw {
            message: [`Please enter a number within ${meta.max}, as the the attribute value`]
          }
        }
        // ensure value satisfies the min value if specified
        if (typeof meta.min === "number" && meta.min > attribute) {
          throw {
            message: [`Please enter a number at least ${meta.min}, as the the attribute value`]
          }
        }
      }
      return
    }
    if (type === AttributeType.BOOLEAN) {
      // ensure value is boolean
      if (typeof attribute !== "boolean") {
        throw {
          message: ["Invalid attribute value, attribute requires boolean value"]
        }
      }
      return
    }
    if (type === AttributeType.SELECT) {
      // ensure value is number
      if (typeof attribute !== "number") {
        throw {
          message: ["Invalid attribute value, attribute requires the option index"]
        }
      }
      const meta = (metadata as AttributeObject<AttributeType.SELECT>["metadata"])
      // ensure the valid option index
      if (attribute < 0 || attribute >= meta.options.length) {
        throw {
          message: ["Invalid attribute value, attribute out of bounds of option index"]
        }
      }
      return
    }
    if (type === AttributeType.MULTI_SELECT) {
      // ensure value is array
      if (!Array.isArray(attribute)) {
        throw {
          message: ["Invalid attribute value, attribute requires array value"]
        }
      }
      const meta = (metadata as AttributeObject<AttributeType.MULTI_SELECT>["metadata"]) ?? {}
      if (attribute.length > meta.options.length) {
        throw {
          message: ["Invalid attribute value, attribute length can't be greater than options length"]
        }
      }
      const validationErrors = attribute.reduce((errorAccumulator, option, optionIndex) => {
        if (typeof option !== "number") {
          errorAccumulator[optionIndex] =  ["Invalid attribute value, attribute requires the option index"]
        } else if (option < 0 || option >= meta.options.length) {
          errorAccumulator[optionIndex] =  ["Invalid attribute value, attribute out of bounds of option index"]
        }
        return errorAccumulator
      }, {})
      if (Object.keys(validationErrors).length) {
        throw {
          message: validationErrors
        }
      }
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
    /**
     * The list of attribute validations errors.
     * Consists of both the attribute level error as well as the attribute value/variant errors.
     */
    const attributeValidationErrors: Record<
      string,
      Array<string> | Partial<Record<
        keyof AttributeRecord[keyof AttributeRecord],
        Array<string>
      >>
    > = {}

    if (!attributes) return undefined

    if (productAttributes) {
      /**
       * A closure that wraps the `validateAttributeMetadata` function in a try/catch block.
       * If an error occurs, it is added to the `attributeValidationErrors`.
       * 
       * @param type - The type of the attribute value.
       * @param metadata - The metadata of the attribute that's used to validate the product attribute value.
       * @param value - The product attribute value to validate.
       * @param id - The attribute id
       * @param key - The key to which the error has to be attached to.
       * 
       * @throws errors from `validateAttributeMetadata` that cannot be handled.
       */
      const tryCatchAttributeValidations = (
        ...[type, metadata, value, id, key]: [
          ...Parameters<typeof this.validateAttributeMetadata>,
          NonNullable<SubcategoryObject["attributes"]>[number]["id"],
          keyof AttributeRecord[keyof AttributeRecord],
        ]
      ) => {
        try {
          this.validateAttributeMetadata(
            type,
            metadata,
            value,
          )
        } catch(error) {
          if (error && typeof error === "object" && "message" in error && (Array.isArray(error.message) || typeof error.message === "object")) {
            attributeValidationErrors[id.toString()] = {
              [key]: error.message,
            }
          } else {
            throw error
          }
        }
      }

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
                tryCatchAttributeValidations(
                  type,
                  metadata,
                  value,
                  id,
                  "variants",
                )
              })
            }
          } else { // handle value attribute
            if (productAttribute.value === null || productAttribute.value == undefined) { // handle missing value
              attributeValidationErrors[id.toString()] = {
                value: [
                  PRODUCT.attributes.value.attributeRequired
                ]
              }
            } else {
              tryCatchAttributeValidations(
                type,
                metadata,
                productAttribute.value,
                id,
                "value",
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
  static async create(product: ParsedProductCreationData): Promise<void> {
    await this.ensureBrand(product.brand)
    const { attributes } = await this.ensureSubcategory(product.subcategory)

    product.attributes = this.validateProductAttributes(attributes, product.attributes)
  }
}
