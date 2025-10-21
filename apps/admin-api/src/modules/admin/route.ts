import express from "express"

import catalogueRouter from "#src/modules/admin/catalogue/route.ts"

/**
 * Admin APIs router.
 * 
 * Used in the api router (`src/routes/api.ts`) via `apiRouter.use("/admin", adminRouter)`.
 */
const adminRouter = express.Router()

adminRouter.use("/catalogue", catalogueRouter)

export default adminRouter
