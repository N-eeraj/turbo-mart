import {
  type Request,
  type Response,
  type NextFunction,
} from "express"

import {
  Roles,
  Permissions,
} from "@app/database/mongoose/models/Admin/User.ts"

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
    // throw unauthorized error if not super admin
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

/**
 * A factory function for the middleware to accept the required permissions.
 * 
 * @param requiredPermissions - The admin user permission required.
 * 
 * @returns the middleware that handles the authorization.
 * 
 * If user doesn't have the required permission or is not super admin,
 * it'll send an error response with 403 status code.
 */
export function permissionAuthorizationMiddleware(...requiredPermissions: Array<Permissions>): Function {
  return async function (req: Request, res: Response, next: NextFunction) {
    try {
      const hasPermission = (
        req.user.role === Roles.SUPER_ADMIN ||
        requiredPermissions.some(requiredPermission => req.user.permissions?.includes(requiredPermission))
      )

      // throw unauthorized error user is lacking required permission and isn't super admin
      if (!hasPermission) {
        throw {
          status: 403,
          message: "Unauthorized user",
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
}
