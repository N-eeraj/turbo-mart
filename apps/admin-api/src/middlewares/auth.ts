import {
  type Request,
  type Response,
  type NextFunction,
} from "express"

import {
  sendResponse,
} from "#utils/response"
import AdminToken from "@app/database/mongoose/models/Admin/Token.ts"
import {
  type AdminObject,
} from "@app/database/mongoose/models/Admin/User.ts"

declare global {
  namespace Express {
    interface Request {
      user?: AdminObject
    }
  }
}

export default async function authMiddleware(req: Request, res: Response, next: NextFunction) {
  try {
    const token = (req.headers.authorization ?? "")
      .replace(/^Bearer\s/, "")

    if (!token) {
      return sendResponse(res, false, {
        status: 400,
        message: "Authorization header is required",
      })
    }

    const data = await AdminToken.findOne({
      token,
    })
      .populate("admin")
      .lean<{ admin: AdminObject }>()

    if (!data?.admin) {
      return sendResponse(res, false, {
        status: 401,
        message: "Unauthorized user",
      })
    }

    req.user = data.admin

    next()
  } catch (error) {
    sendResponse(res, false, {
      status: 401,
      message: "Unauthorized user",
    }, error)
  }
}
