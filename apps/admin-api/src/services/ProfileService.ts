import bcrypt from "bcrypt"

import AdminUser, {
  transformUser,
  type AdminObject,
} from "@app/database/mongoose/models/Admin/User.ts"
import Token, {
  type Token as TokenType,
} from "@app/database/mongoose/models/Admin/Token.ts"
import Notification, {
  type Notification as NotificationType,
} from "@app/database/mongoose/models/Admin/Notification.ts"

import BaseService from "#services/BaseService"
import {
  type ProfileUpdateData,
  type PasswordUpdateData,
} from "#schemas/user"

export default class ProfileService extends BaseService {
  /**
   * Return the user object.
   * 
   * @param user - User object from the request.
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
   * @throws 404 error if admin is not found.
   * @throws 409 error if email is already in use.
   * @throws If the admin user update fails.
   */
  static async updateDetails(adminId: AdminObject["id"], { email, name }: ProfileUpdateData): Promise<AdminObject> {
    try {
      const updatedUser = await AdminUser.findByIdAndUpdate(adminId, { email, name }, { new: true })

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
   * @throws 401 error if password is incorrect.
   * @throws 404 error if admin is not found.
   * @throws If the password update fails.
   * @throws If the token deletion fails.
   */
  static async updatePassword(adminId: AdminObject["id"], token: TokenType["token"], { password, newPassword }: PasswordUpdateData): Promise<void> {
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

    // delete all the user tokens except the current one
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
   * @throws If fetching the notifications failed.
   */
  static async getNotifications(adminId: AdminObject["id"]): Promise<Array<any>> {
    const notifications = await Notification.find({
      admin: adminId,
    })
      .lean()

    return notifications.map(({ _id, admin: _admin, __v, ...notification }) => {
      return {
        id: _id,
        ...notification,
      }
    })
  }

  /**
   * Updates the `readAt` timestamp of the specified notifications based on the provided state.
   *
   * - If `state` is `true`, sets `readAt` to the current timestamp.
   * - If `state` is `false`, clears the `readAt` field (marks as unread).
   * 
   * @param adminId - Admin user id.
   * @param state - `true` to mark as read, `false` to mark as unread.
   * @param notificationIds - Array of notification IDs to update.
   * @throws If updating the notifications failed.
   */
  static async setReadNotificationStatus(adminId: AdminObject["id"], state: boolean, notificationIds: Array<NotificationType["id"]>): Promise<void> {
    console.log({adminId, notificationIds, state})
  }
}
