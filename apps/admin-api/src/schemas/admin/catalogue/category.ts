import {
  z,
} from "zod"

import {
  CATEGORY,
} from "#constants/validationMessages"

export const categorySchema = z.object({
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

export const categoryJSONSchema = z.toJSONSchema(categorySchema)

export type CategoryData = z.infer<typeof categorySchema>
