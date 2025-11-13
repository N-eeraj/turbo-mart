import {
  type Request,
  type Response,
} from "express"

import BaseController from "#controllers/BaseController"

/**
 * Controller for general, non-domain-specific API routes.
 */
export default class GeneralController extends BaseController {
  /**
   * @route GET /api/ping
   * 
   * Health check endpoint to verify server status.
   */
  static ping(_req: Request, res: Response) {
    super.sendSuccess(res, {
      data: "pong",
      message: "Reached Server",
    })
  }

  /**
   * @route ALL /api/*
   * 
   * Handles unmatched API routes and returns a 404 error response.
   */
  static handleRouteNotFound(_req: Request, res: Response) {
    super.sendError(res, {
      status: 404,
      message: "Cannot find the URL",
    })
  }
}
