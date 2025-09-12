import {
  type Request,
  type Response,
} from "express"
import type mongoose from "mongoose"

import BaseController from "#controllers/BaseController"
import ProfileService from "#services/ProfileService"
import {
  profileUpdateSchema,
  passwordUpdateSchema,
  profilePictureSchema,
  notificationReadStatusSchema,
  notificationReadStatusBulkSchema,
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
  static async getNotifications({ user, query }: Request, res: Response) {
    try {
      const options: Parameters<typeof ProfileService.getNotifications>[1] = {}

      // read status option
      if (query.isRead === "true") {
        options.isRead = true
      } else if (query.isRead === "false") {
        options.isRead = false
      }

      // sorting order
      const parsedSortOrder = super.parseSortValue(query.order)
      if (parsedSortOrder) {
        options.order = parsedSortOrder
      }

      // pagination options
      if (Number(query.limit) > 0) {
        options.limit = Number(query.limit)
      }
      if (Number(query.skip) > 0) {
        options.skip = Number(query.skip)
      }

      const data = await ProfileService.getNotifications(user.id, options)

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
   * Set the read status for single notification.
   */
  static async setNotificationReadStatus({ user, params, body }: Request, res: Response) {
    try {
      const notificationId = super.parseObjectId(params.id)
      if (notificationId === null) {
        throw {
          status: 400,
          message: "Invalid notification id",
        }
      }

      const {
        read,
      } = super.validateRequest(notificationReadStatusSchema, body)

      const data = await ProfileService.setNotificationReadStatus(user.id, read, [notificationId])

      super.sendSuccess(res, {
        data,
        message: `Marked Notification as ${read ? "Read" : "Unread"}`,
      })
    } catch (error) {
      super.sendError(res, error)
    }
  }

  /**
   * @route PATCH /api/profile/notifications
   * 
   * Set the read status for multiple notifications.
   */
  static async setNotificationReadStatusBulk({ user, body }: Request, res: Response) {
    try {
      const {
        read,
        notifications,
      } = super.validateRequest(notificationReadStatusBulkSchema, body)

      const {
        notificationIds,
        invalidIds,
      } = notifications.reduce((map: { notificationIds: Array<mongoose.Types.ObjectId>, invalidIds: Array<string> }, id) => {
        const parsedId = super.parseObjectId(id)
        parsedId ?
          map.notificationIds.push(parsedId) :
          map.invalidIds.push(id)
        return map
      }, {
        notificationIds: [],
        invalidIds: [],
      })

      if (invalidIds.length) {
        throw {
          status: 400,
          message: "Invalid notification id",
          invalidIds,
        }
      }

      const data = await ProfileService.setNotificationReadStatus(user.id, read, notificationIds)

      super.sendSuccess(res, {
        data,
        message: `Marked Notifications as ${read ? "Read" : "Unread"}`,
      })
    } catch (error) {
      super.sendError(res, error)
    }
  }

  /**
   * @route DELETE /api/profile/notifications/:id
   * 
   * Delete single notification.
   */
  static async deleteNotification({ user, params }: Request, res: Response) {
    try {
      const notificationId = super.parseObjectId(params.id)
      if (notificationId === null) {
        throw {
          status: 400,
          message: "Invalid notification id",
        }
      }

      await ProfileService.deleteNotifications(user.id, [notificationId])

      super.sendSuccess(res, {
        message: "Deleted Notification",
      })
    } catch (error) {
      super.sendError(res, error)
    }
  }
}
