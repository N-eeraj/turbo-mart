import express from "express"

import categoryRouter from "#routes/api/admin/catalogue/category"

/**
 * Catalogue APIs router.
 * 
 * Used in the api router (`src/routes/api/admin/index.ts`) via `adminRouter.use("/catalogue", catalogueRouter)`.
 */
const catalogueRouter = express.Router()

catalogueRouter.use("/category", categoryRouter)

export default catalogueRouter
