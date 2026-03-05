import mongoose from "mongoose"

import {
  AttributeType,
  MeasurementType,
} from "#mongoose/enums/catalogue/attribute"

export type SelectAttributeMetadataType = AttributeType.TEXT | AttributeType.NUMBER
export type SelectAttributeType = AttributeType.SELECT | AttributeType.MULTI_SELECT
type ItemsArray<T> = T extends mongoose.Types.DocumentArray<infer U> ? Array<U> : T

type SelectAttributeOptionSchema<T extends SelectAttributeMetadataType> = 
  T extends AttributeType.TEXT ? mongoose.InferSchemaType<typeof SelectTextOptionSchema> :
  T extends AttributeType.NUMBER ? mongoose.InferSchemaType<typeof SelectNumberOptionSchema> :
  never

export type SelectAttributeMetadataSchemaType<T extends SelectAttributeMetadataType> = {
  metadata: {
    type: T
    options: ItemsArray<SelectAttributeOptionSchema<T>["options"]>
  }
}

export type MultiSelectAttributeMetadataSchemaType<T extends SelectAttributeMetadataType> =
  SelectAttributeMetadataSchemaType<T> & {
    metadata: {
      separator: string
    }
  }

type DefaultSelectAttributeMetadataType<T extends AttributeType> = T extends SelectAttributeType ? SelectAttributeMetadataType : never

/**
 * Maps an AttributeType to its corresponding Mongoose metadata schema type.
 * 
 * @template T - The specific attribute type.
 * @typeParam T - Must extend AttributeType.
 * 
 * @returns The inferred metadata schema type for the given attribute type.
 *
 * | AttributeType         | Schema Type                          |
 * |-----------------------|--------------------------------------|
 * | TEXT                  | TextAttributeMetadataSchema          |
 * | NUMBER                | NumberAttributeMetadataSchema        |
 * | BOOLEAN               | BooleanAttributeMetadataSchema       |
 * | SELECT                | SelectAttributeMetadataSchema        |
 * | MULTI_SELECT          | MultiSelectAttributeMetadataSchema   |
 * | DATE                  | DateAttributeMetadataSchema          |
 */
export type AttributeMetadataSchemaType<
  T extends AttributeType,
  LT extends SelectAttributeMetadataType = DefaultSelectAttributeMetadataType<T>
> = 
  T extends AttributeType.TEXT ? mongoose.InferSchemaType<typeof TextAttributeMetadataSchema> :
  T extends AttributeType.NUMBER ? mongoose.InferSchemaType<typeof NumberAttributeMetadataSchema> :
  T extends AttributeType.BOOLEAN ? mongoose.InferSchemaType<typeof BooleanAttributeMetadataSchema> :
  T extends AttributeType.SELECT ? SelectAttributeMetadataSchemaType<LT> :
  T extends AttributeType.MULTI_SELECT ? MultiSelectAttributeMetadataSchemaType<LT> :
  T extends AttributeType.DATE ? mongoose.InferSchemaType<typeof DateAttributeMetadataSchema> :
  never

export type MetadataSchemaType<
  T extends AttributeType,
  LT extends SelectAttributeMetadataType = DefaultSelectAttributeMetadataType<T>
> =
  AttributeMetadataSchemaType<T> extends never
    ? { metadata?: never }
    : { metadata: AttributeMetadataSchemaType<T, LT>["metadata"] }

export type InferredAttributeSchemaType<
  T extends AttributeType,
  LT extends SelectAttributeMetadataType = DefaultSelectAttributeMetadataType<T>
> =
  Omit<mongoose.InferSchemaType<typeof AttributeSchema>, "type">
  & { type: T }
  & MetadataSchemaType<T, LT>

export type Attribute<
  T extends AttributeType,
  LT extends SelectAttributeMetadataType = DefaultSelectAttributeMetadataType<T>
> = InferredAttributeSchemaType<T, LT> & { _id: mongoose.Types.ObjectId }
export type ObjectKeys<
  T extends AttributeType,
  LT extends SelectAttributeMetadataType = DefaultSelectAttributeMetadataType<T>
> = keyof InferredAttributeSchemaType<T, LT>
export type AttributeObject<
  T extends AttributeType,
  LT extends SelectAttributeMetadataType = DefaultSelectAttributeMetadataType<T>
> = Pick<Attribute<T, LT>, ObjectKeys<T, LT>> & { id: Attribute<T, LT>["_id"] }

/**
 * Mongoose schema for metadata of text attribute.
 */
const TextAttributeMetadataSchema = new mongoose.Schema({
  metadata: {
    type: {
      maxLength: {
        type: Number,
        default: undefined,
      },
    },
    default: undefined,
  },
}, {
  _id: false,
})

/**
 * Mongoose schema for metadata of number attribute.
 */
