import {
  z,
} from "zod"

import {
  AttributeType,
} from "@app/database/mongoose/models/Catalogue/Attributes.ts"

import {
  ATTRIBUTE,
} from "#constants/validationMessages"

const attributeBaseSchema = z.object({
  id: z.string({ error: ATTRIBUTE.id.required })
    .nonempty(ATTRIBUTE.id.required)
    .trim()
    .meta({
      description: "Attribute id.",
      example: "01abcd091ab01a0123ab012a",
    }),
  name: z.string({ error: ATTRIBUTE.name.required })
    .nonempty(ATTRIBUTE.name.required)
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

const attributeBaseSchemaWithoutId = attributeBaseSchema.omit({
  id: true,
})

const TEXT_ATTRIBUTE_TYPE_METADATA = {
  type: z.literal(AttributeType.TEXT),
  metadata: z.object({
    maxLength: z.number({ error: ATTRIBUTE.metadata.text.maxLength.valid })
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
    min: z.number({ error: ATTRIBUTE.metadata.number.min.valid })
      .optional()
      .meta({
        description: "Minimum value of the attribute.",
        example: 2,
      }),
    max: z.number({ error: ATTRIBUTE.metadata.number.max.valid })
      .optional()
      .meta({
        description: "Maximum value of the attribute.",
        example: 16,
      }),
    unit: z.string({ error: ATTRIBUTE.metadata.number.unit.valid })
      .optional()
      .meta({
        description: "Unit the attribute is measured in.",
        example: "Inches",
      }),
    template: z.string({ error: ATTRIBUTE.metadata.number.template.valid })
      .optional()
      .meta({
        description: "The display template for the value.",
        example: "{{value}} {{unit}}",
      }),
    base: z.number({ error: ATTRIBUTE.metadata.number.base.valid })
      .min(1, { error: ATTRIBUTE.metadata.number.base.minValue })
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
const LIST_METADATA = z.discriminatedUnion("type", [
  z.object({
    type: z.literal(AttributeType.TEXT),
    options: z.array(
      z.string({ error: ATTRIBUTE.metadata.list.text.valid })
        .nonempty({ error: ATTRIBUTE.metadata.list.text.valid })
        .meta({
          description: "Text value option for the list attribute types.",
          example: "Android",
        }),
    ),
  }),
  z.object({
    type: z.literal(AttributeType.NUMBER),
    options: z.array(
      z.object({
        value: z.number({ error: ATTRIBUTE.metadata.list.number.value.valid })
          .meta({
            description: "Number value option for the list attribute types.",
            example: 4,
          }),
        unit: z.string({ error: ATTRIBUTE.metadata.list.number.unit.valid })
          .optional()
          .meta({
            description: "Unit the attribute is measured in.",
            example: "Inches",
          }),
        template: z.string({ error: ATTRIBUTE.metadata.list.number.template.valid })
          .optional()
          .meta({
            description: "The display template for the value.",
            example: "{{value}} {{unit}}",
          }),
        base: z.number({ error: ATTRIBUTE.metadata.list.number.base.valid })
          .min(1, { error: ATTRIBUTE.metadata.list.number.base.minValue })
          .optional()
          .meta({
            description: "Base relative value of the unit, the actual value of the attribute will be the product of attribute value and the base value.",
            example: 10,
          }),
      }),
    ),
  }),
])
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
    min: z.string({ error: ATTRIBUTE.metadata.date.min.valid })
      .optional()
      .meta({
        description: "Minimum date value of the attribute.",
        example: 2,
      }),
    max: z.string({ error: ATTRIBUTE.metadata.date.max.valid })
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

// number attribute schemas and super refine function
const numberAttributeSchema = attributeBaseSchema
  .extend(NUMBER_ATTRIBUTE_TYPE_METADATA)
const numberAttributeSchemaWithoutId = attributeBaseSchemaWithoutId
  .extend(NUMBER_ATTRIBUTE_TYPE_METADATA)
type NumberAttributeSchema<TId extends boolean> = TId extends true
  ? typeof numberAttributeSchema
  : typeof numberAttributeSchemaWithoutId

function numberMetadataSuperRefine<TId extends boolean>(
  { metadata }: z.infer<NumberAttributeSchema<TId>>,
  ctx: z.RefinementCtx
) {
  if (metadata && metadata.min !== undefined && metadata.max !== undefined) {
    if (metadata.min > metadata.max) {
      ctx.addIssue({
        path: ["min"],
        message: ATTRIBUTE.metadata.number.min.maxValue,
        code: "custom",
      })
      ctx.addIssue({
        path: ["max"],
        message: ATTRIBUTE.metadata.number.max.minValue,
        code: "custom",
      })
    }
  }
}

// date attribute schemas and super refine function
const dateAttributeSchema = attributeBaseSchema
  .extend(DATE_ATTRIBUTE_TYPE_METADATA)
const dateAttributeSchemaWithoutId = attributeBaseSchemaWithoutId
  .extend(DATE_ATTRIBUTE_TYPE_METADATA)
type DateAttributeSchema<TId extends boolean> = TId extends true
  ? typeof dateAttributeSchema
  : typeof dateAttributeSchemaWithoutId

function dateMetadataSuperRefine<TId extends boolean>(
  { metadata }: z.infer<DateAttributeSchema<TId>>,
  ctx: z.RefinementCtx
) {
  if (metadata && metadata.min !== undefined && metadata.max !== undefined) {
    if (metadata.min > metadata.max) {
      ctx.addIssue({
        path: ["min"],
        message: ATTRIBUTE.metadata.date.min.maxDate,
        code: "custom",
      })
      ctx.addIssue({
        path: ["max"],
        message: ATTRIBUTE.metadata.date.max.minDate,
        code: "custom",
      })
    }
  }
}

const ATTRIBUTE_METADATA_SCHEMAS = [
  attributeBaseSchema.extend(TEXT_ATTRIBUTE_TYPE_METADATA),
  numberAttributeSchema
    .superRefine(numberMetadataSuperRefine<true>),
  attributeBaseSchema.extend(BOOLEAN_ATTRIBUTE_TYPE_METADATA),
  attributeBaseSchema.extend(SELECT_ATTRIBUTE_TYPE_METADATA),
  attributeBaseSchema.extend(MULTI_SELECT_ATTRIBUTE_TYPE_METADATA),
  attributeBaseSchema.extend(COLOR_ATTRIBUTE_TYPE_METADATA),
  attributeBaseSchema.extend(DATE_ATTRIBUTE_TYPE_METADATA)
    .superRefine(dateMetadataSuperRefine<true>),
  attributeBaseSchema.extend(JSON_ATTRIBUTE_TYPE_METADATA),
] as const
const ATTRIBUTE_METADATA_SCHEMAS_WITHOUT_ID = [
  attributeBaseSchemaWithoutId.extend(TEXT_ATTRIBUTE_TYPE_METADATA),
  numberAttributeSchemaWithoutId
    .superRefine(numberMetadataSuperRefine<false>),
  attributeBaseSchemaWithoutId.extend(BOOLEAN_ATTRIBUTE_TYPE_METADATA),
  attributeBaseSchemaWithoutId.extend(SELECT_ATTRIBUTE_TYPE_METADATA),
  attributeBaseSchemaWithoutId.extend(MULTI_SELECT_ATTRIBUTE_TYPE_METADATA),
  attributeBaseSchemaWithoutId.extend(COLOR_ATTRIBUTE_TYPE_METADATA),
  attributeBaseSchemaWithoutId.extend(DATE_ATTRIBUTE_TYPE_METADATA)
    .superRefine(dateMetadataSuperRefine<false>),
  attributeBaseSchemaWithoutId.extend(JSON_ATTRIBUTE_TYPE_METADATA),
] as const


export const attributeSchema = z.discriminatedUnion("type", ATTRIBUTE_METADATA_SCHEMAS)
export const attributeSchemaWithoutId = z.discriminatedUnion("type", ATTRIBUTE_METADATA_SCHEMAS_WITHOUT_ID)
