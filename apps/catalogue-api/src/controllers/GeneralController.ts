import {
  type Request,
  type Response,
} from "express"

import {
  sendErrorResponse,
  sendSuccessResponse,
} from "#src/utils/response"

/**
 * Controller for general, non-domain-specific API routes.
 */
export default class GeneralController {
  /**
   * Health check endpoint to verify server status.
   *
   * @route GET /api/ping
   */
  static ping(_req: Request, res: Response) {
    sendSuccessResponse(res, {
      data: "pong",
      message: "Reached Server",
    })
  }

  /**
   * Handles unmatched API routes and returns a 404 error response.
   *
   * @route ALL /api/*
   */
  static handleRouteNotFound(_req: Request, res: Response) {
    sendErrorResponse(res, {
      status: 404,
      errors: "Not Found",
      message: "Cannot find the URL",
    })
  }
}
