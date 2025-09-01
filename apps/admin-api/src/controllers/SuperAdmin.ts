import {
  type Request,
  type Response,
} from "express"

import BaseController from "#controllers/BaseController"

/**
 * Controller for all super admin related APIs routes.
 */
export default class SuperAdminController extends BaseController {
  /**
   * @route GET /api/super-admin/admin
   * 
   * Validates login credentials and logs in the user.
   */
  static async getAllAdmins(_req: Request, res: Response) {
    try {
      const data = []!

      super.sendSuccess(res, {
        message: "Fetched all super admins",
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
