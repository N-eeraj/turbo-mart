import express from "express"

import catalogueManagementMiddlewares from "#catalogue/middleware.ts"
import SubcategoryController from "#catalogue/subcategories/controller.ts"

/**
 * Catalogue APIs router.
 * 
 * Used in the api router (`src/routes/api/admin/catalogue/index.ts`) via `catalogueRouter.use("/subcategories", subcategoryRouter)`.
 */
const subcategoryRouter = express.Router()

subcategoryRouter.route("/")
  .get(catalogueManagementMiddlewares, SubcategoryController.list)
  .post(catalogueManagementMiddlewares, SubcategoryController.create)

subcategoryRouter.route("/:subcategoryId")
  .get(catalogueManagementMiddlewares, SubcategoryController.getById)
  .patch(catalogueManagementMiddlewares, SubcategoryController.update)
  .delete(catalogueManagementMiddlewares, SubcategoryController.delete)

subcategoryRouter.route("/:subcategoryId/attributes")
  .patch(catalogueManagementMiddlewares, SubcategoryController.setAttributes)

export default subcategoryRouter
