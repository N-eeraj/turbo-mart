import Admin, {
  transformUser,
  type AdminObject,
} from "@app/database/mongoose/models/Admin/User.ts"

import BaseService from "#services/BaseService"

export default class AdminManagementService extends BaseService {
  /**
   * Fetch the admin users with the "ADMIN" role.
   * 
   * @throws If database lookup fails.
   */
  static async fetchAllAdmins(): Promise<Array<AdminObject>> {
    const admins = await Admin.find({
      role: "ADMIN"
    })
      .lean()

    return admins.map(transformUser)
  }
}
