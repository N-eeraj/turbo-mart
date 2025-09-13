import bcrypt from "bcrypt"
import type mongoose from "mongoose"

import AdminUser, {
  transformUser,
  type AdminObject,
} from "@app/database/mongoose/models/Admin/User.ts"
import Token, {
  type Token as TokenType,
} from "@app/database/mongoose/models/Admin/Token.ts"
import Notification, {
  type Notification as NotificationType,
  type InferredNotificationSchemaType,
} from "@app/database/mongoose/models/Admin/Notification.ts"

import BaseService from "#services/BaseService"
import {
  type ProfileUpdateData,
  type PasswordUpdateData,
} from "#schemas/user"

interface GetNotificationOptions {
  isRead?: boolean
  limit?: number
  skip?: number
  order?: mongoose.SortOrder
}

const DEFAULT_NOTIFICATION_OPTIONS: GetNotificationOptions = {
  limit: 10,
  skip: 0,
  order: "descending",
}
export default class ProfileService extends BaseService {
  /**
   * Return the admin user object.
   * 
   * @param user - User object from the request.
   * 
   * @returns the admin user object.
   * 
   * @throws If the data transformation fails.
   */
  static async getDetails(user: AdminObject): Promise<AdminObject> {
    return user
  }

  /**
   * Updates the admin user data.
   * 
   * @param adminId - Admin user id.
   * @param data - Fields to be updated.
   * 
   * @returns the updated admin user object.
   * 
   * @throws 404 error if admin is not found.
   * @throws 409 error if email is already in use.
   * @throws If the admin user update fails.
   */
  static async updateDetails(adminId: AdminObject["id"], { email, name }: ProfileUpdateData): Promise<AdminObject> {
    try {
      const updatedUser = await AdminUser.findByIdAndUpdate(
        adminId,
        {
          email,
          name,
        },
        {
          new: true,
        }
      )

      // throw error if admin is not found
      if (!updatedUser) {
        throw {
          status: 404,
          message: "User not found",
        }
      }

      return transformUser(updatedUser)
    } catch (error) {
      const isDuplicateKeyError = super.checkDuplicateKeyError(error)
      if (isDuplicateKeyError) {
        throw {
          status: 409,
          message: "Email already in use"
        }
      }

      throw error
    }
  }

  /**
   * Updates the admin user password if the given password matches
   * along with deleting all the other authentication token except the current one.
   * 
   * @param adminId - Admin user id.
   * @param passwords - Fields to be updated.
   * 
   * @throws 401 error if password is incorrect.
   * @throws 404 error if admin is not found.
   * @throws If the password update fails.
   * @throws If the token deletion fails.
   */
  static async updatePassword(
    adminId: AdminObject["id"],
    token: TokenType["token"],
    { password, newPassword }: PasswordUpdateData
  ): Promise<void> {
    const user = await AdminUser.findById(adminId)

    // throw error if admin is not found
    if (!user) {
      throw {
        status: 404,
        message: "User not found",
      }
    }

    // check if user password is correct
    const isMatch = await bcrypt.compare(password, user.password)
    if (!isMatch) {
      throw {
        status: 401,
        message: "Incorrect password"
      }
    }

    // update user password with newPassword
    user.password = newPassword
    await user.save()

    // delete all the admin user tokens except the current one
    await Token.deleteMany({
      admin: adminId,
      token: { $ne: token }
    })
  }

  /**
   * Updates the admin user's profile picture and
   * replaces if another one already exists.
   * 
   * @param adminId - Admin user id.
   * @param picture - File to set as the profile picture.
   * 
   * @returns the updated profile picture public path.
   * 
   * @throws 404 error if admin is not found.
   * @throws If the profile picture update fails.
   */
  static async updateProfilePicture(adminId: AdminObject["id"], picture: File): Promise<string> {
    const fileName = `${adminId}.${super.getFileExtension(picture)}`
    const {
      publicPath,
      relativePath,
    } = await super.storeFileToStorage(picture, fileName, "/profile-pictures/", true)

    const user = await AdminUser.findByIdAndUpdate(adminId, {
      profilePicture: {
        publicPath,
        fileLocation: relativePath,
      },
    })

    // throw error if admin is not found
    if (!user) {
      throw {
        status: 404,
        message: "User not found",
      }
    }

    return publicPath
  }

