import {
  type Request,
  type Response,
} from "express"

import BaseController from "#controllers/BaseController"
import AuthService from "#src/services/AuthService"
import {
  loginSchema,
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
      if (error && typeof error === "object" && "message" in error) {
        super.log(error?.message, "error")
      }
      super.sendError(res, error)
    }
  }

  /**
   * @route POST /api/auth/logout
   * Logs out the user by removing the authentication token.
   */
  static async logout({ token }: Request, res: Response) {
    try {
      await AuthService.logout(token)

      super.sendSuccess(res, {
        message: "Logout successful",
      })
    } catch (error) {
      if (error && typeof error === "object" && "message" in error) {
        super.log(error?.message, "error")
      }
      super.sendError(res, error)
    }
  }
}
