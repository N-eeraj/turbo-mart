import Admin, {
  type AdminObject,
  transformUser,
} from "@app/database/mongoose/models/Admin/User.ts"

import {
  type ProfileUpdateData,
} from "#schemas/superAdmin/admin"

export default class ProfileService {
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
   * @param user - Admin user object.
   * @param data - Fields to be updated.
   * @throws 404 error if admin is not found.
   * @throws If the admin user update fails.
   */
  static async updateUserDetails(user: AdminObject["id"], data: ProfileUpdateData): Promise<AdminObject> {
    const updatedUser = await Admin.findByIdAndUpdate(user, {
      ...user,
      ...data,
    })

    // throw validation error if admin is not found
    if (!updatedUser) {
      throw {
        status: 404,
        message: "User not found",
      }
    }

    return transformUser(updatedUser)
  }
}
