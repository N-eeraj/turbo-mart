import {
  type Request,
  type Response,
} from "express"

import BaseController from "#controllers/BaseController"
import ProfileService from "#services/ProfileService"
import {
  profileUpdateSchema,
} from "#schemas/superAdmin/admin"

/**
 * Controller for all profile related APIs routes.
 */
export default class ProfileController extends BaseController {
  /**
   * @route GET /api/profile
   * 
   * Returns details of current logged in users.
   */
  static async getUserDetails({ user }: Request, res: Response) {
    try {
      const data = await ProfileService.getUserDetails(user)
  
      super.sendSuccess(res, {
        data,
        message: "Fetched User Details",
      })
    } catch (error) {
      if (error && typeof error === "object" && "message" in error) {
        super.log(error?.message, "error")
      }
      super.sendError(res, error)
    }
  }

  /**
   * @route PUT /api/profile
   * 
   * Update certain details of current logged in users.
   */
  static async updateUserDetails({ user, body }: Request, res: Response) {
    try {
      const payload = super.validateRequest(profileUpdateSchema, body)
      const data = await ProfileService.updateUserDetails(user.id, payload)

      super.sendSuccess(res, {
        data,
        message: "Updated User Details",
      })
    } catch (error) {
      if (error && typeof error === "object" && "message" in error) {
        super.log(error?.message, "error")
      }
      super.sendError(res, error)
    }
  }
}
