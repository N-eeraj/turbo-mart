import express from "express"

import {
  authenticationMiddleware,
} from "#middlewares/authentication"
import {
  superAdminAuthorizationMiddleware,
} from "#middlewares/authorization"
import SuperAdminController from "#controllers/SuperAdmin"

/**
 * Super Admin APIs router.
 * 
 * Used in the api router (`src/routes/api/index.ts`) via `apiRouter.use("/super-admin", superAdminRouter)`.
 */
const superAdminRouter = express.Router()

superAdminRouter.route("/admin")
  .all([
    authenticationMiddleware,
    superAdminAuthorizationMiddleware,
  ])
  .get(SuperAdminController.getAllAdmins)

export default superAdminRouter
