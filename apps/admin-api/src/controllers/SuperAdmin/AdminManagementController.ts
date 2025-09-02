import {
  type Request,
  type Response,
} from "express"

import BaseController from "#controllers/BaseController"
import AdminManagementService from "#services/SuperAdmin/AdminManagementService"

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
      const data = await AdminManagementService.getAllAdmins()

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
}
