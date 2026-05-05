import * as z from "zod"
import {
  AttributeType,
} from "@app/database/mongoose/enums/catalogue/attribute"
import type {
  AttributeObject,
} from "@app/database/mongoose/models/Catalogue/Attributes"
import {
  DateFormats,
} from "@app/definitions/date"
import {
  PRODUCT,
} from "#admin/constants/validationMessages"

interface JsonAttributeValueError {
  key?: string
  value?: string
}
type AttributeValidationResponse<T extends boolean = false> = {
  isValid: true
  error: undefined
} | {
  isValid: false
  error: T extends true ? string | Array<JsonAttributeValueError> : string
}
type AttributeMetadata<T extends AttributeType> = AttributeObject<T>["metadata"]
type OptionsWithId<
  T extends Array<AttributeMetadata<AttributeType.SELECT | AttributeType.MULTI_SELECT>["options"][number]>
> = Array<T[number] & { id: string }>
interface ZodErrorTree {
  errors: Array<string>
  items?: Array<unknown>
}

export const productCreationSchema = z.object({
  subcategory: z.string({ error: PRODUCT.subcategory.required })
    .nonempty(PRODUCT.subcategory.required)
    .trim()
    .meta({
      description: "Subcategory Id.",
      example: "01abcd091ab01a0123ab012a",
    }),
  brand: z.string({ error: PRODUCT.brand.required })
    .nonempty(PRODUCT.brand.required)
    .trim()
    .meta({
      description: "Brand Id.",
      example: "01abcd091ab01a0123ab012a",
    }),
  name: z.string({ error: PRODUCT.name.required })
    .nonempty(PRODUCT.name.required)
    .trim()
    .meta({
      description: "Name of the product.",
      example: "iPhone 17",
    }),
  slug: z.string({ error: PRODUCT.slug.required })
    .nonempty(PRODUCT.slug.required)
    .trim()
    .regex(/^[a-zA-Z0-9]+$/, {
      error: PRODUCT.slug.valid,
    })
    .meta({
      description: "Slug of the product.",
      example: "iphone17",
    }),
})

const attributeId = z.string({ error: PRODUCT.attributes.attribute.required })
  .nonempty(PRODUCT.attributes.attribute.required)
  .trim()
  .meta({
    description: "ID of the attribute.",
    example: "01abcd091ab01a0123ab012a"
  })
const attributeValue = z.unknown()
  .meta({
    description: "Value of the attribute, type and structure of the value depends on the attribute type.",
  })

const attributeLabel = z.string({ error: PRODUCT.attributes.label.required })
  .trim()
  .optional()
  .meta({
    description: "Label name of the attribute.",
    example: "1TB"
  })
const attributeMeta = z.looseObject({})
  .optional()
  .meta({
    description: "Additional attribute value details.",
    example: {
      unit: 3,
    }
  })
export const numberAttributeMetaFormat = z.number({ error: "Please select a unit" })
export const dateAttributeMetaFormat = z.enum(DateFormats, { error: "Please select a date format" })

