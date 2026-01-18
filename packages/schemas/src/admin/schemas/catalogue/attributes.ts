import * as z from "zod"

import {
  AttributeType,
} from "@app/database/mongoose/models/Catalogue/Attributes"

import {
  ATTRIBUTE,
} from "#admin/constants/validationMessages"

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
  required: z.boolean({ error: ATTRIBUTE.required.valid })
    .optional()
    .meta({
      description: "Indicates if the attribute is mandatory for products in the subcategory.",
    }),
  variant: z.boolean({ error: ATTRIBUTE.variant.valid })
    .optional()
    .meta({
      description: "Indicates if the attribute is a variant for products in the subcategory.",
    }),
})

const attributeBaseSchemaWithoutId = attributeBaseSchema.omit({
  id: true,
})

const textAttributeTypeMetadata = {
  type: z.literal(AttributeType.TEXT),
  metadata: z.object({
    maxLength: z.number({ error: ATTRIBUTE.metadata.text.maxLength.valid })
      .positive({ error: ATTRIBUTE.metadata.text.maxLength.positive })
      .optional()
      .meta({
        description: "Maximum length of the attribute value.",
        example: 50,
      }),
  })
    .optional(),
}
const numberAttributeTypeMetadata = {
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
        description: "Base unit the attribute is measured in.",
        example: "Inches",
      }),
    template: z.string({ error: ATTRIBUTE.metadata.number.template.valid })
      .optional()
      .meta({
        description: "The display template for the value.",
        example: "{{value}} {{unit}}",
      }),
    base: z.number({ error: ATTRIBUTE.metadata.number.base.valid })
      .positive({ error: ATTRIBUTE.metadata.number.base.positive })
      .optional()
      .meta({
        description: "Base relative value of the unit, the actual value of the attribute will be the product of attribute value and the base value.",
        example: 10,
      }),
  })
    .optional(),
}
const booleanAttributeTypeMetadata = {
  type: z.literal(AttributeType.BOOLEAN),
}

const textTypeOptionsList = z.object({
  type: z.literal(AttributeType.TEXT),
  options: z.array(
    z.string({ error: ATTRIBUTE.metadata.list.text.valid })
      .nonempty({ error: ATTRIBUTE.metadata.list.text.valid })
      .meta({
        description: "Text value option for the list attribute types.",
        example: "Android",
      }),
    { error: ATTRIBUTE.metadata.list.options.minLength }
  )
    .min(1, { error: ATTRIBUTE.metadata.list.options.minLength }),
})
const numberTypeOptionsList = z.object({
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
    }, { error: ATTRIBUTE.metadata.list.number.required }),
    { error: ATTRIBUTE.metadata.list.options.minLength }
  )
    .min(1, { error: ATTRIBUTE.metadata.list.options.minLength }),
})

// combination of textTypeOptionsList and numberTypeOptionsList based on the type literal
const listMetadata = z.discriminatedUnion("type", [
  textTypeOptionsList,
  numberTypeOptionsList,
], { error: (issue) => {
  if (!issue.input) return ATTRIBUTE.metadata.list.required
  const validTypes = [
    AttributeType.TEXT,
    AttributeType.NUMBER,
  ]
  const type = (issue.input as Record<"type", typeof validTypes[number]>).type
  if (!type) return ATTRIBUTE.metadata.list.type.required
  if (!validTypes.includes(type)) return ATTRIBUTE.metadata.list.type.valid
}})
const selectAttributeTypeMetadata = {
  type: z.literal(AttributeType.SELECT),
  metadata: listMetadata,
}
const multiSelectAttributeTypeMetadata = {
  type: z.literal(AttributeType.MULTI_SELECT),
  metadata: listMetadata,
}

const colorAttributeTypeMetadata = {
  type: z.literal(AttributeType.COLOR),
}
const dateAttributeTypeMetadata = {
  type: z.literal(AttributeType.DATE),
  metadata: z.object({
    min: z.iso.datetime({ error: ATTRIBUTE.metadata.date.min.valid })
      .optional()
      .meta({
        description: "Minimum date value of the attribute.",
        example: new Date(),
      }),
    max: z.iso.datetime({ error: ATTRIBUTE.metadata.date.max.valid })
      .optional()
      .meta({
        description: "Maximum date value of the attribute.",
        example: new Date(),
      }),
  })
    .optional(),
}
const jsonAttributeTypeMetadata = {
  type: z.literal(AttributeType.JSON),
}

// number attribute schemas and super refine function
const numberAttributeSchema = attributeBaseSchema
  .extend(numberAttributeTypeMetadata)
const numberAttributeSchemaWithoutId = attributeBaseSchemaWithoutId
  .extend(numberAttributeTypeMetadata)
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
        path: ["metadata.min"],
        message: ATTRIBUTE.metadata.number.min.maxValue,
        code: "custom",
      })
      ctx.addIssue({
        path: ["metadata.max"],
        message: ATTRIBUTE.metadata.number.max.minValue,
        code: "custom",
      })
    }
  }
}

// date attribute schemas and super refine function
const dateAttributeSchema = attributeBaseSchema
  .extend(dateAttributeTypeMetadata)
const dateAttributeSchemaWithoutId = attributeBaseSchemaWithoutId
  .extend(dateAttributeTypeMetadata)
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
        path: ["metadata.min"],
        message: ATTRIBUTE.metadata.date.min.maxDate,
        code: "custom",
      })
      ctx.addIssue({
        path: ["metadata.max"],
        message: ATTRIBUTE.metadata.date.max.minDate,
        code: "custom",
      })
    }
  }
}

const ATTRIBUTE_METADATA_SCHEMAS = [
  attributeBaseSchema.extend(textAttributeTypeMetadata),
  numberAttributeSchema.superRefine(numberMetadataSuperRefine<true>),
  attributeBaseSchema.extend(booleanAttributeTypeMetadata),
  attributeBaseSchema.extend(selectAttributeTypeMetadata),
  attributeBaseSchema.extend(multiSelectAttributeTypeMetadata),
  attributeBaseSchema.extend(colorAttributeTypeMetadata),
  attributeBaseSchema.extend(dateAttributeTypeMetadata)
    .superRefine(dateMetadataSuperRefine<true>),
  attributeBaseSchema.extend(jsonAttributeTypeMetadata),
] as const
const ATTRIBUTE_METADATA_SCHEMAS_WITHOUT_ID = [
  attributeBaseSchemaWithoutId.extend(textAttributeTypeMetadata),
  numberAttributeSchemaWithoutId.superRefine(numberMetadataSuperRefine<false>),
  attributeBaseSchemaWithoutId.extend(booleanAttributeTypeMetadata),
  attributeBaseSchemaWithoutId.extend(selectAttributeTypeMetadata),
  attributeBaseSchemaWithoutId.extend(multiSelectAttributeTypeMetadata),
  attributeBaseSchemaWithoutId.extend(colorAttributeTypeMetadata),
  attributeBaseSchemaWithoutId.extend(dateAttributeTypeMetadata)
    .superRefine(dateMetadataSuperRefine<false>),
  attributeBaseSchemaWithoutId.extend(jsonAttributeTypeMetadata),
] as const

// combination of all attribute metadata based on the attribute type literal
export const attributeSchema = z.discriminatedUnion("type", ATTRIBUTE_METADATA_SCHEMAS)
export const attributeSchemaWithoutId = z.discriminatedUnion("type", ATTRIBUTE_METADATA_SCHEMAS_WITHOUT_ID)