const NumberAttributeMetadataSchema = new mongoose.Schema({
  metadata: {
    type: {
      measurementType: {
        type: Number,
        enum: Object.values(MeasurementType).map(Number),
        default: MeasurementType.NUMBER,
      },
      allowDecimal: {
        type: Boolean,
        default: false,
      },
      allowNegative: {
        type: Boolean,
        default: false,
      },
      step: {
        type: Number,
        default: 1,
      },
      min: {
        type: Number,
        default: undefined,
      },
      max: {
        type: Number,
        default: undefined,
      },
    },
    default: undefined,
  },
}, {
  _id: false,
})

/**
 * Mongoose schema for metadata of boolean attribute.
 */
const BooleanAttributeMetadataSchema = new mongoose.Schema({
  metadata: {
    type: {
      trueValue: {
        type: String,
        required: true,
      },
      falseValue: {
        type: String,
        required: true,
      },
    },
    required: true,
  },
}, {
  _id: false,
})

/**
 * Base mongoose schema for select attribute metadata.
 */
const SelectAttributeMetadataBaseSchema = new mongoose.Schema({
  type: {
    type: Number,
    enum: [
      AttributeType.TEXT,
      AttributeType.NUMBER,
    ],
    required: true,
  },
}, {
  _id: false,
  discriminatorKey: "type",
})

/**
 * Mongoose schema for text options of select attribute.
 */
const SelectTextOptionSchema = new mongoose.Schema({
  options: {
    type: [
      {
        value: {
          type: String,
          default: undefined,
        },
      }
    ],
    default: [],
  },
})

/**
 * Mongoose schema for number options of select attribute.
 */
const SelectNumberOptionSchema = new mongoose.Schema({
  options: {
    type: [
      {
        label: {
          type: String,
          default: undefined,
        },
        baseValue: {
          type: Number,
          required: true,
        },
      }
    ],
    default: [],
  },
},)

// handle the options schema based on the `type` discriminatorKey
SelectAttributeMetadataBaseSchema.discriminator(AttributeType.TEXT, SelectTextOptionSchema)
SelectAttributeMetadataBaseSchema.discriminator(AttributeType.NUMBER, SelectNumberOptionSchema)

/**
 * Mongoose schema for metadata of select attribute.
 */
const SelectAttributeMetadataSchema = new mongoose.Schema({
  metadata: {
    type: SelectAttributeMetadataBaseSchema,
    required: true,
  },
}, {
  _id: false,
})

const MultiSelectAttributeMetadataBaseSchema = SelectAttributeMetadataBaseSchema.clone()
MultiSelectAttributeMetadataBaseSchema.add({
  separator: {
    type: String,
    default: "",
  },
})
/**
 * Mongoose schema for metadata of multi-select attribute.
 */
const MultiSelectAttributeMetadataSchema = new mongoose.Schema({
  metadata: {
    type: MultiSelectAttributeMetadataBaseSchema,
    required: true,
  },
}, {
  _id: false,
})


/**
 * Mongoose schema for metadata of date attribute.
 */
const DateAttributeMetadataSchema = new mongoose.Schema({
  metadata: {
    type: {
      min: {
        type: Date,
        default: undefined,
      },
      max: {
        type: Date,
        default: undefined,
      },
    },
    default: undefined,
  },
}, {
  _id: false,
})

/**
 * Mongoose schema for subcategory attribute.
 */
const AttributeSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  type: {
    type: Number,
    enum: Object.values(AttributeType).map(Number),
    required: true,
  },
  required: {
    type: Boolean,
    default: false,
  },
  variant: {
    type: Boolean,
    default: false,
  },
}, {
  discriminatorKey: "type",
})

// handle the metadata schema based on the `type` discriminatorKey
AttributeSchema.discriminator(AttributeType.TEXT, TextAttributeMetadataSchema)
AttributeSchema.discriminator(AttributeType.NUMBER, NumberAttributeMetadataSchema)
AttributeSchema.discriminator(AttributeType.BOOLEAN, BooleanAttributeMetadataSchema)
AttributeSchema.discriminator(AttributeType.SELECT, SelectAttributeMetadataSchema)
AttributeSchema.discriminator(AttributeType.MULTI_SELECT, MultiSelectAttributeMetadataSchema)
AttributeSchema.discriminator(AttributeType.DATE, DateAttributeMetadataSchema)

/**
 * Transforms an Attribute object by mapping internal `_id` to external `id`.
 * 
 * @param attribute - The attribute object to transform.
 * 
 * @returns The transformed attribute object.
 */
export function transformAttribute<
  T extends AttributeType,
  LT extends SelectAttributeMetadataType = DefaultSelectAttributeMetadataType<T>
>({
  _id,
  name,
  type,
  required,
  variant,
  metadata,
}: Attribute<T, LT>): AttributeObject<T, LT> {
  let meta
  if (metadata && typeof metadata === "object") {
    meta = (metadata as any).toObject()
    delete meta._id

    if ("options" in meta) {
      meta.options = meta.options
        .map(({ _id, ...data }: object & { _id: string }) => ({
          ...data,
          id: _id,
        }))
    }
  }

  const attribute = {
    id: _id,
    name,
    type,
    required,
    variant,
    metadata: meta,
  }

  return attribute as AttributeObject<T, LT>
}

export default AttributeSchema
export {
  AttributeType,
  MeasurementType,
}
