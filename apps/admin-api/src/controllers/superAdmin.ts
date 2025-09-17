import {
  type Request,
  type Response,
} from "express"

import BaseController from "#controllers/BaseController"
import SuperAdminService from "#services/superAdmin"
import {
  adminCreationSchema,
} from "#schemas/user"

/**
 * Controller for all admin management related APIs routes.
 */
export default class SuperAdminController extends BaseController {
  /**
   * @route GET /api/super-admin/admin
   * 
   * Fetch all admin users.
   */
  static async getAdmins({ query }: Request, res: Response) {
    try {
      const options: Parameters<typeof SuperAdminService.getAdmins>[0] = {}

      // sorting order
      const parsedSortOrder = super.parseSortValue(query.order)
      if (parsedSortOrder) {
        options.order = parsedSortOrder
      }

      // pagination options
      if (Number(query.limit) > 0) {
        options.limit = Number(query.limit)
      }
      if (Number(query.skip) > 0) {
        options.skip = Number(query.skip)
      }

      const data = await SuperAdminService.getAdmins(options)

      super.sendSuccess(res, {
        message: "Fetched Admin Users",
        data,
      })
    } catch (error) {
      super.sendError(res, error)
    }
  }

  /**
   * @route POST /api/super-admin/admin
   * 
   * Create a new admin user.
   */
  static async createAdmin({ body }: Request, res: Response) {
    try {
      const admin = super.validateRequest(adminCreationSchema, body)

      const data = await SuperAdminService.createAdmin(admin)

      super.sendSuccess(res, {
        data,
        message: "Created Admin User",
      })
    } catch (error) {
      super.sendError(res, error)
    }
  }

  /**
   * @route GET /api/super-admin/admin/:id
   * 
   * Fetch admin user by id.
   */
  static async getAdminById({ params }: Request, res: Response) {
    try {
      const adminId = super.parseObjectId(params.id)
      if (!adminId) {
        throw {
          status: 400,
          message: "Invalid admin id",
        }
      }

      const data = await SuperAdminService.getAdminById(adminId)

      super.sendSuccess(res, {
        data,
        message: "Fetched Admin User",
      })
    } catch (error) {
      super.sendError(res, error)
    }
  }
}
