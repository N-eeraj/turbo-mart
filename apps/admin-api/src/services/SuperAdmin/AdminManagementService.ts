import Admin, {
  transformUser,
} from "@app/database/mongoose/models/Admin/User.ts"

export default class AdminManagementService {
  /**
   * Fetch the admin users with the "ADMIN" role.
   * 
   * @throws If database lookup fails.
   */
  static async fetchAllAdmins() {
    const admins = await Admin.find({
      role: "ADMIN"
    })
      .lean()

    return admins.map(transformUser)
  }
}
