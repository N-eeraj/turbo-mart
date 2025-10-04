import type mongoose from "mongoose"

import Category, {
  transformCategory,
  type CategoryObject,
} from "@app/database/mongoose/models/Catalogue/Category.ts"

import BaseService from "#services/BaseService"
import {
  type CategoryData,
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
   * Fetch the admin users with the "ADMIN" role.
   * 
   * @returns array of admin users.
   * 
   * @throws If database lookup fails.
   */
  static async create({ name, slug }: CategoryData): Promise<CategoryObject> {
    const category = await Category.create({
      name,
      slug,
    })

    return transformCategory(category)
  }
}
