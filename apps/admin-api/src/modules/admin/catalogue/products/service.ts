import type mongoose from "mongoose"

import BaseService from "#services/BaseService"
import type {
  ProductCreationData,
} from "@app/schemas/admin/catalogue/product"

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

export default class ProductService extends BaseService {
  /**
   * Creates a new product.
   * 
   * @param productData - The data for new the product.
   * 
   * @returns the newly created product.
   * 
   * @throws If product creation fails.
   */
  static async create(product: ProductCreationData): Promise<any> {
    console.log(product)
  }
}
