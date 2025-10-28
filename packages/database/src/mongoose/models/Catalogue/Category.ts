import mongoose from "mongoose"

export type InferredCategorySchemaType = mongoose.InferSchemaType<typeof CategorySchema>
export type Category = mongoose.HydratedDocument<InferredCategorySchemaType>
export type ObjectKeys = keyof InferredCategorySchemaType
export type CategoryObject = Pick<Category, ObjectKeys> & { id: Category["_id"] }

/**
 * Mongoose schema for catalogue category.
 */
const CategorySchema = new mongoose.Schema({
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

CategorySchema.index({
  name: 1,
  slug: 1,
})

/**
 * Transforms an Category object by mapping internal `_id` to external `id`.
 * 
 * @param category - The category object to transform.
 * 
 * @returns The transformed category object.
 */
export function transformCategory({
  _id,
  name,
  slug,
  createdAt,
  updatedAt,
}: Category): CategoryObject {
  const category: CategoryObject = {
    id: _id,
    name,
    slug,
    createdAt,
    updatedAt,
  }

  return category
}

const Category =  mongoose.models.Category
  || mongoose.model<Category, mongoose.Model<Category>>("Category", CategorySchema)

export default Category
