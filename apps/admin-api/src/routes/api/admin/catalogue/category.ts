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

categoryRouter.get("/", [
  ...categoryManagementMiddlewares,
], CategoryController.list)

categoryRouter.post("/", [
  ...categoryManagementMiddlewares,
], CategoryController.create)

export default categoryRouter
