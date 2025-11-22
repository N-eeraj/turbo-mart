import * as z from "zod"

import {
  attributeSchema,
  attributeSchemaWithoutId,
} from "#admin/schemas/catalogue/attributes"
import {
  SUB_CATEGORY,
  ATTRIBUTE,
} from "#admin/constants/validationMessages"

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

/**
 * Validates that names are unique across both create and update lists, and that IDs are unique across both update and delete lists.
 * 
 * @param values - Schema values to be validated.
 * @param ctx - Zod refinement context.
 */
function SubcategoryAttributeUpdateSuperRefine(
  {
    create,
    update,
    delete: _delete,
  }: z.infer<typeof subcategoryAttributeUpdateSchema>,
  ctx: z.RefinementCtx
) {
  if (!(create?.length || update?.length || _delete?.length)) {
    return ctx.addIssue({
      path: [
        "root",
      ],
      message: SUB_CATEGORY.attributes.missingFields,
      code: "custom",
    })
  }

  const nameMap = new Map()
  const idMap = new Map()
  const duplicatesList: Array<{
    path: string
    pathIndex: number
    key: string
    message: string
  }> = []

  interface Attribute {
    path: keyof z.infer<typeof subcategoryAttributeUpdateSchema>
    pathIndex: number
    name: string
    id?: string
  }

  const mappedAttributes = [
    ...create?.map(({ name }, index) => ({
      name,
      path: "create" as const,
      pathIndex: index
    })) ?? [],
    ...update?.map(({ id, name }, index) => ({
      id,
      name,
      path: "update" as const,
      pathIndex: index
    })) ?? [],
    ..._delete?.map((id, index) => ({
      id,
      path: "delete" as const,
      pathIndex: index
    })) ?? [],
  ] as Array<Attribute>

  mappedAttributes.forEach(({ path, pathIndex, name, id }) => {
    // unique name check
    if (nameMap.has(name)) {
      duplicatesList.push({
        path,
        pathIndex,
        key: "name",
        message: SUB_CATEGORY.attributes.duplicateName,
      })

      const trackedAttribute = nameMap.get(name)

      const hasOriginalItem = duplicatesList.some((attribute) => (
        attribute.path === trackedAttribute.path &&
        attribute.pathIndex === trackedAttribute.pathIndex &&
        attribute.key === "name" &&
        attribute.message === SUB_CATEGORY.attributes.duplicateName
      ))

      if (!hasOriginalItem) {
        duplicatesList.push({
          path: trackedAttribute.path,
          pathIndex: trackedAttribute.pathIndex,
          key: "name",
          message: SUB_CATEGORY.attributes.duplicateName,
        })
      }
    } else if (name) {
      nameMap.set(name, { path, pathIndex })
    }

    // unique id check
    if (idMap.has(id)) {
      duplicatesList.push({
        path,
        pathIndex,
        key: "id",
        message: SUB_CATEGORY.attributes.duplicateId,
      })

      const trackedAttribute = idMap.get(id)

      const hasOriginalItem = duplicatesList.some((attribute) => (
        attribute.path === trackedAttribute.path &&
        attribute.pathIndex === trackedAttribute.pathIndex &&
        attribute.key === "id" &&
        attribute.message === SUB_CATEGORY.attributes.duplicateId
      ))

      if (!hasOriginalItem) {
        duplicatesList.push({
          path: trackedAttribute.path,
          pathIndex: trackedAttribute.pathIndex,
          key: "id",
          message: SUB_CATEGORY.attributes.duplicateId,
        })
      }
    } else if (id) {
      idMap.set(id, { path, pathIndex })
    }
  })

  // add validation issues to the context based on the specific path location
  duplicatesList.forEach(({ path, pathIndex, key, message }) => {
    ctx.addIssue({
      path: [
        path,
        pathIndex,
        key,
      ],
      message,
      code: "custom",
    })
  })
}

export const subcategoryAttributeUpdateSchema = z.object({
  create: z.array(
    attributeSchemaWithoutId,
  )
    .optional(),
  update: z.array(
    attributeSchema,
  )
    .optional(),
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
  .superRefine(SubcategoryAttributeUpdateSuperRefine)

export const subcategoryCreationJSONSchema = z.toJSONSchema(subcategoryCreationSchema)
export const subcategoryUpdateJSONSchema = z.toJSONSchema(subcategoryUpdateSchema)
export const subcategoryAttributeUpdateJSONSchema = z.toJSONSchema(subcategoryAttributeUpdateSchema)

export type SubcategoryCreationData = z.infer<typeof subcategoryCreationSchema>
export type SubcategoryUpdateData = z.infer<typeof subcategoryUpdateSchema>
export type SubcategoryAttributeUpdateData = z.infer<typeof subcategoryAttributeUpdateSchema>
