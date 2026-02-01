import express from "express"

import catalogueRouter from "#catalogue/routes.ts"

/**
 * Admin APIs router.
 * 
 * Used in the api router (`src/routes/api.ts`) via `apiRouter.use("/admin", adminRouter)`.
 */
const adminRouter = express.Router()

adminRouter.use("/catalogue", catalogueRouter)

export default adminRouter
