import {
  type Request,
  type Response,
} from "express"

import BaseController from "#controllers/BaseController"
import ProfileService from "#services/profile/UserService"
import {
  profileUpdateSchema,
  passwordUpdateSchema,
  profilePictureSchema,
} from "#schemas/user"

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
    try {
      const data = await ProfileService.getDetails(user)
  
      super.sendSuccess(res, {
        data,
        message: "Fetched User Details",
      })
    } catch (error) {
      super.sendError(res, error)
    }
  }

  /**
   * @route PATCH /api/profile
   * 
   * Update certain details of the current logged in users.
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
      super.sendError(res, error)
    }
  }

  /**
   * @route PUT /api/profile/password
   * 
   * Update password of the current logged in users.
   */
  static async updatePassword({ user, token, body }: Request, res: Response) {
    try {
      const passwords = super.validateRequest(passwordUpdateSchema, body)
      await ProfileService.updatePassword(user.id, token.token, passwords)

      super.sendSuccess(res, {
        message: "Updated Password",
      })
    } catch (error) {
      super.sendError(res, error)
    }
  }

  /**
   * @route PUT /api/profile/picture
   * 
   * Update profile picture of the current logged in users.
   */
  static async updateProfilePicture({ user, file }: Request, res: Response) {
    try {
      const payload = {
        profilePicture: super.multerToFile(file)
      }

      const {
        profilePicture,
      } = super.validateRequest(profilePictureSchema, payload)

      const data = await ProfileService.updateProfilePicture(user.id, profilePicture)
    
      super.sendSuccess(res, {
        data,
        message: "Updated Profile Picture",
      })
    } catch (error) {
      super.sendError(res, error)
    }
  }

  /**
   * @route DELETE /api/profile/picture
   * 
   * Remove profile picture of the current logged in users.
   */
  static async removeProfilePicture({ user }: Request, res: Response) {
    try {
      const data = await ProfileService.removeProfilePicture(user.id)

      super.sendSuccess(res, {
        data,
        message: "Removed Profile Picture",
      })
    } catch (error) {
      super.sendError(res, error)
    }
  }
}
