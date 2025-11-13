import type mongoose from "mongoose"

import {
  type AdminObject,
} from "@app/database/mongoose/models/Admin/User"
import AdminNotification, {
  transformNotification,
  type AdminNotificationObject,
  type InferredAdminNotificationSchemaType,
} from "@app/database/mongoose/models/Admin/Notification"

import BaseService from "#services/BaseService"

export interface GetNotificationsOptions {
  isRead?: boolean
  limit?: number
  skip?: number
  order?: mongoose.SortOrder
}

const DEFAULT_NOTIFICATION_OPTIONS: Required<Omit<GetNotificationsOptions, "isRead">> = {
  limit: 10,
  skip: 0,
  order: "descending",
}

export default class NotificationService extends BaseService {
  /**
   * Returns the list of notifications of the admin user.
   * 
   * @param adminId - Admin user id.
   * @param paginationQueries - Pagination query options.
   * 
   * @returns the list of notifications based on the options.
   * 
   * @throws If fetching the notifications failed.
   */
  static async list(
    adminId: AdminObject["id"],
    {
      isRead,
      limit = DEFAULT_NOTIFICATION_OPTIONS.limit,
      skip = DEFAULT_NOTIFICATION_OPTIONS.skip,
      order = DEFAULT_NOTIFICATION_OPTIONS.order,
    }: GetNotificationsOptions = DEFAULT_NOTIFICATION_OPTIONS
  ): Promise<Array<AdminNotificationObject>> {
    /**
     * Defines the query conditions for finding notifications.
     *
     * - `adminId` - The admin user ID.
     * - `isRead` - Checks if `readAt` field exists or doesn't exists if explicitly mentioned.
     */
    const filterQuery: mongoose.FilterQuery<InferredAdminNotificationSchemaType> = {
      admin: adminId,
    }
    // add readAt filter if it exists
    if (isRead !== undefined) {
      filterQuery.readAt = {
        $exists: isRead,
      }
    }

    const notifications = await AdminNotification.find(filterQuery)
      .sort({
        createdAt: order,
      })
      .skip(skip)
      .limit(limit)

    return notifications.map(transformNotification)
  }

  static async getUnreadCount(adminId: AdminObject["id"]): Promise<number> {
    const [{ notificationCount }] = await AdminNotification.aggregate([
      {
        $match: {
          admin: adminId,
          readAt: {
            $exists: false,
          },
        },
      },
      {
        $count: "notificationCount",
      },
    ])
    return notificationCount
  }

  static async getById(
    adminId: AdminObject["id"],
    notificationId: AdminNotificationObject["id"]
  ): Promise<AdminNotificationObject> {
    const notification = await AdminNotification.findOne({
      _id: notificationId,
      admin: adminId,
    })

    // throw not found error if notification is not found
    if (!notification) {
      throw {
        status: 404,
        message: "Notification not found",
      }
    }

    return transformNotification(notification)
  }

  /**
   * 
    * Validates the notification Ids
    * 
   * @param adminId - Admin user id.
   * @param notificationIds - An optional array of notification IDs to update, if undefined all admin user notifications are selected.
   * 
   * @returns Filter query to be used to handle the notification operations
   * 
   * @throws 400 error if notificationsIds exists and is empty.
   * @throws 404 error if notifications are not found for the admin user.
   */
  private static async validateUserNotificationAndGetQuery(
    adminId: AdminObject["id"],
    notificationIds?: Array<AdminNotificationObject["id"]>
  ): Promise<mongoose.FilterQuery<InferredAdminNotificationSchemaType>> {
    // ensure non empty array if notifications are passed
    if (notificationIds && !notificationIds.length) {
      throw {
        status: 400,
        message: "No notifications selected",
      }
    }

    const filterQuery: mongoose.FilterQuery<InferredAdminNotificationSchemaType> = {
      ...(
        notificationIds && {
          _id: {
            $in: notificationIds,
          },
        }
      ),
      admin: adminId,
    }

    const notifications = await AdminNotification.find(filterQuery)
      .select({ _id: 1 })
      .lean()

    if (notificationIds) {
      const notificationIdsSet = new Set(notifications.map(({ _id }) => _id.toString()))

      const notFoundNotifications = notificationIds.filter((id) => !notificationIdsSet.has(id.toString()))
      // throw not found error if notification is not found
      if (notFoundNotifications.length) {
        throw {
          status: 404,
          message: "Notification not found",
          notifications: notFoundNotifications,
        }
      }
    }

    return filterQuery
  }

  /**
   * Updates the `readAt` timestamp of the specified notifications based on the provided read.
   *
   * - If `read` is `true`, sets `readAt` to the current timestamp.
   * - If `read` is `false`, clears the `readAt` field (marks as unread).
   * 
   * @param adminId - Admin user id.
   * @param read - `true` to mark as read, `false` to mark as unread.
   * @param notificationIds - An optional array of notification IDs to update, if undefined all admin user notifications are selected.
   * 
   * @throws If updating the notifications failed.
   */
  static async updateReadStatuses(
    adminId: AdminObject["id"],
    read: boolean,
    notificationIds?: Array<AdminNotificationObject["id"]>
  ): Promise<void> {
    const filterQuery = await NotificationService.validateUserNotificationAndGetQuery(adminId, notificationIds)

    const updateQuery: mongoose.UpdateQuery<InferredAdminNotificationSchemaType> = read ? {
      $set: {
        readAt: new Date(),
      },
    } : {
      $unset: {
        readAt: "",
      }
    }

    await AdminNotification.updateMany(filterQuery, updateQuery)
  }

  /**
   * Deletes the specified notifications.
   *
   * @param adminId - Admin user id.
   * @param notificationIds - An optional array of notification IDs to delete, if undefined all admin user notifications are selected.
   * 
   * @throws If deleting the notifications failed.
   */
  static async delete(
    adminId: AdminObject["id"],
    notificationIds?: Array<AdminNotificationObject["id"]>
  ): Promise<void> {
    const filterQuery = await NotificationService.validateUserNotificationAndGetQuery(adminId, notificationIds)

    await AdminNotification.deleteMany(filterQuery)
  }
}
