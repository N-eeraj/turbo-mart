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
import CategoryController from "#controllers/admin/catalogue/CategoryController"

/**
 * Catalogue APIs router.
 * 
 * Used in the api router (`src/routes/api/admin/catalogue/index.ts`) via `catalogueRouter.use("/category", categoryRouter)`.
 */
const categoryRouter = express.Router()

/**
 * Middleware list for category management routes.
 */
const categoryManagementMiddlewares = [
  authenticationMiddleware,
  permissionAuthorizationMiddleware(Permissions.CATALOGUE_MANAGER),
]

categoryRouter.route("/")
  .get(categoryManagementMiddlewares, CategoryController.list)
  .post(categoryManagementMiddlewares, CategoryController.create)

categoryRouter.route("/:categoryId")
  .get(categoryManagementMiddlewares, CategoryController.getById)
  .patch(categoryManagementMiddlewares, CategoryController.update)

export default categoryRouter
