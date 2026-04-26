import * as z from "zod"

import {
  PRODUCT,
} from "#admin/constants/validationMessages"

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
      message: PRODUCT.slug.valid,
    })
    .meta({
      description: "Slug of the product.",
      example: "iphone17",
    }),
})

const attributeId = z.string({ error: PRODUCT.attributes.attribute.required })
  .nonempty(PRODUCT.attributes.attribute.required)
  .trim()
const attributeValue = z.union([
  z.string({ error: PRODUCT.attributes.value.required })
    .nonempty({ error: PRODUCT.attributes.value.required })
    .trim(),
  z.array(
    z.string({ error: PRODUCT.attributes.value.list.item.required })
      .nonempty({ error: PRODUCT.attributes.value.list.item.required })
      .trim(),
  )
    .min(1, { error: PRODUCT.attributes.value.list.minLength }),
  z.array(
    z.object({
      key: z.string({ error: PRODUCT.attributes.value.json.key.required })
        .trim()
        .min(1, { error: PRODUCT.attributes.value.json.key.required }),
      value: z.string({ error: PRODUCT.attributes.value.json.value.required })
        .trim()
        .min(1, { error: PRODUCT.attributes.value.json.value.required }),
    })
  )
    .optional(),
])
const attributeLabel = z.string({ error: PRODUCT.attributes.label.required })
  .trim()
  .optional()
const attributeMeta = z.looseObject({})
  .optional()

export const productAttributeSchema = z.object({
  attributes: z.object({
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
    .optional()
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
  .extend(productAttributeSchema.shape)
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
