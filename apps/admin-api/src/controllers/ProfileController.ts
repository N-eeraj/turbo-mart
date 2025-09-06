import {
  type Request,
  type Response,
} from "express"

import BaseController from "#controllers/BaseController"
import ProfileService from "#services/ProfileService"
import {
  profileUpdateSchema,
  passwordUpdateSchema,
} from "#schemas/user"

/**
 * Controller for all profile related APIs routes.
 */
export default class ProfileController extends BaseController {
  /**
   * @route GET /api/profile
   * 
   * Returns details of current logged in users.
   */
  static async getDetails({ user }: Request, res: Response) {
    try {
      const data = await ProfileService.getDetails(user)
  
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
  static async updateDetails({ user, body }: Request, res: Response) {
    try {
      const payload = super.validateRequest(profileUpdateSchema, body)
      const data = await ProfileService.updateDetails(user.id, payload)

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

  static async updatePassword({ user, body }: Request, res: Response) {
    try {
      const passwords = super.validateRequest(passwordUpdateSchema, body)
      await ProfileService.updatePassword(user, passwords)

      super.sendSuccess(res, {
        message: "Updated Password",
      })
    } catch (error) {
      if (error && typeof error === "object" && "message" in error) {
        super.log(error?.message, "error")
      }
      super.sendError(res, error)
    }
  }
}
