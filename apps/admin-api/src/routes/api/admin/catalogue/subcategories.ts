import express from "express"

import {
  Permissions,
} from "@app/database/mongoose/models/Admin/User.ts"

import {
  authenticationMiddleware,
} from "#middlewares/authentication"
import {
  permissionAuthorizationMiddleware,
} from "#middlewares/authorization"
import SubcategoryController from "#controllers/admin/catalogue/SubcategoryController"

/**
 * Catalogue APIs router.
 * 
 * Used in the api router (`src/routes/api/admin/catalogue/index.ts`) via `catalogueRouter.use("/subcategories", subcategoryRouter)`.
 */
const subcategoryRouter = express.Router()

/**
 * Middleware list for subcategory management routes.
 */
const subcategoryManagementMiddlewares = [
  authenticationMiddleware,
  permissionAuthorizationMiddleware(Permissions.CATALOGUE_MANAGER),
]

subcategoryRouter.route("/")
  .get(subcategoryManagementMiddlewares, SubcategoryController.list)
  .post(subcategoryManagementMiddlewares, SubcategoryController.create)

subcategoryRouter.route("/:subcategoryId")
  .get(subcategoryManagementMiddlewares, SubcategoryController.getById)
  .patch(subcategoryManagementMiddlewares, SubcategoryController.update)
  .delete(subcategoryManagementMiddlewares, SubcategoryController.delete)

export default subcategoryRouter
