import express from "express"

import {
  authenticationMiddleware,
} from "#middlewares/authentication"
import {
  superAdminAuthorizationMiddleware,
} from "#middlewares/authorization"
import AdminManagementController from "#controllers/SuperAdmin/AdminManagementController"

/**
 * Super Admin APIs router.
 * 
 * Used in the superAdmin router (`src/routes/api/superAdmin/index.ts`) via `superAdminRouter.use("/admin", adminManagementRouter)`.
 */
const adminManagementRouter = express.Router()

adminManagementRouter.route("/")
  .all([
    authenticationMiddleware,
    superAdminAuthorizationMiddleware,
  ])
  .get(AdminManagementController.getAllAdmins)

export default adminManagementRouter
