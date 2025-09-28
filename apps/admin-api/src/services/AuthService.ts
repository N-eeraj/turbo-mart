import crypto from "crypto"

import AdminUser, {
  transformUser,
  type AdminObject,
} from "@app/database/mongoose/models/Admin/User.ts"
import AdminToken, {
  type Token,
} from "@app/database/mongoose/models/Admin/Token.ts"
import db from "@app/database/drizzle/db.ts"
import resetPassword, {
  UserType,
} from "@app/database/drizzle/schemas/resetPassword.ts"
import sendMail from "@app/mailer"

import BaseService from "#services/BaseService"
import {
  type LoginData,
  type ForgotPasswordData,
  type ResetPasswordData,
} from "#schemas/auth"

interface LoginResponse {
  user: AdminObject
  token: {
    value: string
    expiresAt: NativeDate
  }
}

export default class AuthService extends BaseService {
  private static RESET_PASSWORD_TOKEN_VALIDITY = 9_00_000 as const // 15 minutes in ms

  /**
   * Authenticates an admin with provided credentials and returns admin data along with an auth token.
   * 
   * @param credentials - Login credentials (email and password).
   * 
   * @returns - The authenticated admin data along with the generated auth token.
   * 
   * @throws 401 error if admin is not found or credentials are invalid.
   * @throws If token generation fails.
   */
  static async login(credentials: LoginData): Promise<LoginResponse> {
    const admin = await AdminUser.authenticate(credentials)

    // throw unauthenticated error if admin is not found
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
   * 
   * @throws If token deletion fails.
   */
  static async logout(token: Token): Promise<void> {
    await AdminToken.findByIdAndDelete(token._id)
  }

  /**
   * Check for the user with the provided email and send mail to reset password.
   * 
   * @param token - Token object from the request.
   * 
   * @throws 404 error if user not found.
   * @throws if db look up or email sending fails
   */
  static async forgotPassword({ email, redirectUrl }: ForgotPasswordData): Promise<void> {
    const admin = await AdminUser.findOne({
      email,
    })

    // throw not found error if admin is not found
    if (!admin) {
      throw {
        status: 404,
        message: "User not found",
      }
    }

    const token = crypto.randomBytes(32).toString("hex")

    await db.insert(resetPassword)
      .values({
        userId: admin.id,
        userType: UserType.ADMIN,
        token,
        expiresAt: new Date(Date.now() + this.RESET_PASSWORD_TOKEN_VALIDITY),
      })

    const resetUrl = `${redirectUrl}?token=${token}`

    const mailContent = await super.renderTemplate("passwordReset.ejs", {
      resetUrl,
    })
    await sendMail({
      recipients: [{
        email: admin.email,
      }],
      category: "Password Reset",
      subject: "Password Reset",
      body: {
        type: "html",
        content: mailContent,
      }
    })
  }

  static async resetPassword({ token, password }: ResetPasswordData): Promise<void> {

  }
}
