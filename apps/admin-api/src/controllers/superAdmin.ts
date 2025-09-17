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
  static async getAllAdmins(_req: Request, res: Response) {
    try {
      const data = await SuperAdminService.fetchAllAdmins()

      super.sendSuccess(res, {
        message: "Fetched All Admin Users",
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
