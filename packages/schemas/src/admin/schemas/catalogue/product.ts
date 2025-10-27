import * as z from "zod"

import {
  PRODUCT,
} from "#admin/constants/validationMessages.ts"

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
  attributes: z.array(
    z.object({
      attribute: z.string({ error: PRODUCT.attributes.attribute.required })
        .nonempty(PRODUCT.attributes.attribute.required)
        .trim()
        .meta({
          description: "Attribute Id.",
          example: "01abcd091ab01a0123ab012a",
        }),
      value: z.unknown()
        .optional()
        .meta({
          description: "Value of the attribute.",
          example: "Snapdragon 8 Elite Gen 5",
        }),
      variants: z.array(
        z.object({
          value: z.unknown()
            .refine((value) => ![null, undefined, ""].includes(value as any) , {
              error: PRODUCT.attributes.variants.value.required,
            })
            .meta({
              description: "Variant value of the attribute.",
              example: "Black",
            }),
          slug: z.string({ error: PRODUCT.attributes.variants.slug.required })
            .nonempty(PRODUCT.attributes.variants.slug.required)
            .trim()
            .meta({
              description: "Unique and short name (slug) of the variant value.",
              example: "blk",
            }),
        })
      )
        .min(1, { error: PRODUCT.attributes.variants.minLength })
        .optional()
        .meta({
          description: "List of values of a variant attribute.",
        }),
    })
      .superRefine(({ value, variants }, ctx) => {
        if (value === undefined && !variants) {
          ctx.addIssue({
            message: PRODUCT.attributes.valueOrVariant.required,
            code: "custom"
          })
        } else if (value !== undefined && variants) {
          ctx.addIssue({
            message: PRODUCT.attributes.valueOrVariant.either,
            code: "custom"
          })
        } else if (value === "" || value === null) {
          ctx.addIssue({
            message: PRODUCT.attributes.value,
            path: ["value"],
            code: "custom"
          })
        }
      })
  )
    .optional(),
})

export const productUpdateSchema = productCreationSchema.partial()

export const productCreationJSONSchema = z.toJSONSchema(productCreationSchema)
export const productUpdateJSONSchema = z.toJSONSchema(productUpdateSchema)

export type ProductCreationData = z.infer<typeof productCreationSchema>
export type ProductUpdateData = z.infer<typeof productUpdateSchema>
