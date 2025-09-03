import {
  type Request,
  type Response,
} from "express"

import BaseController from "#controllers/BaseController"
import AdminManagementService from "#services/SuperAdmin/AdminManagementService"
import {
  adminSchema,
} from "#schemas/superAdmin/admin"

/**
 * Controller for all admin management related APIs routes.
 */
export default class AdminManagementController extends BaseController {
  /**
   * @route GET /api/super-admin/admin
   * 
   * Returns a list of admin users.
   */
  static async getAllAdmins(_req: Request, res: Response) {
    try {
      const data = await AdminManagementService.fetchAllAdmins()

      super.sendSuccess(res, {
        message: "Fetched all admins",
        data,
      })
    } catch (error) {
      if (error && typeof error === "object" && "message" in error) {
        super.log(error?.message, "error")
      }
      super.sendError(res, error)
    }
  }

  /**
   * @route POST /api/super-admin/admin
   * 
   * Create a new admin.
   */
  static async createAdmin({ body }: Request, res: Response) {
    try {
      const admin = super.validateRequest(adminSchema, body)

      super.sendSuccess(res, {
        data: admin,
        message: "Fetched all admins",
      })
    } catch (error) {
      if (error && typeof error === "object" && "message" in error) {
        super.log(error?.message, "error")
      }
      super.sendError(res, error)
    }
  }
}
