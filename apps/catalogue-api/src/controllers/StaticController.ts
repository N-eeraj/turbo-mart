import {
  type Request,
  type Response,
} from "express"

import {
  withPublicPath,
} from "#utils/pathUtils"

/**
 * Controller for serving static HTML pages.
 */
export default class StaticController {
  /**
   * Serves the home page (`index.html`).
   *
   * @route GET /
   */
  static getHome(_req: Request, res: Response) {
    res.sendFile(withPublicPath("html/index.html"))
  }

  /**
   * Serves the 404 Not Found page (`404.html`).
   *
   * @route ALL * (when no other route matches)
   */
  static handlePageNotFound(_req: Request, res: Response) {
    res.statusCode = 404
    res.sendFile(withPublicPath("html/404.html"))
  }
}
