import express from "express"

import catalogueManagementMiddlewares from "#catalogue/middleware.ts"
import ProductController from "#catalogue/products/controller.ts"

/**
 * Products APIs router.
 * 
 * Used in the api router (`src/modules/admin/catalogue/route.ts`) via `catalogueRouter.use("/products", productRouter)`.
 */
const productRouter = express.Router()

productRouter.route("/")
  .post(catalogueManagementMiddlewares, ProductController.create)

export default productRouter
