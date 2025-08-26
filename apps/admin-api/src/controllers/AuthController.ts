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
    } catch ({ status, message, ...error}) {
      super.log(message, "error")
      super.sendError(res, {
        status: status ?? 500,
        errors: error,
        message,
      })
    }
  }

  /**
   * @route POST /api/auth/logout
   * 
   * Logs out the user.
   */
  static async logout({ headers }: Request, res: Response) {
    try {
      if (!headers.authorization) {
        throw {
          status: 400,
          message: "Authorization header is required",
        }
      }

      super.sendSuccess(res, {
        message: "Logout successful",
      })
    } catch ({ status, message, ...error}) {
      super.log(message, "error")
      super.sendError(res, {
        status: status ?? 500,
        errors: error,
        message,
      })
    }
  }
}
