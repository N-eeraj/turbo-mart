import {
  z,
} from "zod"

import {
  SUB_CATEGORY,
} from "#constants/validationMessages"

export const subCategoryCreationSchema = z.object({
  categoryId: z.string({ error: SUB_CATEGORY.categoryId.required })
    .nonempty(SUB_CATEGORY.categoryId.required)
    .trim()
    .meta({
      description: "Name of the sub category.",
      example: "Smart Phone",
    }),
  name: z.string({ error: SUB_CATEGORY.name.required })
    .nonempty(SUB_CATEGORY.name.required)
    .trim()
    .meta({
      description: "Name of the sub category.",
      example: "Smart Phone",
    }),
  slug: z.string({ error: SUB_CATEGORY.slug.required })
    .nonempty(SUB_CATEGORY.slug.required)
    .trim()
    .meta({
      description: "Unique and short name (slug) of the sub category.",
      example: "smtphn",
    }),
})

export const subCategoryUpdateSchema = subCategoryCreationSchema.partial()

export const subCategoryCreationJSONSchema = z.toJSONSchema(subCategoryCreationSchema)
export const subCategoryUpdateJSONSchema = z.toJSONSchema(subCategoryUpdateSchema)

export type SubCategoryCreationData = z.infer<typeof subCategoryCreationSchema>
export type SubCategoryUpdateData = z.infer<typeof subCategoryUpdateSchema>