export function validateAttributeValue<T extends AttributeType>(
  value: unknown,
  type: T,
  required: boolean,
  metadata: AttributeMetadata<T>,
): AttributeValidationResponse<true> {
  const isValidValueResponse: AttributeValidationResponse<true> = {
    isValid: true,
    error: undefined,
  }

  let schema: z.ZodType

  switch (type) {
    case AttributeType.TEXT: {
      const meta = metadata as AttributeMetadata<AttributeType.TEXT>

      let stringSchema = z.string({ error: "Please enter a value" })
        .trim()
        .min(1, { error: "Please enter a value" })

      if (meta?.maxLength) {
        stringSchema = stringSchema.max(meta.maxLength, { error: "Value is too long" })
      }
      schema = stringSchema
      break
    }

    case AttributeType.NUMBER: {
      const meta = metadata as AttributeMetadata<AttributeType.NUMBER>

      let numberSchema = z.coerce.number({ error: "Please enter a valid number" })

      if (!meta?.allowDecimal) {
        numberSchema = numberSchema.int({ error: "Value cannot be decimal" })
      }
      if (!meta?.allowNegative) {
        numberSchema = numberSchema.nonnegative({ error: "Value cannot be negative" })
      }
      if (meta?.step != null) {
        numberSchema = numberSchema.step(meta.step, {
          error: `Value must be a multiple of ${meta.step}`,
        })
      }
      if (meta?.min != null) {
        numberSchema = numberSchema.min(meta.min, {
          error: `Value must be greater than ${meta.min}`,
        })
      }
      if (meta?.max != null) {
        numberSchema = numberSchema.max(meta.max, {
          error: `Value must be less than ${meta.max}`,
        })
      }
      schema = numberSchema
      break
    }

    case AttributeType.BOOLEAN: {
      const booleanSchema = z.boolean({ error: "Please select a valid boolean" })
      schema = booleanSchema
      break
    }

    case AttributeType.SELECT: {
      const meta = metadata as AttributeMetadata<AttributeType.SELECT>

      const selectSchema = z.string({ error: "Please select an option" })
        .nonempty({ error: "Please select an option" })
        .refine((value) => {
          return !(meta.options as OptionsWithId<typeof meta.options>).some((option) => option.id as string === value)
        }, { error: "Please select a valid option" })
      schema = selectSchema
      break
    }

    case AttributeType.MULTI_SELECT: {
      const meta = metadata as AttributeMetadata<AttributeType.SELECT>

      let multiSelectSchema = z.array(
        z.string({ error: "Please select an option" })
          .nonempty({ error: "Please select an option" })
      )
        .refine((values) => {
          return values.every((value) => {
            return (meta.options as OptionsWithId<typeof meta.options>).some((option) => option.id as string === value)
          })
        }, { error: "Please select a valid option" })
      if (required) {
        multiSelectSchema = multiSelectSchema
          .min(1, { error: "Please select at least 1 option" })
      }
      schema = multiSelectSchema
      break
    }

    case AttributeType.COLOR: {
      const colorSchema = z.string({ error: "Please select a color" })
      schema = colorSchema
      break
    }

    case AttributeType.DATE: {
      const colorSchema = z.iso.datetime({ error: "Please enter a valid date" })
      schema = colorSchema
      break
    }

    case AttributeType.JSON: {
      const jsonSchema = z.array(
        z.object({
          key: z.string({ error: "Please enter a key name" })
            .nonempty({ error: "Please enter a key name" }),
          value: z.string({ error: "Please enter a value" })
            .nonempty({ error: "Please enter a value" }),
        })
      )
      schema = jsonSchema
      break
    }

    default:
      return isValidValueResponse
  }

  if (
    !required ||
    type === AttributeType.JSON
  ) {
    schema = schema
      .optional()
      .nullable()
  }

  const {
    success,
    error: parseError,
  } = schema.safeParse(value)

  // handle value errors
  if (!success) {
    const errorTree: ZodErrorTree = z.treeifyError(parseError)
    let error: AttributeValidationResponse<true>["error"] = errorTree.errors[0]

    if (type === AttributeType.MULTI_SELECT && !error) { // multi select item error handling
      const multiSelectItemErrors = errorTree.items?.[0]
      if (
        multiSelectItemErrors
        && typeof multiSelectItemErrors === "object"
        && "errors" in multiSelectItemErrors
        && Array.isArray(multiSelectItemErrors.errors)
      ) {
        error = multiSelectItemErrors.errors[0]
      }
    } else if (type === AttributeType.JSON) { // JSON key-value error handling
      const jsonErrors = errorTree.items?.map((item) => {
        if (
          item &&
          typeof item === "object" &&
          "properties" in item
        ) {
          const properties = item.properties as Record<"key" | "value", any>
          return {
            key: properties?.key?.errors?.[0],
            value: properties?.value?.errors?.[0],
          }
        }
        return {}
      })
      if (jsonErrors) {
        error = jsonErrors
      }
    }

    return {
      isValid: false,
      error: (error || "Invalid value") satisfies NonNullable<AttributeValidationResponse<true>["error"]>,
    }
  }

  return isValidValueResponse
}
export function validateAttributeMeta(
  meta: Record<string, unknown> | undefined,
  type: AttributeType,
  metadata: any,
): AttributeValidationResponse {
  const isValidValueResponse: AttributeValidationResponse = {
    isValid: true,
    error: undefined,
  }
  let value: unknown
  let schema: z.ZodType

  switch (type) {
    case AttributeType.NUMBER: {
      schema = numberAttributeMetaFormat
      value = meta?.unit
      break
    }

    case AttributeType.DATE: {
      schema = dateAttributeMetaFormat
      value = meta?.format
      break
    }

    default:
      return isValidValueResponse
  }

  const {
    error,
  } = schema.safeParse(value)
  if (error) {
    return {
      isValid: false,
      error: z.treeifyError(error).errors[0],
    }
  }
  return isValidValueResponse
}

