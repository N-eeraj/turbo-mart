import mongoose from "mongoose"

export type InferredBrandSchemaType = mongoose.InferSchemaType<typeof BrandSchema>
export type Brand = mongoose.HydratedDocument<InferredBrandSchemaType>
export type ObjectKeys = keyof InferredBrandSchemaType
export type BrandObject = Pick<Brand, ObjectKeys> & { id: Brand["_id"] }

/**
 * Mongoose schema for catalogue brand.
 */
const BrandSchema = new mongoose.Schema({
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
}, {
  timestamps: true,
})

BrandSchema.index({
  name: 1,
  slug: 1,
})

/**
 * Transforms an Brand object by mapping internal `_id` to external `id`.
 * 
 * @param brand - The brand object to transform.
 * 
 * @returns The transformed brand object.
 */
export function transformBrand({
  _id,
  name,
  slug,
  createdAt,
  updatedAt,
}: Brand): BrandObject {
  const brand: BrandObject = {
    id: _id,
    name,
    slug,
    createdAt,
    updatedAt,
  }

  return brand
}

const Brand = mongoose.models.Brand
  || mongoose.model<Brand, mongoose.Model<Brand>>("Brand", BrandSchema)

export default Brand
