import Admin, {
  Roles,
  transformUser,
  type AdminObject,
} from "@app/database/mongoose/models/Admin/User.ts"

import BaseService from "#services/BaseService"
import {
  type AdminData,
} from "#schemas/user"

export default class SuperAdminService extends BaseService {
  /**
   * Fetch the admin users with the "ADMIN" role.
   * 
   * @returns array of admin users.
   * 
   * @throws If database lookup fails.
   */
  static async fetchAllAdmins(): Promise<Array<AdminObject>> {
    const admins = await Admin.find({
      role: Roles.ADMIN
    })
      .lean()

    return admins.map(transformUser)
  }

  /**
   * Create a new admin user.
   * 
   * @param admin - Data for the new user.
   * 
   * @returns the newly created user.
   * 
   * @throws 409 error if email is already in use.
   * @throws If user creation fails.
   */
  static async createAdmin(admin: AdminData): Promise<AdminObject> {
    try {
      const password = "abcABC123"

      const data = {
        ...admin,
        password,
      }

      const adminUser = await Admin.create(data)
      return transformUser(adminUser)
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
