import express from "express"

import categoryRouter from "#catalogue/categories/routes.ts"
import subcategoryRouter from "#catalogue/subcategories/routes.ts"
import brandRouter from "#catalogue/brands/routes.ts"
import productRouter from "#catalogue/products/routes.ts"

/**
 * Catalogue APIs router.
 * 
 * Used in the api router (`src/modules/admin/routes.ts`) via `adminRouter.use("/catalogue", catalogueRouter)`.
 */
const catalogueRouter = express.Router()

catalogueRouter.use("/categories", categoryRouter)
catalogueRouter.use("/subcategories", subcategoryRouter)
catalogueRouter.use("/brands", brandRouter)
catalogueRouter.use("/products", productRouter)

export default catalogueRouter
