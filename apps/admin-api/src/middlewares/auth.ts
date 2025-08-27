import {
  type Request,
  type Response,
  type NextFunction,
} from "express"

import {
  sendResponse,
} from "#utils/response"
import AdminToken from "@app/database/mongoose/models/Admin/Token.ts"

export default async function authMiddleware(req: Request, res: Response, next: NextFunction) {
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
  }).populate("admin")

  if (!data) {
    return sendResponse(res, false, {
      status: 401,
      message: "Un-authorization user",
    })
  }

  req.user = data.admin

  next()
}
