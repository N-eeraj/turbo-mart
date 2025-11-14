import {
  type Request,
  type Response,
} from "express"

import BaseController from "#controllers/BaseController"
import AuthService from "#src/modules/auth/service.ts"
import {
  loginSchema,
  forgotPasswordSchema,
  resetPasswordSchema,
} from "@app/schemas/admin/auth"

/**
 * Controller for all authentication related APIs routes.
 */
export default class AuthController extends BaseController {
  /**
   * @route POST /api/auth/login
   * 
   * Validates login credentials and logs in the user.
   */
  static async login({ body }: Request, res: Response) {
    const credentials = super.validateRequest(loginSchema, body)

    const data = await AuthService.login(credentials)

    super.sendSuccess(res, {
      message: "Login successful",
      data,
    })
  }

  /**
   * @route POST /api/auth/logout
   * 
   * Logs out the user by removing the authentication token.
   */
  static async logout({ token }: Request, res: Response) {
    await AuthService.logout(token)

    super.sendSuccess(res, {
      message: "Logout successful",
    })
  }

  /**
   * @route POST /api/auth/forgot-password
   * 
   * Sends the password reset email.
   */
  static async forgotPassword({ body }: Request, res: Response) {
    const payload = super.validateRequest(forgotPasswordSchema, body)

    await AuthService.forgotPassword(payload)

    super.sendSuccess(res, {
      message: "Requested Password Reset",
    })
  }

  /**
   * @route POST /api/auth/reset-password
   * 
   * Update the user password.
   */
  static async resetPassword({ body }: Request, res: Response) {
    const payload = super.validateRequest(resetPasswordSchema, body)

    await AuthService.resetPassword(payload)

    super.sendSuccess(res, {
      message: "Password Reset Successfully",
    })
  }
}
