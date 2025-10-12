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

type CreateAttributeList = z.infer<typeof attributesCreate>
type UpdateAttributeList = z.infer<typeof attributesUpdate>
type CreateUpdateAttributeList<TId extends boolean> = TId extends true
  ? UpdateAttributeList
  : CreateAttributeList
type CreateUpdateAttributeKey<TId extends boolean> = TId extends true
  ? keyof Exclude<UpdateAttributeList, undefined>[number]
  : keyof Exclude<CreateAttributeList, undefined>[number]

function duplicateNameSuperRefine<TId extends boolean>(
  attributes: CreateUpdateAttributeList<TId>,
  ctx: z.RefinementCtx,
  keys: Array<CreateUpdateAttributeKey<TId>>,
  transforms: Partial<Record<CreateUpdateAttributeKey<TId>, (_: any) => any>>
) {
  const duplicates: Record<string, {
    map: Map<unknown, number>
    set: Set<number>
  }> = Object.fromEntries(
    keys.map((key) => {
      return [
        key, {
          set: new Set(),
          map: new Map(),
        }
      ]
    })
  )

  attributes?.forEach((data, index: number) => {
    keys.forEach(key => {
      let value = data[key]
      if (transforms[key]) {
        value = transforms[key](value)
      }
      if (duplicates[key].map.has(value)) {
        duplicates[key].set.add(index)
        duplicates[key].set.add(duplicates[key].map.get(value) as number)
      } else {
        duplicates[key].map.set(value, index)
      }
    })
  })

  Object.entries(duplicates)
    .forEach(([key, { set }]) => {
      set.forEach(item => {
        ctx.addIssue({
          path: [
            item,
            key,
          ],
          code: "custom",
          message: "Duplicate error",
        })
      })
    })
}

export const subcategoryAttributeUpdateSchema = z.object({
  create: attributesCreate
    .superRefine(
      (attributes, ctx) => duplicateNameSuperRefine(
        attributes,
        ctx,
        [
          "name",
        ],
        {
          name: (_name: string) => _name.toLowerCase()
        }
      )
    ),
  update: attributesUpdate
    .superRefine(
      (attributes, ctx) => duplicateNameSuperRefine(
        attributes,
        ctx,
        [
          "id",
          "name",
        ],
        {
          name: (_name: string) => _name.toLowerCase()
        }
      )
    ),
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
