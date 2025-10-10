import {
  z,
} from "zod"

import {
  AttributeType,
} from "@app/database/mongoose/models/Catalogue/Attributes.ts"

import {
  SUB_CATEGORY,
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

export const subcategoryAttributeSchema = z.object({
  id: z.string({ error: SUB_CATEGORY.attribute.id.required })
    .nonempty(SUB_CATEGORY.attribute.id.required)
    .trim()
    .meta({
      description: "Attribute id.",
      example: "01abcd091ab01a0123ab012a",
    }),
  name: z.string({ error: SUB_CATEGORY.attribute.name.required })
    .nonempty(SUB_CATEGORY.attribute.name.required)
    .trim()
    .meta({
      description: "Attribute name.",
      example: "Color",
    }),
  type: z.enum(AttributeType, { error: (issue) => {
      if (!issue.input) return SUB_CATEGORY.attribute.type.required
      return SUB_CATEGORY.attribute.type.valid
    }})
    .meta({
      description: "Attribute type",
      example: AttributeType.COLOR,
    }),
  required: z.boolean()
    .optional()
    .meta({
      description: "Indicates if the attribute is mandatory for products in the subcategory.",
    }),
})

export const subcategoryAttributeUpdateSchema = z.object({
  create: z.array(
    subcategoryAttributeSchema.omit({
      id: true,
    }),
  )
    .optional(),
  update: z.array(
    subcategoryAttributeSchema,
  )
    .optional(),
  delete: z.array(
    z.string({ error: SUB_CATEGORY.attribute.id.required })
      .nonempty(SUB_CATEGORY.attribute.id.required)
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
