import {
  type Request,
  type Response,
} from "express"

import {
  sendErrorResponse,
  sendSuccessResponse,
} from "#src/utils/response"

export default class GeneralController {
  static ping(_req: Request, res: Response) {
    sendSuccessResponse(res, {
      data: "pong",
      message: "Reached Server",
    })
  }

  static handleRouteNotFound(_req: Request, res: Response) {
    sendErrorResponse(res, {
      status: 404,
      errors: "Not Found",
      message: "Cannot find the URL",
    })
  }
}
