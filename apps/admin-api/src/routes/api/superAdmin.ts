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

/**
 * Middleware list for admin management routes.
 */
const adminManagementMiddlewares = [
  authenticationMiddleware,
  superAdminAuthorizationMiddleware,
]

adminManagementRouter.route("/")
  .get(adminManagementMiddlewares, SuperAdminController.listAdmins)
  .post(adminManagementMiddlewares, SuperAdminController.createAdmin)

adminManagementRouter.get(
  "/permissions",
  adminManagementMiddlewares,
  SuperAdminController.listAdminPermissions
)

adminManagementRouter.route("/:adminId")
  .get(adminManagementMiddlewares, SuperAdminController.getAdminById)
  .patch(adminManagementMiddlewares, SuperAdminController.updateAdmin)
  .delete(adminManagementMiddlewares, SuperAdminController.deleteAdmin)

superAdminRouter.use("/admin", adminManagementRouter)

export default superAdminRouter
