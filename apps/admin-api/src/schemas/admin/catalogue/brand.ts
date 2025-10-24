import {
  z,
} from "zod"

import {
  BRAND,
} from "#constants/validationMessages"

export const brandCreationSchema = z.object({
  name: z.string({ error: BRAND.name.required })
    .nonempty(BRAND.name.required)
    .trim()
    .meta({
      description: "Name of the brand.",
      example: "Apple",
    }),
  slug: z.string({ error: BRAND.slug.required })
    .nonempty(BRAND.slug.required)
    .trim()
    .meta({
      description: "Unique and short name (slug) of the brand.",
      example: "apl",
    }),
})

export const brandUpdateSchema = brandCreationSchema.partial()

export const brandCreationJSONSchema = z.toJSONSchema(brandCreationSchema)
export const brandUpdateJSONSchema = z.toJSONSchema(brandUpdateSchema)

export type BrandCreationData = z.infer<typeof brandCreationSchema>
export type BrandUpdateData = z.infer<typeof brandUpdateSchema>