  /**
   * Removes the admin user's profile picture.
   * 
   * @param adminId - Admin user id.
   * 
   * @throws 404 error if admin is not found.
   * @throws If the profile picture update fails.
   */
  static async removeProfilePicture(adminId: AdminObject["id"]): Promise<void> {
    const user = await AdminUser.findByIdAndUpdate(adminId, {
      $unset: {
        profilePicture: "",
      },
    })

    // throw error if admin is not found
    if (!user) {
      throw {
        status: 404,
        message: "User not found",
      }
    }

    if (user.profilePicture?.fileLocation) {
      super.removeFileFromStorage(user.profilePicture.fileLocation)
    }
  }

  /**
   * Returns the list of notifications of the admin user.
   * 
   * @param adminId - Admin user id.
   * 
   * @returns the list of notifications based on the options.
   * 
   * @throws If fetching the notifications failed.
   */
  static async getNotifications(
    adminId: AdminObject["id"],
    {
      isRead,
      limit = 10,
      skip = 0,
      order = "descending",
    }: GetNotificationOptions = DEFAULT_NOTIFICATION_OPTIONS
  ): Promise<Array<any>> {
    /**
     * Defines the query conditions for finding notifications.
     *
     * - `adminId` - The admin user ID.
     * - `isRead` - Checks if `readAt` field exists or doesn't exists if explicitly mentioned.
     */
    const filterQuery: mongoose.FilterQuery<InferredNotificationSchemaType> = {
      admin: adminId,
    }
    // add readAt filter if it exists
    if (isRead !== undefined) {
      filterQuery.readAt = {
        $exists: isRead,
      }
    }

    const notifications = await Notification.find(filterQuery)
      .sort({
        createdAt: order,
      })
      .skip(skip)
      .limit(limit)
      .lean()

    return notifications.map(({ _id, admin: _admin, __v, ...notification }) => {
      return {
        id: _id,
        ...notification,
      }
    })
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
    notificationIds?: Array<NotificationType["_id"]>
  ): Promise<mongoose.FilterQuery<InferredNotificationSchemaType>> {
    // ensure non empty array if notifications are passed
    if (notificationIds && !notificationIds.length) {
      throw {
        status: 400,
        message: "Not notifications selected",
      }
    }

    const filterQuery: mongoose.FilterQuery<InferredNotificationSchemaType> = {
      ...(
        notificationIds && {
          _id: {
            $in: notificationIds,
          },
        }
      ),
      admin: adminId,
    }

    const notifications = await Notification.find(filterQuery)
      .select({ _id: 1 })
      .lean()

    if (notificationIds) {
      const notificationIdsSet = new Set(notifications.map(({ _id }) => _id.toString()))

      const notFoundNotifications = notificationIds.filter((id) => !notificationIdsSet.has(id.toString()))
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
  static async setNotificationReadStatus(
    adminId: AdminObject["id"],
    read: boolean,
    notificationIds?: Array<NotificationType["_id"]>
  ): Promise<void> {
    const filterQuery = await ProfileService.validateUserNotificationAndGetQuery(adminId, notificationIds)

    const updateQuery: mongoose.UpdateQuery<InferredNotificationSchemaType> = read ? {
      $set: {
        readAt: new Date(),
      },
    } : {
      $unset: {
        readAt: "",
      }
    }

    await Notification.updateMany(filterQuery, updateQuery)
  }

  /**
   * Deletes the specified notifications.
   *
   * @param adminId - Admin user id.
   * @param notificationIds - An optional array of notification IDs to delete, if undefined all admin user notifications are selected.
   * 
   * @throws If deleting the notifications failed.
   */
  static async deleteNotifications(
    adminId: AdminObject["id"],
    notificationIds?: Array<NotificationType["_id"]>
  ): Promise<void> {
    const filterQuery = await ProfileService.validateUserNotificationAndGetQuery(adminId, notificationIds)

    await Notification.deleteMany(filterQuery)
  }
}
