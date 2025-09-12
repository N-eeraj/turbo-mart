import express from "express"

import AdminManagementController from "#controllers/SuperAdmin/AdminManagementController"

/**
 * Super Admin APIs router.
 * 
 * Used in the superAdmin router (`src/routes/api/superAdmin/index.ts`) via `superAdminRouter.use("/admin", adminManagementRouter)`.
 */
const adminManagementRouter = express.Router()

adminManagementRouter.route("/")
  .get(AdminManagementController.getAllAdmins)
  .post(AdminManagementController.createAdmin)

export default adminManagementRouter
