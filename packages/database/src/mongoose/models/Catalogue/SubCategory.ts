import mongoose from "mongoose"

import AttributeSchema from "#mongoose/models/Catalogue/Attributes.ts"

export type InferredSubCategorySchemaType = mongoose.InferSchemaType<typeof SubCategorySchema>
export type SubCategory = mongoose.HydratedDocument<InferredSubCategorySchemaType>
export type ObjectKeys = keyof InferredSubCategorySchemaType
export type SubCategoryObject = Pick<SubCategory, ObjectKeys> & { id: SubCategory["_id"] }

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
