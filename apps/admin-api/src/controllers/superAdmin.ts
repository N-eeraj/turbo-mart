import {
  type Request,
  type Response,
} from "express"

import BaseController from "#controllers/BaseController"
import SuperAdminService from "#services/superAdmin"
import {
  adminSchema,
} from "#schemas/user"

/**
 * Controller for all admin management related APIs routes.
 */
export default class SuperAdminController extends BaseController {
  /**
   * @route GET /api/super-admin/admin
   * 
   * Returns a list of admin users.
   */
  static async getAllAdmins(_req: Request, res: Response) {
    try {
      const data = await SuperAdminService.fetchAllAdmins()

      super.sendSuccess(res, {
        message: "Fetched all admins",
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
      const admin = super.validateRequest(adminSchema, body)

      const data = await SuperAdminService.createAdmin(admin)

      super.sendSuccess(res, {
        data,
        message: "Created Admins",
      })
    } catch (error) {
      super.sendError(res, error)
    }
  }
}
