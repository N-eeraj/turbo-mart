import express from "express"


import {
  authenticationMiddleware,
} from "#middlewares/authentication"
import {
  superAdminAuthorizationMiddleware,
} from "#middlewares/authorization"
import SuperAdminController from "#controllers/superAdmin"

/**
 * Super Admin APIs router.
 * 
 * Used in the api router (`src/routes/api/index.ts`) via `apiRouter.use("/super-admin", superAdminRouter)`.
 */
const superAdminRouter = express.Router()

/**
 * Admin management APIs router.
 * 
 * Used in the super admin router (`src/routes/api/superAdmin.ts`) via `superAdminRouter.use("/admin", adminManagementRouter)`.
 */
const adminManagementRouter = express.Router()

adminManagementRouter.route("/")
  .get([
    authenticationMiddleware,
    superAdminAuthorizationMiddleware,
  ], SuperAdminController.getAdmins)
  .post([
    authenticationMiddleware,
    superAdminAuthorizationMiddleware,
  ], SuperAdminController.createAdmin)

adminManagementRouter.route("/:id")
  .get([
    authenticationMiddleware,
    superAdminAuthorizationMiddleware,
  ], SuperAdminController.getAdminById)

superAdminRouter.use("/admin", adminManagementRouter)

export default superAdminRouter
