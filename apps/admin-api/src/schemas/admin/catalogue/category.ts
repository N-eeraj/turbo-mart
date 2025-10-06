import {
  z,
} from "zod"

import {
  CATEGORY,
} from "#constants/validationMessages"

export const categoryCreationSchema = z.object({
  name: z.string({ error: CATEGORY.name.required })
    .nonempty(CATEGORY.name.required)
    .trim()
    .meta({
      description: "Name of the category.",
      example: "Electronics",
    }),
  slug: z.string({ error: CATEGORY.slug.required })
    .nonempty(CATEGORY.slug.required)
    .trim()
    .meta({
      description: "Unique and short name (slug) of the category.",
      example: "elctx",
    }),
})

export const categoryUpdateSchema = categoryCreationSchema.partial()

export const categoryCreationJSONSchema = z.toJSONSchema(categoryCreationSchema)
export const categoryUpdateJSONSchema = z.toJSONSchema(categoryUpdateSchema)

export type CategoryCreationData = z.infer<typeof categoryCreationSchema>
export type CategoryUpdateData = z.infer<typeof categoryUpdateSchema>
