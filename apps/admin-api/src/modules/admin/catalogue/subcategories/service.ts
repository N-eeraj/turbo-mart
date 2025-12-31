import type mongoose from "mongoose"

import Subcategory, {
  transformSubcategory,
  type Subcategory as SubcategoryType,
  type InferredSubcategorySchemaType,
  type SubcategoryObject,
} from "@app/database/mongoose/models/Catalogue/Subcategory"
import {
  type CategoryObject,
} from "@app/database/mongoose/models/Catalogue/Category"
import {
  AttributeType,
  type AttributeObject,
} from "@app/database/mongoose/models/Catalogue/Attributes"

import BaseService from "#services/BaseService"
import {
  SubcategoryUpdateData,
  type SubcategoryCreationData,
  type SubcategoryAttributeUpdateData,
} from "@app/schemas/admin/catalogue/subcategory"

export interface ListOptions {
  limit?: number
  skip?: number
  search?: string
  order?: mongoose.SortOrder
  categories?: Array<CategoryObject["id"]>
}

type CategoryId = CategoryObject["id"]
type AttributeId = AttributeObject<AttributeType>["id"]

type ParseStringId<TItem> =
  // if the item is a string,
  TItem extends string
    ? AttributeId // convert to ObjectId
    // if the item is an object with an `id: string`,
    : TItem extends { id: string }
      ? Omit<TItem, "id"> & { id: AttributeId } // convert `id` to ObjectId
      : TItem // otherwise, leave it unchanged

export type ParsedSubcategoryAttributeUpdateData = {
  [Key in keyof SubcategoryAttributeUpdateData]-?: Array<
    ParseStringId<NonNullable<SubcategoryAttributeUpdateData[Key]>[number]>
  >
}

export interface AttributeTypeMap {
  name: typeof SubcategoryService.ATTRIBUTE_TYPES_MAP[AttributeType]
  value: AttributeType
}

const DEFAULT_LIST_OPTIONS: Required<ListOptions> = {
  limit: 10,
  skip: 0,
  order: "descending",
  search: "",
  categories: [],
}

export default class SubcategoryService extends BaseService {
  static ATTRIBUTE_TYPES_MAP = {
    [AttributeType.TEXT]: "Text",
    [AttributeType.NUMBER]: "Number",
    [AttributeType.BOOLEAN]: "Boolean",
    [AttributeType.SELECT]: "Select",
    [AttributeType.MULTI_SELECT]: "Multi Select",
    [AttributeType.COLOR]: "Color",
    [AttributeType.DATE]: "Date",
    [AttributeType.JSON]: "Key Value",
  } as const

  static ATTRIBUTE_TYPES_MAP_LIST: Array<AttributeTypeMap> = Object.entries(this.ATTRIBUTE_TYPES_MAP)
    .sort(([a], [b]) => Number(a) - Number(b))
    .map(([ value, name ]) => {
      return {
        name,
        value: Number(value),
      }
    })

  /**
   * Fetch the subcategories.
   * 
   * @param paginationQueries - Pagination query options.
   * 
   * @returns array of subcategories.
   * 
   * @throws If database lookup fails.
   */
  static async list({
    limit = DEFAULT_LIST_OPTIONS.limit,
    skip = DEFAULT_LIST_OPTIONS.skip,
    order = DEFAULT_LIST_OPTIONS.order,
    search = DEFAULT_LIST_OPTIONS.search,
    categories = DEFAULT_LIST_OPTIONS.categories,
  }: ListOptions = DEFAULT_LIST_OPTIONS): Promise<Array<SubcategoryObject>> {
    const searchFields = super.getRegexSearchList(
      search,
      [
        "name",
        "slug",
      ] satisfies Array<keyof InferredSubcategorySchemaType>,
    )

    /**
     * Defines the query conditions for finding subcategories.
     *
     * - `searchQuery` - The search query checking the name and slug fields.
     * - `categories` - The categories to filter.
     */
    const filterQuery: mongoose.FilterQuery<InferredSubcategorySchemaType> = {
      $or: searchFields,
    }

    // add categories filter if it exists
    if (categories.length) {
      filterQuery.category = {
        $in: categories,
      }
    }

    const subcategories = await Subcategory.find(filterQuery)
      .sort({
        createdAt: order,
        _id: order,
      })
      .skip(skip)
      .limit(limit)
      .select({
        attributes: 0,
      })
      .populate({
        path: "category",
        select: {
          name: 1,
          slug: 1,
        }
      })

    return subcategories.map(transformSubcategory)
  }

