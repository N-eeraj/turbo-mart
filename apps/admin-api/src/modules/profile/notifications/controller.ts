import {
  type Request,
  type Response,
} from "express"

import BaseController from "#controllers/BaseController"
import NotificationService, {
  type GetNotificationsOptions,
} from "#src/modules/profile/notifications/service.ts"
import {
  notificationReadStatusSchema,
  notificationReadStatusBulkSchema,
} from "@app/schemas/admin/user"

/**
 * Controller for all notification related APIs routes.
 */
export default class NotificationController extends BaseController {
  /**
   * @route GET /api/profile/notifications
   * 
   * Get the user notifications.
   */
  static async list({ user, query }: Request, res: Response) {
    const paginationQueries: GetNotificationsOptions = super.parsePaginationQueries(query)
    paginationQueries.isRead = super.parseBooleanQuery(query.isRead)

    const data = await NotificationService.list(user.id, paginationQueries)

    super.sendSuccess(res, {
      data,
      message: "Fetched User Notifications",
    })
  }

  /**
   * @route PATCH /api/profile/notifications
   * 
   * Set the read status for multiple notifications.
   */
  static async updateReadStatusMultiple({ user, body }: Request, res: Response) {
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

    const data = await NotificationService.updateReadStatuses(user.id, read, notificationIds)

    super.sendSuccess(res, {
      data,
      message: `Marked Notifications as ${read ? "Read" : "Unread"}`,
    })
  }

  /**
   * @route DELETE /api/profile/notifications
   * 
   * Delete multiple notifications.
   */
  static async deleteMultiple({ user, query }: Request, res: Response) {
    const notificationIds = super.parseResourceIdQueries(
      query,
      "notificationIds",
      "Invalid notification id"
    )

    await NotificationService.delete(user.id, notificationIds)

    super.sendSuccess(res, {
      message: "Deleted Notifications",
    })
  }

  static async getUnreadCount({ user }: Request, res: Response) {
    const data = await NotificationService.getUnreadCount(user.id)

    super.sendSuccess(res, {
      data,
      message: "Fetched Notification Count",
    })
  }

  /**
   * @route GET /api/profile/notifications/:notificationId
   * 
   * Get the user notification.
   */
  static async getById({ user, params }: Request, res: Response) {
    const notificationId = super.parseObjectId(params.notificationId)
    if (notificationId === null) {
      throw {
        status: 400,
        message: "Invalid notification id",
      }
    }

    const data = await NotificationService.getById(user.id, notificationId)

    super.sendSuccess(res, {
      data,
      message: "Fetched Notification",
    })
  }

  /**
   * @route PATCH /api/profile/notifications/:notificationId
   * 
   * Set the read status for single notification.
   */
  static async updateReadStatus({ user, params, body }: Request, res: Response) {
    const notificationId = super.parseObjectId(params.notificationId)
    if (notificationId === null) {
      throw {
        status: 400,
        message: "Invalid notification id",
      }
    }

    const {
      read,
    } = super.validateRequest(notificationReadStatusSchema, body)

    const data = await NotificationService.updateReadStatuses(user.id, read, [notificationId])

    super.sendSuccess(res, {
      data,
      message: `Marked Notification as ${read ? "Read" : "Unread"}`,
    })
  }

  /**
   * @route DELETE /api/profile/notifications/:notificationId
   * 
   * Delete single notification.
   */
  static async delete({ user, params }: Request, res: Response) {
    const notificationId = super.parseObjectId(params.notificationId)
    if (notificationId === null) {
      throw {
        status: 400,
        message: "Invalid notification id",
      }
    }

    await NotificationService.delete(user.id, [notificationId])

    super.sendSuccess(res, {
      message: "Deleted Notification",
    })
  }
}
