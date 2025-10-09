import express from "express"

import categoryRouter from "#routes/api/admin/catalogue/category"
import subcategoryRouter from "#routes/api/admin/catalogue/subcategory"

/**
 * Catalogue APIs router.
 * 
 * Used in the api router (`src/routes/api/admin/index.ts`) via `adminRouter.use("/catalogue", catalogueRouter)`.
 */
const catalogueRouter = express.Router()

catalogueRouter.use("/category", categoryRouter)
catalogueRouter.use("/subcategory", subcategoryRouter)

export default catalogueRouter
