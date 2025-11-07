import {
  Permissions,
} from "@app/database/mongoose/models/Admin/User"

import {
  authenticationMiddleware,
} from "#middlewares/authentication"
import {
  permissionAuthorizationMiddleware,
} from "#middlewares/authorization"

/**
 * Middleware list for catalogue management routes.
 */
const catalogueManagementMiddlewares = [
  authenticationMiddleware,
  permissionAuthorizationMiddleware(Permissions.CATALOGUE_MANAGER),
]

export default catalogueManagementMiddlewares
