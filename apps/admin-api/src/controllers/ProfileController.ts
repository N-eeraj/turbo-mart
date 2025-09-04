import {
  type Request,
  type Response,
} from "express"

import BaseController from "#controllers/BaseController"
import ProfileService from "#services/ProfileService"

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
    const data = await ProfileService.getUserDetails(user)

    super.sendSuccess(res, {
      data,
      message: "Fetched User Details",
    })
  }
}
