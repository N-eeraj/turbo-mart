import type mongoose from "mongoose"
import * as z from "zod"

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
    attribute: NonNullable<unknown>,
  ): void {
    if (type === AttributeType.TEXT) {
      const meta = (metadata as AttributeObject<AttributeType.TEXT>["metadata"])
      // ensure value is string
      let schema = z.string({ error: "Invalid attribute value, attribute requires string value" })
      // ensure value is within the max length if specified
      if (meta?.maxLength) {
        schema = schema.max(meta.maxLength, { error: `Please enter a shorter attribute value in ${meta.maxLength} characters` })
      }
      const { error } = schema.safeParse(attribute)
      if (error) throw { message: z.treeifyError(error).errors }
      return
    }
    if (type === AttributeType.NUMBER) {
      const meta = (metadata as AttributeObject<AttributeType.NUMBER>["metadata"])
      // ensure value is number
      let schema = z.number({ error: "Invalid attribute value, attribute requires number value" })
      if (meta) {
        // ensure value satisfies the min value if specified
        if (typeof meta.min === "number") {
          schema = schema.min(meta.min, `Please enter a number at least ${meta.min}, as the the attribute value`)
        }
        // ensure value satisfies the max value if specified
        if (typeof meta.max === "number") {
          schema = schema.max(meta.max, `Please enter a number within ${meta.max}, as the the attribute value`)
        }
      }
      const { error } = schema.safeParse(attribute)
      if (error) throw { message: z.treeifyError(error).errors }
      return
    }
    if (type === AttributeType.BOOLEAN) {
      // ensure value is boolean
      let schema = z.boolean({ error: "Invalid attribute value, attribute requires boolean value" })
      const { error } = schema.safeParse(attribute)
      if (error) throw { message: z.treeifyError(error).errors }
      return
    }
    if (type === AttributeType.SELECT) {
      const meta = (metadata as AttributeObject<AttributeType.SELECT>["metadata"])
      const maxIndex = meta.options.length - 1
      // ensure value is number and valid option index
      let schema = z.number({ error: "Invalid attribute value, attribute requires the option index" })
        .min(0, { error: "Invalid attribute value, option index should be at least 0" })
        .max(maxIndex, { error: `Invalid attribute value, option index should be at most ${maxIndex}` })
      const { error } = schema.safeParse(attribute)
      if (error) throw { message: z.treeifyError(error).errors }
      return
    }
    if (type === AttributeType.MULTI_SELECT) {
      const meta = (metadata as AttributeObject<AttributeType.MULTI_SELECT>["metadata"]) ?? {}
      const maxIndex = meta.options.length - 1
      // ensure value is array & length is not more than possible
      let schema = z.array(
        // ensure value is number and valid option index
        z.number({ error: "Invalid attribute value, attribute requires the option index" })
          .min(0, { error: "Invalid attribute value, option index should be at least 0" })
          .max(maxIndex, { error: `Invalid attribute value, option index should be at most ${maxIndex}` })
      , { error: "Invalid attribute value, attribute requires array value" })
        .max(maxIndex, { error: "Invalid attribute value, attribute length can't be greater than options length" })
      const { error } = schema.safeParse(attribute)
      if (error) {
        const {
          errors,
          items,
        } = z.treeifyError(error)
        if (items) {
          throw {
            message: Object.fromEntries(
              items.map(({ errors }, index) => ([ index, errors ]))
            )
          }
        }
        throw { message: errors }
      }
      return
    }
    if (type === AttributeType.COLOR) {
      // ensure value is object
      let schema = z.object({
        name: z.string({ error: "Invalid attribute value, attribute requires color name" }), // ensure string name is present
        hexCode: z.string({ error: "Invalid attribute value, attribute requires color hex code" }) // ensure string hex code is present
          .regex(/^#(?:[0-9a-f]{3}|[0-9a-f]{6})$/i, { error: "Invalid attribute value, attribute requires a valid hex code" }), // ensure hex code is valid
      }, { error: "Invalid attribute value, attribute requires record value" })
      const { error } = schema.safeParse(attribute)
      if (error) {
        const {
          errors,
          properties,
        } = z.treeifyError(error)
        if (properties) {
          throw {
            message: Object.fromEntries(
              Object.entries(properties)
                .map(([ field, { errors } ]) => ([field, errors]))
            )
          }
        }
        throw { message: errors }
      }
      if (error) throw { message: z.treeifyError(error).errors }
      return
    }
    if (type === AttributeType.DATE) {
      const meta = (metadata as AttributeObject<AttributeType.DATE>["metadata"]) ?? {}
      // ensure value is number
      let schema = z.date({ error: "Invalid attribute value, attribute requires date value" })
      if (meta) {
        // ensure value satisfies the min value if specified
        if (meta.min) {
          schema = schema.min(meta.min, `Please enter a date after ${meta.min}, as the the attribute value`)
        }
        // ensure value satisfies the max value if specified
        if (meta.max) {
          schema = schema.max(meta.max, `Please enter a date before ${meta.max}, as the the attribute value`)
        }
      }
      const { error } = schema.safeParse(attribute)
      if (error) throw { message: z.treeifyError(error).errors }
      return
    }
    if (type === AttributeType.JSON) {
      // ensure value is object
      let schema = z.record(
        z.string({ error: "Invalid attribute value, attribute requires a string key" }) // ensure string key is present
          .nonempty(PRODUCT.attributes.attribute.required)
          .trim(),
        // ensure string/number/boolean value is present
        z.union([
          z.string({ error: "Invalid attribute value, attribute requires string, number or boolean value" })
            .trim(),
          z.number({ error: "Invalid attribute value, attribute requires string, number or boolean value" }),
          z.boolean({ error: "Invalid attribute value, attribute requires string, number or boolean value" }),
        ])
      , { error: "Invalid attribute value, attribute requires record value" })
      const { error } = schema.safeParse(attribute)
      if (error) {
        const {
          errors,
          properties,
        } = z.treeifyError(error)
        if (properties) {
          throw {
            message: Object.fromEntries(
              Object.entries(properties)
                .map(([field, errors]) => ([
                  field,
                  Array.from(new Set(errors?.errors ?? []))
                ]))
            )
          }
        }
        throw { message: errors }
      }
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
      const tryCatchAttributeValidations = <T extends keyof AttributeRecord[keyof AttributeRecord]>(
        ...[type, metadata, value, id, key, variantIndex]: [
          ...Parameters<typeof this.validateAttributeMetadata>,
          NonNullable<SubcategoryObject["attributes"]>[number]["id"],
          T,
          ...(T extends "variants" ? [number] : [])
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
              ...( key === "value" && { [key]: error.message } ),
              ...( key === "variants" && { [key]: { [variantIndex]: error.message } } ),
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
              productAttribute.variants.forEach(({ value }, variantIndex) => {
                tryCatchAttributeValidations(
                  type,
                  metadata,
                  value as NonNullable<unknown>,
                  id,
                  "variants",
                  variantIndex,
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
