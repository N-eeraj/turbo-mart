import express from "express"

import catalogueManagementMiddlewares from "#catalogue/middleware.ts"
import CategoryController from "#catalogue/categories/controller.ts"

/**
 * Categories APIs router.
 * 
 * Used in the api router (`src/modules/admin/catalogue/route.ts`) via `catalogueRouter.use("/categories", categoryRouter)`.
 */
const categoryRouter = express.Router()

categoryRouter.route("/")
  .get(catalogueManagementMiddlewares, CategoryController.list)
  .post(catalogueManagementMiddlewares, CategoryController.create)

categoryRouter.route("/:categoryId")
  .get(catalogueManagementMiddlewares, CategoryController.getById)
  .patch(catalogueManagementMiddlewares, CategoryController.update)
  .delete(catalogueManagementMiddlewares, CategoryController.delete)

categoryRouter.get("/slug/:slug", catalogueManagementMiddlewares, CategoryController.getBySlug)

categoryRouter.get("/:categoryId/subcategories", catalogueManagementMiddlewares, CategoryController.listSubcategories)

export default categoryRouter
