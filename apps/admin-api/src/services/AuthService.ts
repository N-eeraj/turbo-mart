import AdminUser, {
  transformUser,
  type AdminObject,
} from "@app/database/mongoose/models/Admin/User.ts"
import AdminToken, {
  type Token,
} from "@app/database/mongoose/models/Admin/Token.ts"

import {
  type LoginData,
} from "#schemas/auth"

interface LoginResponse {
  user: AdminObject
  token: {
    value: string
    expiresAt: NativeDate
  }
}

export default class AuthService {
  /**
   * Authenticates an admin with provided credentials and returns admin data along with an auth token.
   * 
   * @param credentials - Login credentials (email and password).
   * @returns - The authenticated admin data along with the generated auth token.
   * @throws 401 error if admin is not found or credentials are invalid.
   * @throws If token generation fails.
   */
  static async login(credentials: LoginData): Promise<LoginResponse> {
    const admin = await AdminUser.authenticate(credentials)

    // throw validation error if admin is not found
    if (!admin) {
      throw {
        status: 401,
        message: "Invalid email or password",
      }
    }

    // Token
    const authToken = await AdminToken.addToken(admin._id)
    if (!authToken) throw {}

    return {
      user: transformUser(admin),
      token: {
        value: authToken.token,
        expiresAt: authToken.expiresAt,
      },
    }
  }

  /**
   * Removes the token of an authenticated user.
   * 
   * @param token - Token object from the request.
   * @throws If token deletion fails.
   */
  static async logout(token: Token): Promise<void> {
    await AdminToken.findByIdAndDelete(token._id)
  }
}
