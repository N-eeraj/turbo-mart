import mongoose from "mongoose"

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

export type AttributeMetaDataSchemaType<T extends AttributeType> = 
  T extends AttributeType.TEXT ? mongoose.InferSchemaType<typeof TextAttributeMetaDataSchema> :
  T extends AttributeType.NUMBER ? mongoose.InferSchemaType<typeof NumberAttributeMetaDataSchema> :
  T extends AttributeType.SELECT ? mongoose.InferSchemaType<typeof ListAttributeMetaDataSchema> :
  T extends AttributeType.MULTI_SELECT ? mongoose.InferSchemaType<typeof ListAttributeMetaDataSchema> :
  T extends AttributeType.DATE ? mongoose.InferSchemaType<typeof DateAttributeMetaDataSchema> :
  T extends AttributeType.JSON ? mongoose.InferSchemaType<typeof JsonAttributeMetaDataSchema> :
  never

export type MetadataSchemaType<T extends AttributeType> =
  AttributeMetaDataSchemaType<T> extends never
    ? { metadata?: never }
    : { metadata: AttributeMetaDataSchemaType<T>["metadata"] }

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
const TextAttributeMetaDataSchema = new mongoose.Schema({
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
const NumberAttributeMetaDataSchema = new mongoose.Schema({
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
const ListAttributeMetaDataBaseSchema = new mongoose.Schema({
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

ListAttributeMetaDataBaseSchema.discriminator(AttributeType.TEXT, ListTextOptionSchema)
ListAttributeMetaDataBaseSchema.discriminator(AttributeType.NUMBER, ListNumberOptionSchema)

/**
 * Mongoose schema for metadata of list attribute.
 */
const ListAttributeMetaDataSchema = new mongoose.Schema({
  metadata: {
    type: ListAttributeMetaDataBaseSchema,
    required: true,
  },
}, {
  _id: false,
})


/**
 * Mongoose schema for metadata of date attribute.
 */
const DateAttributeMetaDataSchema = new mongoose.Schema({
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
const JsonAttributeMetaDataSchema = new mongoose.Schema({
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

AttributeSchema.discriminator(AttributeType.TEXT, TextAttributeMetaDataSchema)
AttributeSchema.discriminator(AttributeType.NUMBER, NumberAttributeMetaDataSchema)
AttributeSchema.discriminator(AttributeType.SELECT, ListAttributeMetaDataSchema)
AttributeSchema.discriminator(AttributeType.MULTI_SELECT, ListAttributeMetaDataSchema)
AttributeSchema.discriminator(AttributeType.DATE, DateAttributeMetaDataSchema)
AttributeSchema.discriminator(AttributeType.JSON, JsonAttributeMetaDataSchema)

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
