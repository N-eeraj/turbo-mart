import mongoose from "mongoose"

import {
  MediaType,
} from "#mongoose/enums/catalogue/product"

export type InferredProductSchemaType = mongoose.InferSchemaType<typeof ProductSchema>
export type Product = mongoose.HydratedDocument<InferredProductSchemaType>
export type ObjectKeys = keyof InferredProductSchemaType
export type ProductObject = Pick<Product, ObjectKeys> & { id: Product["_id"] }
export type ProductBasicDetails = Pick<ProductObject, "id" | "subcategory" | "brand" | "name" | "slug">
export type ProductAttributes = Pick<ProductObject, "id" | "attributes" | "subcategory">
export type ProductVariants = Pick<ProductObject, "id" | "skuList">

const SKUSchema = new mongoose.Schema({
  code: {
    type: String,
    required: true,
    unique: true, 
    lowercase: true,
  },
  media: [
    {
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
  ],
}, {
  strict: false,
})

const property = {
  value: {
    type: mongoose.Schema.Types.Mixed,
    required: true,
  },
  label: {
    type: mongoose.Schema.Types.String,
  },
  meta: {
    type: mongoose.Schema.Types.Mixed,
  },
}

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
  slug: {
    type: String,
    required: true,
  },
  attributes: {
    type: {
      properties: [
        {
          attribute: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Attribute",
            required: true,
          },
          ...property,
        },
      ],
      variants: [
        {
          attribute: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Attribute",
            required: true,
          },
          values: {
            type: [
              {
                ...property,
                slug: {
                  type: String,
                  required: true,
                  lowercase: true,
                },
              }
            ],
          },
        },
      ],
    },
    default: undefined,
  },
  skuList: [
    SKUSchema,
  ],
}, {
  timestamps: true,
})

ProductSchema.index(
  {
    "skuList.code": 1,
  },
  {
    unique: true,
    partialFilterExpression: {
      "skuList.code": {
        $exists: true,
      },
    },
  }
)

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
  slug,
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
    slug,
    attributes,
    skuList,
    createdAt,
    updatedAt,
  }

  return product
}

/**
 * Transforms an Product object by mapping internal `_id` to external `id` and returning only the basic details.
 * 
 * @param product - The product object to transform.
 * 
 * @returns The transformed basic product details.
 */
export function getBasicDetails(product: Product): ProductBasicDetails {
  const {
    id,
    subcategory,
    brand,
    name,
    slug,
  } = transformProduct(product)
  return {
    id,
    subcategory,
    brand,
    name,
    slug,
  }
}

const Product = mongoose.models.Product
  || mongoose.model<Product, mongoose.Model<Product>>("Product", ProductSchema)

export default Product
export {
  MediaType,
}
