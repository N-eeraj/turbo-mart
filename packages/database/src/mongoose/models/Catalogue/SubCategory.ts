import mongoose from "mongoose"

import AttributeSchema, {
  AttributeType,
  transformAttribute,
  type Attribute,
  type AttributeObject,
} from "#mongoose/models/Catalogue/Attributes.ts"

export type InferredSubcategorySchemaType = mongoose.InferSchemaType<typeof SubcategorySchema>
export type Subcategory = Omit<mongoose.HydratedDocument<InferredSubcategorySchemaType>, "attributes"> & {
  attributes: Array<Attribute<AttributeType>>
}
export type ObjectKeys = Exclude<keyof InferredSubcategorySchemaType, "attributes">
export type SubcategoryObject = Pick<Subcategory, ObjectKeys> & {
  id: Subcategory["_id"]
  attributes?: Array<AttributeObject<AttributeType>>
}

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
 * Transforms an Subcategory object by mapping internal `_id` to external `id` 
 * and maps the attributes to the corresponding attribute object.
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
    attributes: attributes?.map(transformAttribute),
    createdAt,
    updatedAt,
  }

  return subcategory
}

const Subcategory = mongoose.models.Subcategory
  || mongoose.model<Subcategory, mongoose.Model<Subcategory>>("Subcategory", SubcategorySchema, "subCategories")

export default Subcategory
