import express from "express"

import catalogueManagementMiddlewares from "#catalogue/middleware.ts"
import CategoryController from "#catalogue/categories/controller.ts"

/**
 * Catalogue APIs router.
 * 
 * Used in the api router (`src/routes/api/admin/catalogue/index.ts`) via `catalogueRouter.use("/categories", categoryRouter)`.
 */
const categoryRouter = express.Router()

categoryRouter.route("/")
  .get(catalogueManagementMiddlewares, CategoryController.list)
  .post(catalogueManagementMiddlewares, CategoryController.create)

categoryRouter.route("/:categoryId")
  .get(catalogueManagementMiddlewares, CategoryController.getById)
  .patch(catalogueManagementMiddlewares, CategoryController.update)
  .delete(catalogueManagementMiddlewares, CategoryController.delete)

categoryRouter.get("/:categoryId/subcategories", catalogueManagementMiddlewares, CategoryController.listSubcategories)

export default categoryRouter
