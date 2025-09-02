import express from "express"

import adminManagementRouter from "#routes/api/superAdmin/admin"

/**
 * Super Admin APIs router.
 * 
 * Used in the api router (`src/routes/api/index.ts`) via `apiRouter.use("/super-admin", superAdminRouter)`.
 */
const superAdminRouter = express.Router()

superAdminRouter.use("/admin", adminManagementRouter)

export default superAdminRouter
