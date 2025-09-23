import {
  type Request,
  type Response,
} from "express"

import BaseController from "#controllers/BaseController"
import AuthService from "#services/AuthService"
import {
  loginSchema,
  forgotPasswordSchema,
} from "#schemas/auth"

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
    try {
      const credentials = super.validateRequest(loginSchema, body)

      const data = await AuthService.login(credentials)

      super.sendSuccess(res, {
        message: "Login successful",
        data,
      })
    } catch (error) {
      super.sendError(res, error)
    }
  }

  /**
   * @route POST /api/auth/logout
   * 
   * Logs out the user by removing the authentication token.
   */
  static async logout({ token }: Request, res: Response) {
    try {
      await AuthService.logout(token)

      super.sendSuccess(res, {
        message: "Logout successful",
      })
    } catch (error) {
      super.sendError(res, error)
    }
  }

  /**
   * @route POST /api/auth/forgot-password
   * 
   * Sends the password reset email.
   */
  static async forgotPassword({ body }: Request, res: Response) {
    try {
      const payload = super.validateRequest(forgotPasswordSchema, body)

      await AuthService.forgotPassword(payload)

      super.sendSuccess(res, {
        message: "Password Reset email sent",
      })
    } catch (error) {
      super.sendError(res, error)
    }
  }
}
