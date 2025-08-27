import AdminUser from "@app/database/mongoose/models/Admin/User.ts"
import AdminToken from "@app/database/mongoose/models/Admin/Token.ts"

import {
  type LoginData,
} from "#schemas/auth"

export default class AuthService {
  /**
   * Authenticates an admin with provided credentials and returns admin data along with an auth token.
   * 
   * @param credentials - Login credentials (email and password).
   * @returns - The authenticated admin data along with the generated auth token.
   * @throws 401 error if admin is not found or credentials are invalid.
   * @throws If token generation fails.
   */
  static async login(credentials: LoginData) {
    const admin = await AdminUser.authenticate(credentials)

    // throw validation error if admin is not found
    if (!admin) {
      throw {
        status: 401,
        message: "Invalid email or password",
      }
    }

    // Token
    const authToken = await AdminToken.addToken(admin.toObject().id)
    if (!authToken) throw {}

    return {
      user: admin.toObject(),
      token: authToken.toObject(),
    }
  }

  /**
   * Authenticates an admin with provided credentials and returns admin data along with an auth token.
   * 
   * @param credentials - Login credentials (email and password).
   * @returns - The authenticated admin data along with the generated auth token.
   * @throws 401 error if admin is not found or credentials are invalid.
   * @throws If token generation fails.
   */
  static async logout() {
    // const admin = await AdminUser.authenticate(credentials)

    // // throw validation error if admin is not found
    // if (!admin) {
    //   throw {
    //     status: 401,
    //     message: "Invalid email or password",
    //   }
    // }

    // // Token
    // const authToken = await AdminToken.addToken(admin.toObject().id)
    // if (!authToken) throw {}

    // return {
    //   user: admin.toObject(),
    //   token: authToken.toObject(),
    // }
  }
}