export const productAttributeSchema = z.object({
  properties: z.array(
    z.object({
      attribute: attributeId,
      value: attributeValue,
      label: attributeLabel,
      meta: attributeMeta,
    })
  )
    .optional(),
  variants: z.array(
    z.object({
      attribute: attributeId,
      values: z.array(
        z.object({
          value: attributeValue,
          label: attributeLabel,
          meta: attributeMeta,
          slug: z.string({ error: PRODUCT.attributes.variants.slug.required })
            .nonempty(PRODUCT.attributes.variants.slug.required)
            .regex(/^[a-zA-Z0-9]+$/, {
              error: PRODUCT.attributes.variants.slug.alphanumeric,
            })
            .trim(),
        })
      ),
    })
  )
    .optional(),
})
  .meta({
    description: "Attribute object with properties and variants as a list",
    example: {
      properties: [
        {
          attribute: "01abcd091ab01a0123ab012a",
          value: "Snapdragon 8 Elite Gen 5",
        },
      ],
      variants: [
        {
          attribute: "01abcd091ab01a0123ab012b",
          slug: "black",
          value: "#111",
          label: "Space Black",
        },
      ],
    },
  })

export const productSkuListSchema = z.object({
  skuLists: z.array(
    z.object({
      media: z.array(
        z.union([
          z.file({ error: PRODUCT.skuList.media.image.required })
            .max(5_24_288, { error: PRODUCT.skuList.media.image.maxSize })
            .mime([
              "image/jpeg",
              "image/png",
              "image/webp",
              "image/heic",
              "image/gif",
            ], { error: PRODUCT.skuList.media.image.valid }),
          z.file({ error: PRODUCT.skuList.media.video.required })
            .max(52_42_880, { error: PRODUCT.skuList.media.video.maxSize })
            .mime([
              "video/mp4",
              "video/webm",
              "video/ogg",
            ], { error: PRODUCT.skuList.media.video.valid }),
        ])
      )
        .optional()
        .meta({
          description: "Media for the SKU item.",
        }),
    })
      .catchall(
        z.string({ error: PRODUCT.skuList.variant.slug.required })
          .nonempty(PRODUCT.skuList.variant.slug.required)
          .trim()
          .meta({
            description: "Variant Id slug records.",
          })
      )
  )
    .min(1, { error: PRODUCT.skuList.minLength })
})

export const productSchema = productCreationSchema
  .extend({
    attributes: productAttributeSchema
  })
  .extend(productSkuListSchema.shape)

export const productUpdateSchema = productCreationSchema.partial()

export const productCreationJSONSchema = z.toJSONSchema(productCreationSchema)
export const productUpdateJSONSchema = z.toJSONSchema(productUpdateSchema)
export const productAttributeJSONSchema = z.toJSONSchema(productAttributeSchema)
export const productSkuListJSONSchema = z.toJSONSchema(productSkuListSchema)
export const productJSONSchema = z.toJSONSchema(productSchema)

export type ProductCreationData = z.infer<typeof productCreationSchema>
export type ProductUpdateData = z.infer<typeof productUpdateSchema>
export type ProductAttributeData = z.infer<typeof productAttributeSchema>
export type ProductSkuListData = z.infer<typeof productSkuListSchema>
export type Product = z.infer<typeof productSchema>
