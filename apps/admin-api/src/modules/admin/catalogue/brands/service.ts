import type mongoose from "mongoose"

import BaseService from "#services/BaseService"

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
   * Creates a new brand.
   * 
   * @param brandData - The data for new the brand.
   * 
   * @returns the newly created brand.
   * 
   * @throws 409 error if slug is already in use.
   * @throws If brand creation fails.
   */
  static async create(): Promise<any> {
    
  }
}
