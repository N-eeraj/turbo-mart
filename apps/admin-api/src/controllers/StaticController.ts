import {
  type Request,
  type Response,
} from "express"

import BaseController from "#controllers/BaseController"

/**
 * Controller for serving static HTML pages.
 */
export default class StaticController extends BaseController {
  /**
   * @route GET /
   *
   * Serves the home page (`index.html`).
   */
  static getHome(_req: Request, res: Response) {
    super.sendPublicFile(res, "html/index.html")
  }

  /**
   * @route ALL * (when no other route matches)
   *
   * Serves the 404 Not Found page (`404.html`).
   */
  static handlePageNotFound(_req: Request, res: Response) {
    res.statusCode = 404
    super.sendPublicFile(res, "html/404.html")
  }
}
