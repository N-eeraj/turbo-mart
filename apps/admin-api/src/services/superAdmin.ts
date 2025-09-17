import AdminUser, {
  Roles,
  transformUser,
  type AdminObject,
} from "@app/database/mongoose/models/Admin/User.ts"

import BaseService from "#services/BaseService"
import {
  type AdminCreationData,
} from "#schemas/user"
import {
  generateRandomString,
} from "#utils/random"

export default class SuperAdminService extends BaseService {
  /**
   * Fetch the admin users with the "ADMIN" role.
   * 
   * @returns array of admin users.
   * 
   * @throws If database lookup fails.
   */
  static async fetchAllAdmins(): Promise<Array<AdminObject>> {
    const admins = await AdminUser.find({
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
  static async createAdmin(admin: AdminCreationData): Promise<AdminObject> {
    try {
      const password = generateRandomString(8)
      console.log("Password", password)

      const data = {
        ...admin,
        password,
      }

      const adminUser = await AdminUser.create(data)
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

  /**
   * Fetches the details of admin user by id.
   * 
   * @param adminId - Id of the admin user.
   * 
   * @returns admin user.
   * 
   * @throws If database lookup fails.
   */
  static async getAdminById(adminId: AdminObject["id"]): Promise<AdminObject> {
    const admin = await AdminUser.findOne({
      _id: adminId,
      role: Roles.ADMIN,
    })
      .lean()

    if (!admin) {
      throw {
        status: 404,
        message: "Admin user not found",
      }
    }

    return transformUser(admin)
  }
}
