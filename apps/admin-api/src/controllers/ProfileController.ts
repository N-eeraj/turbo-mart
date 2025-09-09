import {
  type Request,
  type Response,
} from "express"

import BaseController from "#controllers/BaseController"
import ProfileService from "#services/ProfileService"
import {
  profileUpdateSchema,
  passwordUpdateSchema,
  profilePictureSchema,
  notificationReadStatusSchema,
} from "#schemas/user"

/**
 * Controller for all profile related APIs routes.
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

  /**
   * @route GET /api/profile/notifications
   * 
   * Get the user notifications.
   */
  static async getNotifications({ user }: Request, res: Response) {
    try {
      const data = await ProfileService.getNotifications(user.id)

      super.sendSuccess(res, {
        data,
        message: "Fetched User Notifications",
      })
    } catch (error) {
      super.sendError(res, error)
    }
  }

  /**
   * @route PATCH /api/profile/notifications/:id
   * 
   * Set the notification read status.
   */
  static async setReadNotificationStatus({ user, params, body }: Request, res: Response) {
    try {
      const notificationId = params.id

      const {
        state,
      } = super.validateRequest(notificationReadStatusSchema, body)

      const data = await ProfileService.setReadNotificationStatus(user.id, state, [notificationId])

      super.sendSuccess(res, {
        data,
        message: `Marked Notifications as ${state ? "read" : "unread"}`,
      })
    } catch (error) {
      super.sendError(res, error)
    }
  }
}
