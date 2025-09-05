import AdminUser, {
  transformUser,
  type AdminObject,
} from "@app/database/mongoose/models/Admin/User.ts"

import BaseService from "#services/BaseService"
import {
  type ProfileUpdateData,
} from "#schemas/user"

export default class ProfileService extends BaseService {
  /**
   * Transforms the authenticated user.
   * 
   * @param user - User object from the request.
   * @throws If the data transformation fails.
   */
  static async getUserDetails(user: AdminObject): Promise<AdminObject> {
    return user
  }

  /**
   * Updates the admin user data.
   * 
   * @param userId - Admin user id.
   * @param data - Fields to be updated.
   * @throws 404 error if admin is not found.
   * @throws 409 error if email is already in use.
   * @throws If the admin user update fails.
   */
  static async updateUserDetails(userId: AdminObject["id"], { email, name }: ProfileUpdateData): Promise<AdminObject> {
    try {
      const updatedUser = await AdminUser.findByIdAndUpdate(userId, { email, name }, { new: true })

      // throw validation error if admin is not found
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
}
