import express from "express"

import categoryRouter from "#catalogue/categories/route.ts"
import subcategoryRouter from "#catalogue/subcategories/route.ts"
import brandRouter from "#catalogue/brands/routes.ts"

/**
 * Catalogue APIs router.
 * 
 * Used in the api router (`src/modules/admin/route.ts`) via `adminRouter.use("/catalogue", catalogueRouter)`.
 */
const catalogueRouter = express.Router()

catalogueRouter.use("/categories", categoryRouter)
catalogueRouter.use("/subcategories", subcategoryRouter)
catalogueRouter.use("/brands", brandRouter)

export default catalogueRouter
