import mongoose from "mongoose"

import AttributeSchema from "#mongoose/models/Catalogue/Attributes.ts"

export type InferredSubcategorySchemaType = mongoose.InferSchemaType<typeof SubcategorySchema>
export type Subcategory = mongoose.HydratedDocument<InferredSubcategorySchemaType>
export type ObjectKeys = keyof InferredSubcategorySchemaType
export type SubcategoryObject = Pick<Subcategory, ObjectKeys> & { id: Subcategory["_id"] }

/**
 * Mongoose schema for catalogue subcategory.
 */
const SubcategorySchema = new mongoose.Schema({
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
    default: undefined,
  },
}, {
  timestamps: true,
})

SubcategorySchema.index({
  category: 1,
  name: 1,
  slug: 1,
})

/**
 * Transforms an Subcategory object by mapping internal `_id` to external `id`.
 * 
 * @param subcategory - The subcategory object to transform.
 * 
 * @returns The transformed subcategory object.
 */
export function transformSubcategory({
  _id,
  category,
  name,
  slug,
  attributes,
  createdAt,
  updatedAt,
}: Subcategory): SubcategoryObject {
  const subcategory: SubcategoryObject = {
    id: _id,
    category,
    name,
    slug,
    attributes,
    createdAt,
    updatedAt,
  }

  return subcategory
}

const Subcategory = mongoose.model<Subcategory, mongoose.Model<Subcategory>>("Subcategory", SubcategorySchema, "subCategories")

export default Subcategory