  /**
   * Creates a new subcategory.
   * 
   * @param subcategoryData - The data for new the subcategory.
   * - `name` - Subcategory Name.
   * - `slug` - Subcategory Slug.
   * 
   * @returns the newly created subcategory.
   * 
   * @throws 409 error if slug is already in use.
   * @throws If subcategory creation fails.
   */
  static async create({ category, name, slug }: Omit<SubcategoryCreationData, "category"> & { category: CategoryId }): Promise<SubcategoryObject> {
    try {
      const subcategory = await Subcategory.create({
        category,
        name,
        slug,
      })
      const populatedSubcategory = await subcategory
        .populate({
          path: "category",
          select: {
            name: 1,
            slug: 1,
          }
        })

      return transformSubcategory(populatedSubcategory)
    } catch (error) {
      const [isDuplicateKeyError, conflicts] = super.checkDuplicateKeyError(error)
      // throw conflict error
      if (isDuplicateKeyError) {
        throw {
          status: 409,
          message: "A subcategory with the same unique field(s) already exists",
          ...conflicts,
        }
      }

      throw error
    }
  }

  /**
   * Fetch the list of admin permissions.
   * 
   * @returns the list of admin permissions.
   */
  static async listAttributeTypes(): Promise<Array<AttributeTypeMap>> {
    return this.ATTRIBUTE_TYPES_MAP_LIST
  }

  /**
   * Fetches the details of subcategory by id.
   * 
   * @param subcategoryId - Id of the subcategory.
   * 
   * @returns subcategory.
   * 
   * @throws 404 error if subcategory not found.
   * @throws If database lookup fails.
   */
  static async getById(subcategoryId: SubcategoryObject["id"]): Promise<SubcategoryObject> {
    const subcategory = await Subcategory.findById(subcategoryId)
      .populate({
        path: "category",
        select: {
          name: 1,
          slug: 1,
        }
      })

    // throw error if subcategory is not found
    if (!subcategory) {
      throw {
        status: 404,
        message: "Subcategory not found",
      }
    }

    return transformSubcategory(subcategory)
  }

  /**
   * Fetches the details of subcategory by slug.
   * 
   * @param subcategorySlug - Slug of the subcategory.
   * 
   * @returns subcategory.
   * 
   * @throws 404 error if subcategory not found.
   * @throws If database lookup fails.
   */
  static async getBySlug(subcategorySlug: SubcategoryObject["slug"]): Promise<SubcategoryObject> {
    const subcategory = await Subcategory.findOne({
      slug: subcategorySlug,
    })

    // throw error if subcategory is not found
    if (!subcategory) {
      throw {
        status: 404,
        message: "Subcategory not found",
      }
    }

    return transformSubcategory(subcategory)
  }

  /**
   * Update the subcategory.
   * 
   * @param subcategoryId - id of the subcategory to update.
   * @param subcategoryData - Data to update the subcategory with.
   * - `name` - Subcategory Name.
   * - `slug` - Subcategory Slug.
   * 
   * @returns the newly created subcategory.
   * 
   * @throws 404 error if subcategory is not found.
   * @throws 409 error if slug is already in use.
   * @throws If subcategory update fails.
   */
  static async update(
    subcategoryId: SubcategoryObject["id"],
    { name, slug }: SubcategoryUpdateData
  ): Promise<SubcategoryObject> {
    try {
      const updatedSubcategory = await Subcategory.findByIdAndUpdate(
        subcategoryId,
        {
          name,
          slug,
        },
        {
          new: true,
        }
      )
      .populate({
        path: "category",
        select: {
          name: 1,
          slug: 1,
        }
      })

      // throw error if subcategory is not found
      if (!updatedSubcategory) {
        throw {
          status: 404,
          message: "Subcategory not found",
        }
      }

      return transformSubcategory(updatedSubcategory)
    } catch (error) {
      const [isDuplicateKeyError, conflicts] = super.checkDuplicateKeyError(error)
      // throw conflict error
      if (isDuplicateKeyError) {
        throw {
          status: 409,
          message: "A subcategory with the same unique field(s) already exists",
          ...conflicts,
        }
      }

      throw error
    }
  }

