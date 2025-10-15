import type mongoose from "mongoose"

import Subcategory, {
  transformSubcategory,
  type InferredSubcategorySchemaType,
  type SubcategoryObject,
} from "@app/database/mongoose/models/Catalogue/Subcategory.ts"
import {
  type CategoryObject,
} from "@app/database/mongoose/models/Catalogue/Category.ts"
import {
  AttributeType,
  type AttributeObject,
} from "@app/database/mongoose/models/Catalogue/Attributes.ts"

import BaseService from "#services/BaseService"
import {
  SubcategoryUpdateData,
  type SubcategoryCreationData,
} from "#schemas/admin/catalogue/subcategory"

export interface ListOptions {
  limit?: number
  skip?: number
  search?: string
  order?: mongoose.SortOrder
  categories?: Array<CategoryObject["id"]>
}

interface SubcategoryAttributeUpdateData {
  create: Array<Exclude<AttributeObject<AttributeType>, "id">>
  update: Array<AttributeObject<AttributeType>>
  delete: Array<AttributeObject<AttributeType>["id"]>
}

const DEFAULT_LIST_OPTIONS: Required<ListOptions> = {
  limit: 10,
  skip: 0,
  order: "descending",
  search: "",
  categories: [],
}

export default class SubcategoryService extends BaseService {
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
    const searchRegex = {
      $regex: new RegExp(search, "i"),
    }

    /**
     * Defines the query conditions for finding subcategories.
     *
     * - `searchQuery` - The search query checking the name and slug fields.
     * - `categories` - The categories to filter.
     */
    const filterQuery: mongoose.FilterQuery<InferredSubcategorySchemaType> = {
      $or: [
        {
          name: searchRegex,
        },
        {
          slug: searchRegex,
        },
      ],
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
      })
      .skip(skip)
      .limit(limit)
      .lean()
      .select({
        attributes: 0,
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
  static async create({ category, name, slug }: SubcategoryCreationData): Promise<SubcategoryObject> {
    try {
      const subcategory = await Subcategory.create({
        category,
        name,
        slug,
      })

      return transformSubcategory(subcategory)
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

  static async getById(subcategoryId: SubcategoryObject["id"]): Promise<SubcategoryObject> {
    const subcategory = await Subcategory.findById(subcategoryId)

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

  private static async ensureAttributeIds(
    subcategoryId: SubcategoryObject["id"],
    attributeIds: Array<AttributeObject<AttributeType>["id"]>,
  ) {
    const attributes = await Subcategory.aggregate([
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

    console.log(attributes)
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
   * @throws If updating the subcategory attributes failed.
   */
  static async setAttributes(
    subcategoryId: SubcategoryObject["id"],
    attributeData: SubcategoryAttributeUpdateData,
  ): Promise<void> {
    const subcategory = await Subcategory.findById(subcategoryId)

    // throw not found error if subcategory is not found
    if (!subcategory) {
      throw {
        status: 404,
        message: "Subcategory not found",
      }
    }

    this.ensureAttributeIds(subcategoryId, attributeData.update.map(({ id }) => id))
    this.ensureAttributeIds(subcategoryId, attributeData.delete)
  }
}
