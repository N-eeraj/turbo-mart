import {
  type Request,
  type Response,
  type NextFunction,
} from "express"

import {
  Roles,
} from "@app/database/mongoose/models/Admin/User.js"

import {
  sendResponse,
} from "#utils/response"
import {
  formatError,
} from "#utils/formatter"

/**
 * If user is not super admin, it'll send an error response with 403 status code.
 * 
 * @param req - The Express request object.
 * @param res - The Express response object.
 * @param next - The Express next middleware function. 
 */
export async function superAdminAuthorizationMiddleware(req: Request, res: Response, next: NextFunction) {
  try {
    if (req.user.role !== Roles.SUPER_ADMIN) {
      throw {
        status: 403,
        message: "Super admin access required",
      }
    }
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
