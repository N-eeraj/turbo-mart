import * as z from "zod"

import {
  AttributeType,
  MeasurementType,
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
    measurementType: z.enum(MeasurementType, { error: ATTRIBUTE.metadata.number.measurementType.valid })
      .optional(),
    allowDecimal: z.boolean({ error: ATTRIBUTE.metadata.number.allowDecimal.valid })
      .optional()
      .meta({
        description: "Indicates whether the attribute allows decimal (fractional) values.",
      }),
    allowNegative: z.boolean({ error: ATTRIBUTE.metadata.number.allowNegative.valid })
      .optional()
      .meta({
        description: "Indicates whether the attribute allows negative values.",
      }),
    step: z.number({ error: ATTRIBUTE.metadata.number.step.valid })
      .min(0.001, { error: ATTRIBUTE.metadata.number.step.min })
      .max(10_000, { error: ATTRIBUTE.metadata.number.step.max })
      .optional()
      .meta({
        description: "Attribute value steps.",
        example: 0.01,
      }),
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
  })
    .optional(),
}
const booleanAttributeTypeMetadata = {
  type: z.literal(AttributeType.BOOLEAN),
  metadata: z.object({
    trueValue: z.string({ error: ATTRIBUTE.metadata.boolean.trueValue.valid })
      .nonempty(ATTRIBUTE.metadata.boolean.trueValue.valid)
      .meta({
        description: "Text to be displayed when value is true.",
        example: "Yes",
      }),
    falseValue: z.string({ error: ATTRIBUTE.metadata.boolean.falseValue.valid })
      .nonempty(ATTRIBUTE.metadata.boolean.falseValue.valid)
      .meta({
        description: "Text to be displayed when value is false.",
        example: "No",
      }),
  })
}

const textTypeSelectSchema = z.object({
  type: z.literal(AttributeType.TEXT),
  options: z.array(
    z.object({
      value: z.string({ error: ATTRIBUTE.metadata.select.text.valid })
        .nonempty({ error: ATTRIBUTE.metadata.select.text.valid })
        .meta({
          description: "Text value option for the select attribute types.",
          example: "Android",
        })
    }),
    { error: ATTRIBUTE.metadata.select.options.minLength }
  )
    .min(1, { error: ATTRIBUTE.metadata.select.options.minLength })
    .superRefine((options, ctx) => {
      options.forEach((option, index) => {
        if (options.filter((optionItem) => option === optionItem).length > 1) {
          ctx.addIssue({
            path: [index],
            message: ATTRIBUTE.metadata.select.text.duplicate,
            code: "custom",
          })
        }
      })
    }),
})
const textTypeMultiSelectSchema = textTypeSelectSchema.extend({
  separator: z.string({ error: ATTRIBUTE.metadata.multiSelect.separator.required })
    .meta({
      description: "The text used to separate the selected values",
      example: ", ",
    })
})
const numberTypeSelectSchema = z.object({
  type: z.literal(AttributeType.NUMBER),
  options: z.array(
    z.object({
      label: z.string({ error: ATTRIBUTE.metadata.select.number.label.valid })
        .nonempty({ error: ATTRIBUTE.metadata.select.number.label.valid })
        .meta({
          description: "The label for the option value.",
          example: "1 TB",
        }),
      baseValue: z.number({ error: ATTRIBUTE.metadata.select.number.baseValue.valid })
        .min(1, { error: ATTRIBUTE.metadata.select.number.baseValue.minValue })
        .meta({
          description: "The base value for the option in the number select attribute types.",
          example: 1024,
        }),
    }, { error: ATTRIBUTE.metadata.select.number.required }),
    { error: ATTRIBUTE.metadata.select.options.minLength }
  )
    .min(1, { error: ATTRIBUTE.metadata.select.options.minLength })
    .superRefine((options, ctx) => {
      options.forEach(({ baseValue, label }, index) => {
        if (options.filter((option) => label === option.label).length > 1) {
          ctx.addIssue({
            path: [`${index}.label`],
            message: ATTRIBUTE.metadata.select.number.label.duplicate,
            code: "custom",
          })
        }
        if (options.filter((option) => baseValue === option.baseValue).length > 1) {
          ctx.addIssue({
            path: [`${index}.baseValue`],
            message: ATTRIBUTE.metadata.select.number.baseValue.duplicate,
            code: "custom",
          })
        }
      })
    }),
})
const numberTypeMultiSelectSchema = numberTypeSelectSchema.extend({
  separator: z.string({ error: ATTRIBUTE.metadata.multiSelect.separator.required })
    .meta({
      description: "The text used to separate the selected values",
      example: ", ",
    })
})

function selectMetadataErrorHandler(issue: any) {
  if (!issue.input) return ATTRIBUTE.metadata.select.required
  const validTypes = [
    AttributeType.TEXT,
    AttributeType.NUMBER,
  ]
  const type = (issue.input).type
  if (!type) return ATTRIBUTE.metadata.select.type.required
  if (!validTypes.includes(type)) return ATTRIBUTE.metadata.select.type.valid
}
// combination of textTypeSelectSchema and numberTypeSelectSchema based on the type literal
const selectMetadata = z.discriminatedUnion("type", [
  textTypeSelectSchema,
  numberTypeSelectSchema,
], { error: selectMetadataErrorHandler})
const multiSelectMetadata = z.discriminatedUnion("type", [
  textTypeMultiSelectSchema,
  numberTypeMultiSelectSchema,
], { error: selectMetadataErrorHandler})

const selectAttributeTypeMetadata = {
  type: z.literal(AttributeType.SELECT),
  metadata: selectMetadata,
}
const multiSelectAttributeTypeMetadata = {
  type: z.literal(AttributeType.MULTI_SELECT),
  metadata: multiSelectMetadata,
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
  // skip validations if no metadata
  if (!metadata) return
  const {
    allowDecimal,
    allowNegative,
    step,
    min,
    max,
  } = metadata

  // validate min and allowNegative compatibility
  if (!allowNegative && min !== undefined) {
    if (min >= 0 && allowNegative) {
      ctx.addIssue({
        path: ["metadata.min"],
        message: ATTRIBUTE.metadata.number.min.allowNegative,
        code: "custom",
      })
    }
  }

  // validate min and max compatibility
  if (min !== undefined && max !== undefined) {
    if (min > max) {
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

  // validate decimal compatibility
  if (!allowDecimal) {
    if (step !== undefined && step % 1) {
      ctx.addIssue({
        path: ["metadata.step"],
        message: ATTRIBUTE.metadata.number.step.integer,
        code: "custom",
      })
    }
    if (min !== undefined && min % 1) {
      ctx.addIssue({
        path: ["metadata.min"],
        message: ATTRIBUTE.metadata.number.min.integer,
        code: "custom",
      })
    }
    if (max !== undefined && max % 1) {
      ctx.addIssue({
        path: ["metadata.max"],
        message: ATTRIBUTE.metadata.number.max.integer,
        code: "custom",
      })
    }
  }

  // validate step compatibility
  if (step !== undefined) {
    if (min !== undefined && min % step) {
      ctx.addIssue({
        path: ["metadata.min"],
        message: ATTRIBUTE.metadata.number.min.step,
        code: "custom",
      })
    }
    if (max !== undefined && max % step) {
      ctx.addIssue({
        path: ["metadata.max"],
        message: ATTRIBUTE.metadata.number.max.step,
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