  /**
   * Deletes the subcategory document.
   * 
   * @param subcategoryId - Id of the subcategory.
   * 
   * @throws 404 error if subcategory not found.
   * @throws If deleting the subcategory failed.
   */
  static async delete(subcategoryId: SubcategoryObject["id"]): Promise<void> {
    const subcategory = await Subcategory.findByIdAndDelete(subcategoryId)

    // throw not found error if subcategory is not found
    if (!subcategory) {
      throw {
        status: 404,
        message: "Subcategory not found",
      }
    }
  }

  /**
   * Verifies that all attribute ids exist under the given subcategory.
   * 
   * @param subcategoryId - Id of the subcategory.
   * @param attributeIds - List of attribute ids.
   * 
   * @returns list of attribute ids that are not found under the subcategory.
   */
  private static async getInvalidAttributeIds(
    subcategoryId: SubcategoryObject["id"],
    attributeIds: Array<AttributeId>,
  ): Promise<Array<AttributeId>> {
    const [{ attributes }] = await Subcategory.aggregate<Pick<SubcategoryType, "_id" | "attributes">>([
      {
        $match: {
          _id: subcategoryId,
        },
      },
      {
        $project: {
          attributes: {
            $filter: {
              input: "$attributes",
              as: "attribute",
              cond: {
                $in: [
                  "$$attribute._id", attributeIds,
                ]
              },
            },
          },
        },
      },
    ])

    const attributeSet = new Set(attributes?.map(({ _id }) => _id.toString()))

    return attributeIds.filter((id) => !attributeSet.has(id.toString()))
  }

  /**
   * Updates the subcategory attributes.
   * 
   * @param subcategoryId - Id of the subcategory.
   * @param attributeData - Data of attributes.
   *  - `create`- List of new attributes to create.
   *  - `update`- List of existing attributes data to update.
   *  - `delete`- List of existing attribute ids to delete.
   * 
   * @throws 404 error if subcategory not found.
   * @throws 404 error if attributes are not found under the subcategory.
   * @throws If updating the subcategory attributes failed.
   */
  static async setAttributes(
    subcategoryId: SubcategoryObject["id"],
    attributeData: ParsedSubcategoryAttributeUpdateData,
  ): Promise<void> {
    const subcategory = await Subcategory.findById(subcategoryId)

    // throw not found error if subcategory is not found
    if (!subcategory) {
      throw {
        status: 404,
        message: "Subcategory not found",
      }
    }

    const [
      invalidUpdateAttributes,
      invalidDeleteAttributes,
    ] = await Promise.all([
      this.getInvalidAttributeIds(subcategoryId, attributeData.update.map(({ id }) => id)),
      this.getInvalidAttributeIds(subcategoryId, attributeData.delete),
    ])

    // throw not found error if any attribute id is not found under the subcategory
    if (invalidUpdateAttributes.length || invalidDeleteAttributes.length) {
      throw {
        status: 404,
        message: "Attributes not found",
        ...(invalidUpdateAttributes.length && { update: invalidUpdateAttributes }),
        ...(invalidDeleteAttributes.length && { delete: invalidDeleteAttributes }),
      }
    }

    // create attributes
    if (attributeData.create.length) {
      await Subcategory.findByIdAndUpdate(subcategoryId, {
        $push: {
          attributes: {
            $each: attributeData.create,
          },
        },
      })
    }
    
    // delete attributes
    if (attributeData.delete.length) {
      await Subcategory.findByIdAndUpdate(subcategoryId, {
        $pull: {
          attributes: {
            _id: {
              $in: attributeData.delete,
            }
          },
        },
      })
    }

    // update attributes
    if (attributeData.update.length) {
      const {
        setObj,
        arrayFilters,
      } = attributeData.update.reduce((reduced: {
        setObj: Record<string, any>
        arrayFilters: Array<Record<string, any>>
      }, { id, ...attribute }, index) => {
        const indexedKey = `updateAttributes${index}`
      
        reduced.arrayFilters.push({
          [`${indexedKey}._id`]: id,
        })
      
        for (let key in attribute) {
          reduced.setObj[`attributes.$[${indexedKey}].${key}`] = attribute[key as keyof typeof attribute]
        }
      
        return reduced
      }, {setObj: {}, arrayFilters: []})
      await Subcategory.findByIdAndUpdate(subcategoryId, {
        $set: setObj,
      }, {
        arrayFilters,
      })
    }
  }
}
