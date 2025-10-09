import type mongoose from "mongoose"

import Subcategory, {
  transformSubcategory,
  type SubcategoryObject,
} from "@app/database/mongoose/models/Catalogue/Subcategory.ts"

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
}

const DEFAULT_LIST_OPTIONS: Required<ListOptions> = {
  limit: 10,
  skip: 0,
  order: "descending",
  search: "",
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
  }: ListOptions = DEFAULT_LIST_OPTIONS): Promise<Array<SubcategoryObject>> {
    const searchRegex = {
      $regex: new RegExp(search, "i"),
    }

    const subcategories = await Subcategory.find({
      $or: [
        {
          name: searchRegex,
        },
        {
          slug: searchRegex,
        },
      ],
    })
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
   * @params subcategoryData - The data for new the subcategory.
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
   * @params subcategoryId - id of the subcategory to update.
   * @params subcategoryData - Data to update the subcategory with.
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
   * Deletes the of subcategory document.
   * 
   * @param adminId - Id of the subcategory.
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
}
