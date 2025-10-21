import generalPaths from "#jsonDocs/paths/general" with { type: "json" }
import authPaths from "#jsonDocs/paths/auth" with { type: "json" }
import profileUserPaths from "#jsonDocs/paths/profile/user" with { type: "json" }
import profileNotificationsPaths from "#jsonDocs/paths/profile/notifications" with { type: "json" }
import superAdminPaths from "#jsonDocs/paths/superAdmin" with { type: "json" }
import categoriesPaths from "#jsonDocs/paths/admin/catalogue/categories" with { type: "json" }
import subcategoriesPaths from "#jsonDocs/paths/admin/catalogue/subcategories" with { type: "json" }

const profilePaths = {
  ...profileUserPaths,
  ...profileNotificationsPaths,
}

const cataloguePaths = {
  ...categoriesPaths,
  ...subcategoriesPaths,
}

const adminPaths = {
  ...cataloguePaths,
}

const paths = {
  ...generalPaths,
  ...authPaths,
  ...profilePaths,
  ...superAdminPaths,
  ...adminPaths,
}

export default paths
