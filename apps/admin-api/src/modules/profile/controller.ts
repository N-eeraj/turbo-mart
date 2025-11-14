import {
  type Request,
  type Response,
} from "express"

import BaseController from "#controllers/BaseController"
import ProfileService from "#src/modules/profile/service.ts"
import {
  profileUpdateSchema,
  passwordUpdateSchema,
  profilePictureSchema,
} from "@app/schemas/admin/user"

/**
 * Controller for all profile user related APIs routes.
 */
export default class ProfileController extends BaseController {
  /**
   * @route GET /api/profile
   * 
   * Returns details of the current logged in users.
   */
  static async getDetails({ user }: Request, res: Response) {
    const data = await ProfileService.getDetails(user)

    super.sendSuccess(res, {
      data,
      message: "Fetched User Details",
    })
  }

  /**
   * @route PATCH /api/profile
   * 
   * Update certain details of the current logged in users.
   */
  static async updateDetails({ user, body }: Request, res: Response) {
    const payload = super.validateRequest(profileUpdateSchema, body)
    const data = await ProfileService.updateDetails(user.id, payload)

    super.sendSuccess(res, {
      data,
      message: "Updated User Details",
    })
  }

  /**
   * @route PUT /api/profile/password
   * 
   * Update password of the current logged in users.
   */
  static async updatePassword({ user, token, body }: Request, res: Response) {
    const passwords = super.validateRequest(passwordUpdateSchema, body)
    await ProfileService.updatePassword(user.id, token.token, passwords)

    super.sendSuccess(res, {
      message: "Updated Password",
    })
  }

  /**
   * @route PUT /api/profile/picture
   * 
   * Set profile picture of the current logged in users.
   */
  static async setProfilePicture({ user, file }: Request, res: Response) {
    const payload = {
      profilePicture: super.multerToFile(file)
    }

    const {
      profilePicture,
    } = super.validateRequest(profilePictureSchema, payload)

    const data = await ProfileService.setProfilePicture(user.id, profilePicture)
  
    super.sendSuccess(res, {
      data,
      message: "Updated Profile Picture",
    })
  }

  /**
   * @route DELETE /api/profile/picture
   * 
   * Remove profile picture of the current logged in users.
   */
  static async removeProfilePicture({ user }: Request, res: Response) {
    const data = await ProfileService.removeProfilePicture(user.id)

    super.sendSuccess(res, {
      data,
      message: "Removed Profile Picture",
    })
  }
}
