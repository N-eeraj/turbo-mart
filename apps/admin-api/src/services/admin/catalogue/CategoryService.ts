import type mongoose from "mongoose"

import Category, {
  transformCategory,
  type CategoryObject,
} from "@app/database/mongoose/models/Catalogue/Category.ts"

import BaseService from "#services/BaseService"
import {
  CategoryUpdateData,
  type CategoryCreationData,
} from "#schemas/admin/catalogue/category"

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

export default class CategoryService extends BaseService {
  /**
   * Fetch the categories.
   * 
   * @param paginationQueries - Pagination query options.
   * 
   * @returns array of categories.
   * 
   * @throws If database lookup fails.
   */
  static async list({
    limit = DEFAULT_LIST_OPTIONS.limit,
    skip = DEFAULT_LIST_OPTIONS.skip,
    order = DEFAULT_LIST_OPTIONS.order,
    search = DEFAULT_LIST_OPTIONS.search,
  }: ListOptions = DEFAULT_LIST_OPTIONS): Promise<Array<CategoryObject>> {
    const searchRegex = {
      $regex: new RegExp(search, "i"),
    }

    const categories = await Category.find({
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

    return categories.map(transformCategory)
  }

  /**
   * Creates a new category.
   * 
   * @params categoryData - The data for new the category.
   * - `name` - Category Name.
   * - `slug` - Category Slug.
   * 
   * @returns the newly created category.
   * 
   * @throws 409 error if slug is already in use.
   * @throws If category creation fails.
   */
  static async create({ name, slug }: CategoryCreationData): Promise<CategoryObject> {
    try {
      const category = await Category.create({
        name,
        slug,
      })

      return transformCategory(category)
    } catch (error) {
      const [isDuplicateKeyError, conflicts] = super.checkDuplicateKeyError(error)
      // throw conflict error
      if (isDuplicateKeyError) {
        throw {
          status: 409,
          message: "A category with the same unique field(s) already exists",
          ...conflicts,
        }
      }

      throw error
    }
  }

  /**
   * Update the category.
   * 
   * @params categoryId - id of the category to update.
   * @params categoryData - Data to update the category with.
   * - `name` - Category Name.
   * - `slug` - Category Slug.
   * 
   * @returns the newly created category.
   * 
   * @throws 404 error if category is not found.
   * @throws 409 error if slug is already in use.
   * @throws If category update fails.
   */
  static async update(categoryId: CategoryObject["id"], { name, slug }: CategoryUpdateData): Promise<CategoryObject> {
    try {
      const updatedCategory = await Category.findByIdAndUpdate(
        categoryId,
        {
          name,
          slug,
        },
        {
          new: true,
        }
      )

      // throw error if category is not found
      if (!updatedCategory) {
        throw {
          status: 404,
          message: "Category not found",
        }
      }

      return transformCategory(updatedCategory)
    } catch (error) {
      const [isDuplicateKeyError, conflicts] = super.checkDuplicateKeyError(error)
      // throw conflict error
      if (isDuplicateKeyError) {
        throw {
          status: 409,
          message: "A category with the same unique field(s) already exists",
          ...conflicts,
        }
      }

      throw error
    }
  }
}
