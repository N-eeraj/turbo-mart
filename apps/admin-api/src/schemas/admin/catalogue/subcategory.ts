import {
  z,
} from "zod"

import {
  attributeSchema,
  attributeSchemaWithoutId,
} from "#schemas/admin/catalogue/attributes"
import {
  SUB_CATEGORY,
  ATTRIBUTE,
} from "#constants/validationMessages"

export const subcategoryCreationSchema = z.object({
  category: z.string({ error: SUB_CATEGORY.category.required })
    .nonempty(SUB_CATEGORY.category.required)
    .trim()
    .meta({
      description: "Category Id.",
      example: "01abcd091ab01a0123ab012a",
    }),
  name: z.string({ error: SUB_CATEGORY.name.required })
    .nonempty(SUB_CATEGORY.name.required)
    .trim()
    .meta({
      description: "Name of the subcategory.",
      example: "Smart Phone",
    }),
  slug: z.string({ error: SUB_CATEGORY.slug.required })
    .nonempty(SUB_CATEGORY.slug.required)
    .trim()
    .meta({
      description: "Unique and short name (slug) of the subcategory.",
      example: "smtphn",
    }),
})

export const subcategoryUpdateSchema = subcategoryCreationSchema.partial()

const attributesCreate = z.array(
  attributeSchemaWithoutId,
)
  .optional()
const attributesUpdate = z.array(
  attributeSchema,
)
  .optional()

function duplicateNameSuperRefine(
  attributes: z.infer<typeof attributesCreate | typeof attributesUpdate>,
  ctx: z.RefinementCtx
) {
  const attributeMap: Map<string, number> = new Map()
  const duplicateSet: Set<number> = new Set()

  attributes?.some(({ name }, index: number) => {
    const _name = name.toLowerCase()
    if (attributeMap.has(_name)) {
      duplicateSet.add(index)
      duplicateSet.add(attributeMap.get(_name) as number)
    } else {
      attributeMap.set(_name, index)
    }
  })

  duplicateSet.forEach((item) => {
    ctx.addIssue({
      path: [
        item,
        "name",
      ],
      code: "custom",
      message: "Duplicate error",
    })
  })
}

export const subcategoryAttributeUpdateSchema = z.object({
  create: attributesCreate.superRefine(duplicateNameSuperRefine),
  update: attributesUpdate.superRefine(duplicateNameSuperRefine),
  delete: z.array(
    z.string({ error: ATTRIBUTE.id.required })
      .nonempty(ATTRIBUTE.id.required)
      .trim()
      .meta({
        description: "Attribute id.",
        example: "01abcd091ab01a0123ab012a",
      }),
  )
    .optional(),
})

export const subcategoryCreationJSONSchema = z.toJSONSchema(subcategoryCreationSchema)
export const subcategoryUpdateJSONSchema = z.toJSONSchema(subcategoryUpdateSchema)
export const subcategoryAttributeUpdateJSONSchema = z.toJSONSchema(subcategoryAttributeUpdateSchema)

export type SubcategoryCreationData = z.infer<typeof subcategoryCreationSchema>
export type SubcategoryUpdateData = z.infer<typeof subcategoryUpdateSchema>
export type SubcategoryAttributeUpdateData = z.infer<typeof subcategoryAttributeUpdateSchema>
