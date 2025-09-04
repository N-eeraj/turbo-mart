import {
  type Admin,
  transformUser,
} from "@app/database/mongoose/models/Admin/User.ts"

export default class ProfileService {
  /**
   * Transforms the authenticated user.
   * 
   * @param user - User object from the request.
   * @throws If the data transformation fails.
   */
  static async getUserDetails(user: Admin) {
    const userData = transformUser(user)
    return userData
  }
}
