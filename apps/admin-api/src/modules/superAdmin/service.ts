import type mongoose from "mongoose"

import AdminUser, {
  Roles,
  transformUser,
  Permissions,
  type AdminObject,
  type InferredAdminSchemaType,
} from "@app/database/mongoose/models/Admin/User.ts"
import sendMail from "@app/mailer"

import BaseService from "#services/BaseService"
import {
  type AdminCreationData,
  type AdminUpdateData,
} from "@app/schemas/admin/user"
import {
  generateRandomString,
} from "#utils/random"


export interface GetAdminUsersOptions {
  limit?: number
  skip?: number
  search?: string
  order?: mongoose.SortOrder
}

export interface PermissionMap {
  name: typeof SuperAdminService.PERMISSIONS_MAP[Permissions]
  value: Permissions
}

const DEFAULT_ADMIN_USERS_OPTIONS: Required<GetAdminUsersOptions> = {
  limit: 10,
  skip: 0,
  order: "descending",
  search: "",
}

export default class SuperAdminService extends BaseService {
  static PERMISSIONS_MAP = {
    [Permissions.RETAILER_MANAGER]: "Retailer Manager",
    [Permissions.CATALOGUE_MANAGER]: "Catalogue Manager",
    [Permissions.DELIVERY_PERSON_MANAGER]: "Delivery Person Manager",
    [Permissions.FINANCE_MANAGER]: "Finance Manager",
    [Permissions.DATA_ANALYST]: "Data Analyst",
  } as const

  static PERMISSIONS_MAP_LIST: Array<PermissionMap> = Object.entries(this.PERMISSIONS_MAP)
    .sort(([a], [b]) => Number(a) - Number(b))
    .map(([ value, name ]) => {
      return {
        name,
        value: Number(value),
      }
    })

  /**
   * Fetch the admin users with the "ADMIN" role.
   * 
   * @param paginationQueries - Pagination query options.
   * 
   * @returns array of admin users.
   * 
   * @throws If database lookup fails.
   */
  static async listAdmins({
    limit = DEFAULT_ADMIN_USERS_OPTIONS.limit,
    skip = DEFAULT_ADMIN_USERS_OPTIONS.skip,
    order = DEFAULT_ADMIN_USERS_OPTIONS.order,
    search = DEFAULT_ADMIN_USERS_OPTIONS.search,
  }: GetAdminUsersOptions = DEFAULT_ADMIN_USERS_OPTIONS): Promise<Array<AdminObject>> {
    const searchFields = super.getRegexSearchList(
      search,
      [
        "name",
        "email",
      ] satisfies Array<keyof InferredAdminSchemaType>,
    )
    const admins = await AdminUser.find({
      role: Roles.ADMIN,
      $or: searchFields,
    })
      .sort({
        createdAt: order,
      })
      .skip(skip)
      .limit(limit)

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
      const mailContent = await super.renderTemplate("adminCreation.ejs", data)
      await sendMail({
        recipients: [{
          email: admin.email,
        }],
        category: "Admin Creation",
        subject: "Admin Creation",
        body: {
          type: "html",
          content: mailContent,
        }
      })

      return transformUser(adminUser)
    } catch (error) {
      const [isDuplicateKeyError, conflicts] = super.checkDuplicateKeyError(error)
      // throw conflict error
      if (isDuplicateKeyError) {
        throw {
          status: 409,
          message: "An admin user with the same unique field(s) already exists",
          ...conflicts,
        }
      }

      throw error
    }
  }

  /**
   * Fetch the list of admin permissions.
   * 
   * @returns the list of admin permissions.
   */
  static async listAdminPermissions(): Promise<Array<PermissionMap>> {
    return this.PERMISSIONS_MAP_LIST
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

    // throw not found error if admin is not found
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

      // throw not found error if admin is not found
      if (!updatedAdmin) {
        throw {
          status: 404,
          message: "Admin user not found",
        }
      }

      return transformUser(updatedAdmin)
    } catch (error) {
      const [isDuplicateKeyError, conflicts] = super.checkDuplicateKeyError(error)
      // throw conflict error
      if (isDuplicateKeyError) {
        throw {
          status: 409,
          message: "An admin user with the same unique field(s) already exists",
          ...conflicts,
        }
      }

      throw error
    }
  }

  /**
   * Deletes the admin user document.
   * 
   * @param adminId - Id of the admin user.
   * 
   * @throws 404 error if admin user not found.
   * @throws If deleting the admin user failed.
   */
  static async deleteAdmin(adminId: AdminObject["id"]): Promise<void> {
    const admin = await AdminUser.findOneAndDelete({
      _id: adminId,
      role: Roles.ADMIN,
    })

    // throw not found error if admin is not found
    if (!admin) {
      throw {
        status: 404,
        message: "Admin user not found",
      }
    }
  }
}
