import express from "express"

import categoryRouter from "#routes/api/admin/catalogue/categories"
import subcategoryRouter from "#routes/api/admin/catalogue/subcategories"

/**
 * Catalogue APIs router.
 * 
 * Used in the api router (`src/routes/api/admin/index.ts`) via `adminRouter.use("/catalogue", catalogueRouter)`.
 */
const catalogueRouter = express.Router()

catalogueRouter.use("/categories", categoryRouter)
catalogueRouter.use("/subcategories", subcategoryRouter)

export default catalogueRouter
