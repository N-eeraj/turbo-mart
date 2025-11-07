import type mongoose from "mongoose"

import Brand, {
  transformBrand,
  type BrandObject,
} from "@app/database/mongoose/models/Catalogue/Brand"

import BaseService from "#services/BaseService"
import {
  BrandUpdateData,
  type BrandCreationData,
} from "@app/schemas/admin/catalogue/brand"

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

export default class BrandService extends BaseService {
  /**
   * Fetch the brands.
   * 
   * @param paginationQueries - Pagination query options.
   * 
   * @returns array of brands.
   * 
   * @throws If database lookup fails.
   */
  static async list({
    limit = DEFAULT_LIST_OPTIONS.limit,
    skip = DEFAULT_LIST_OPTIONS.skip,
    order = DEFAULT_LIST_OPTIONS.order,
    search = DEFAULT_LIST_OPTIONS.search,
  }: ListOptions = DEFAULT_LIST_OPTIONS): Promise<Array<BrandObject>> {
    const searchRegex = {
      $regex: new RegExp(search, "i"),
    }

    const brands = await Brand.find({
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

    return brands.map(transformBrand)
  }

  /**
   * Creates a new brand.
   * 
   * @param brandData - The data for new the brand.
   * - `name` - Brand Name.
   * - `slug` - Brand Slug.
   * 
   * @returns the newly created brand.
   * 
   * @throws 409 error if slug is already in use.
   * @throws If brand creation fails.
   */
  static async create({ name, slug }: BrandCreationData): Promise<BrandObject> {
    try {
      const brand = await Brand.create({
        name,
        slug,
      })

      return transformBrand(brand)
    } catch (error) {
      const [isDuplicateKeyError, conflicts] = super.checkDuplicateKeyError(error)
      // throw conflict error
      if (isDuplicateKeyError) {
        throw {
          status: 409,
          message: "A brand with the same unique field(s) already exists",
          ...conflicts,
        }
      }

      throw error
    }
  }

  static async getById(brandId: BrandObject["id"]): Promise<BrandObject> {
    const brand = await Brand.findById(brandId)

    // throw error if brand is not found
    if (!brand) {
      throw {
        status: 404,
        message: "Brand not found",
      }
    }

    return transformBrand(brand)
  }

  /**
   * Update the brand.
   * 
   * @param brandId - id of the brand to update.
   * @param brandData - Data to update the brand with.
   * - `name` - Brand Name.
   * - `slug` - Brand Slug.
   * 
   * @returns the newly created brand.
   * 
   * @throws 404 error if brand is not found.
   * @throws 409 error if slug is already in use.
   * @throws If brand update fails.
   */
  static async update(
    brandId: BrandObject["id"],
    { name, slug }: BrandUpdateData
  ): Promise<BrandObject> {
    try {
      const updatedBrand = await Brand.findByIdAndUpdate(
        brandId,
        {
          name,
          slug,
        },
        {
          new: true,
        }
      )

      // throw error if brand is not found
      if (!updatedBrand) {
        throw {
          status: 404,
          message: "Brand not found",
        }
      }

      return transformBrand(updatedBrand)
    } catch (error) {
      const [isDuplicateKeyError, conflicts] = super.checkDuplicateKeyError(error)
      // throw conflict error
      if (isDuplicateKeyError) {
        throw {
          status: 409,
          message: "A brand with the same unique field(s) already exists",
          ...conflicts,
        }
      }

      throw error
    }
  }

  /**
   * Deletes the brand document.
   * 
   * @param adminId - Id of the brand.
   * 
   * @throws 404 error if brand not found.
   * @throws If deleting the brand failed.
   */
  static async delete(brandId: BrandObject["id"]): Promise<void> {
    const brand = await Brand.findByIdAndDelete(brandId)

    // throw not found error if brand is not found
    if (!brand) {
      throw {
        status: 404,
        message: "Brand not found",
      }
    }
  }
}
