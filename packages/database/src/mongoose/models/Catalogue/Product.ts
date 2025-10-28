import mongoose from "mongoose"

export type InferredProductSchemaType = mongoose.InferSchemaType<typeof ProductSchema>
export type Product = mongoose.HydratedDocument<InferredProductSchemaType>
export type ObjectKeys = keyof InferredProductSchemaType
export type ProductObject = Pick<Product, ObjectKeys> & { id: Product["_id"] }

export enum MediaType {
  IMAGE,
  VIDEO,
}

const SKUSchema = new mongoose.Schema({
  code: {
    type: String,
    required: true,
    unique: true, 
    lowercase: true,
  },
  media: [
    {
      type: {
        publicPath: {
          type: String,
          required: true,
        },
        fileLocation: {
          type: String,
          required: true,
        },
        type: {
          type: Number,
          enum: Object.values(MediaType).map(Number),
          required: true,
        },
      },
      default: undefined,
    }
  ],
}, {
  strict: false,
})

/**
 * Mongoose schema for catalogue product.
 */
const ProductSchema = new mongoose.Schema({
  subcategory: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Subcategory",
    required: true,
  },
  brand: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Brand",
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  attributes: {
    type: [
      {
        attribute: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Attribute",
          required: true,
        },
        value: {
          type: mongoose.Schema.Types.Mixed,
          default: undefined,
        },
        variants: {
          type: [
            {
              value: {
                type: mongoose.Schema.Types.Mixed,
                required: true,
              },
              slug: {
                type: String,
                required: true,
                lowercase: true,
              },
            }
          ],
          default: undefined,
        },
      }
    ],
    default: undefined,
  },
  skuList: {
    type: [
      SKUSchema
    ],
    default: undefined,
  },
}, {
  timestamps: true,
})

ProductSchema.index({
  name: 1,
  "skuList.code": 1,
})

/**
 * Transforms an Product object by mapping internal `_id` to external `id`.
 * 
 * @param product - The product object to transform.
 * 
 * @returns The transformed product object.
 */
export function transformProduct({
  _id,
  subcategory,
  brand,
  name,
  attributes,
  skuList,
  createdAt,
  updatedAt,
}: Product): ProductObject {
  const product: ProductObject = {
    id: _id,
    subcategory,
    brand,
    name,
    attributes,
    skuList,
    createdAt,
    updatedAt,
  }

  return product
}

const Product =  mongoose.models.Product
  || mongoose.model<Product, mongoose.Model<Product>>("Product", ProductSchema)

export default Product
