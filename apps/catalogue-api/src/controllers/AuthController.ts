import {
  type Request,
  type Response,
} from "express"

import BaseController from "#controllers/BaseController"
import User from "#models/User"
import Token from "#models/Token"
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
      const credentials = super.validateRequest(loginSchema, body)

      const user = await User.authenticate(credentials)

      // throw validation error if user is not found
      if (!user) {
        throw {
          status: 401,
          message: "Invalid email or password",
        }
      }

      // Token
      const authToken = await Token.addToken(user.toObject()._id)
      if (!authToken) {
        throw {}
      }

      super.sendSuccess(res, {
        message: "Logged In Successfully",
        data: {
          ...user.toObject(),
          ...authToken.toObject(),
        },
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
