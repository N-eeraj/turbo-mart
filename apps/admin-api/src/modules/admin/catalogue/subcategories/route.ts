import express from "express"

import catalogueManagementMiddlewares from "#catalogue/middleware.ts"
import SubcategoryController from "#catalogue/subcategories/controller.ts"

/**
 * Subcategories APIs router.
 * 
 * Used in the api router (`src/modules/admin/catalogue/route.ts`) via `catalogueRouter.use("/subcategories", subcategoryRouter)`.
 */
const subcategoryRouter = express.Router()

subcategoryRouter.route("/")
  .get(catalogueManagementMiddlewares, SubcategoryController.list)
  .post(catalogueManagementMiddlewares, SubcategoryController.create)

subcategoryRouter.get("/attribute-types", catalogueManagementMiddlewares, SubcategoryController.listAttributeTypes)

subcategoryRouter.route("/:subcategoryId")
  .get(catalogueManagementMiddlewares, SubcategoryController.getById)
  .patch(catalogueManagementMiddlewares, SubcategoryController.update)
  .delete(catalogueManagementMiddlewares, SubcategoryController.delete)

subcategoryRouter.patch("/:subcategoryId/attributes", catalogueManagementMiddlewares, SubcategoryController.setAttributes)

export default subcategoryRouter
