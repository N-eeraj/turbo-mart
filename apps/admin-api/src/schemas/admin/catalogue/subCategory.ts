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

export const subcategoryAttributeBaseSchema = z.object({
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
  required: z.boolean()
    .optional()
    .meta({
      description: "Indicates if the attribute is mandatory for products in the subcategory.",
    }),
})

export const subcategoryAttributeBaseSchemaWithoutId = subcategoryAttributeBaseSchema.omit({
  id: true,
})

const TEXT_ATTRIBUTE_TYPE_METADATA = {
  type: z.literal(AttributeType.TEXT),
  metadata: z.object({
    maxLength: z.number({ error: SUB_CATEGORY.attribute.metadata.text.maxLength.valid })
      .meta({
        description: "Maximum length of the attribute value.",
        example: 50,
      }),
  })
    .optional(),
}
const NUMBER_ATTRIBUTE_TYPE_METADATA = {
  type: z.literal(AttributeType.NUMBER),
  metadata: z.object({
    min: z.number({ error: SUB_CATEGORY.attribute.metadata.number.min.valid })
      .optional()
      .meta({
        description: "Minimum value of the attribute.",
        example: 2,
      }),
    max: z.number({ error: SUB_CATEGORY.attribute.metadata.number.max.valid })
      .optional()
      .meta({
        description: "Maximum value of the attribute.",
        example: 16,
      }),
    unit: z.string({ error: SUB_CATEGORY.attribute.metadata.number.unit.valid })
      .optional()
      .meta({
        description: "Unit the attribute is measure in.",
        example: "Inches",
      }),
    template: z.string({ error: SUB_CATEGORY.attribute.metadata.number.template.valid })
      .optional()
      .meta({
        description: "The display template for the value.",
        example: "{{value}} {{unit}}",
      }),
    base: z.number({ error: SUB_CATEGORY.attribute.metadata.number.base.valid })
      .min(1, { error: SUB_CATEGORY.attribute.metadata.number.base.minValue })
      .optional()
      .meta({
        description: "Base relative value of the unit, the actual value of the attribute will be the product of attribute value and the base value.",
        example: 10,
      }),
  })
    .optional(),
}
const BOOLEAN_ATTRIBUTE_TYPE_METADATA = {
  type: z.literal(AttributeType.BOOLEAN),
}
const LIST_METADATA = {}
const SELECT_ATTRIBUTE_TYPE_METADATA = {
  type: z.literal(AttributeType.SELECT),
  metadata: LIST_METADATA,
}
const MULTI_SELECT_ATTRIBUTE_TYPE_METADATA = {
  type: z.literal(AttributeType.MULTI_SELECT),
  metadata: LIST_METADATA,
}
const COLOR_ATTRIBUTE_TYPE_METADATA = {
  type: z.literal(AttributeType.COLOR),
}
const DATE_ATTRIBUTE_TYPE_METADATA = {
  type: z.literal(AttributeType.DATE),
  metadata: z.object({
    min: z.date({ error: SUB_CATEGORY.attribute.metadata.date.min.valid })
      .optional()
      .meta({
        description: "Minimum date value of the attribute.",
        example: 2,
      }),
    max: z.date({ error: SUB_CATEGORY.attribute.metadata.date.max.valid })
      .optional()
      .meta({
        description: "Maximum date value of the attribute.",
        example: 16,
      }),
  })
    .optional(),
}
const JSON_ATTRIBUTE_TYPE_METADATA = {
  type: z.literal(AttributeType.JSON),
  metadata: z.looseObject({})
    .optional()
    .meta({
      description: "A JSON data to stored along the attribute value.",
    }),
}

const subcategoryNumberAttributeSchema = subcategoryAttributeBaseSchema
  .extend(NUMBER_ATTRIBUTE_TYPE_METADATA)
const subcategoryNumberAttributeSchemaWithoutId = subcategoryAttributeBaseSchemaWithoutId
  .extend(NUMBER_ATTRIBUTE_TYPE_METADATA)
type SubcategoryNumberAttributeSchema<TId extends boolean> = TId extends true
  ? typeof subcategoryNumberAttributeSchema
  : typeof subcategoryNumberAttributeSchemaWithoutId

const subcategoryDateAttributeSchema = subcategoryAttributeBaseSchema
  .extend(DATE_ATTRIBUTE_TYPE_METADATA)
