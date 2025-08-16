import {
  type Request,
  type Response,
} from "express"

import BaseController from "#controllers/BaseController"
import {
  loginSchema,
} from "#schemas/auth"

/**
 * Controller for all authentication related APIs routes.
 */
export default class AuthController extends BaseController {
  /**
   * @route POST /api/auth/login
   */
  static async login({ body }: Request, res: Response) {
    try {
      const data = super.validateRequest(loginSchema, body)
      super.sendSuccess(res, {
        message: "Logged In Successfully",
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
}
