import express from "express"

import catalogueManagementMiddlewares from "#catalogue/middleware.ts"
import BrandController from "#catalogue/brands/controller.ts"

/**
 * Brands APIs router.
 * 
 * Used in the api router (`src/modules/admin/catalogue/route.ts`) via `catalogueRouter.use("/brands", brandRouter)`.
 */
const brandRouter = express.Router()

brandRouter.route("/")
  .get(catalogueManagementMiddlewares, BrandController.list)
  .post(catalogueManagementMiddlewares, BrandController.create)

brandRouter.route("/:brandId")
  .get(catalogueManagementMiddlewares, BrandController.getById)
  .patch(catalogueManagementMiddlewares, BrandController.update)
  .delete(catalogueManagementMiddlewares, BrandController.delete)

export default brandRouter