const subcategoryDateAttributeSchemaWithoutId = subcategoryAttributeBaseSchemaWithoutId
  .extend(DATE_ATTRIBUTE_TYPE_METADATA)
type SubcategoryDateAttributeSchema<TId extends boolean> = TId extends true
  ? typeof subcategoryDateAttributeSchema
  : typeof subcategoryDateAttributeSchemaWithoutId


function numberMetadataSuperRefine<TId extends boolean>(
  { metadata }: z.infer<SubcategoryNumberAttributeSchema<TId>>,
  ctx: z.RefinementCtx
) {
  if (metadata && metadata.min !== undefined && metadata.max !== undefined) {
    if (metadata.min > metadata.max) {
      ctx.addIssue({
        path: ["min"],
        message: SUB_CATEGORY.attribute.metadata.number.min.maxValue,
        code: "custom",
      })
      ctx.addIssue({
        path: ["max"],
        message: SUB_CATEGORY.attribute.metadata.number.max.minValue,
        code: "custom",
      })
    }
  }
}

function dateMetadataSuperRefine<TId extends boolean>(
  { metadata }: z.infer<SubcategoryDateAttributeSchema<TId>>,
  ctx: z.RefinementCtx
) {
  if (metadata && metadata.min !== undefined && metadata.max !== undefined) {
    if (metadata.min > metadata.max) {
      ctx.addIssue({
        path: ["min"],
        message: SUB_CATEGORY.attribute.metadata.date.min.maxDate,
        code: "custom",
      })
      ctx.addIssue({
        path: ["max"],
        message: SUB_CATEGORY.attribute.metadata.date.max.minDate,
        code: "custom",
      })
    }
  }
}

const ATTRIBUTE_METADATA_SCHEMAS = [
  subcategoryAttributeBaseSchema.extend(TEXT_ATTRIBUTE_TYPE_METADATA),
  subcategoryNumberAttributeSchema
    .superRefine(numberMetadataSuperRefine<true>),
  subcategoryAttributeBaseSchema.extend(BOOLEAN_ATTRIBUTE_TYPE_METADATA),
  subcategoryAttributeBaseSchema.extend(SELECT_ATTRIBUTE_TYPE_METADATA),
  subcategoryAttributeBaseSchema.extend(MULTI_SELECT_ATTRIBUTE_TYPE_METADATA),
  subcategoryAttributeBaseSchema.extend(COLOR_ATTRIBUTE_TYPE_METADATA),
  subcategoryAttributeBaseSchema.extend(DATE_ATTRIBUTE_TYPE_METADATA)
    .superRefine(dateMetadataSuperRefine<true>),
  subcategoryAttributeBaseSchema.extend(JSON_ATTRIBUTE_TYPE_METADATA),
] as const
const ATTRIBUTE_METADATA_SCHEMAS_WITHOUT_ID = [
  subcategoryAttributeBaseSchemaWithoutId.extend(TEXT_ATTRIBUTE_TYPE_METADATA),
  subcategoryNumberAttributeSchemaWithoutId
    .superRefine(numberMetadataSuperRefine<false>),
  subcategoryAttributeBaseSchemaWithoutId.extend(BOOLEAN_ATTRIBUTE_TYPE_METADATA),
  subcategoryAttributeBaseSchemaWithoutId.extend(SELECT_ATTRIBUTE_TYPE_METADATA),
  subcategoryAttributeBaseSchemaWithoutId.extend(MULTI_SELECT_ATTRIBUTE_TYPE_METADATA),
  subcategoryAttributeBaseSchemaWithoutId.extend(COLOR_ATTRIBUTE_TYPE_METADATA),
  subcategoryAttributeBaseSchemaWithoutId.extend(DATE_ATTRIBUTE_TYPE_METADATA)
    .superRefine(dateMetadataSuperRefine<false>),
  subcategoryAttributeBaseSchemaWithoutId.extend(JSON_ATTRIBUTE_TYPE_METADATA),
] as const


const subcategoryAttributeSchema = z.discriminatedUnion("type", ATTRIBUTE_METADATA_SCHEMAS)
const subcategoryAttributeSchemaWithoutId = z.discriminatedUnion("type", ATTRIBUTE_METADATA_SCHEMAS_WITHOUT_ID)

export const subcategoryAttributeUpdateSchema = z.object({
  create: z.array(
    subcategoryAttributeSchemaWithoutId,
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
