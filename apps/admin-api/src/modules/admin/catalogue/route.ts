import express from "express"

import categoryRouter from "#catalogue/categories/route.ts"
import subcategoryRouter from "#catalogue/subcategories/route.ts"

/**
 * Catalogue APIs router.
 * 
 * Used in the api router (`src/routes/api/admin/index.ts`) via `adminRouter.use("/catalogue", catalogueRouter)`.
 */
const catalogueRouter = express.Router()

catalogueRouter.use("/categories", categoryRouter)
catalogueRouter.use("/subcategories", subcategoryRouter)

export default catalogueRouter
