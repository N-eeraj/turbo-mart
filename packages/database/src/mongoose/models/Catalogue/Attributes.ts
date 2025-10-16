import mongoose from "mongoose"

/**
 * Types for subcategory attributes.
 *
 * @readonly
 * @enum
 * 
 * @property TEXT = 0 - Free-form text input.
 * @property NUMBER = 1 - Numeric value.
 * @property BOOLEAN = 2 - Boolean value.
 * @property SELECT = 3 - Single option from a predefined list.
 * @property MULTI_SELECT = 4 - Multiple options from a predefined list.
 * @property COLOR = 5 - Color value, that attributes that require color picker/swatches.
 * @property DATE = 6 - Date or timestamp value.
 * @property JSON = 7 - Structured data stored as a key value JSON object.
 */
export enum AttributeType {
  TEXT,
  NUMBER,
  BOOLEAN,
  SELECT,
  MULTI_SELECT,
  COLOR,
  DATE,
  JSON,
}

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
 * | SELECT                | ListAttributeMetadataSchema          |
 * | MULTI_SELECT          | ListAttributeMetadataSchema          |
 * | DATE                  | DateAttributeMetadataSchema          |
 * | JSON                  | JsonAttributeMetadataSchema          |
 */
export type AttributeMetadataSchemaType<T extends AttributeType> = 
  T extends AttributeType.TEXT ? mongoose.InferSchemaType<typeof TextAttributeMetadataSchema> :
  T extends AttributeType.NUMBER ? mongoose.InferSchemaType<typeof NumberAttributeMetadataSchema> :
  T extends AttributeType.SELECT ? mongoose.InferSchemaType<typeof ListAttributeMetadataSchema> :
  T extends AttributeType.MULTI_SELECT ? mongoose.InferSchemaType<typeof ListAttributeMetadataSchema> :
  T extends AttributeType.DATE ? mongoose.InferSchemaType<typeof DateAttributeMetadataSchema> :
  T extends AttributeType.JSON ? mongoose.InferSchemaType<typeof JsonAttributeMetadataSchema> :
  never

export type MetadataSchemaType<T extends AttributeType> =
  AttributeMetadataSchemaType<T> extends never
    ? { metadata?: never }
    : { metadata: AttributeMetadataSchemaType<T>["metadata"] }

export type InferredAttributeSchemaType<T extends AttributeType> =
  Omit<mongoose.InferSchemaType<typeof AttributeSchema>, "type">
  & { type: T }
  & MetadataSchemaType<T>

export type Attribute<T extends AttributeType> = InferredAttributeSchemaType<T> & { _id: mongoose.Types.ObjectId }
export type ObjectKeys<T extends AttributeType> = keyof InferredAttributeSchemaType<T>
export type AttributeObject<T extends AttributeType> = Pick<Attribute<T>, ObjectKeys<T>> & { id: Attribute<T>["_id"] }

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
      min: {
        type: Number,
        default: undefined,
      },
      max: {
        type: Number,
        default: undefined,
      },
      unit: {
        type: String,
        default: undefined,
      },
      template: {
        type: String,
        default: "{{value}}",
      },
      base: {
        type: Number,
        default: 1
      },
    },
    default: undefined,
  },
}, {
  _id: false,
})

/**
 * Base mongoose schema for list attribute metadata.
 */
const ListAttributeMetadataBaseSchema = new mongoose.Schema({
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
 * Mongoose schema for text options of list attribute.
 */
const ListTextOptionSchema = new mongoose.Schema({
  options: {
    type: [
      {
        type: String,
        required: true,
      }
    ],
    default: [],
  },
}, {
  _id: false,
})

/**
 * Mongoose schema for number options of list attribute.
 */
const ListNumberOptionSchema = new mongoose.Schema({
  options: {
    type: [
      {
        type: {
          value: {
            type: Number,
            required: true,
          },
          unit: {
            type: String,
            default: undefined,
          },
          template: {
            type: String,
            default: "{{value}}",
          },
          base: {
            type: Number,
            default: 1,
          },
        },
        required: true,
      }
    ],
    default: [],
  },
}, {
  _id: false,
})

// handle the options schema based on the `type` discriminatorKey
ListAttributeMetadataBaseSchema.discriminator(AttributeType.TEXT, ListTextOptionSchema)
ListAttributeMetadataBaseSchema.discriminator(AttributeType.NUMBER, ListNumberOptionSchema)

/**
 * Mongoose schema for metadata of list attribute.
 */
const ListAttributeMetadataSchema = new mongoose.Schema({
  metadata: {
    type: ListAttributeMetadataBaseSchema,
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
 * Mongoose schema for metadata of JSON attribute.
 */
const JsonAttributeMetadataSchema = new mongoose.Schema({
  metadata: {
    type: mongoose.Schema.Types.Mixed,
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
}, {
  discriminatorKey: "type",
})

// handle the metadata schema based on the `type` discriminatorKey
AttributeSchema.discriminator(AttributeType.TEXT, TextAttributeMetadataSchema)
AttributeSchema.discriminator(AttributeType.NUMBER, NumberAttributeMetadataSchema)
AttributeSchema.discriminator(AttributeType.SELECT, ListAttributeMetadataSchema)
AttributeSchema.discriminator(AttributeType.MULTI_SELECT, ListAttributeMetadataSchema)
AttributeSchema.discriminator(AttributeType.DATE, DateAttributeMetadataSchema)
AttributeSchema.discriminator(AttributeType.JSON, JsonAttributeMetadataSchema)

/**
 * Transforms an Attribute object by mapping internal `_id` to external `id`.
 * 
 * @param attribute - The attribute object to transform.
 * 
 * @returns The transformed attribute object.
 */
export function transformAttribute<T extends AttributeType>({
  _id,
  name,
  type,
  required,
  metadata,
}: Attribute<T>): AttributeObject<T> {

  const attribute = {
    id: _id,
    name,
    type,
    required,
    metadata,
  }

  return attribute as AttributeObject<T>
}

export default AttributeSchema
