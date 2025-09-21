import {
  type Request,
  type Response,
} from "express"

import BaseController from "#controllers/BaseController"
import NotificationService from "#services/profile/NotificationService"
import {
  notificationReadStatusSchema,
  notificationReadStatusBulkSchema,
} from "#schemas/user"

/**
 * Controller for all notification related APIs routes.
 */
export default class NotificationController extends BaseController {
  /**
   * @route GET /api/profile/notifications
   * 
   * Get the user notifications.
   */
  static async getNotifications({ user, query }: Request, res: Response) {
    try {
      const paginationQueries: Parameters<typeof NotificationService.getNotifications>[1] = super.parsePaginationQueries(query)

      const data = await NotificationService.getNotifications(user.id, paginationQueries)

      super.sendSuccess(res, {
        data,
        message: "Fetched User Notifications",
      })
    } catch (error) {
      super.sendError(res, error)
    }
  }

  /**
   * @route GET /api/profile/notifications/:id
   * 
   * Get the user notification.
   */
  static async getNotificationsById({ user, params }: Request, res: Response) {
    try {
      const notificationId = super.parseObjectId(params.id)
      if (notificationId === null) {
        throw {
          status: 400,
          message: "Invalid notification id",
        }
      }

      const data = await NotificationService.getNotificationsById(user.id, notificationId)

      super.sendSuccess(res, {
        data,
        message: "Fetched Notification",
      })
    } catch (error) {
      super.sendError(res, error)
    }}

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

      const data = await NotificationService.setNotificationReadStatus(user.id, read, [notificationId])

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

      let notificationIds

      if (notifications) {
        const {
          validIds,
          invalidIds,
        } = super.parseObjectIdBulk(notifications)

        if (invalidIds.length) {
          throw {
            status: 400,
            message: "Invalid notification id",
            invalidIds,
          }
        }

        notificationIds = validIds
      }

      const data = await NotificationService.setNotificationReadStatus(user.id, read, notificationIds)

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

      await NotificationService.deleteNotifications(user.id, [notificationId])

      super.sendSuccess(res, {
        message: "Deleted Notification",
      })
    } catch (error) {
      super.sendError(res, error)
    }
  }

  /**
   * @route DELETE /api/profile/notifications
   * 
   * Delete multiple notifications.
   */
  static async deleteNotificationBulk({ user, query }: Request, res: Response) {
    try {
      const notifications = query.ids

      let notificationIds
      if (Array.isArray(notifications)) {
        const {
          validIds,
          invalidIds,
        } = super.parseObjectIdBulk(notifications as Array<string>)

        if (invalidIds.length) {
          throw {
            status: 400,
            message: "Invalid notification id",
            invalidIds,
          }
        }

        notificationIds = validIds
      } else if (typeof notifications === "string") {
        const parsedId = super.parseObjectId(notifications)
        if (parsedId === null) {
          throw {
            status: 400,
            message: "Invalid notification id",
            invalidIds: [
              notifications,
            ],
          }
        }
        notificationIds = [parsedId]
      }

      await NotificationService.deleteNotifications(user.id, notificationIds)

      super.sendSuccess(res, {
        message: "Deleted Notifications",
      })
    } catch (error) {
      super.sendError(res, error)
    }
  }
}
