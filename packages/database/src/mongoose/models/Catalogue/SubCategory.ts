import mongoose from "mongoose"

export type InferredSubCategorySchemaType = mongoose.InferSchemaType<typeof SubCategorySchema>
export type SubCategory = mongoose.HydratedDocument<InferredSubCategorySchemaType>
export type ObjectKeys = keyof InferredSubCategorySchemaType
export type SubCategoryObject = Pick<SubCategory, ObjectKeys> & { id: SubCategory["_id"] }

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

const TextAttributeMetaDataSchema = new mongoose.Schema({
  metaData: {
    type: {
      maxLength: {
        type: Number,
        default: undefined,
      },
    },
    default: {},
  },
}, {
  _id: false,
})

const NumberAttributeMetaDataSchema = new mongoose.Schema({
  metaData: {
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
    default: {},
  },
}, {
  _id: false,
})

const ListAttributeMetaDataSchema = new mongoose.Schema({
  metaData: {
    type: {
      type: Number,
      enum: [
        AttributeType.TEXT,
        AttributeType.NUMBER,
      ],
      required: true,
    },
    options: [],
  },
}, {
  _id: false,
  discriminatorKey: "metaData.type",
})

ListAttributeMetaDataSchema
  .discriminator(
    AttributeType.TEXT,
    new mongoose.Schema({
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
)

ListAttributeMetaDataSchema
  .discriminator(
    AttributeType.NUMBER,
    new mongoose.Schema({
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
)


const DateAttributeMetaDataSchema = new mongoose.Schema({
  metaData: {
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

const JsonAttributeMetaDataSchema = new mongoose.Schema({
  metaData: {
    type: mongoose.Schema.Types.Mixed,
    default: undefined,
  },
}, {
  _id: false,
})

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

/**
 * Mongoose schema for catalogue sub category.
 */
const SubCategorySchema = new mongoose.Schema({
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Category",
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  slug: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
  },
  attributes: {
    type: [
      AttributeSchema,
    ],
    default: [],
  },
}, {
  timestamps: true,
})

SubCategorySchema.index({
  category: 1,
  name: 1,
  slug: 1,
})

/**
 * Transforms an Sub Category object by mapping internal `_id` to external `id`.
 * 
 * @param subCategory - The sub category object to transform.
 * 
 * @returns The transformed sub category object.
 */
export function transformSubCategory({
  _id,
  category,
  name,
  slug,
  attributes,
  createdAt,
  updatedAt,
}: SubCategory): SubCategoryObject {
  const subCategory: SubCategoryObject = {
    id: _id,
    category,
    name,
    slug,
    attributes,
    createdAt,
    updatedAt,
  }

  return subCategory
}

const SubCategory = mongoose.model<SubCategory, mongoose.Model<SubCategory>>("SubCategory", SubCategorySchema, "subCategories")

export default SubCategory
