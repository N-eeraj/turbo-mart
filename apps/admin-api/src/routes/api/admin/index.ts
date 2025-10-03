import express from "express"

import catalogueRouter from "#routes/api/admin/catalogue/index"

/**
 * Admin APIs router.
 * 
 * Used in the api router (`src/routes/api/index.ts`) via `apiRouter.use("/admin", adminRouter)`.
 */
const adminRouter = express.Router()

adminRouter.use("/catalogue", catalogueRouter)

export default adminRouter
