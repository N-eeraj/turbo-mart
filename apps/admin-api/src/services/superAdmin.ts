import type mongoose from "mongoose"

import AdminUser, {
  Roles,
  transformUser,
  type AdminObject,
} from "@app/database/mongoose/models/Admin/User.ts"
import sendMail from "@app/mailer"

import BaseService from "#services/BaseService"
import {
  type AdminCreationData,
  type AdminUpdateData,
} from "#schemas/user"
import {
  generateRandomString,
} from "#utils/random"

interface GetAdminUsersOptions {
  limit?: number
  skip?: number
  search?: string
  order?: mongoose.SortOrder
}

const DEFAULT_ADMIN_USERS_OPTIONS: Required<GetAdminUsersOptions> = {
  limit: 10,
  skip: 0,
  order: "descending",
  search: "",
}

export default class SuperAdminService extends BaseService {
  /**
   * Fetch the admin users with the "ADMIN" role.
   * 
   * @returns array of admin users.
   * 
   * @throws If database lookup fails.
   */
  static async getAdmins({
    limit = DEFAULT_ADMIN_USERS_OPTIONS.limit,
    skip = DEFAULT_ADMIN_USERS_OPTIONS.skip,
    order = DEFAULT_ADMIN_USERS_OPTIONS.order,
    search = DEFAULT_ADMIN_USERS_OPTIONS.search,
  }: GetAdminUsersOptions = DEFAULT_ADMIN_USERS_OPTIONS): Promise<Array<AdminObject>> {
    const admins = await AdminUser.find({
      role: Roles.ADMIN,
      $or: [
        {
          name: {
            $regex: new RegExp(search, "i"),
          }
        },
        {
          email: {
            $regex: new RegExp(search, "i"),
          }
        },
      ],
    })
      .sort({
        createdAt: order,
      })
      .skip(skip)
      .limit(limit)
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

      const data = {
        ...admin,
        password,
      }

      const adminUser = await AdminUser.create(data)

      await sendMail({
        recipients: [{
          email: admin.email,
        }],
        category: "Admin Creation",
        subject: "Admin Creation",
        text: `Your password is ${password}`
      })

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
   * @throws 404 error if admin user not found.
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

  /**
   * Update the admin user document by id.
   * 
   * @param adminId - Id of the admin user.
   * @param data - Data for the new user.
   * 
   * @throws 404 error if admin user not found.
   * @throws 409 error if email is already in use.
   * @throws If user update fails.
   */
  static async updateAdmin(adminId: AdminObject["id"], data: AdminUpdateData): Promise<AdminObject> {
    try {
      const updatedAdmin = await AdminUser.findOneAndUpdate(
        {
          _id: adminId,
          role: Roles.ADMIN,
        },
        data,
        {
          new: true,
        }
      )

      if (!updatedAdmin) {
        throw {
          status: 404,
          message: "Admin user not found",
        }
      }

      return transformUser(updatedAdmin)
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
   * Deletes the of admin user document.
   * 
   * @param adminId - Id of the admin user.
   * 
   * @returns admin user.
   * 
   * @throws 404 error if admin user not found.
   * @throws If deleting the admin user failed.
   */
  static async deleteAdmin(adminId: AdminObject["id"]): Promise<void> {
    const admin = await AdminUser.findOne({
      _id: adminId,
      role: Roles.ADMIN,
    })

    if (!admin) {
      throw {
        status: 404,
        message: "Admin user not found",
      }
    }

    await admin.deleteOne()
  }
}
