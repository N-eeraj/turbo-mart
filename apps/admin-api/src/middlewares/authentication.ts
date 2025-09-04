import {
  type Request,
  type Response,
  type NextFunction,
} from "express"

import AdminToken, {
  type Token,
} from "@app/database/mongoose/models/Admin/Token.ts"
import {
  transformUser,
  type AdminObject,
  type Admin as AdminType,
} from "@app/database/mongoose/models/Admin/User.ts"

import {
  sendResponse,
} from "#utils/response"
import {
  formatError,
} from "#utils/formatter"

declare global {
  namespace Express {
    interface Request {
      user: AdminObject
      token: Token
    }
  }
}

export interface UserToken extends Token {
  admin: AdminType
}

/**
 * Middleware to handle authentication and authorization. It typically checks for a token in the request headers,
 * validates it, and attaches the authenticated user's data to the request object before calling the next middleware.
 * 
 * If authentication fails, it'll send an error response with 401 status code.
 * 
 * @param req - The Express request object.
 * @param res - The Express response object.
 * @param next - The Express next middleware function.
 */
export async function authenticationMiddleware(req: Request, res: Response, next: NextFunction) {
  try {
    const token = (req.headers.authorization ?? "")
      .replace(/^Bearer\s/, "")

    if (!token) {
      throw {
        status: 401,
        message: "Missing authentication token",
      }
    }

    const data = await AdminToken.findOne({
      token,
    })
      .populate("admin")
      .lean<UserToken>()

    if (!data?.admin) {
      throw {
        status: 401,
        message: "Invalid authentication token",
      }
    }

    const {
      admin,
      ...authToken
    } = data
    req.user = transformUser(admin)

    req.token = authToken

    next()
  } catch (error) {
    const {
      status,
      message,
      errors,
    } = formatError(error)
    
    sendResponse(res, false, { status, message }, errors)
  }
}
